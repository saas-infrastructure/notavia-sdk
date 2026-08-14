using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using NotifyService.Sdk.Identity;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.SenderDomains;
using NotifyService.Sdk.Suppressions;
using NotifyService.Sdk.Templates;
using NotifyService.Sdk.Usage;
using NotifyService.Sdk.Workflows;

namespace NotifyService.Sdk.Internal;

[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.SnakeCaseLower,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(ErrorEnvelope))]
[JsonSerializable(typeof(Attachment))]
[JsonSerializable(typeof(IReadOnlyList<Attachment>))]
[JsonSerializable(typeof(AttachmentMetadata))]
[JsonSerializable(typeof(IReadOnlyList<AttachmentMetadata>))]
[JsonSerializable(typeof(SendNotificationRequest))]
[JsonSerializable(typeof(NotificationResponse))]
[JsonSerializable(typeof(NotificationPage))]
[JsonSerializable(typeof(CreateTemplateRequest))]
[JsonSerializable(typeof(UpdateTemplateRequest))]
[JsonSerializable(typeof(TemplateResponse))]
[JsonSerializable(typeof(TemplatePage))]
[JsonSerializable(typeof(RenderRequest))]
[JsonSerializable(typeof(RenderResult))]
[JsonSerializable(typeof(PromoteTemplateRequest))]
[JsonSerializable(typeof(PromoteWorkflowRequest))]
[JsonSerializable(typeof(PromotionResult))]
[JsonSerializable(typeof(TemplatePromotionDiff))]
[JsonSerializable(typeof(WorkflowPromotionDiff))]
[JsonSerializable(typeof(TemplateBodyChange))]
[JsonSerializable(typeof(IReadOnlyList<TemplateBodyChange>))]
[JsonSerializable(typeof(IReadOnlyList<TemplatePromotionDiff>))]
[JsonSerializable(typeof(IReadOnlyList<string>))]
[JsonSerializable(typeof(MeResponse))]
[JsonSerializable(typeof(WorkflowTriggerRequest))]
[JsonSerializable(typeof(WorkflowTriggerResponse))]
[JsonSerializable(typeof(WorkflowRunResponse))]
[JsonSerializable(typeof(WorkflowStepRunSummary))]
[JsonSerializable(typeof(WorkflowEventBody))]
[JsonSerializable(typeof(SuppressionResponse))]
[JsonSerializable(typeof(SuppressionPage))]
[JsonSerializable(typeof(AddSuppressionRequest))]
[JsonSerializable(typeof(SenderDomainResponse))]
[JsonSerializable(typeof(IReadOnlyList<SenderDomainResponse>))]
[JsonSerializable(typeof(AddSenderDomainRequest))]
[JsonSerializable(typeof(UsageResponse))]
internal partial class NotifyJsonContext : JsonSerializerContext
{
    internal static readonly NotifyJsonContext Relaxed = new(new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    });
}
