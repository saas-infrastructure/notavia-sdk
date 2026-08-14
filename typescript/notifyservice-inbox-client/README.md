# @notavia/inbox-client

Headless TypeScript client for the NotifyService in-app inbox. Owns the SignalR connection, token lifecycle, REST calls, optimistic mark-read with rollback, and a typed event bus. No DOM dependency — works in browsers and Node.

## Install

```bash
npm install @notavia/inbox-client @microsoft/signalr
```

`@microsoft/signalr` is a peer dependency and must be installed alongside this package.

## Quickstart

```ts
import { createInboxClient } from "@notavia/inbox-client";

const client = createInboxClient({
  publishableKey: "pk_test_…",
  token: "<delegated JWT>",
  refreshToken: async () => (await fetch("/api/inbox-token")).text(),
});

client.on("notification.arrived", (item) => {
  console.log("New notification:", item.subject);
});

client.on("unread-count.changed", (count) => {
  document.title = count > 0 ? `(${count}) My App` : "My App";
});

await client.connect();
const page = await client.feed({ limit: 20 });
console.log("Initial items:", page.data);
```

Call `client.dispose()` when the owning component unmounts to stop the hub connection and cancel the token-refresh timer.

## Options reference

Passed to `createInboxClient(options)`.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `publishableKey` | `string` | Yes | — | Tenant + environment identifier. Begins with `pk_live_` or `pk_test_`. |
| `token` | `string` | Yes | — | Initial delegated JWT minted by your backend. |
| `refreshToken` | `() => Promise<string>` | No | `undefined` | Called proactively at `exp − 60 s` and lazily on any REST 401. If omitted, no refresh is attempted. |
| `baseUrl` | `string` | No | `"https://api.notavia.saas-infrastructure.com"` | Override for self-hosted or staging environments. |
| `fetch` | `typeof fetch` | No | `globalThis.fetch` | Injectable for testing or server-side rendering. |
| `signalR` | `{ logLevel?: LogLevel }` | No | `undefined` | Pass `{ logLevel: LogLevel.Debug }` to enable verbose hub logging. |

`LogLevel` is re-exported from `@microsoft/signalr`.

## Methods reference

All async methods return a `Promise` that rejects with `InboxAuthError` or `InboxNetworkError` on failure (see **Errors** below).

### `feed(options?): Promise<InboxPage>`

Fetches a paginated list of inbox items. Returns `{ data: InboxItem[], nextCursor: string | null, unreadCount: number }`.

| Option | Type | Description |
|--------|------|-------------|
| `limit` | `number` | Maximum items to return. |
| `cursor` | `string` | Cursor from a previous `nextCursor` for pagination. |
| `status` | `"unread" \| "read" \| "all"` | Filter by read status. Defaults to all. |

### `get(id): Promise<InboxItem>`

Fetches a single item by ID.

### `markRead(id): Promise<InboxItem>`

Marks one item as read. **Optimistic**: emits `notification.read` and `unread-count.changed` immediately with a predicted timestamp, then POSTs to the server. If the server returns a different `readAt`, a corrective `notification.read` event is emitted. On failure, the prediction is rolled back, the previous count is restored, and an `error` event is emitted before the promise rejects.

### `markAllRead(beforeIso?): Promise<{ markedCount: number; unreadCount: number }>`

Marks all items as read. Pass an ISO-8601 timestamp to mark only items created before that moment. Emits `unread-count.changed` on success.

### `unreadCount(): Promise<number>`

Fetches the current unread count from the server without loading the full feed.

### `connect(): Promise<void>`

Starts the SignalR hub connection and schedules proactive token refresh. Transitions through `idle → connecting → connected`. Throws if the client has been disposed.

### `disconnect(): Promise<void>`

Stops the hub connection gracefully. Transitions to `disconnected`. Does not tear down event listeners or the token-refresh timer — call `dispose()` for full cleanup.

### `dispose(): Promise<void>`

Full teardown: stops the hub, cancels the token-refresh timer, and removes all event listeners. Call this on component unmount. Safe to call multiple times.

### `state` (read-only getter)

Returns the current `ConnectionState` synchronously.

### `on(event, handler): () => void`

Subscribes to a typed event. Returns an unsubscribe function — call it to remove the listener.

```ts
const unsub = client.on("notification.arrived", (item) => { /* … */ });
// later:
unsub();
```

## Events reference

Subscribe with `client.on(event, handler)`.

### `notification.arrived`

Payload: `InboxItem`

