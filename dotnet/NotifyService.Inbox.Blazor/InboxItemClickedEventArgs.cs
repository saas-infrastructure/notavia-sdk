using System.Text.Json.Serialization;

namespace NotifyService.Inbox.Blazor;

/// <summary>Event arguments raised when the user clicks a notification item in the inbox.</summary>
/// <param name="Id">Identifier of the clicked notification.</param>
/// <param name="ActionUrl">Optional URL associated with the notification.</param>
/// <param name="Item">Full notification item that was clicked.</param>
public sealed record InboxItemClickedEventArgs(
    [property: JsonPropertyName("id")] string Id,
    [property: JsonPropertyName("actionUrl")] string? ActionUrl,
    [property: JsonPropertyName("item")] InboxItem Item);
