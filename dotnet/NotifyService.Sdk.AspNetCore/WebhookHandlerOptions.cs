using System.Text.Json;

namespace NotifyService.Sdk.AspNetCore;

/// <summary>
/// Options for the <see cref="WebhookHandlerExtensions.MapWebhookHandler"/> endpoint.
/// </summary>
public sealed class WebhookHandlerOptions
{
    /// <summary>
    /// The endpoint signing secret from the NotifyService dashboard, optionally prefixed with <c>whsec_</c>.
    /// </summary>
    public required string SigningSecret { get; init; }

    /// <summary>
    /// Maximum age of the webhook timestamp. Defaults to 300 seconds when <c>null</c>.
    /// </summary>
    public TimeSpan? Tolerance { get; init; }

    /// <summary>
    /// Invoked for every verified event, regardless of type.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnEvent { get; init; }

    /// <summary>
    /// Invoked when <c>notification.sent</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationSent { get; init; }

    /// <summary>
    /// Invoked when <c>notification.delivered</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationDelivered { get; init; }

    /// <summary>
    /// Invoked when <c>notification.failed</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationFailed { get; init; }

    /// <summary>
    /// Invoked when <c>notification.read</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationRead { get; init; }

    /// <summary>
    /// Invoked when <c>notification.suppressed</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationSuppressed { get; init; }

    /// <summary>
    /// Invoked when <c>notification.bounced</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationBounced { get; init; }

    /// <summary>
    /// Invoked when <c>notification.complained</c> is received.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnNotificationComplained { get; init; }

    /// <summary>
    /// Invoked when <c>provider.critical</c> is received — one of your email providers is
    /// failing your sends right now. Pro plans and above.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnProviderCritical { get; init; }

    /// <summary>
    /// Invoked when <c>provider.recovered</c> is received — that provider is delivering again.
    /// Pro plans and above.
    /// </summary>
    public Func<NotifyWebhookEvent<JsonElement>, CancellationToken, Task>? OnProviderRecovered { get; init; }
}
