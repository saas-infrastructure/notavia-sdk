# @notavia/inbox

White-label `<notifyservice-inbox>` custom element for the Notavia in-app inbox. Three variants (`bell` | `panel` | `list`), real-time push via SignalR, and fully themeable with CSS custom properties.

## Install

```bash
npm install @notavia/inbox @microsoft/signalr
```

`@microsoft/signalr` is a peer dependency and must be installed alongside this package.

## Quickstart (ESM via bundler)

```ts
import "@notavia/inbox";
```

```html
<notifyservice-inbox
  publishable-key="npk_test_…"
  token="<delegated JWT>"
  variant="bell"></notifyservice-inbox>

<script type="module">
  const el = document.querySelector("notifyservice-inbox");

  // Property-only: cannot be set as an attribute
  el.refreshToken = async () => (await fetch("/api/inbox-token")).text();

  el.addEventListener("notify-item-click", (e) => {
    if (e.detail.actionUrl) location.href = e.detail.actionUrl;
  });
</script>
```

## Quickstart (UMD via script tag)

> **Important**: the UMD bundle externalizes `@microsoft/signalr` as `window.signalR`. You **must** load the SignalR script **before** the web component bundle. ESM consumers (npm + bundler) do not have this requirement — the bundler resolves the peer dependency normally.

```html
<!-- 1. Load SignalR first (must be on window.signalR) -->
<script src="https://unpkg.com/@microsoft/signalr@8/dist/browser/signalr.min.js"></script>

<!-- 2. Load the web component bundle -->
<script src="https://unpkg.com/notifyservice-inbox/dist/notifyservice-inbox.umd.js"></script>

<!-- 3. Use the element -->
<notifyservice-inbox
  publishable-key="npk_test_…"
  token="<delegated JWT>"
  variant="bell"></notifyservice-inbox>

<script>
  const el = document.querySelector("notifyservice-inbox");
  el.refreshToken = async () => (await fetch("/api/inbox-token")).text();
</script>
```

The unpkg URLs above are illustrative. Pin to a specific version (e.g. `@8.0.7`) in production instead of relying on the `@8` range tag.

## Attributes / properties

All attributes are also settable as JS properties using their camelCase name. Attribute names follow the HTML convention (lowercase, hyphenated).

| Attribute | Property | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `publishable-key` | `publishableKey` | `string` | `""` | **Required.** Tenant + environment identifier. |
| `token` | `token` | `string` | `""` | **Required.** Delegated JWT minted by your backend. |
| `base-url` | `baseUrl` | `string` | `"https://api.notavia.saas-infrastructure.com"` | Override for self-hosted or staging environments. |
| `variant` | `variant` | `"bell" \| "panel" \| "list"` | `"bell"` | Visual presentation mode. Reflected back to the attribute. |
| `theme` | `theme` | `"light" \| "dark"` | `"light"` | Color theme. Reflected back to the attribute. |
| `open` | `open` | `boolean` | `false` | Controls whether the bell popover is open. Reflected. Only meaningful for the `bell` variant. |
| — | `refreshToken` | `() => Promise<string>` | `undefined` | **Property only** — cannot be set as an HTML attribute. Callback invoked to obtain a fresh JWT. |

Changing `publishable-key`, `token`, or `base-url` after mount causes the component to tear down the existing client and boot a new one. Changing `variant`, `theme`, or `open` re-renders in place.

## Variants

### `bell`

A notification bell icon with a badge showing the unread count. Clicking the bell toggles a popover that lists recent notifications. Clicking outside the popover closes it. Keyboard: `Enter`/`Space` to toggle; `ESC` to close; `↑`/`↓`/`Home`/`End` to navigate items; `Enter` to activate the focused item.

Best for: top-nav toolbars.

### `panel`

A slide-in side panel containing the full notification list and a "Mark all read" action. The panel does not control its own open/close state — toggle it from outside by setting the `open` attribute/property.

