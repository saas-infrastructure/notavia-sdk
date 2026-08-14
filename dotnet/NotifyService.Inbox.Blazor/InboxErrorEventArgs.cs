namespace NotifyService.Inbox.Blazor;

/// <summary>Event arguments raised when the inbox encounters an unrecoverable error.</summary>
/// <param name="Error">The exception that describes the error.</param>
public sealed record InboxErrorEventArgs(Exception Error);
