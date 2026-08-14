import "./notifyservice-prefs.umd.js";

export function mount(hostDiv, dotnetRef, opts) {
  const el = document.createElement("notifyservice-prefs");
  el.setAttribute("publishable-key", opts.publishableKey);
  el.setAttribute("token", opts.token);
  el.setAttribute("base-url", opts.baseUrl);
  el.setAttribute("layout", opts.layout);

  function fwd(eventName, dotnetMethod, mapDetail) {
    const listener = (e) =>
      dotnetRef.invokeMethodAsync(dotnetMethod, mapDetail ? mapDetail(e.detail) : e.detail);
    el.addEventListener(eventName, listener);
    return () => el.removeEventListener(eventName, listener);
  }

  const unsubs = [
    fwd("notify-prefs-changed", "NotifyPrefsChanged", (d) => ({
      category_key:  d.categoryKey,
      category_name: d.categoryName,
      is_critical:   d.isCritical,
      channel:       d.channel,
      opted_in:      d.optedIn,
      source:        d.source,
      updated_at:    d.updatedAt,
    })),
    fwd("notify-error", "NotifyError", (d) =>
      d && d.message ? d.message : String(d ?? "error")),
  ];

  hostDiv.appendChild(el);
}

export function unmount(hostDiv) {
  while (hostDiv.firstChild) {
    hostDiv.removeChild(hostDiv.firstChild);
  }
}
