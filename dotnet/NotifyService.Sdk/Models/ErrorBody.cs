using System.Text.Json.Serialization;

namespace NotifyService.Sdk;

/// <summary>Wire envelope around an <see cref="ErrorBody"/>.</summary>
public sealed record ErrorEnvelope([property: JsonPropertyName("error")] ErrorBody Error);

/// <summary>
/// Machine-readable error returned by NotifyService for every non-2xx
/// response. Matches the host's <c>ErrorEnvelope</c> shape.
/// </summary>
/// <param name="Type">Coarse error family, e.g. <c>invalid_request_error</c>, <c>authentication_error</c>.</param>
/// <param name="Code">Specific machine-readable code, e.g. <c>parameter_invalid</c>.</param>
/// <param name="Message">Human-readable description.</param>
/// <param name="Param">The offending request parameter, when applicable.</param>
public sealed record ErrorBody(
    string Type,
    string Code,
    string Message,
    string? Param);
