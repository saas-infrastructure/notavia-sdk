namespace NotifyService.Sdk.Templates;

/// <summary>The <c>/v1/templates</c> resource.</summary>
public interface ITemplatesResource
{
    /// <summary>Create a template in the current environment.</summary>
    /// <param name="request">Template definition.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<TemplateResponse> CreateAsync(CreateTemplateRequest request, CancellationToken ct = default);

    /// <summary>Fetch a template by its stable key.</summary>
    /// <param name="key">Template key.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<TemplateResponse> GetAsync(string key, CancellationToken ct = default);

    /// <summary>List templates in the current environment, paged by cursor.</summary>
    /// <param name="options">Optional pagination.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<TemplatePage> ListAsync(ListTemplatesOptions? options = null, CancellationToken ct = default);

    /// <summary>Patch fields on an existing template. Omitted fields are left unchanged.</summary>
    /// <param name="key">Template key.</param>
    /// <param name="request">Fields to update.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<TemplateResponse> UpdateAsync(string key, UpdateTemplateRequest request, CancellationToken ct = default);

    /// <summary>Delete a template by key.</summary>
    /// <param name="key">Template key.</param>
    /// <param name="ct">Cancellation token.</param>
    Task DeleteAsync(string key, CancellationToken ct = default);

    /// <summary>Render a template with sample data. Does not send anything.</summary>
    /// <param name="key">Template key.</param>
    /// <param name="data">Liquid data passed to the template, or null.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<RenderResult> RenderAsync(string key, IReadOnlyDictionary<string, object?>? data, CancellationToken ct = default);

    /// <summary>
    /// Promotes a template from the Test environment to Live.
    /// Pass <paramref name="dryRun"/> <c>true</c> to preview the diff without writing.
    /// </summary>
    /// <param name="key">Template key.</param>
    /// <param name="dryRun">When <c>true</c> returns the computed diff without applying any changes.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>The promotion result including the diff and whether the change was applied.</returns>
    Task<PromotionResult> PromoteAsync(string key, bool dryRun = false, CancellationToken ct = default);
}
