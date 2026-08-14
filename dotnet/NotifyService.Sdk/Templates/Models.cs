namespace NotifyService.Sdk.Templates;

/// <summary>Body of <c>POST /v1/templates</c>.</summary>
/// <param name="Key">Stable per-environment template key.</param>
/// <param name="Name">Display name.</param>
/// <param name="SubjectTemplate">Liquid template for the subject line.</param>
/// <param name="HtmlBodyTemplate">Liquid template for the HTML body.</param>
public sealed record CreateTemplateRequest(
    string Key,
    string Name,
    string SubjectTemplate,
    string HtmlBodyTemplate)
{
    /// <summary>Optional plain-text body template.</summary>
    public string? TextBodyTemplate { get; init; }
}

/// <summary>Body of <c>PATCH /v1/templates/{key}</c>. Omit fields to leave them unchanged.</summary>
public sealed record UpdateTemplateRequest
{
    /// <summary>New display name.</summary>
    public string? Name { get; init; }
    /// <summary>New Liquid subject template.</summary>
    public string? SubjectTemplate { get; init; }
    /// <summary>New Liquid HTML body template.</summary>
    public string? HtmlBodyTemplate { get; init; }
    /// <summary>New Liquid plain-text body template.</summary>
    public string? TextBodyTemplate { get; init; }
}

