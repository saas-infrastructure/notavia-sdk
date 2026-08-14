using NotifyService.Sdk.Internal;

namespace NotifyService.Sdk.Templates;

internal sealed class TemplatesResource : ITemplatesResource
{
    private readonly NotifyHttpClient _http;

    public TemplatesResource(NotifyHttpClient http)
    {
        _http = http;
    }

    public async Task<TemplateResponse> CreateAsync(CreateTemplateRequest request, CancellationToken ct = default)
    {
        (HttpResponseMessage response, TemplateResponse body) = await _http.PostAsync(
            "/v1/templates",
            request,
            NotifyJsonContext.Default.CreateTemplateRequest,
            NotifyJsonContext.Default.TemplateResponse,
            extraHeaders: null,
            activityName: "notifyservice.templates.create",
            ct);
        response.Dispose();
        return body;
    }

    public Task<TemplateResponse> GetAsync(string key, CancellationToken ct = default) =>
        _http.GetAsync(
            $"/v1/templates/{Uri.EscapeDataString(key)}",
            NotifyJsonContext.Default.TemplateResponse,
            "notifyservice.templates.get",
            ct);

    public Task<TemplatePage> ListAsync(ListTemplatesOptions? options = null, CancellationToken ct = default)
    {
        ListTemplatesOptions o = options ?? new ListTemplatesOptions();
        string query = o.Cursor is null
            ? $"?limit={o.Limit}"
            : $"?limit={o.Limit}&cursor={Uri.EscapeDataString(o.Cursor)}";
        return _http.GetAsync(
            $"/v1/templates{query}",
            NotifyJsonContext.Default.TemplatePage,
            "notifyservice.templates.list",
            ct);
    }

    public Task<TemplateResponse> UpdateAsync(string key, UpdateTemplateRequest request, CancellationToken ct = default) =>
        _http.PatchAsync(
            $"/v1/templates/{Uri.EscapeDataString(key)}",
            request,
            NotifyJsonContext.Default.UpdateTemplateRequest,
            NotifyJsonContext.Default.TemplateResponse,
            "notifyservice.templates.update",
            ct);

    public Task DeleteAsync(string key, CancellationToken ct = default) =>
        _http.DeleteAsync(
            $"/v1/templates/{Uri.EscapeDataString(key)}",
            "notifyservice.templates.delete",
            ct);

    public async Task<RenderResult> RenderAsync(
        string key,
        IReadOnlyDictionary<string, object?>? data,
        CancellationToken ct = default)
    {
        var request = new RenderRequest(data);
        (HttpResponseMessage response, RenderResult body) = await _http.PostAsync(
            $"/v1/templates/{Uri.EscapeDataString(key)}/render",
            request,
            NotifyJsonContext.Default.RenderRequest,
            NotifyJsonContext.Default.RenderResult,
            extraHeaders: null,
            activityName: "notifyservice.templates.render",
            ct);
        response.Dispose();
        return body;
    }

    public async Task<PromotionResult> PromoteAsync(string key, bool dryRun = false, CancellationToken ct = default)
    {
        var request = new PromoteTemplateRequest(dryRun);
        (HttpResponseMessage response, PromotionResult body) = await _http.PostAsync(
            $"/v1/templates/{Uri.EscapeDataString(key)}/promote",
            request,
            NotifyJsonContext.Default.PromoteTemplateRequest,
            NotifyJsonContext.Default.PromotionResult,
            extraHeaders: null,
            activityName: "notifyservice.templates.promote",
            ct);
        response.Dispose();
        return body;
    }
}
