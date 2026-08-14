# NotifyService SDKs — TypeScript

This folder contains the hand-crafted TypeScript client libraries for the NotifyService API.

## Projects

- `notifyservice-sdk/` — core SDK (npm: `@notavia/sdk`). Phase 1. Wraps the full REST API surface for sending and managing notifications.
- `notifyservice-inbox-client/` — headless Phase 2 inbox client (npm: `@notavia/inbox-client`). SignalR connection, feed, mark-read, unread count.
- `notifyservice-inbox/` — `<notifyservice-inbox>` Lit web component (npm: `@notavia/inbox`). Drop-in embeddable inbox feed, fully themeable. Phase 2.
- `notifyservice-prefs-client/` — headless Phase 3 preference centre client (npm: `@notavia/prefs-client`). REST calls to `/inbox/v1/preferences/*`, token lifecycle, typed event bus.
- `notifyservice-prefs/` — `<notifyservice-prefs>` Lit web component (npm: `@notavia/prefs`). Drop-in embeddable preference centre, table + cards layouts, CSS custom properties. Phase 3.

`notifyservice-sdk` also exposes a `/webhooks` deep-import subpath (Phase 3, Installment 12):

```typescript
import { verifyWebhookSignature } from "notifyservice-sdk/webhooks";
```

Use `verifyWebhookSignature` server-side to verify the `Notify-Signature` header on incoming webhook requests before processing the payload. Never call it in the browser — the signing secret must stay on the server.

## Build

```powershell
npm install --prefix sdks/typescript/notifyservice-sdk
npm run build --prefix sdks/typescript/notifyservice-sdk
```

## Pack (local tarball for design-partner pilots)

```powershell
Set-Location sdks/typescript/notifyservice-sdk
npm pack --pack-destination ../../../artifacts/npm
```

Output: `artifacts/npm/notifyservice-sdk-0.1.0-preview.1.tgz`.

To install in a pilot project:

```powershell
npm install file:/abs/path/to/artifacts/npm/notifyservice-sdk-0.1.0-preview.1.tgz
```

## Tests

```powershell
npm test --prefix sdks/typescript/notifyservice-sdk              # core SDK unit (vitest)
npm test --prefix sdks/typescript/notifyservice-inbox-client     # inbox client unit (vitest)
npm test --prefix sdks/typescript/notifyservice-inbox            # inbox web component (vitest)
npm test --prefix sdks/typescript/notifyservice-prefs-client     # prefs client unit (vitest)
npm test --prefix sdks/typescript/notifyservice-prefs            # prefs web component (vitest)
dotnet test tests/NotifyService.EndToEndTests                    # includes TS SDK e2e (spawns Node)
```

## See also

- `samples/typescript-quickstart/` — runnable Node script (core SDK).
- `docs/build/specs/2026-05-26-phase-1-installment-7c-typescript-sdk.md` — core SDK design spec.
- `docs/build/specs/2026-05-27-phase-3-installment-11-preference-centre.md` — prefs packages spec.