Fired when a new notification arrives via the SignalR hub, and also for each item replayed from the feed on reconnect (de-duplicated by ID).

### `notification.read`

Payload: `{ id: string; readAt: string; unreadCount: number }`

Fired in three cases:
1. **Optimistic predict** — immediately when `markRead` is called, before the server responds. `readAt` is a client-generated timestamp.
2. **Server correction** — if the server's `readAt` differs from the predicted value, a second event is emitted with the authoritative timestamp.
3. **Rollback** — if the POST fails, fired again with `readAt: ""` to signal the item is no longer marked read, and `unreadCount` reverts to the pre-optimistic value.

The hub may also echo `NotificationRead` from other sessions; this produces a `notification.read` event with the server's timestamp.

### `unread-count.changed`

Payload: `number`

Fired on every count change: optimistic predictions, server reconciliation, reconnect re-hydration, and `markAllRead`.

### `state.changed`

Payload: `ConnectionState`

Fired on every transition of the hub connection state.

### `error`

Payload: `Error` (may be `InboxAuthError` or `InboxNetworkError`)

Fired when an error occurs that cannot be surfaced as a rejected promise (e.g., token refresh failure, hub error, reconnect-hydration failure). The client does not self-recover after emitting this event — inspect the error and call `connect()` again if appropriate.

## Token refresh

When `refreshToken` is provided:

- **Proactive**: a timer fires at `exp − 60 s` and calls `refreshToken()`. The new token is stored and the next timer is scheduled.
- **Lazy**: if any REST call receives a 401, `refreshToken()` is called immediately and the request is retried once with the new token. If the retry also returns 401, `InboxAuthError("unauthorized")` is thrown.

On refresh failure (callback throws or returns an empty string):
- An `error` event is emitted.
- The promise that triggered the refresh rejects.
- No automatic retry is attempted; the hub connection transitions to `disconnected`.

## Connection lifecycle

```
idle → connecting → connected → reconnecting → connected → …
                ↓ (error)                    ↓ (exhausted)
           disconnected ←──────────────── disconnected
```

| State | Meaning |
|-------|---------|
| `idle` | `connect()` not yet called. |
| `connecting` | Hub handshake in progress. |
| `connected` | Hub active; REST and push are operational. |
| `reconnecting` | SignalR is attempting automatic reconnect (built-in exponential backoff). |
| `disconnected` | Connection stopped or exhausted retry attempts. |

On reconnect (`reconnecting → connected`), the client automatically re-hydrates by calling `unreadCount()` and `feed({ limit: 20 })` and emitting `notification.arrived` for any items with IDs not previously seen.

## Optimistic mark-read

1. Client decrements `lastUnreadCount` by 1 (floor 0) and emits `notification.read` + `unread-count.changed` with a predicted `readAt`.
2. `POST /inbox/v1/notifications/{id}/read` is sent.
3. **Success** — if the server's `readAt` differs from the prediction, a corrective `notification.read` is emitted. The `unreadCount` from the optimistic step is kept (not re-decremented).
4. **Failure** — the previous `unreadCount` is restored, `notification.read` is emitted with `readAt: ""`, `unread-count.changed` is emitted with the restored count, and an `error` event is emitted. The promise rejects.

The server may also push a `NotificationRead` hub event from another session, which is authoritative and triggers its own `notification.read` emission.

## Errors

### `InboxAuthError`

```ts
class InboxAuthError extends Error {
  readonly code: string;
}
```

Thrown when authentication fails. Common `code` values:

| Code | When |
|------|------|
| `"unauthorized"` | Server returned 401 after a token refresh and retry. |
| `"no_refresh_callback"` | A 401 was received but no `refreshToken` option was provided. |
| `"refresh_returned_empty"` | The `refreshToken` callback returned an empty string. |
| `"refresh_failed"` | The `refreshToken` callback threw an error that is not itself an `InboxAuthError`. |
| `"disposed"` | Refresh was attempted after `dispose()` was called. |

### `InboxNetworkError`

```ts
class InboxNetworkError extends Error {
  readonly status?: number;  // HTTP status code, if available
  readonly body?: unknown;   // Parsed response body, if JSON
}
```

Thrown for non-401 HTTP errors (5xx, 4xx other than 401) and for network-level failures (no `status`).

## Browser support

Evergreen Chrome, Edge, Firefox, and Safari (current + previous major release). ES2020 baseline. Requires `fetch`, `Promise`, `URL`, and `setTimeout` — all available in any modern browser and Node 20+.

## License

MIT.
