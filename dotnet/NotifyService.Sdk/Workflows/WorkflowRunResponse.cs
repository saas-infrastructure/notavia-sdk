using System.Text.Json.Serialization;

namespace NotifyService.Sdk.Workflows;

/// <summary>Full representation of a workflow run returned by <c>GET /v1/workflows/runs/{runId}</c>.</summary>
/// <param name="Id">Server-assigned run id.</param>
/// <param name="WorkflowKey">Stable key of the workflow that was triggered.</param>
/// <param name="Version">Version number of the workflow definition used for this run.</param>
/// <param name="Status">Current run status (<c>"Pending"</c>, <c>"Running"</c>, <c>"Waiting"</c>, <c>"Completed"</c>, <c>"Failed"</c>, <c>"Cancelling"</c>, <c>"Cancelled"</c>).</param>
/// <param name="CurrentStepId">Id of the step currently executing or waiting, or <c>null</c> when the run has ended.</param>
/// <param name="TriggerData">JSON string of the trigger payload supplied when the run was started.</param>
/// <param name="Source">Trigger source (<c>"Production"</c>, <c>"Dashboard"</c>, etc.).</param>
/// <param name="CreatedAt">When the run was created.</param>
/// <param name="CompletedAt">When the run reached a terminal state, or <c>null</c> if still in progress.</param>
/// <param name="FailureReason">Human-readable failure message, or <c>null</c>.</param>
/// <param name="Steps">Ordered list of step executions so far.</param>
public sealed record WorkflowRunResponse(
    [property: JsonPropertyName("id")] Guid Id,
    [property: JsonPropertyName("workflow_key")] string WorkflowKey,
    [property: JsonPropertyName("version")] int Version,
    [property: JsonPropertyName("status")] string Status,
    [property: JsonPropertyName("current_step_id")] string? CurrentStepId,
    [property: JsonPropertyName("trigger_data")] string TriggerData,
    [property: JsonPropertyName("source")] string Source,
    [property: JsonPropertyName("created_at")] DateTimeOffset CreatedAt,
    [property: JsonPropertyName("completed_at")] DateTimeOffset? CompletedAt,
    [property: JsonPropertyName("failure_reason")] string? FailureReason,
    [property: JsonPropertyName("steps")] IReadOnlyList<WorkflowStepRunSummary> Steps);
