namespace NotifyService.Inbox.Blazor;

/// <summary>Event arguments raised when the inbox SignalR connection is lost.</summary>
/// <param name="Reason">Human-readable reason for the disconnection.</param>
public sealed record InboxDisconnectedEventArgs(string Reason);
