namespace NotifyService.Sdk.Suppressions;

/// <summary>A suppressed address as returned by <c>/v1/suppressions</c>.</summary>
/// <param name="Id">Server-assigned suppression id.</param>
/// <param name="Address">The suppressed address (e.g. an email).</param>
/// <param name="Reason">Why the address is suppressed: <c>HardBounce</c>, <c>Complaint</c>, or <c>ManualAdd</c>.</param>
/// <param name="Source">How the suppression was created: <c>Provider</c> or <c>Manual</c>.</param>
/// <param name="DiagnosticDetail">Provider-supplied diagnostic string, or null.</param>
/// <param name="TriggeringNotificationId">The notification that caused the suppression, or null.</param>
/// <param name="SuppressedAt">When the suppression was recorded.</param>
public sealed record SuppressionResponse(
    Guid Id,
    string Address,
    string Reason,
    string Source,
    string? DiagnosticDetail,
    Guid? TriggeringNotificationId,
    DateTimeOffset SuppressedAt);

/// <summary>One page of suppressions.</summary>
/// <param name="Data">Suppressions in this page.</param>
/// <param name="HasMore">True when a subsequent page exists.</param>
/// <param name="NextCursor">Cursor to pass to the next <c>ListAsync</c> call, or null on the last page.</param>
public sealed record SuppressionPage(
    IReadOnlyList<SuppressionResponse> Data,
    bool HasMore,
    string? NextCursor);

/// <summary>Body of a <c>POST /v1/suppressions</c> request.</summary>
/// <param name="Address">The address to suppress.</param>
public sealed record AddSuppressionRequest(string Address);

/// <summary>Query parameters for <c>ListAsync</c>.</summary>
public sealed class ListSuppressionsOptions
{
    /// <summary>Filter by address (exact match).</summary>
    public string? Address { get; init; }

    /// <summary>Filter by reason: <c>HardBounce</c>, <c>Complaint</c>, or <c>ManualAdd</c>.</summary>
    public string? Reason { get; init; }

    /// <summary>Page size. Defaults to 25.</summary>
    public int Limit { get; init; } = 25;

    /// <summary>Cursor returned by a previous page's <see cref="SuppressionPage.NextCursor"/>.</summary>
    public string? Cursor { get; init; }
}
