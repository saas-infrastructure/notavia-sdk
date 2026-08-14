using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace NotifyService.Inbox.Blazor;

/// <summary>
/// Mounts the NotifyService inbox web component inside a Blazor-managed div and
/// bridges its custom events to <see cref="EventCallback{T}"/> parameters via JS interop.
/// </summary>
public partial class NotifyServiceInbox : ComponentBase, IAsyncDisposable
{
    [Inject] private IJSRuntime JS { get; set; } = null!;

    /// <summary>Publishable key identifying the tenant + environment.</summary>
    [Parameter, EditorRequired] public string PublishableKey { get; set; } = "";

    /// <summary>Delegated JWT minted by the customer's backend.</summary>
    [Parameter, EditorRequired] public string Token { get; set; } = "";

    /// <summary>Base URL of the NotifyService instance.</summary>
    [Parameter] public string BaseUrl { get; set; } = "https://api.notavia.saas-infrastructure.com";

    /// <summary>Visual variant of the embedded inbox.</summary>
    [Parameter] public InboxVariant Variant { get; set; } = InboxVariant.Bell;

    /// <summary>Color theme applied via CSS custom properties.</summary>
    [Parameter] public InboxTheme Theme { get; set; } = InboxTheme.Light;

    /// <summary>Optional callback the component invokes to fetch a fresh JWT.</summary>
    [Parameter] public Func<Task<string>>? RefreshToken { get; set; }

    /// <summary>Fires when the end-user clicks an inbox item.</summary>
    [Parameter] public EventCallback<InboxItemClickedEventArgs> OnItemClick { get; set; }

    /// <summary>Fires when the real-time connection establishes.</summary>
    [Parameter] public EventCallback OnConnected { get; set; }

    /// <summary>Fires when the real-time connection drops.</summary>
    [Parameter] public EventCallback<InboxDisconnectedEventArgs> OnDisconnected { get; set; }

    /// <summary>Fires when the embeddable surfaces an error.</summary>
    [Parameter] public EventCallback<InboxErrorEventArgs> OnError { get; set; }

    /// <summary>Fires whenever the unread count changes (REST result or push).</summary>
    [Parameter] public EventCallback<int> OnUnreadCountChanged { get; set; }

    private ElementReference _mountElement;
    private readonly string _id = $"notifyservice-inbox-{Guid.NewGuid():N}";
    private DotNetObjectReference<NotifyServiceInbox>? _selfRef;
    private IJSObjectReference? _module;
    private IJSObjectReference? _handle;
    private string? _lastToken;

    /// <inheritdoc />
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _selfRef = DotNetObjectReference.Create(this);
            _module = await JS.InvokeAsync<IJSObjectReference>(
                "import",
                "./_content/NotifyService.Inbox.Blazor/notifyservice-inbox-blazor.js");
            _handle = await _module.InvokeAsync<IJSObjectReference>(
                "mount",
                _mountElement,
                new
                {
                    publishableKey = PublishableKey,
                    token = Token,
                    baseUrl = BaseUrl,
                    variant = Variant.ToString().ToLowerInvariant(),
                    theme = Theme.ToString().ToLowerInvariant(),
                    refreshToken = RefreshToken is not null,
                },
                _selfRef);
            _lastToken = Token;
        }
        else if (_handle is not null && Token != _lastToken)
        {
            await _handle.InvokeVoidAsync("setToken", Token);
            _lastToken = Token;
        }
    }

    /// <summary>Invoked by the JS bridge to fetch a fresh JWT.</summary>
    [JSInvokable]
    public Task<string> InvokeRefreshTokenAsync()
        => RefreshToken is null ? Task.FromResult(string.Empty) : RefreshToken();

    /// <summary>Invoked by the JS bridge when the end-user clicks an inbox item.</summary>
    /// <param name="args">The click event arguments.</param>
    [JSInvokable]
    public Task OnItemClickJs(InboxItemClickedEventArgs args)
        => OnItemClick.InvokeAsync(args);

    /// <summary>Invoked by the JS bridge when the real-time connection establishes.</summary>
    /// <param name="_">Unused payload placeholder for the JS event.</param>
    [JSInvokable]
    public Task OnConnectedJs(object? _)
        => OnConnected.InvokeAsync();

    /// <summary>Invoked by the JS bridge when the real-time connection drops.</summary>
    /// <param name="reason">Disconnect reason string forwarded from the JS event detail.</param>
    [JSInvokable]
    public Task OnDisconnectedJs(string reason)
        => OnDisconnected.InvokeAsync(new InboxDisconnectedEventArgs(reason));

    /// <summary>Invoked by the JS bridge when the embeddable surfaces an error.</summary>
    /// <param name="message">Human-readable error message from the JS layer.</param>
    [JSInvokable]
    public Task OnErrorJs(string message)
        => OnError.InvokeAsync(new InboxErrorEventArgs(new InvalidOperationException(message)));

    /// <summary>Invoked by the JS bridge whenever the unread count changes.</summary>
    /// <param name="count">Latest unread count.</param>
    [JSInvokable]
    public Task OnUnreadCountChangedJs(int count)
        => OnUnreadCountChanged.InvokeAsync(count);

    /// <inheritdoc />
    public async ValueTask DisposeAsync()
    {
        try { if (_handle is not null) await _handle.InvokeVoidAsync("dispose"); }
        catch (JSDisconnectedException) { /* circuit gone */ }
        catch (Exception) { /* swallow */ }

        try { if (_handle is not null) await _handle.DisposeAsync(); } catch { /* swallow */ }
        try { if (_module is not null) await _module.DisposeAsync(); } catch { /* swallow */ }
        _selfRef?.Dispose();
    }
}
