# Notavia.Prefs.Blazor

Razor component that mounts the `<notifyservice-prefs>` web component inside a Blazor-managed `<div>` and bridges its custom events to `EventCallback<T>` parameters via `IJSObjectReference`. Works in Blazor Server and Blazor WebAssembly.

## Install

```bash
dotnet add package Notavia.Prefs.Blazor
```

## Quickstart

```razor
@page "/account/notifications"
@using NotifyService.Prefs.Blazor

<NotifyServicePrefs
    PublishableKey="@_pk"
    Token="@_token"
    Layout="PrefsLayout.Auto"
    OnPrefsChanged="HandlePrefsChanged"
    OnError="HandleError" />

@code {
    string _pk = "npk_test_…";
    string _token = "";

    protected override async Task OnInitializedAsync()
        => _token = await GetTokenAsync();

    Task GetTokenAsync()
        => /* call your backend endpoint that mints the delegated JWT with scope "prefs" */;

    Task HandlePrefsChanged(PreferenceCell cell)
    {
        Console.WriteLine($"Pref changed: {cell.CategoryKey}/{cell.Channel} opted={cell.OptedIn}");
        return Task.CompletedTask;
    }

    Task HandleError(string message)
    {
        Console.WriteLine($"Prefs error: {message}");
        return Task.CompletedTask;
    }
}
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `PublishableKey` | `string` | Yes | — | Tenant + environment identifier. Begins with `npk_live_` or `npk_test_`. |
| `Token` | `string` | Yes | — | Delegated JWT minted by your backend. Must carry `scope: "prefs"` or `scope: "inbox prefs"`. |
| `BaseUrl` | `string` | No | `"https://api.notavia.saas-infrastructure.com"` | Override for self-hosted or staging environments. |
| `Layout` | `PrefsLayout` | No | `PrefsLayout.Auto` | Visual presentation: `Auto`, `Table`, or `Cards`. |
| `OnPrefsChanged` | `EventCallback<PreferenceCell>` | No | — | Fires when the user toggles a preference. |
| `OnError` | `EventCallback<string>` | No | — | Fires when the embeddable surfaces an unrecoverable error. |

## JWT scope requirement

The delegated JWT minted by your backend must carry `scope: "prefs"`. If the same token is reused
for the inbox widget, use `scope: "inbox prefs"` (space-separated).

```csharp
// Example using the NotifyService .NET SDK token minter
var token = _tokenMinter.Mint(new UnsubscribeTokenClaims(
    externalUserId: currentUser.Id,
    organizationId: organization.Id,
    scope: "prefs"
));
```

Pass the resulting JWT string as the `Token` parameter. Set up an API endpoint that returns a
fresh token and wire it to `refreshToken` via the JS interop layer — or, for Blazor Server, simply
call `StateHasChanged()` with an updated token when the underlying session refreshes.

## How it works

On first render (`OnAfterRenderAsync(firstRender: true)`) the component imports a collocated JS
module (`notifyservice-prefs-blazor.js`) via `IJSObjectReference`. That module imports the
`<notifyservice-prefs>` custom element from the vendored UMD bundle, mounts it inside the
Blazor-managed `<div>`, and wires custom events to `[JSInvokable]` methods on the component's
`DotNetObjectReference`.

## Target frameworks

`net8.0` and `net10.0`. Compatible with Blazor Server and Blazor WebAssembly on both target frameworks.

## License

MIT.
