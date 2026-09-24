namespace NotifyService.Inbox.Blazor;

/// <summary>Controls the visual presentation of the inbox widget.</summary>
public enum InboxVariant
{
    /// <summary>A bell icon that opens a notification popover.</summary>
    Bell,

    /// <summary>A slide-in side panel.</summary>
    Panel,

    /// <summary>An inline flat list.</summary>
    List,
}
