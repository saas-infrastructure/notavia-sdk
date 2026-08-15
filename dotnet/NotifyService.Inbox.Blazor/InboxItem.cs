using System.Text.Json;
using System.Text.Json.Serialization;

namespace NotifyService.Inbox.Blazor;

/// <summary>A single notification item returned by the inbox API.</summary>
/// <param name="Id">Unique identifier for the notification.</param>
/// <param name="Subject">Plain-text subject line.</param>
/// <param name="HtmlBody">Optional HTML body content.</param>
/// <param name="TextBody">Optional plain-text body content.</param>
/// <param name="ActionUrl">Optional URL the user is directed to on click.</param>
/// <param name="CreatedAt">UTC timestamp when the notification was created.</param>
/// <param name="ReadAt">UTC timestamp when the notification was read, or <see langword="null"/> if unread.</param>
/// <param name="Data">Optional arbitrary JSON payload attached to the notification.</param>
public sealed record InboxItem(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("subject")] string Subject,
    [property: JsonPropertyName("htmlBody")] string? HtmlBody,
    [property: JsonPropertyName("textBody")] string? TextBody,
    [property: JsonPropertyName("actionUrl")] string? ActionUrl,
    [property: JsonPropertyName("createdAt")] DateTimeOffset CreatedAt,
    [property: JsonPropertyName("readAt")] DateTimeOffset? ReadAt,
    [property: JsonPropertyName("data")] JsonElement? Data);
