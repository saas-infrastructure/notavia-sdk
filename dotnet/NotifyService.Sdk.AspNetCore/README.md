# Notavia.Sdk.AspNetCore

ASP.NET Core Minimal API integration for receiving signed webhook events from NotifyService.
Provides `MapWebhookHandler` — a single call that registers a POST endpoint, verifies the
HMAC-SHA256 signature on every request, and dispatches to your per-event callbacks.

Version: `0.1.0-preview.1`. Targets `net8.0` and `net10.0`.

## Install

```powershell
dotnet add package Notavia.Sdk.AspNetCore --prerelease
```

Requires `NotifyService.Sdk` (pulled in automatically as a dependency).

## Quick start

```csharp
using NotifyService.Sdk.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapWebhookHandler("/webhooks/notify", new WebhookHandlerOptions
{
    SigningSecret = builder.Configuration["NotifyService:WebhookSecret"]!,

    OnNotificationSent = (evt, ct) =>
    {
        Console.WriteLine($"Sent: {evt.Id}  type={evt.Type}");
        return Task.CompletedTask;
    },

    OnNotificationFailed = (evt, ct) =>
    {
        Console.WriteLine($"Failed: {evt.Id}");
        return Task.CompletedTask;
    },
});

app.Run();
```

## Configuration

Get the signing secret from the NotifyService dashboard under **Settings → Webhooks → Signing secret**.
Store it in user-secrets or an environment variable — never hard-code it.

```powershell
dotnet user-secrets set "NotifyService:WebhookSecret" "whsec_YOUR_SECRET"
```

The secret may be provided as raw base64url or with the `whsec_` prefix — both forms are accepted.

## WebhookHandlerOptions reference

| Property | Type | Required | Description |
|---|---|---|---|
| `SigningSecret` | `string` | Yes | Endpoint signing secret from the dashboard. |
| `Tolerance` | `TimeSpan?` | No | Maximum age of the webhook timestamp. Defaults to 300 s (5 min). |
| `OnEvent` | callback | No | Fires for **every** verified event before the type-specific callback. Useful for logging or audit. |
| `OnNotificationSent` | callback | No | Fires when `notification.sent` is received. |
| `OnNotificationDelivered` | callback | No | Fires when `notification.delivered` is received. |
| `OnNotificationFailed` | callback | No | Fires when `notification.failed` is received. |
| `OnNotificationRead` | callback | No | Fires when `notification.read` is received. |
| `OnNotificationSuppressed` | callback | No | Fires when `notification.suppressed` is received. |
| `OnNotificationBounced` | callback | No | Fires when `notification.bounced` is received. |
| `OnNotificationComplained` | callback | No | Fires when `notification.complained` is received. |
| `OnProviderCritical` | callback | No | Fires when `provider.critical` is received — an email provider is failing your sends. Pro and above. |
| `OnProviderRecovered` | callback | No | Fires when `provider.recovered` is received. Pro and above. |

All callbacks have the signature `Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>`.
`JsonElement` is the raw payload — deserialize to a typed model as needed.

An event type with no matching callback is still verified and still passed to `OnEvent`; it
is never an error. New event types can therefore be added without breaking your handler.

## Event types

| Event type string | When it fires |
|---|---|
| `notification.sent` | The notification was accepted and queued for delivery. |
| `notification.delivered` | The channel provider confirmed delivery (email open/click or SMS delivery receipt). |
| `notification.failed` | All delivery attempts exhausted; the notification will not be retried. |
| `notification.read` | An inbox notification was marked read by the end-user. |
| `notification.suppressed` | Delivery was skipped because the end-user's preference suppresses this category/channel. |
| `notification.bounced` | Hard or soft bounce. The recipient is auto-suppressed on a hard bounce. |
| `notification.complained` | The recipient marked it as spam. Auto-suppressed. |
| `provider.critical` | One of your email providers is failing your sends **right now**. Pro and above. |
| `provider.recovered` | That provider is delivering again. Pro and above. |

## Paging on a provider outage

`provider.critical` is the machine-readable half of provider alerting — wire it to your pager
and you will know a provider is down before your users tell you.

```csharp
app.MapWebhookHandler("/webhooks/notify", new WebhookHandlerOptions
{
    SigningSecret = builder.Configuration["Notify:WebhookSecret"]!,
    OnProviderCritical = async (evt, ct) =>
    {
        ProviderAlert alert = evt.Data.Deserialize<ProviderAlert>()!;
        await pager.PageAsync(
            dedupeKey: evt.Id,
            title: $"{alert.Provider} is failing {alert.FailureRate}% of our {alert.Environment} mail",
            ct);
    },
    OnProviderRecovered = async (evt, ct) =>
    {
        ProviderAlert alert = evt.Data.Deserialize<ProviderAlert>()!;
        await pager.ResolveAsync(title: $"{alert.Provider} recovered", ct);
    },
});

public sealed record ProviderAlert(
    [property: JsonPropertyName("provider")] string Provider,
    [property: JsonPropertyName("environment")] string Environment,
    [property: JsonPropertyName("messages")] long Messages,
    [property: JsonPropertyName("failed_messages")] long FailedMessages,
    [property: JsonPropertyName("failure_rate")] double FailureRate,
    [property: JsonPropertyName("firing_since")] DateTimeOffset? FiringSince);
```

Two things worth knowing:

- **`messages` and `failed_messages` count distinct messages, not delivery attempts.** A single
  message the provider retried three times is one failed message, not three.
- **Dedupe on `evt.Id`.** It is stable for the life of one outage, so a retried webhook delivery
  carries the same id and will not page you twice for the same incident. A new outage on the
  same provider gets a new id.

## HTTP response codes

| Code | Meaning |
|---|---|
| `200 OK` | Signature valid; all callbacks invoked. |
| `401 Unauthorized` | `NotifyService-Signature` header is missing or the HMAC check failed. |
| `400 Bad Request` | Signature valid but the body is not valid JSON. |

## Receiving all events in one handler

Use `OnEvent` when you want a single callback regardless of type:

```csharp
app.MapWebhookHandler("/webhooks/notify", new WebhookHandlerOptions
{
    SigningSecret = config["NotifyService:WebhookSecret"]!,

    OnEvent = (evt, ct) =>
    {
        logger.LogInformation("Webhook received: {Type} id={Id}", evt.Type, evt.Id);
        return Task.CompletedTask;
    },
});
```

`OnEvent` and type-specific callbacks are not mutually exclusive — both fire when both are set.

## Error handling in callbacks

Exceptions thrown inside a callback propagate to ASP.NET Core's exception-handling pipeline.
Wrap your callback body in a try/catch or use the standard `app.UseExceptionHandler` middleware
if you want to suppress errors and still return `200 OK` to NotifyService.

NotifyService retries delivery when it receives a non-`2xx` response, so returning `200 OK` after
logging an error is the correct recovery pattern for transient processing failures.

## Low-level signature verification

If you need to verify signatures outside of `MapWebhookHandler` (e.g., in a controller or
middleware), use `WebhookSignatures.Verify` from `NotifyService.Sdk` directly:

```csharp
using NotifyService.Sdk;

bool valid = WebhookSignatures.Verify(
    rawBody: rawBodyString,
    signatureHeader: request.Headers["NotifyService-Signature"].ToString(),
    signingSecret: config["NotifyService:WebhookSecret"]!);
```

## License

MIT.
