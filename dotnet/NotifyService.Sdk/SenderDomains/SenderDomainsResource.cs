using NotifyService.Sdk.Internal;

namespace NotifyService.Sdk.SenderDomains;

internal sealed class SenderDomainsResource : ISenderDomainsResource
{
    private readonly NotifyHttpClient _http;

    public SenderDomainsResource(NotifyHttpClient http)
    {
        _http = http;
    }

    public async Task<SenderDomainResponse> AddAsync(string domain, CancellationToken ct = default)
    {
        var request = new AddSenderDomainRequest(domain);
        (HttpResponseMessage response, SenderDomainResponse body) = await _http.PostAsync(
            "/v1/sender-domains",
            request,
            NotifyJsonContext.Default.AddSenderDomainRequest,
            NotifyJsonContext.Default.SenderDomainResponse,
            extraHeaders: null,
            activityName: "notifyservice.sender_domains.add",
            ct);
        response.Dispose();
        return body;
    }

    public Task<IReadOnlyList<SenderDomainResponse>> ListAsync(CancellationToken ct = default) =>
        _http.GetAsync(
            "/v1/sender-domains",
            NotifyJsonContext.Default.IReadOnlyListSenderDomainResponse,
            "notifyservice.sender_domains.list",
            ct);

    public async Task<SenderDomainResponse?> GetAsync(Guid id, CancellationToken ct = default)
    {
        try
        {
            return await _http.GetAsync(
                $"/v1/sender-domains/{id}",
                NotifyJsonContext.Default.SenderDomainResponse,
                "notifyservice.sender_domains.get",
                ct);
        }
        catch (NotifyApiException ex) when (ex.StatusCode == 404)
        {
            return null;
        }
    }

    public async Task<SenderDomainResponse> RecheckAsync(Guid id, CancellationToken ct = default)
    {
        (HttpResponseMessage response, SenderDomainResponse body) = await _http.PostWithFallbackAsync<object?, SenderDomainResponse>(
            $"/v1/sender-domains/{id}/recheck",
            null,
            NotifyJsonContext.Default.SenderDomainResponse,
            extraHeaders: null,
            activityName: "notifyservice.sender_domains.recheck",
            ct);
        response.Dispose();
        return body;
    }

    public Task DeleteAsync(Guid id, CancellationToken ct = default) =>
        _http.DeleteAsync(
            $"/v1/sender-domains/{id}",
            "notifyservice.sender_domains.delete",
            ct);
}
