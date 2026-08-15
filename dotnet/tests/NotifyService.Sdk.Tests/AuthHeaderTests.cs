using System.Net;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests;

public class AuthHeaderTests
{
    private const string MeResponseBody = """
    {
      "organization_id": "00000000-0000-0000-0000-000000000001",
      "environment_id": "00000000-0000-0000-0000-000000000002",
      "environment_kind": "test",
      "key_id": "00000000-0000-0000-0000-000000000003",
      "key_scope": "full_access",
      "key_type": "secret"
    }
    """;

    [Fact]
    public async Task Every_request_carries_bearer_authorization_header()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o => o.ApiKey = "ns_test_first");
        handler.Respond(HttpStatusCode.OK, MeResponseBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Me.GetAsync();

        handler.SentRequests[0].Headers.Authorization.Should().NotBeNull();
        handler.SentRequests[0].Headers.Authorization!.Scheme.Should().Be("Bearer");
        handler.SentRequests[0].Headers.Authorization.Parameter.Should().Be("ns_test_first");
    }

    [Fact]
    public async Task Sequential_calls_each_carry_the_bearer_header()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o => o.ApiKey = "ns_test_xyz");
        handler.Respond(HttpStatusCode.OK, MeResponseBody);
        handler.Respond(HttpStatusCode.OK, MeResponseBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Me.GetAsync();
        await client.Me.GetAsync();

        handler.SentRequests.Should().HaveCount(2);
        handler.SentRequests[0].Headers.Authorization!.Parameter.Should().Be("ns_test_xyz");
        handler.SentRequests[1].Headers.Authorization!.Parameter.Should().Be("ns_test_xyz");
    }
}
