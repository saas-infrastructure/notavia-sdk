using System.Net;
using FluentAssertions;
using FluentAssertions.Specialized;
using Microsoft.Extensions.DependencyInjection;
using NotifyService.Sdk;
using NotifyService.Sdk.Internal;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Tests.Helpers;
using Polly.Timeout;

namespace NotifyService.Sdk.Tests;

public class TimeoutConfigTests
{
    [Fact]
    public async Task Configured_timeout_aborts_a_request_that_blocks_until_its_token_fires()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o =>
        {
            o.Timeout = TimeSpan.FromMilliseconds(200);
        });
        handler.BlockUntilCancelled = true;
        handler.Respond(HttpStatusCode.OK, "{}");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid());

        ExceptionAssertions<TaskCanceledException> thrown =
            await act.Should().ThrowExactlyAsync<TaskCanceledException>();
        thrown.And.InnerException.Should().BeOfType<TimeoutException>();
        handler.SentRequests.Should().HaveCount(1);
    }

    [Fact]
    public void Configured_timeout_reaches_the_resolved_HttpClient()
    {
        (IServiceProvider sp, RecordingHandler _) = TestServiceCollectionBuilder.Build(o =>
        {
            o.Timeout = TimeSpan.FromMilliseconds(750);
        });

        HttpClient http = sp.GetRequiredService<IHttpClientFactory>()
            .CreateClient(nameof(NotifyHttpClient));

        http.Timeout.Should().Be(TimeSpan.FromMilliseconds(750));
    }

    [Fact]
    public void Default_timeout_reaches_the_resolved_HttpClient()
    {
        (IServiceProvider sp, RecordingHandler _) = TestServiceCollectionBuilder.Build();

        HttpClient http = sp.GetRequiredService<IHttpClientFactory>()
            .CreateClient(nameof(NotifyHttpClient));

        http.Timeout.Should().Be(TimeSpan.FromSeconds(30));
    }

    [Fact]
    public async Task Caller_cancellation_is_not_reported_as_a_timeout()
    {
        (IServiceProvider sp, RecordingHandler handler) = TestServiceCollectionBuilder.Build(o =>
        {
            o.Timeout = TimeSpan.FromMinutes(5);
        });
        handler.BlockUntilCancelled = true;
        handler.Respond(HttpStatusCode.OK, "{}");

        INotifyClient client = sp.GetRequiredService<INotifyClient>();
        using var caller = new CancellationTokenSource(TimeSpan.FromMilliseconds(100));

        Func<Task> act = () => client.Notifications.GetAsync(Guid.NewGuid(), caller.Token);

        ExceptionAssertions<OperationCanceledException> thrown =
            await act.Should().ThrowAsync<OperationCanceledException>();
        thrown.And.InnerException.Should().NotBeOfType<TimeoutException>();
    }

    [Fact]
    public async Task Resilience_pipeline_timeout_surfaces_as_a_cancellation_carrying_a_TimeoutException()
    {
        var translator = new ResilienceTimeoutTranslationHandler
        {
            InnerHandler = new ThrowingHandler(
                new TimeoutRejectedException("attempt timed out", TimeSpan.FromSeconds(10))),
        };
        using var invoker = new HttpMessageInvoker(translator);

        Func<Task> act = () => invoker.SendAsync(
            new HttpRequestMessage(HttpMethod.Get, "http://localhost/v1/ping"),
            CancellationToken.None);

        ExceptionAssertions<TaskCanceledException> thrown =
            await act.Should().ThrowExactlyAsync<TaskCanceledException>();
        thrown.And.InnerException.Should().BeOfType<TimeoutException>()
            .Which.InnerException.Should().BeOfType<TimeoutRejectedException>();
    }

    [Fact]
    public void Timeout_translation_handler_sits_outside_the_resilience_handler()
    {
        (IServiceProvider sp, RecordingHandler _) = TestServiceCollectionBuilder.Build();

        HttpMessageHandler chain = sp.GetRequiredService<IHttpMessageHandlerFactory>()
            .CreateHandler(nameof(NotifyHttpClient));

        var order = new List<Type>();
        HttpMessageHandler? cursor = chain;
        while (cursor is DelegatingHandler delegating)
        {
            order.Add(delegating.GetType());
            cursor = delegating.InnerHandler;
        }

        int translator = order.FindIndex(t => t == typeof(ResilienceTimeoutTranslationHandler));
        int resilience = order.FindIndex(
            t => t.Namespace is not null && t.Namespace.StartsWith("Microsoft.Extensions.Http.Resilience"));

        translator.Should().BeGreaterThanOrEqualTo(0);
        resilience.Should().BeGreaterThanOrEqualTo(0);
        translator.Should().BeLessThan(resilience);
    }

    private sealed class ThrowingHandler : HttpMessageHandler
    {
        private readonly Exception _exception;

        public ThrowingHandler(Exception exception) => _exception = exception;

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken) => Task.FromException<HttpResponseMessage>(_exception);
    }
}
