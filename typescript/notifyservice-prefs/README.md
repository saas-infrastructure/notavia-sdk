# @notavia/prefs

Drop-in `<notifyservice-prefs>` Lit 3 web component for the NotifyService preference centre.
Shadow-DOM-scoped styles, fully themeable via CSS custom properties, table and cards layout variants.
Built on top of `@notavia/prefs-client`.

## Install

```bash
npm install @notavia/prefs @notavia/prefs-client
```

`@notavia/prefs-client` is a peer dependency and must be installed alongside this package.

## Quickstart (ESM via bundler)

```ts
import "@notavia/prefs";
```

```html
<notifyservice-prefs
  publishable-key="pk_test_…"
  token="<delegated JWT with scope 'prefs'>"
  layout="auto"></notifyservice-prefs>

<script type="module">
  const el = document.querySelector("notifyservice-prefs");

  // refreshToken must be set as a property (not an attribute)
  el.refreshToken = async () => (await fetch("/api/prefs-token")).text();

  el.addEventListener("notify-prefs-changed", (e) => {
    console.log("preference toggled", e.detail);
    // detail: { categoryKey, channel, optedIn }
  });

  el.addEventListener("notify-error", (e) => {
    console.error("prefs error", e.detail.message);
  });
</script>
```

## Quickstart (UMD via CDN / script tag)

```html
<!-- Load peer dependency first -->
<script src="https://cdn.example.com/notifyservice-prefs-client.umd.js"></script>
<script src="https://cdn.example.com/notifyservice-prefs.umd.js"></script>

<notifyservice-prefs
  publishable-key="pk_test_…"
  token="<delegated JWT>"
  layout="auto">
</notifyservice-prefs>
```

## Attributes and properties

| Attribute / Property | Type | Required | Default | Description |
|----------------------|------|----------|---------|-------------|
| `publishable-key` | `string` | Yes | — | Your NotifyService publishable API key. Begins with `pk_live_` or `pk_test_`. |
| `token` | `string` | Yes | — | Delegated end-user JWT (`scope: "prefs"`). Can be updated at any time to replace the active token. |
| `base-url` | `string` | No | `https://api.notavia.saas-infrastructure.com` | Override for self-hosted or staging environments. |
| `layout` | `"auto" \| "table" \| "cards"` | No | `"auto"` | Visual layout. `auto` switches to `cards` below 768 px. |
| `refreshToken` | `() => Promise<string>` | No | — | **Property only** (not an attribute). Called proactively at token `exp − 60 s` and on 401. |
| `theme` | `Record<string, string>` | No | — | **Property only**. CSS custom property overrides, applied to the component root. |

## Custom events

All custom events bubble and are composed (cross shadow-DOM boundaries).

| Event | Detail type | Description |
|-------|-------------|-------------|
| `notify-prefs-changed` | `{ categoryKey: string; channel: string; optedIn: boolean }` | Fired after a preference toggle is saved successfully on the server. |
| `notify-error` | `{ message: string; code?: string }` | Fired on API errors, token failures, or unrecoverable states. |

## Theming via CSS custom properties

Override on the element itself or any ancestor selector. All custom properties are scoped inside
the shadow root.

```css
notifyservice-prefs {
  --notify-color-primary:    #6366f1;   /* toggle active + focus ring */
  --notify-color-surface:    #ffffff;   /* card / table background */
  --notify-color-surface-alt:#f8fafc;   /* alternating row tint */
  --notify-color-border:     #e2e8f0;
  --notify-color-text:       #1e293b;
  --notify-color-text-muted: #64748b;
  --notify-font-family:      "Inter", sans-serif;
  --notify-font-size-base:   0.875rem;
  --notify-border-radius:    0.5rem;
  --notify-spacing-base:     1rem;
}
```

## Layout variants

| Value | Behaviour |
|-------|-----------|
| `"table"` | Side-by-side column per channel; one row per category. Best for desktop. |
| `"cards"` | Stacked cards; one card per category with channel toggles inside. Best for mobile. |
| `"auto"` | Automatically selects `table` at ≥ 768 px and `cards` below. Uses a `ResizeObserver`. |

## React integration example

```tsx
import "@notavia/prefs";
import { useEffect, useRef } from "react";

export function PreferenceCentre({ token }: { token: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.refreshToken = async () => (await fetch("/api/prefs-token")).text();
  }, []);

  return (
    <notifyservice-prefs
      ref={ref}
      publishable-key="pk_test_…"
      token={token}
      layout="auto"
    />
  );
}
```

## JWT scope requirement

The delegated JWT must carry `scope: "prefs"` (or `scope: "inbox prefs"` if the same token is
reused for the inbox widget). Tokens without the `prefs` scope cause the component to emit
`notify-error` with `code: "unauthorized"`.

## Browser support

Evergreen Chrome, Edge, Firefox, and Safari (current + previous major release). ES2020 baseline.
Shadow DOM and custom elements are required (Baseline 2019+).

## License

MIT.
