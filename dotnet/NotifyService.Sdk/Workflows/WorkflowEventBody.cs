using System.Text.Json.Serialization;

namespace NotifyService.Sdk.Workflows;

internal sealed record WorkflowEventBody(
    [property: JsonPropertyName("event")] string Event,
    [property: JsonPropertyName("data")] object Data);
