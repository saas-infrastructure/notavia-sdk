using System.Net;
using NotifyService.Sdk.Internal;

namespace NotifyService.Sdk.Notifications;

internal sealed class NotificationsResource : INotificationsResource
{
    private readonly NotifyHttpClient _http;

    public NotificationsResource(NotifyHttpClient http)
    {
        _http = http;
    }

    public async Task<SendNotificationResult> SendAsync(
        SendNotificationRequest request,
        SendOptions? options = null,
        CancellationToken ct = default)
    {
        Dictionary<string, string>? headers = null;
        if (!string.IsNullOrEmpty(options?.IdempotencyKey))
        {
            headers = new Dictionary<string, string> { ["Idempotency-Key"] = options.IdempotencyKey };
        }

        SendNotificationRequest flattenedRequest = request with
        {
            Recipient = RecipientFlattener.FlattenForChannel(request.Channel, request.Recipient),
        };

        (HttpResponseMessage response, NotificationResponse body) = await _http.PostAsync(
            "/v1/notifications",
            flattenedRequest,
            NotifyJsonContext.Default.SendNotificationRequest,
            NotifyJsonContext.Default.NotificationResponse,
            headers,
            "notifyservice.notifications.send",
            ct);

        bool wasReplayed = response.StatusCode == HttpStatusCode.OK;
        response.Dispose();
        return new SendNotificationResult(body, wasReplayed);
    }

    public Task<NotificationResponse> GetAsync(Guid id, CancellationToken ct = default) =>
        _http.GetAsync(
            $"/v1/notifications/{id}",
            NotifyJsonContext.Default.NotificationResponse,
            "notifyservice.notifications.get",
            ct);

    public Task<NotificationPage> ListAsync(
        ListNotificationsOptions? options = null,
        CancellationToken ct = default)
    {
        ListNotificationsOptions o = options ?? new ListNotificationsOptions();
        string query = BuildQuery(o);
        return _http.GetAsync(
            $"/v1/notifications{query}",
            NotifyJsonContext.Default.NotificationPage,
            "notifyservice.notifications.list",
            ct);
    }

    private static string BuildQuery(ListNotificationsOptions o)
    {
        var sb = new System.Text.StringBuilder();
        void Append(string name, string? value)
        {
            if (string.IsNullOrEmpty(value)) return;
            sb.Append(sb.Length == 0 ? '?' : '&');
            sb.Append(name).Append('=').Append(WebUtility.UrlEncode(value));
        }
        Append("status", o.Status);
        Append("recipient", o.Recipient);
        Append("created_after", o.CreatedAfter?.ToString("O"));
        Append("created_before", o.CreatedBefore?.ToString("O"));
        Append("limit", o.Limit.ToString());
        Append("cursor", o.Cursor);
        return sb.ToString();
    }
}
