namespace NotifyService.Sdk.Usage;

/// <summary>Usage metering for the current environment's billing period, as returned by <c>/v1/usage</c>.</summary>
/// <param name="Plan">The billing plan slug (e.g. <c>free</c>).</param>
/// <param name="PeriodStart">Start of the current billing period.</param>
/// <param name="PeriodEnd">End of the current billing period.</param>
/// <param name="IncludedSends">Sends included in the plan for this period, or null when unlimited.</param>
/// <param name="UsedSends">Sends consumed so far in this period.</param>
/// <param name="RemainingSends">Sends remaining in this period, or null when unlimited.</param>
/// <param name="HardLimit">When true, sends are blocked once the included quota is exhausted.</param>
/// <param name="ByChannel">Sends consumed in this period broken down by channel.</param>
public sealed record UsageResponse(
    string Plan,
    DateTimeOffset PeriodStart,
    DateTimeOffset PeriodEnd,
    long? IncludedSends,
    long UsedSends,
    long? RemainingSends,
    bool HardLimit,
    IReadOnlyDictionary<string, long> ByChannel);
