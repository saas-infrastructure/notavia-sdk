using System.Net;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Tests.Helpers;
using NotifyService.Sdk.Usage;

namespace NotifyService.Sdk.Tests;

public class UsageResourceTests
{
    private const string MeteredBody = """
        {
          "plan": "free",
          "period_start": "2026-05-01T00:00:00+00:00",
          "period_end": "2026-06-01T00:00:00+00:00",
          "included_sends": 1000,
          "used_sends": 342,
          "remaining_sends": 658,
          "hard_limit": true,
          "by_channel": { "email": 300, "sms": 42 }
        }
        """;

    private const string UnlimitedBody = """
        {
          "plan": "scale",
          "period_start": "2026-05-01T00:00:00+00:00",
          "period_end": "2026-06-01T00:00:00+00:00",
          "included_sends": null,
          "used_sends": 5000,
          "remaining_sends": null,
          "hard_limit": false,
          "by_channel": { "email": 5000 }
        }
        """;

    [Fact]
    public async Task GetAsync_sends_GET_to_usage_and_deserializes_metered_plan()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, MeteredBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        UsageResponse usage = await client.Usage.GetAsync();

        handler.SentRequests.Should().HaveCount(1);
        HttpRequestMessage req = handler.SentRequests[0];
        req.Method.Should().Be(HttpMethod.Get);
        req.RequestUri!.AbsolutePath.Should().Be("/v1/usage");

        usage.Plan.Should().Be("free");
        usage.UsedSends.Should().Be(342);
        usage.IncludedSends.Should().Be(1000);
        usage.RemainingSends.Should().Be(658);
        usage.HardLimit.Should().BeTrue();
        usage.ByChannel["email"].Should().Be(300);
        usage.ByChannel["sms"].Should().Be(42);
    }

    [Fact]
    public async Task GetAsync_deserializes_null_included_and_remaining_as_unlimited()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, UnlimitedBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        UsageResponse usage = await client.Usage.GetAsync();

        usage.Plan.Should().Be("scale");
        usage.IncludedSends.Should().BeNull();
        usage.RemainingSends.Should().BeNull();
        usage.UsedSends.Should().Be(5000);
        usage.HardLimit.Should().BeFalse();
    }
}
