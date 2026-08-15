using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.SenderDomains;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests.SenderDomains;

public class SenderDomainsResourceTests
{
    private const string DomainId = "dddddddd-dddd-dddd-dddd-dddddddddddd";
    private const string OrgId = "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee";

    private static string SingleDomainBody(string domain = "acme.com", string status = "pending") => $$"""
        {
          "id": "{{DomainId}}",
          "organization_id": "{{OrgId}}",
          "domain": "{{domain}}",
          "status": "{{status}}",
          "dns_records": [
            { "host": "_notify-verification.{{domain}}", "type": "TXT", "value": "notify-verify=abc123" },
            { "host": "sel1._domainkey.{{domain}}", "type": "CNAME", "value": "sel1.dkim.amazonses.com" }
          ],
          "auth_checks": [
            { "kind": "Ownership", "status": "Pass", "detail": "TXT record found", "recommended": null },
            { "kind": "Spf", "status": "Warn", "detail": "No SPF record",
              "recommended": { "host": "{{domain}}", "type": "TXT", "value": "v=spf1 include:amazonses.com ~all" } }
          ],
          "verified_at": null,
          "last_checked_at": "2026-07-16T10:00:00+00:00",
          "check_count": 3,
          "last_check_error": null,
          "created_at": "2026-07-16T09:00:00+00:00"
        }
        """;

    private static readonly string ListBody = $"[{SingleDomainBody()}]";

    [Fact]
    public async Task AddAsync_posts_the_domain_and_returns_the_dns_records()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Created, SingleDomainBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SenderDomainResponse result = await client.SenderDomains.AddAsync("acme.com");

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/sender-domains");

        string body = await req.Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("domain").GetString().Should().Be("acme.com");
        doc.RootElement.TryGetProperty("organization_id", out _).Should().BeFalse();
        doc.RootElement.TryGetProperty("environment_id", out _).Should().BeFalse();

        result.Id.Should().Be(Guid.Parse(DomainId));
        result.Domain.Should().Be("acme.com");
        result.Status.Should().Be("pending");
        result.DnsRecords.Should().HaveCount(2);
        result.DnsRecords[0].Host.Should().Be("_notify-verification.acme.com");
        result.DnsRecords[0].Type.Should().Be("TXT");
        result.DnsRecords[0].Value.Should().Be("notify-verify=abc123");
    }

    [Fact]
    public async Task AddAsync_surfaces_the_auth_checks_including_the_recommended_record()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Created, SingleDomainBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SenderDomainResponse result = await client.SenderDomains.AddAsync("acme.com");

        result.AuthChecks.Should().HaveCount(2);
        result.AuthChecks[0].Kind.Should().Be("Ownership");
        result.AuthChecks[0].Status.Should().Be("Pass");
        result.AuthChecks[0].Recommended.Should().BeNull();
        result.AuthChecks[1].Kind.Should().Be("Spf");
        result.AuthChecks[1].Recommended!.Value.Should().Be("v=spf1 include:amazonses.com ~all");
    }

    [Fact]
    public async Task ListAsync_sends_GET_and_returns_every_domain()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, ListBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        IReadOnlyList<SenderDomainResponse> result = await client.SenderDomains.ListAsync();

        handler.SentRequests[0].Method.Should().Be(HttpMethod.Get);
        handler.SentRequests[0].RequestUri!.AbsolutePath.Should().Be("/v1/sender-domains");
        result.Should().HaveCount(1);
        result[0].Domain.Should().Be("acme.com");
        result[0].CheckCount.Should().Be(3);
    }

    [Fact]
    public async Task GetAsync_sends_GET_to_the_id_route()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, SingleDomainBody(status: "verified"));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SenderDomainResponse? result = await client.SenderDomains.GetAsync(Guid.Parse(DomainId));

        handler.SentRequests[0].Method.Should().Be(HttpMethod.Get);
        handler.SentRequests[0].RequestUri!.AbsolutePath.Should().Be($"/v1/sender-domains/{DomainId}");
        result!.Status.Should().Be("verified");
    }

    [Fact]
    public async Task GetAsync_returns_null_on_404()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.NotFound,
            """{"error":{"type":"resource_not_found","code":"resource_not_found","message":"Not found","param":null}}""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SenderDomainResponse? result = await client.SenderDomains.GetAsync(Guid.NewGuid());

        result.Should().BeNull();
    }

    [Fact]
    public async Task RecheckAsync_posts_to_the_recheck_route_and_returns_the_refreshed_domain()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, SingleDomainBody(status: "verified"));

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SenderDomainResponse result = await client.SenderDomains.RecheckAsync(Guid.Parse(DomainId));

        handler.SentRequests[0].Method.Should().Be(HttpMethod.Post);
        handler.SentRequests[0].RequestUri!.AbsolutePath.Should().Be($"/v1/sender-domains/{DomainId}/recheck");
        result.Status.Should().Be("verified");
    }

    [Fact]
    public async Task DeleteAsync_sends_DELETE_to_the_id_route()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.NoContent, string.Empty, "text/plain");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.SenderDomains.DeleteAsync(Guid.Parse(DomainId));

        handler.SentRequests[0].Method.Should().Be(HttpMethod.Delete);
        handler.SentRequests[0].RequestUri!.AbsolutePath.Should().Be($"/v1/sender-domains/{DomainId}");
    }

    [Fact]
    public async Task DeleteAsync_throws_on_404()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.NotFound,
            """{"error":{"type":"resource_not_found","code":"resource_not_found","message":"Not found","param":null}}""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.SenderDomains.DeleteAsync(Guid.NewGuid());

        await act.Should().ThrowAsync<NotifyApiException>();
    }
}
