namespace NotifyService.Sdk.Suppressions;

/// <summary>The <c>/v1/suppressions</c> resource.</summary>
public interface ISuppressionsResource
{
    /// <summary>List suppressions in the current environment, paged by cursor.</summary>
    /// <param name="options">Optional filters and pagination.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SuppressionPage> ListAsync(ListSuppressionsOptions? options = null, CancellationToken ct = default);

    /// <summary>Fetch a suppression by address. Returns null if the address is not suppressed.</summary>
    /// <param name="address">The address to look up.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SuppressionResponse?> GetAsync(string address, CancellationToken ct = default);

    /// <summary>
    /// Manually add an address to the suppression list. Returns the suppression whether it was
    /// newly created (201) or already existed (200).
    /// </summary>
    /// <param name="address">The address to suppress.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SuppressionResponse> AddAsync(string address, CancellationToken ct = default);

    /// <summary>
    /// Remove an address from the suppression list. Does nothing if the address is not suppressed.
    /// </summary>
    /// <param name="address">The address to un-suppress.</param>
    /// <param name="ct">Cancellation token.</param>
    Task RemoveAsync(string address, CancellationToken ct = default);
}
