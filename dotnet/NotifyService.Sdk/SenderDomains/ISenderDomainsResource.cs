namespace NotifyService.Sdk.SenderDomains;

/// <summary>
/// The <c>/v1/sender-domains</c> resource. Register the domains you will send From, publish the
/// DNS records it returns, then poll until <see cref="SenderDomainResponse.Status"/> is
/// <c>verified</c>. Only a verified domain may appear in a message's <c>from_address</c>.
/// </summary>
public interface ISenderDomainsResource
{
    /// <summary>
    /// Register a sending domain for the organization behind your API key and get the DNS records
    /// to publish. The environment behind the key decides whether DKIM CNAMEs are issued.
    /// </summary>
    /// <param name="domain">The domain to register, e.g. <c>acme.com</c>.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SenderDomainResponse> AddAsync(string domain, CancellationToken ct = default);

    /// <summary>List every sending domain for the organization behind your API key, newest first.</summary>
    /// <param name="ct">Cancellation token.</param>
    Task<IReadOnlyList<SenderDomainResponse>> ListAsync(CancellationToken ct = default);

    /// <summary>
    /// Fetch one sending domain. Returns null if no domain with that id belongs to your
    /// organization. This is the polling read: call it to watch a domain move to <c>verified</c>.
    /// </summary>
    /// <param name="id">The sending-domain id.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SenderDomainResponse?> GetAsync(Guid id, CancellationToken ct = default);

    /// <summary>
    /// Force a verification pass now instead of waiting for the background poller, and return the
    /// refreshed domain. Rate-limited per organization because it drives live DNS lookups.
    /// </summary>
    /// <param name="id">The sending-domain id.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SenderDomainResponse> RecheckAsync(Guid id, CancellationToken ct = default);

    /// <summary>
    /// Delete a sending domain. Sends naming an address at this domain are rejected afterwards.
    /// Throws <see cref="NotifyApiException"/> with status 404 if the domain does not exist.
    /// </summary>
    /// <param name="id">The sending-domain id.</param>
    /// <param name="ct">Cancellation token.</param>
    Task DeleteAsync(Guid id, CancellationToken ct = default);
}
