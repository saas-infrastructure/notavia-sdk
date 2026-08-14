using NotifyService.Sdk.Internal;

namespace NotifyService.Sdk.Usage;

internal sealed class UsageResource : IUsageResource
{
    private readonly NotifyHttpClient _http;

    public UsageResource(NotifyHttpClient http)
    {
        _http = http;
    }

    public Task<UsageResponse> GetAsync(CancellationToken cancellationToken = default)
    {
        return _http.GetAsync(
            "/v1/usage",
            NotifyJsonContext.Default.UsageResponse,
            "notifyservice.usage.get",
            cancellationToken);
    }
}