/// <summary>The server-side representation of a template.</summary>
/// <param name="Id">Server-assigned id.</param>
/// <param name="Key">Stable per-environment key.</param>
/// <param name="Name">Display name.</param>
/// <param name="SubjectTemplate">Liquid template for the subject line.</param>
/// <param name="HtmlBodyTemplate">Liquid template for the HTML body.</param>
/// <param name="TextBodyTemplate">Liquid template for the plain-text body, or null.</param>
/// <param name="CreatedAt">When the template was first created.</param>
/// <param name="UpdatedAt">When the template was last modified.</param>
public sealed record TemplateResponse(
    Guid Id,
    string Key,
    string Name,
    string SubjectTemplate,
    string HtmlBodyTemplate,
    string? TextBodyTemplate,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

/// <summary>Query parameters for <c>ListAsync</c>.</summary>
public sealed record ListTemplatesOptions
{
    /// <summary>Page size. Defaults to 20.</summary>
    public int Limit { get; init; } = 20;
    /// <summary>Cursor returned by the previous page.</summary>
    public string? Cursor { get; init; }
}

/// <summary>One page of templates.</summary>
/// <param name="Data">Templates in this page.</param>
/// <param name="NextCursor">Cursor for the next page, or null if last page.</param>
public sealed record TemplatePage(IReadOnlyList<TemplateResponse> Data, string? NextCursor);

/// <summary>Result of <c>RenderAsync</c>.</summary>
/// <param name="Subject">Rendered subject line.</param>
/// <param name="HtmlBody">Rendered HTML body.</param>
/// <param name="TextBody">Rendered plain-text body, or null if the template has none.</param>
public sealed record RenderResult(string Subject, string HtmlBody, string? TextBody);

/// <summary>Body of <c>POST /v1/templates/{key}/render</c>.</summary>
/// <param name="Data">Liquid data passed to the template, or null for no data.</param>
public sealed record RenderRequest(IReadOnlyDictionary<string, object?>? Data);

/// <summary>Body of <c>POST /v1/templates/{key}/promote</c>.</summary>
/// <param name="DryRun">
/// When <c>true</c> the server computes the diff but does not write anything.
/// Defaults to <c>false</c>.
/// </param>
public sealed record PromoteTemplateRequest(bool DryRun);

/// <summary>Body of <c>POST /v1/workflows/{key}/promote</c>.</summary>
/// <param name="DryRun">
/// When <c>true</c> the server computes the diff but does not write anything.
/// Defaults to <c>false</c>.
/// </param>
/// <param name="IncludeTemplates">
/// Optional list of template keys to promote alongside the workflow.
/// When <c>null</c> the server uses its default inclusion rules.
/// </param>
public sealed record PromoteWorkflowRequest(bool DryRun, IReadOnlyList<string>? IncludeTemplates);

/// <summary>
/// Well-known values for <see cref="TemplatePromotionDiff.Status"/> and
/// <see cref="WorkflowPromotionDiff.Status"/>.
/// The wire value is the snake_case string returned by the API.
/// </summary>
public static class PromotionStatus
{
    /// <summary>The resource does not yet exist in the target environment.</summary>
    public const string New = "new";

    /// <summary>The resource exists in the target environment but differs from the source.</summary>
    public const string Changed = "changed";

    /// <summary>The resource in the target environment is already identical to the source.</summary>
    public const string Identical = "identical";
}

/// <summary>
/// Well-known values for the per-field change kind properties on
/// <see cref="TemplateBodyChange"/> and <see cref="WorkflowPromotionDiff"/>.
/// The wire value is the snake_case string returned by the API.
/// </summary>
public static class FieldChangeKind
{
    /// <summary>The field is new in the source and absent in the target.</summary>
    public const string Added = "added";

    /// <summary>The field exists in the target but not in the source.</summary>
    public const string Removed = "removed";

    /// <summary>The field exists in both environments but has a different value.</summary>
    public const string Modified = "modified";

    /// <summary>The field is identical in both environments.</summary>
    public const string Unchanged = "unchanged";
}

/// <summary>Per-channel body change summary within a <see cref="TemplatePromotionDiff"/>.</summary>
/// <param name="Channel">Channel identifier (e.g. <c>"email"</c>).</param>
/// <param name="Subject">Change kind for the subject field. One of <see cref="FieldChangeKind"/>.</param>
/// <param name="Text">Change kind for the plain-text body field.</param>
/// <param name="Html">Change kind for the HTML body field.</param>
/// <param name="Structured">Change kind for the structured body field.</param>
public sealed record TemplateBodyChange(
    string Channel,
    string Subject,
    string Text,
    string Html,
    string Structured);

/// <summary>Diff for a single template within a promotion result.</summary>
/// <param name="Key">Template key.</param>
/// <param name="Status">Overall status. One of <see cref="PromotionStatus"/>.</param>
/// <param name="Name">Change kind for the display-name field. One of <see cref="FieldChangeKind"/>.</param>
/// <param name="Bodies">Per-channel body change summaries.</param>
public sealed record TemplatePromotionDiff(
    string Key,
    string Status,
    string Name,
    IReadOnlyList<TemplateBodyChange> Bodies);

/// <summary>Diff for a workflow within a promotion result.</summary>
/// <param name="Key">Workflow key.</param>
/// <param name="Status">Overall status. One of <see cref="PromotionStatus"/>.</param>
/// <param name="Name">Change kind for the display-name field. One of <see cref="FieldChangeKind"/>.</param>
/// <param name="Description">Change kind for the description field.</param>
/// <param name="Body">Change kind for the workflow DSL body.</param>
/// <param name="SourceVersion">Version number of the source (Test) workflow, or <c>null</c> when the workflow is new.</param>
/// <param name="TargetCurrentVersion">Current version number in the target environment, or <c>null</c> when not yet present.</param>
/// <param name="ReferencedTemplates">Diffs for templates referenced by the workflow.</param>
public sealed record WorkflowPromotionDiff(
    string Key,
    string Status,
    string Name,
    string Description,
    string Body,
    int? SourceVersion,
    int? TargetCurrentVersion,
    IReadOnlyList<TemplatePromotionDiff> ReferencedTemplates);

/// <summary>Result of a <c>POST /v1/templates/{key}/promote</c> or <c>POST /v1/workflows/{key}/promote</c> call.</summary>
/// <param name="Applied">
/// <c>true</c> when the promotion was written to the target environment;
/// <c>false</c> on a dry run or when the source and target are identical.
/// </param>
/// <param name="Status">Overall promotion status. One of <see cref="PromotionStatus"/>.</param>
/// <param name="TemplateDiff">Template-level diff, populated when promoting a template.</param>
/// <param name="WorkflowDiff">Workflow-level diff, populated when promoting a workflow.</param>
/// <param name="TargetVersion">
/// Version number written to the target environment, or <c>null</c> on a dry run or when no write occurred.
/// </param>
public sealed record PromotionResult(
    bool Applied,
    string Status,
    TemplatePromotionDiff? TemplateDiff,
    WorkflowPromotionDiff? WorkflowDiff,
    int? TargetVersion);
