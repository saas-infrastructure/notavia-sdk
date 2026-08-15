using System.Net;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests;

public class ErrorTranslationTests
{
    [Fact]
    public async Task BadRequest_with_structured_envelope_throws_NotifyApiException_with_code_and_request_id()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(
            HttpStatusCode.BadRequest,
            """
            { "error": { "type": "invalid_request_error", "code": "parameter_invalid", "message": "Channel unsupported", "param": "channel" } }
            """,
            headers: new Dictionary<string, string> { ["X-Request-Id"] = "req_abc" });

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.SendAsync(
            new SendNotificationRequest("zigzag", new Recipient("x@y.com")));

        NotifyApiException ex = (await act.Should().ThrowAsync<NotifyApiException>()).Which;
        ex.StatusCode.Should().Be(400);
        ex.Error.Code.Should().Be("parameter_invalid");
        ex.Error.Type.Should().Be("invalid_request_error");
        ex.Error.Param.Should().Be("channel");
        ex.RequestId.Should().Be("req_abc");
    }

    [Fact]
    public async Task Response_with_unparsable_body_synthesizes_transport_error()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build();
        handler.Respond(HttpStatusCode.InternalServerError, "<html>nope</html>", contentType: "text/html");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid());

        NotifyApiException ex = (await act.Should().ThrowAsync<NotifyApiException>()).Which;
        ex.StatusCode.Should().Be(500);
        ex.Error.Type.Should().Be("transport_error");
        ex.Error.Code.Should().Be("unparsable_response");
        handler.SentRequests.Should().HaveCount(1);
    }
}
