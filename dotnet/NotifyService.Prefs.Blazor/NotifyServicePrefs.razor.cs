using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace NotifyService.Prefs.Blazor;

/// <summary>
/// Mounts the NotifyService preference centre web component inside a Blazor-managed div
/// and bridges its custom events to <see cref="EventCallback{T}"/> parameters via JS interop.
/// </summary>
public partial class NotifyServicePrefs : ComponentBase, IAsyncDisposable
{
    [Inject] private IJSRuntime JS { get; set; } = null!;

    /// <summary>Publishable key identifying the tenant + environment.</summary>
    [Parameter, EditorRequired] public string PublishableKey { get; set; } = "";

    /// <summary>Delegated JWT minted by the customer's backend.</summary>
    [Parameter, EditorRequired] public string Token { get; set; } = "";

    /// <summary>Base URL of the NotifyService instance.</summary>
    [Parameter] public string BaseUrl { get; set; } = "https://api.notavia.saas-infrastructure.com";

    /// <summary>Visual layout of the embedded preference centre.</summary>
    [Parameter] public PrefsLayout Layout { get; set; } = PrefsLayout.Auto;

    /// <summary>Fires when the end-user changes a preference cell.</summary>
    [Parameter] public EventCallback<PreferenceCell> OnPrefsChanged { get; set; }

    /// <summary>Fires when the embeddable surfaces an error.</summary>
    [Parameter] public EventCallback<string> OnError { get; set; }

    private ElementReference _host;
    private DotNetObjectReference<NotifyServicePrefs>? _selfRef;
    private IJSObjectReference? _module;

    /// <inheritdoc />
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (!firstRender)
            return;

        _selfRef = DotNetObjectReference.Create(this);
        _module = await JS.InvokeAsync<IJSObjectReference>(
            "import",
            "./_content/NotifyService.Prefs.Blazor/notifyservice-prefs-blazor.js");

        await _module.InvokeVoidAsync(
            "mount",
            _host,
            _selfRef,
            new
            {
                publishableKey = PublishableKey,
                token = Token,
                baseUrl = BaseUrl,
                layout = Layout.ToString().ToLowerInvariant(),
            });
    }

    /// <summary>Invoked by the JS bridge when the end-user changes a preference cell.</summary>
    /// <param name="cell">The updated preference cell.</param>
    [JSInvokable]
    public Task NotifyPrefsChanged(PreferenceCell cell)
        => OnPrefsChanged.InvokeAsync(cell);

    /// <summary>Invoked by the JS bridge when the embeddable surfaces an error.</summary>
    /// <param name="message">Human-readable error message from the JS layer.</param>
    [JSInvokable]
    public Task NotifyError(string message)
        => OnError.InvokeAsync(message);

    /// <inheritdoc />
    public async ValueTask DisposeAsync()
    {
        try { if (_module is not null) await _module.InvokeVoidAsync("unmount", _host); }
        catch (JSDisconnectedException) { /* circuit gone */ }
        catch (Exception) { /* swallow */ }

        try { if (_module is not null) await _module.DisposeAsync(); } catch { /* swallow */ }
        _selfRef?.Dispose();
    }
}
