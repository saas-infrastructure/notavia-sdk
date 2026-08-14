const FOCUSABLE = [
  "a[href]", "button:not([disabled])", "input:not([disabled])",
  "select:not([disabled])", "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])', '[role="menuitem"]',
].join(",");

export function trapFocus(container: HTMLElement): () => void {
  function onKey(e: KeyboardEvent): void {
    if (e.key !== "Tab") return;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    const active = (container.getRootNode() as ShadowRoot).activeElement as HTMLElement | null;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }
  container.addEventListener("keydown", onKey);
  return () => container.removeEventListener("keydown", onKey);
}

export function moveFocus(
  container: HTMLElement,
  direction: "next" | "prev" | "first" | "last",
): void {
  const items = Array.from(container.querySelectorAll<HTMLElement>('[role="menuitem"]'));
  if (items.length === 0) return;
  const root = container.getRootNode() as ShadowRoot;
  const idx = items.indexOf(root.activeElement as HTMLElement);
  let next: HTMLElement | undefined;
  switch (direction) {
    case "next": next = items[Math.min(items.length - 1, idx + 1)]; break;
    case "prev": next = items[Math.max(0, idx - 1)]; break;
    case "first": next = items[0]; break;
    case "last": next = items[items.length - 1]; break;
  }
  next?.focus();
}
