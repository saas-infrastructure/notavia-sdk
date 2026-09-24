using NotifyService.Sdk.Internal;

namespace NotifyService.Sdk.Identity;

internal sealed class MeResource : IMeResource
{
    private readonly NotifyHttpClient _http;

    public MeResource(NotifyHttpClient http)
    {
        _http = http;
    }

    public Task<MeResponse> GetAsync(CancellationToken ct = default) =>
        _http.GetAsync(
            "/v1/me",
            NotifyJsonContext.Default.MeResponse,
            "notifyservice.me.get",
            ct);
}
