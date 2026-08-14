# Notavia.Inbox.Blazor

Razor component that mounts the `<notifyservice-inbox>` web component inside a Blazor-managed `<div>` and bridges its custom events to `EventCallback<T>` parameters via `IJSObjectReference`. Works in Blazor Server and Blazor WebAssembly.

## Install

```bash
dotnet add package Notavia.Inbox.Blazor --prerelease
```

## Quickstart

```razor
@page "/dashboard"
@using NotifyService.Inbox.Blazor

<NotifyServiceInbox
    PublishableKey="@_pk"
    Token="@_token"
    Variant="InboxVariant.Bell"
    Theme="InboxTheme.Light"
    RefreshToken="GetTokenAsync"
    OnItemClick="HandleClick"
    OnUnreadCountChanged="HandleUnreadCount" />

@code {
    string _pk = "pk_test_…";
    string _token = "";

    protected override async Task OnInitializedAsync()
        => _token = await GetTokenAsync();

    Task<string> GetTokenAsync()
        => /* call your backend endpoint that mints the delegated JWT */;

    Task HandleClick(InboxItemClickedEventArgs e)
    {
        if (e.ActionUrl is not null)
            NavigationManager.NavigateTo(e.ActionUrl);
        return Task.CompletedTask;
    }

    void HandleUnreadCount(int count)
        => Console.WriteLine($"Unread: {count}");
}
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `PublishableKey` | `string` | Yes | — | Tenant + environment identifier. Begins with `pk_live_` or `pk_test_`. |
| `Token` | `string` | Yes | — | Delegated JWT minted by your backend. Updated via `setToken` on the JS handle when it changes between renders. |
| `BaseUrl` | `string` | No | `"https://api.notavia.saas-infrastructure.com"` | Override for self-hosted or staging environments. |
| `Variant` | `InboxVariant` | No | `InboxVariant.Bell` | Visual presentation: `Bell`, `Panel`, or `List`. |
| `Theme` | `InboxTheme` | No | `InboxTheme.Light` | Color theme: `Light` or `Dark`. |
| `RefreshToken` | `Func<Task<string>>?` | No | `null` | Async callback invoked by the web component to obtain a fresh JWT. Bridged to the JS layer via `[JSInvokable]`. |
| `OnItemClick` | `EventCallback<InboxItemClickedEventArgs>` | No | — | Fires when the user clicks an inbox item. See `InboxItemClickedEventArgs`. |
| `OnConnected` | `EventCallback` | No | — | Fires when the SignalR hub connection establishes. |
| `OnDisconnected` | `EventCallback<InboxDisconnectedEventArgs>` | No | — | Fires when the hub connection drops. See `InboxDisconnectedEventArgs`. |
| `OnError` | `EventCallback<InboxErrorEventArgs>` | No | — | Fires when the embeddable surfaces an unrecoverable error. See `InboxErrorEventArgs`. |
| `OnUnreadCountChanged` | `EventCallback<int>` | No | — | Fires whenever the unread count changes (optimistic, push, or REST). |

### Event args types

**`InboxItemClickedEventArgs`** — `record(string Id, string? ActionUrl, InboxItem Item)`

**`InboxDisconnectedEventArgs`** — `record(string Reason)` — reason is `"manual"`, `"auth"`, or `"transport"`.

**`InboxErrorEventArgs`** — `record(Exception Error)` — the `Error` is an `InvalidOperationException` wrapping the JS error message.

**`InboxItem`** — `record(string Id, string Subject, string? HtmlBody, string? TextBody, string? ActionUrl, DateTimeOffset CreatedAt, DateTimeOffset? ReadAt, JsonElement? Data)`

## How it works

On first render (`OnAfterRenderAsync(firstRender: true)`) the component imports a collocated JS module (`notifyservice-inbox-blazor.js`) via `IJSObjectReference`. That module:

1. Registers the `notifyservice-inbox` custom element (if not already registered).
2. Creates a `<notifyservice-inbox>` element inside the Blazor-managed mount `<div>`.
3. Attaches listeners for `notify-item-click`, `notify-connected`, `notify-disconnected`, `notify-error`, and `notify-unread-count-changed`.
4. On each event, calls a `[JSInvokable]` method on the component's `DotNetObjectReference`, which invokes the corresponding `EventCallback<T>`.

When `Token` changes between renders, `setToken` is called on the JS handle to update the web component without remounting.

## Theming

The component renders a standard HTML element — the same CSS custom properties as the web component apply. Add them to your host page stylesheet:

```css
notifyservice-inbox {
  --notify-color-primary: #ec4899;  /* your brand color */
  --notify-radius: 4px;
  --notify-font-family: "Inter", sans-serif;
}
```

See the `notifyservice-inbox` package README for the full list of nine CSS custom properties and their defaults.

## Disposal

The component implements `IAsyncDisposable`. Blazor's circuit infrastructure invokes `DisposeAsync` on circuit teardown (Blazor Server) or when the component is removed from the render tree (Blazor WebAssembly).

`DisposeAsync` calls `dispose()` on the JS handle to stop the SignalR connection and clean up event listeners, then disposes the `IJSObjectReference` handles and the `DotNetObjectReference`. `JSDisconnectedException` (circuit already gone) is caught and swallowed — no exception will escape `DisposeAsync`.

## Target frameworks

`net8.0` and `net10.0`. Compatible with Blazor Server and Blazor WebAssembly on both target frameworks.

## License

MIT.
