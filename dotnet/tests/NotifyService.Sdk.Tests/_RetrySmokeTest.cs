using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Tests.Helpers;

namespace NotifyService.Sdk.Tests;

public class RetrySmokeTests
{
    [Fact]
    public async Task Retries_disabled_sends_exactly_one_request_on_500()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o =>
        {
            o.Retries = new RetryOptions { Enabled = false };
        });
        handler.Respond(System.Net.HttpStatusCode.InternalServerError,
            """{ "error": { "type":"server_error","code":"x","message":"y","param":null } }""");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid());
        await act.Should().ThrowAsync<NotifyApiException>();

        handler.SentRequests.Should().HaveCount(1);
    }
}
