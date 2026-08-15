using Polly.Timeout;

namespace NotifyService.Sdk.Internal;

internal sealed class ResilienceTimeoutTranslationHandler : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        try
        {
            return await base.SendAsync(request, cancellationToken);
        }
        catch (TimeoutRejectedException rejected)
        {
            throw new TaskCanceledException(
                $"The request was canceled due to a timeout of {rejected.Timeout} elapsing.",
                new TimeoutException(
                    $"The request did not complete within {rejected.Timeout}.",
                    rejected),
                cancellationToken);
        }
    }
}
