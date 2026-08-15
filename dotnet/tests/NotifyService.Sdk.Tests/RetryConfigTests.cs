using System.Net;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests;

public class RetryConfigTests
{
    private const string ServerErrorBody = """{ "error": { "type":"server_error","code":"unavailable","message":"x","param":null } }""";

    [Fact]
    public async Task Retries_disabled_sends_one_attempt_on_503()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o =>
        {
            o.Retries = new RetryOptions { Enabled = false };
        });
        handler.Respond(HttpStatusCode.ServiceUnavailable, ServerErrorBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid());

        await act.Should().ThrowAsync<NotifyApiException>();
        handler.SentRequests.Should().HaveCount(1);
    }

    [Fact]
    public async Task Retries_enabled_with_max_attempts_2_retries_then_throws()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o =>
        {
            o.Retries = new RetryOptions { Enabled = true, MaxAttempts = 2 };
        });
        handler.Respond(HttpStatusCode.ServiceUnavailable, ServerErrorBody);
        handler.Respond(HttpStatusCode.ServiceUnavailable, ServerErrorBody);
        handler.Respond(HttpStatusCode.ServiceUnavailable, ServerErrorBody);

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid());

        await act.Should().ThrowAsync<NotifyApiException>();
        handler.SentRequests.Should().HaveCount(3);   // 1 initial + 2 retries
    }
}
