using System.Text.Json.Serialization;

namespace NotifyService.Sdk.Workflows;

/// <summary>Body of a <c>POST /v1/workflows/{key}/trigger</c> request.</summary>
/// <param name="TriggerData">Arbitrary trigger payload passed to the workflow. Must match the workflow's trigger-data schema if one is configured.</param>
public sealed record WorkflowTriggerRequest(
    [property: JsonPropertyName("trigger_data")] object TriggerData);
