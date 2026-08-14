using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace NotifyService.Sdk.AspNetCore;

/// <summary>
/// Extension methods that register a NotifyService webhook handler as a Minimal API endpoint.
/// </summary>
public static class WebhookHandlerExtensions
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
    };

    /// <summary>
    /// Maps a POST endpoint at <paramref name="pattern"/> that verifies incoming NotifyService
    /// webhook signatures and dispatches to the callbacks configured in <paramref name="options"/>.
    /// </summary>
    /// <param name="app">The endpoint route builder.</param>
    /// <param name="pattern">The route pattern, e.g. <c>"/webhooks/notify"</c>.</param>
    /// <param name="options">Signing secret, tolerance, and per-event callbacks.</param>
    /// <returns>The same <paramref name="app"/> for chaining.</returns>
    public static IEndpointRouteBuilder MapWebhookHandler(
        this IEndpointRouteBuilder app,
        string pattern,
        WebhookHandlerOptions options)
    {
        app.MapPost(pattern, async (HttpRequest req, CancellationToken ct) =>
        {
            req.EnableBuffering();
            using var reader = new System.IO.StreamReader(req.Body, leaveOpen: true);
            string rawBody = await reader.ReadToEndAsync(ct);
            req.Body.Position = 0;

            if (!req.Headers.TryGetValue("NotifyService-Signature", out var sig))
                return Results.Unauthorized();

            if (!WebhookSignatures.Verify(rawBody, sig.ToString(), options.SigningSecret, options.Tolerance))
                return Results.Unauthorized();

            NotifyWebhookEvent<JsonElement>? evt;
            try
            {
                evt = JsonSerializer.Deserialize<NotifyWebhookEvent<JsonElement>>(rawBody, JsonOptions);
            }
            catch (JsonException)
            {
                return Results.BadRequest();
            }

            if (evt is null)
                return Results.BadRequest();

            if (options.OnEvent is not null)
                await options.OnEvent(evt, ct);

            Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? specific = evt.Type switch
            {
                "notification.sent" => options.OnNotificationSent,
                "notification.delivered" => options.OnNotificationDelivered,
                "notification.failed" => options.OnNotificationFailed,
                "notification.read" => options.OnNotificationRead,
                "notification.suppressed" => options.OnNotificationSuppressed,
                "notification.bounced" => options.OnNotificationBounced,
                "notification.complained" => options.OnNotificationComplained,
                "provider.critical" => options.OnProviderCritical,
                "provider.recovered" => options.OnProviderRecovered,
                _ => null,
            };

            if (specific is not null)
                await specific(evt, ct);

            return Results.Ok();
        });

        return app;
    }
}
