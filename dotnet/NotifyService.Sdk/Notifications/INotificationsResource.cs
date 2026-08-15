namespace NotifyService.Sdk.Notifications;

/// <summary>The <c>/v1/notifications</c> resource.</summary>
public interface INotificationsResource
{
    /// <summary>
    /// Send a notification. The server enqueues it and returns the resulting
    /// <see cref="NotificationResponse"/> with <c>Status = "queued"</c>.
    /// Supply <see cref="SendOptions.IdempotencyKey"/> to make retries safe.
    /// </summary>
    /// <param name="request">The send request.</param>
    /// <param name="options">Optional per-call options (e.g. idempotency key).</param>
    /// <param name="ct">Cancellation token.</param>
    Task<SendNotificationResult> SendAsync(
        SendNotificationRequest request,
        SendOptions? options = null,
        CancellationToken ct = default);

    /// <summary>Fetch a notification by id.</summary>
    /// <param name="id">Server-assigned notification id.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<NotificationResponse> GetAsync(Guid id, CancellationToken ct = default);

    /// <summary>List notifications in the current environment, newest first, paged by cursor.</summary>
    /// <param name="options">Optional filters and pagination.</param>
    /// <param name="ct">Cancellation token.</param>
    Task<NotificationPage> ListAsync(
        ListNotificationsOptions? options = null,
        CancellationToken ct = default);
}
