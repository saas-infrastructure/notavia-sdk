using System.Net;
using NotifyService.Sdk.Internal;

namespace NotifyService.Sdk.Suppressions;

internal sealed class SuppressionsResource : ISuppressionsResource
{
    private readonly NotifyHttpClient _http;

    public SuppressionsResource(NotifyHttpClient http)
    {
        _http = http;
    }

    public Task<SuppressionPage> ListAsync(
        ListSuppressionsOptions? options = null,
        CancellationToken ct = default)
    {
        ListSuppressionsOptions o = options ?? new ListSuppressionsOptions();
        string query = BuildQuery(o);
        return _http.GetAsync(
            $"/v1/suppressions{query}",
            NotifyJsonContext.Default.SuppressionPage,
            "notifyservice.suppressions.list",
            ct);
    }

    public async Task<SuppressionResponse?> GetAsync(string address, CancellationToken ct = default)
    {
        try
        {
            return await _http.GetAsync(
                $"/v1/suppressions/{WebUtility.UrlEncode(address)}",
                NotifyJsonContext.Default.SuppressionResponse,
                "notifyservice.suppressions.get",
                ct);
        }
        catch (NotifyApiException ex) when (ex.StatusCode == 404)
        {
            return null;
        }
    }

    public async Task<SuppressionResponse> AddAsync(string address, CancellationToken ct = default)
    {
        var request = new AddSuppressionRequest(address);
        (HttpResponseMessage response, SuppressionResponse body) = await _http.PostAsync(
            "/v1/suppressions",
            request,
            NotifyJsonContext.Default.AddSuppressionRequest,
            NotifyJsonContext.Default.SuppressionResponse,
            extraHeaders: null,
            activityName: "notifyservice.suppressions.add",
            ct);
        response.Dispose();
        return body;
    }

    public async Task RemoveAsync(string address, CancellationToken ct = default)
    {
        try
        {
            await _http.DeleteAsync(
                $"/v1/suppressions/{WebUtility.UrlEncode(address)}",
                "notifyservice.suppressions.remove",
                ct);
        }
        catch (NotifyApiException ex) when (ex.StatusCode == 404)
        {
        }
    }

    private static string BuildQuery(ListSuppressionsOptions o)
    {
        var sb = new System.Text.StringBuilder();
        void Append(string name, string? value)
        {
            if (string.IsNullOrEmpty(value)) return;
            sb.Append(sb.Length == 0 ? '?' : '&');
            sb.Append(name).Append('=').Append(WebUtility.UrlEncode(value));
        }
        Append("address", o.Address);
        Append("reason", o.Reason);
        Append("limit", o.Limit.ToString());
        Append("cursor", o.Cursor);
        return sb.ToString();
    }
}
