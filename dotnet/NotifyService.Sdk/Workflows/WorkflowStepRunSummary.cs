using System.Text.Json.Serialization;

namespace NotifyService.Sdk.Workflows;

/// <summary>Summary of a single step execution within a workflow run.</summary>
/// <param name="StepId">Step identifier as declared in the workflow DSL.</param>
/// <param name="Kind">Step type (<c>"Send"</c>, <c>"Delay"</c>, <c>"Branch"</c>, etc.).</param>
/// <param name="AttemptId">Attempt number for this step (1-based).</param>
/// <param name="Status">Step execution status (<c>"Running"</c>, <c>"Waiting"</c>, <c>"Completed"</c>, <c>"Failed"</c>, <c>"Cancelled"</c>).</param>
/// <param name="Outcome">Outcome if the step has completed, otherwise <c>null</c>.</param>
/// <param name="NotificationId">Id of the notification dispatched by a Send step, or <c>null</c>.</param>
/// <param name="OutputJson">Raw JSON output produced by the step, or <c>null</c>.</param>
/// <param name="NextStepId">Next step to execute after this one, or <c>null</c>.</param>
/// <param name="NextScheduledAt">When the step is scheduled to resume (Delay / WaitForEvent), or <c>null</c>.</param>
/// <param name="StartedAt">When the step started executing.</param>
/// <param name="CompletedAt">When the step finished, or <c>null</c> if still in progress.</param>
public sealed record WorkflowStepRunSummary(
    [property: JsonPropertyName("step_id")] string StepId,
    [property: JsonPropertyName("kind")] string Kind,
    [property: JsonPropertyName("attempt_id")] int AttemptId,
    [property: JsonPropertyName("status")] string Status,
    [property: JsonPropertyName("outcome")] string? Outcome,
    [property: JsonPropertyName("notification_id")] Guid? NotificationId,
    [property: JsonPropertyName("output_json")] string? OutputJson,
    [property: JsonPropertyName("next_step_id")] string? NextStepId,
    [property: JsonPropertyName("next_scheduled_at")] DateTimeOffset? NextScheduledAt,
    [property: JsonPropertyName("started_at")] DateTimeOffset StartedAt,
    [property: JsonPropertyName("completed_at")] DateTimeOffset? CompletedAt);
