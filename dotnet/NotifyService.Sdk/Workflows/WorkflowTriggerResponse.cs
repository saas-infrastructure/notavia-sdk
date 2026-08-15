using System.Text.Json.Serialization;

namespace NotifyService.Sdk.Workflows;

/// <summary>Response from <c>POST /v1/workflows/{key}/trigger</c>.</summary>
/// <param name="RunId">Server-assigned id for the created workflow run.</param>
/// <param name="Status">Initial status of the run (e.g. <c>"Pending"</c>).</param>
public sealed record WorkflowTriggerResponse(
    [property: JsonPropertyName("run_id")] Guid RunId,
    [property: JsonPropertyName("status")] string Status);
