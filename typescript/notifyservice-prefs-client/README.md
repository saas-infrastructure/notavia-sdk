# @notavia/prefs-client

Headless TypeScript client for the Notavia preference centre. Handles REST calls to the
`/inbox/v1/preferences/*` endpoints, automatic token refresh, and a typed event bus.
No DOM dependency — works in browsers and Node 20+.

## Install

```bash
npm install @notavia/prefs-client
```

No peer dependencies required (unlike `@notavia/inbox-client`, this client is REST-only — no SignalR).

## Quickstart

```ts
import { createPrefsClient } from "@notavia/prefs-client";

const client = createPrefsClient({
  publishableKey: "npk_test_…",
  token: "<delegated JWT with scope: 'prefs'>",
  refreshToken: async () => (await fetch("/api/prefs-token")).text(),
});

client.on("prefs-changed", (cell) => {
  console.log(`${cell.categoryName} / ${cell.channel} → opted ${cell.optedIn ? "in" : "out"}`);
});

// List all categories and their current opt-in state for the end-user
const cells = await client.list();
console.log("Preferences:", cells);
```

## Options reference

Passed to `createPrefsClient(options)`.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `publishableKey` | `string` | Yes | — | Tenant + environment identifier. Begins with `npk_live_` or `npk_test_`. |
| `token` | `string` | Yes | — | Delegated end-user JWT minted by your backend. Must carry `scope: "prefs"` or `scope: "inbox prefs"`. |
| `refreshToken` | `() => Promise<string>` | No | `undefined` | Called proactively at `exp − 60 s` and lazily on any REST 401. If omitted, no refresh is attempted. |
| `baseUrl` | `string` | No | `"https://api.notavia.saas-infrastructure.com"` | Override for self-hosted or staging environments. |
| `fetch` | `typeof fetch` | No | `globalThis.fetch` | Injectable for testing or server-side rendering. |

## Methods reference

All async methods return a `Promise` that rejects with `PrefsAuthError` or `PrefsServerError` on failure.

### `list(): Promise<PreferenceCell[]>`

Returns all preference cells for the authenticated end-user — one cell per `(category × channel)` combination.
Cells that have never been explicitly set are returned with `source: "default"` and `optedIn: true`.

### `set(categoryKey, channel, optedIn): Promise<PreferenceCell>`

Updates a single cell. Emits a `prefs-changed` event on success.

```ts
const updated = await client.set("marketing", "email", false);
console.log("Saved:", updated.optedIn); // false
```

### `unsubscribeAll(): Promise<{ unsubscribedCategories: string[]; remainingCritical: string[] }>`

Opts the user out of all non-critical categories across all channels. Critical categories (marked
`isCritical: true`) are skipped and returned in `remainingCritical`.

```ts
const { unsubscribedCategories, remainingCritical } = await client.unsubscribeAll();
console.log(`Unsubscribed from ${unsubscribedCategories.length} categories.`);
if (remainingCritical.length > 0) {
  console.log("Still subscribed (critical):", remainingCritical);
}
```

### `setQuietHours(opts): Promise<PreferenceCell>`

Sets or clears quiet-hours for a single cell. Pass `undefined` for a field to leave it unchanged.

```ts
const cell = await client.setQuietHours({
  categoryKey: "marketing",
  channel: "email",
  startLocal: "22:00",
  endLocal: "08:00",
  timezone: "America/New_York",
});
```

### `on(event, handler): () => void`

Subscribes to a typed event. Returns an unsubscribe function.

```ts
const unsub = client.on("prefs-changed", (cell) => { /* … */ });
// later:
unsub();
```

## Events reference

### `prefs-changed`

Payload: `PreferenceCell`

Fired after `set()` or `setQuietHours()` successfully saves a cell.

### `error`

Payload: `Error` (may be `PrefsAuthError` or `PrefsServerError`)

Fired for errors that cannot be surfaced as a rejected promise — primarily token-refresh failures.

## Types reference

### `PreferenceCell`

```ts
interface PreferenceCell {
  categoryKey: string;
  categoryName: string;
  isCritical: boolean;
  channel: NotificationChannel;   // "email" | "inApp"
  optedIn: boolean;
  source: PreferenceSource;       // "default" | "endUser" | "customer" | "listUnsubscribe"
  updatedAt: string;              // ISO-8601
}
```

### `PrefsAuthError`

Thrown when authentication fails (`status 401`).

```ts
class PrefsAuthError extends PrefsClientError {
  readonly code: string;
}
```

Common `code` values: `"unauthorized"`, `"no_refresh_callback"`, `"refresh_returned_empty"`,
`"refresh_failed"`, `"disposed"`.

### `PrefsServerError`

Thrown for non-401 HTTP errors.

```ts
class PrefsServerError extends PrefsClientError {
  readonly status: number;
  readonly body?: unknown;
}
```

## JWT scope requirement

The delegated JWT your backend mints for an end-user must carry the `prefs` scope.
If your app also uses the inbox, you can combine scopes: `"inbox prefs"` (space-separated).

```ts
// Backend token-minting example (Notavia .NET SDK)
var token = tokenMinter.Mint(new UnsubscribeTokenClaims(
    externalUserId: user.Id,
    organizationId: org.Id,
    scope: "inbox prefs"   // or "prefs" alone
));
```

End-users with only the `inbox` scope will receive `403` from preference endpoints.

## Browser support

Evergreen Chrome, Edge, Firefox, and Safari (current + previous major release).
ES2020 baseline. Requires `fetch`, `Promise`, `URL`, and `setTimeout` — available in any modern
browser and Node 20+.

## License

MIT.
