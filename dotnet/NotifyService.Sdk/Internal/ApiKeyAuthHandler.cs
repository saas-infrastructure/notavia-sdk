using System.Net.Http.Headers;
using Microsoft.Extensions.Options;

namespace NotifyService.Sdk.Internal;

internal sealed class ApiKeyAuthHandler : DelegatingHandler
{
    private readonly IOptionsMonitor<NotifyOptions> _options;

    public ApiKeyAuthHandler(IOptionsMonitor<NotifyOptions> options)
    {
        _options = options;
    }

    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.CurrentValue.ApiKey);
        return base.SendAsync(request, cancellationToken);
    }
}
