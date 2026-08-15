using System.Net;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests;

public class IdempotencyHeaderTests
{
    private const string AcceptedResponseBody = """
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "channel": "email",
      "status": "queued",
      "recipient": { "address": "a@b.com", "name": null },
      "template_key": null,
      "subject": "S",
      "created_at": "2026-05-26T10:00:00+00:00",
      "sent_at": null,
      "attempt_count": 0,
      "last_error": null
    }
    """;

    [Fact]
    public async Task Send_with_idempotency_key_sets_header()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Accepted, AcceptedResponseBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Notifications.SendAsync(
            new SendNotificationRequest("email", new Recipient("a@b.com")) { Subject = "S", HtmlBody = "x" },
            new SendOptions { IdempotencyKey = "abc-123" });

        handler.SentRequests.Should().HaveCount(1);
        handler.SentRequests[0].Headers.GetValues("Idempotency-Key").Should().ContainSingle().Which.Should().Be("abc-123");
    }

    [Fact]
    public async Task Send_without_idempotency_key_does_not_set_header()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.Accepted, AcceptedResponseBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Notifications.SendAsync(
            new SendNotificationRequest("email", new Recipient("a@b.com")) { Subject = "S", HtmlBody = "x" });

        handler.SentRequests[0].Headers.Contains("Idempotency-Key").Should().BeFalse();
    }

    [Fact]
    public async Task Send_replay_returns_was_replayed_true_when_server_returns_200()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.OK, AcceptedResponseBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        SendNotificationResult result = await client.Notifications.SendAsync(
            new SendNotificationRequest("email", new Recipient("a@b.com")) { Subject = "S", HtmlBody = "x" },
            new SendOptions { IdempotencyKey = "abc-123" });

        result.WasReplayed.Should().BeTrue();
    }
}