Best for: a dedicated notifications drawer triggered by a sidebar button.

### `list`

A flat inline list of notifications with no chrome. Use when you want full control over the surrounding layout (e.g., embedding inside a dropdown or a page section).

Best for: a `/notifications` page or a custom popover shell.

## Events

All events bubble and are `composed: true` (cross shadow-DOM boundary).

| Event | `detail` shape | When |
|-------|---------------|------|
| `notify-item-click` | `{ id: string; actionUrl: string \| null; item: InboxItem }` | User clicks a notification item. The component marks it read automatically. Your handler is responsible for navigation. |
| `notify-connected` | `undefined` | SignalR hub connection established. |
| `notify-disconnected` | `{ reason: "manual" \| "auth" \| "transport" }` | Hub connection dropped. `"transport"` means unexpected disconnect or exhausted reconnect attempts. |
| `notify-error` | `{ error: Error }` | An error surfaced by the underlying client (auth failure, network error, etc.). |
| `notify-unread-count-changed` | `{ count: number }` | Unread count changed (optimistic, server-reconciled, or push). |
| `notify-marked-read` | `{ id: string }` | A single item was marked read (optimistic). |
| `notify-marked-all-read` | `{ markedCount: number }` | "Mark all read" completed successfully. |

### Navigation on item click

```js
el.addEventListener("notify-item-click", (e) => {
  if (e.detail.actionUrl) {
    // Use your router or location:
    router.push(e.detail.actionUrl);
  }
});
```

## Theming

The component exposes nine CSS custom properties on the `:host`. Set them on the element selector in your stylesheet.

| Property | Default | Description |
|----------|---------|-------------|
| `--notify-color-primary` | `#6366f1` | Accent color: badge background, unread dot, buttons. |
| `--notify-color-text` | `#111827` | Primary text color. |
| `--notify-color-bg` | `#ffffff` | Panel / popover background. |
| `--notify-color-border` | `#e5e7eb` | Border and divider color. |
| `--notify-color-unread-dot` | `var(--notify-color-primary)` | Color of the unread indicator dot on items. |
| `--notify-font-family` | `inherit` | Font family applied to the component. |
| `--notify-radius` | `0.5rem` | Border radius of panels, items, and buttons. |
| `--notify-shadow` | `0 10px 25px rgba(0,0,0,0.1)` | Box shadow on the popover / panel. |
| `--notify-z-dropdown` | `50` | `z-index` of the bell popover. |

Dark mode overrides `--notify-color-text`, `--notify-color-bg`, `--notify-color-border`, and `--notify-shadow` automatically when `theme="dark"`.

### Branding example

```css
notifyservice-inbox {
  --notify-color-primary: #ec4899;  /* your brand pink */
  --notify-radius: 4px;
  --notify-font-family: "Inter", sans-serif;
}
```

## Accessibility

- **Bell button**: `role="button"`, `aria-haspopup="menu"`, `aria-expanded` toggled dynamically, `aria-label` updated to include the unread count (e.g., `"Notifications, 3 unread"`).
- **Popover close**: when the popover closes, focus is restored to the bell button.
- **Keyboard navigation inside the popover**: `↑` / `↓` move focus between items, `Home` / `End` jump to first / last item, `Enter` activates the focused item, `ESC` closes the popover.
- Screen-reader-only text is rendered with `.sr-only` for counts and status indicators.

## Content rendering note

v1 renders the notification's `subject` as a heading and a plain-text snippet derived from `textBody`. The `htmlBody` field is **intentionally not injected into the DOM** — this is a deliberate XSS safeguard.

If your notifications carry rich HTML content and you need to display it, listen to `notify-item-click` and navigate to your own notification detail page where you control the rendering context.

## Browser support

Evergreen Chrome, Edge, Firefox, and Safari (current + previous major release). ES2020 baseline. Requires `fetch`, `Promise`, `URL`, and `setTimeout` — all available in any modern browser.

## License

MIT.
