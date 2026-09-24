using System.Net;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Suppressions;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests.Suppressions;

public class SuppressionsResourceTests
{
    private const string SuppressionId = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
    private const string NotificationId = "cccccccc-cccc-cccc-cccc-cccccccccccc";
    private const string TestAddress = "bounce@example.com";

    private static string SingleSuppressionBody(string address = TestAddress) => $$"""
        {
          "id": "{{SuppressionId}}",
          "address": "{{address}}",
          "reason": "HardBounce",
          "source": "Provider",
          "diagnostic_detail": "550 No such user",
          "triggering_notification_id": "{{NotificationId}}",
          "suppressed_at": "2026-05-01T12:00:00+00:00"
        }
        """;

    private static readonly string PageBody = $$"""
        {
          "data": [{{SingleSuppressionBody()}}],
          "has_more": false,
          "next_cursor": null
        }
        """;

    [Fact]
    public async Task ListAsync_sends_GET_to_suppressions_with_default_limit()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PageBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SuppressionPage page = await client.Suppressions.ListAsync();

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Get);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/suppressions");
        req.RequestUri.Query.Should().Contain("limit=25");

        page.Data.Should().HaveCount(1);
        page.HasMore.Should().BeFalse();
        page.NextCursor.Should().BeNull();
        page.Data[0].Address.Should().Be(TestAddress);
        page.Data[0].Reason.Should().Be("HardBounce");
    }

    [Fact]
    public async Task ListAsync_encodes_optional_filters_in_query_string()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, PageBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Suppressions.ListAsync(new ListSuppressionsOptions
        {
            Address = "test@example.com",
            Reason = "HardBounce",
            Limit = 10,
            Cursor = "cursor_xyz",
        });

        string query = handler.SentRequests[0].RequestUri!.Query;
        query.Should().Contain("address=test%40example.com");
        query.Should().Contain("reason=HardBounce");
        query.Should().Contain("limit=10");
        query.Should().Contain("cursor=cursor_xyz");
    }

    [Fact]
    public async Task GetAsync_sends_GET_and_returns_suppression()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, SingleSuppressionBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SuppressionResponse? result = await client.Suppressions.GetAsync(TestAddress);

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Get);
        req.RequestUri!.AbsolutePath.Should().Be($"/v1/suppressions/{WebUtility.UrlEncode(TestAddress)}");

        result.Should().NotBeNull();
        result!.Id.Should().Be(Guid.Parse(SuppressionId));
        result.Address.Should().Be(TestAddress);
        result.Source.Should().Be("Provider");
        result.DiagnosticDetail.Should().Be("550 No such user");
        result.TriggeringNotificationId.Should().Be(Guid.Parse(NotificationId));
    }

    [Fact]
    public async Task GetAsync_returns_null_on_404()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.NotFound,
            """{"error":{"type":"not_found","code":"suppression_not_found","message":"Not found","param":null}}""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SuppressionResponse? result = await client.Suppressions.GetAsync("notfound@example.com");

        result.Should().BeNull();
    }

    [Fact]
    public async Task AddAsync_sends_POST_and_returns_suppression_on_201()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Created, SingleSuppressionBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SuppressionResponse result = await client.Suppressions.AddAsync(TestAddress);

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Post);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/suppressions");

        string body = await req.Content!.ReadAsStringAsync();
        using JsonDocument doc = JsonDocument.Parse(body);
        doc.RootElement.GetProperty("address").GetString().Should().Be(TestAddress);

        result.Id.Should().Be(Guid.Parse(SuppressionId));
        result.Address.Should().Be(TestAddress);
    }

    [Fact]
    public async Task AddAsync_returns_suppression_on_200_when_already_existed()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, SingleSuppressionBody());

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SuppressionResponse result = await client.Suppressions.AddAsync(TestAddress);

        result.Should().NotBeNull();
        result.Reason.Should().Be("HardBounce");
    }

    [Fact]
    public async Task RemoveAsync_sends_DELETE_to_encoded_address()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.NoContent, string.Empty, "text/plain");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Suppressions.RemoveAsync(TestAddress);

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Delete);
        req.RequestUri!.AbsolutePath.Should().Be($"/v1/suppressions/{WebUtility.UrlEncode(TestAddress)}");
    }

    [Fact]
    public async Task RemoveAsync_does_not_throw_on_404()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.NotFound,
            """{"error":{"type":"not_found","code":"suppression_not_found","message":"Not found","param":null}}""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Suppressions.RemoveAsync("notfound@example.com");

        await act.Should().NotThrowAsync();
    }
}
