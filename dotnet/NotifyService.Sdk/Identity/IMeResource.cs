namespace NotifyService.Sdk.Identity;

/// <summary>The <c>/v1/me</c> resource — inspect the current API key's tenant context.</summary>
public interface IMeResource
{
    /// <summary>Fetch the current API key's tenant context.</summary>
    /// <param name="ct">Cancellation token.</param>
    Task<MeResponse> GetAsync(CancellationToken ct = default);
}
