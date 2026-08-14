# NotifyService SDKs — .NET

This folder contains the hand-crafted .NET client libraries for the NotifyService API.

## Projects

- `NotifyService.Sdk/` — core SDK (NuGet: `NotifyService.Sdk`). Phase 1. Wraps the full REST API surface for sending and managing notifications. Targets `net8.0` and `net10.0`.
- `NotifyService.Sdk.Aspire/` — .NET Aspire integration component (NuGet: `NotifyService.Sdk.Aspire`). Targets `net8.0` and `net10.0`.
- `NotifyService.Inbox.Blazor/` — Razor component wrapping the `<notifyservice-inbox>` web component (NuGet: `NotifyService.Inbox.Blazor`). Phase 2. Targets `net8.0` and `net10.0`.
- `NotifyService.Prefs.Blazor/` — Razor component wrapping the `<notifyservice-prefs>` web component (NuGet: `NotifyService.Prefs.Blazor`). Phase 3 — preference centre. Targets `net8.0` and `net10.0`.
- `NotifyService.Sdk.AspNetCore/` — ASP.NET Core Minimal API integration (NuGet: `NotifyService.Sdk.AspNetCore`, `0.1.0-preview.1`). Phase 3 — webhooks. Provides `MapWebhookHandler` to register a verified webhook endpoint in one call. Targets `net8.0` and `net10.0`.

`NotifyService.Sdk` also ships `WebhookSignatures.Verify` (Phase 3, Installment 12) — a static helper for verifying HMAC-SHA256 Svix-style signatures when you want lower-level control than `MapWebhookHandler` provides.

## Build

```powershell
dotnet build NotifyService.slnx
```

## Pack (local nupkg for design-partner pilots)

```powershell
dotnet pack sdks/dotnet/NotifyService.Sdk              -c Release -o artifacts/nupkg
dotnet pack sdks/dotnet/NotifyService.Sdk.Aspire       -c Release -o artifacts/nupkg
dotnet pack sdks/dotnet/NotifyService.Sdk.AspNetCore   -c Release -o artifacts/nupkg
dotnet pack sdks/dotnet/NotifyService.Inbox.Blazor     -c Release -o artifacts/nupkg
dotnet pack sdks/dotnet/NotifyService.Prefs.Blazor     -c Release -o artifacts/nupkg
```

To install in a pilot project:

```powershell
dotnet nuget add source <abs-path-to-artifacts/nupkg> -n notifyservice-local
dotnet add package NotifyService.Sdk --prerelease
dotnet add package NotifyService.Sdk.AspNetCore --prerelease
dotnet add package NotifyService.Prefs.Blazor --prerelease
```

## Running tests

```powershell
dotnet test tests/NotifyService.Sdk.Tests        # unit
dotnet test tests/NotifyService.EndToEndTests    # includes SDK integration + e2e
```

## See also

- `samples/dotnet-quickstart/` — a runnable console that uses the SDK.
- `docs/build/specs/2026-05-26-phase-1-installment-7b-dotnet-sdk.md` — core SDK design spec.
- `docs/build/specs/2026-05-27-phase-3-installment-11-preference-centre.md` — Prefs.Blazor spec.
- `docs/build/specs/2026-05-27-phase-3-installment-12-webhooks-sms.md` — Webhooks + SMS spec; covers AspNetCore package design.
- `sdks/dotnet/NotifyService.Sdk.AspNetCore/README.md` — full usage guide for `MapWebhookHandler`.
