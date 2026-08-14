namespace NotifyService.Sdk;

/// <summary>
/// Thrown for every non-2xx response from the NotifyService API.
/// Carries the parsed <see cref="ErrorBody"/>, HTTP status code, and
/// the server's <c>X-Request-Id</c> header (if present).
/// </summary>
public sealed class NotifyApiException : Exception
{
    /// <summary>HTTP status code of the failed response.</summary>
    public int StatusCode { get; }

    /// <summary>Structured error returned by the API.</summary>
    public ErrorBody Error { get; }

    /// <summary>Value of the <c>X-Request-Id</c> response header, if set.</summary>
    public string? RequestId { get; }

    /// <summary>Creates a new <see cref="NotifyApiException"/>.</summary>
    /// <param name="statusCode">HTTP status code.</param>
    /// <param name="error">Parsed error body.</param>
    /// <param name="requestId">Server's request id, if present.</param>
    public NotifyApiException(int statusCode, ErrorBody error, string? requestId)
        : base($"NotifyService API error {statusCode} ({error.Code}): {error.Message}")
    {
        StatusCode = statusCode;
        Error = error;
        RequestId = requestId;
    }
}
