namespace NotifyService.Sdk.Usage;

/// <summary>The <c>/v1/usage</c> resource.</summary>
public interface IUsageResource
{
    /// <summary>Fetch usage metering for the current environment's billing period.</summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task<UsageResponse> GetAsync(CancellationToken cancellationToken = default);
}
