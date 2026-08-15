using System.Diagnostics;
using System.Net;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests;

public class TelemetryTests
{
    private const string AcceptedBody = """
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "channel": "email", "status": "queued",
      "recipient": { "address": "a@b.com", "name": null },
      "template_key": null, "subject": "S",
      "created_at": "2026-05-26T10:00:00+00:00",
      "sent_at": null, "attempt_count": 0, "last_error": null
    }
    """;

    [Fact]
    public async Task Successful_send_emits_activity_with_tags()
    {
        var activities = new List<Activity>();
        using var listener = new ActivityListener
        {
            ShouldListenTo = source => source.Name == "NotifyService.Sdk",
            Sample = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllData,
            ActivityStopped = a => activities.Add(a),
        };
        ActivitySource.AddActivityListener(listener);

        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.Accepted,
            AcceptedBody,
            headers: new Dictionary<string, string> { ["X-Request-Id"] = "req_xyz" });

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        await client.Notifications.SendAsync(
            new SendNotificationRequest("email", new Recipient("a@b.com")) { Subject = "S", HtmlBody = "x" });

        activities.Should().ContainSingle();
        Activity a = activities[0];
        a.OperationName.Should().Be("notifyservice.notifications.send");
        a.GetTagItem("http.method").Should().Be("POST");
        a.GetTagItem("url.path").Should().Be("/v1/notifications");
        a.GetTagItem("http.status_code").Should().Be(202);
        a.GetTagItem("notifyservice.request_id").Should().Be("req_xyz");
    }

    [Fact]
    public async Task Failed_request_marks_activity_with_error_status()
    {
        var activities = new List<Activity>();
        using var listener = new ActivityListener
        {
            ShouldListenTo = source => source.Name == "NotifyService.Sdk",
            Sample = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllData,
            ActivityStopped = a => activities.Add(a),
        };
        ActivitySource.AddActivityListener(listener);

        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.NotFound, """{ "error": { "type":"not_found","code":"template_not_found","message":"x","param":null } }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid());

        await act.Should().ThrowAsync<NotifyApiException>();
        activities.Should().ContainSingle();
        activities[0].Status.Should().Be(ActivityStatusCode.Error);
        activities[0].GetTagItem("http.status_code").Should().Be(404);
    }
}
