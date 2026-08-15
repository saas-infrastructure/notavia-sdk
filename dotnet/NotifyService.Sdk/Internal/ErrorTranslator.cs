using System.Net.Http.Json;

namespace NotifyService.Sdk.Internal;

internal static class ErrorTranslator
{
    public static async Task ThrowAsync(HttpResponseMessage response, CancellationToken ct)
    {
        string? requestId = response.Headers.TryGetValues("X-Request-Id", out var ids)
            ? ids.FirstOrDefault()
            : null;

        ErrorBody body;
        try
        {
            ErrorEnvelope? envelope = await response.Content.ReadFromJsonAsync(
                NotifyJsonContext.Default.ErrorEnvelope, ct);
            body = envelope?.Error ?? Synthesize(response, raw: "");
        }
        catch
        {
            string raw = await response.Content.ReadAsStringAsync(ct);
            body = Synthesize(response, raw);
        }

        throw new NotifyApiException((int)response.StatusCode, body, requestId);
    }

    private static ErrorBody Synthesize(HttpResponseMessage r, string raw) =>
        new("transport_error",
            "unparsable_response",
            string.IsNullOrEmpty(raw)
                ? r.ReasonPhrase ?? "no body"
                : raw.Substring(0, Math.Min(raw.Length, 512)),
            null);
}
