async function ensureSignalR() {
  if (globalThis.signalR) return;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = new URL("./signalr.min.js", import.meta.url).href;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("NotifyService inbox: failed to load @microsoft/signalr"));
    document.head.appendChild(script);
  });
}

await ensureSignalR();
await import("./notifyservice-inbox.umd.js");

export function mount(hostDiv, options, dotnetRef) {
  const el = document.createElement("notifyservice-inbox");
  el.publishableKey = options.publishableKey;
  el.token = options.token;
  el.setAttribute("base-url", options.baseUrl);
  el.setAttribute("variant", options.variant);
  el.setAttribute("theme", options.theme);

  if (options.refreshToken) {
    el.refreshToken = async () => {
      const t = await dotnetRef.invokeMethodAsync("InvokeRefreshTokenAsync");
      if (!t) throw new Error("Blazor refresh callback returned empty token");
      return t;
    };
  }

  function fwd(eventName, dotnetMethod, mapDetail) {
    const listener = (e) => dotnetRef.invokeMethodAsync(dotnetMethod, mapDetail ? mapDetail(e.detail) : e.detail);
    el.addEventListener(eventName, listener);
    return () => el.removeEventListener(eventName, listener);
  }

  const unsubs = [
    fwd("notify-item-click",            "OnItemClickJs",          (d) => ({ id: d.id, actionUrl: d.actionUrl, item: d.item })),
    fwd("notify-connected",             "OnConnectedJs",          () => null),
    fwd("notify-disconnected",          "OnDisconnectedJs",       (d) => d.reason ?? "transport"),
    fwd("notify-error",                 "OnErrorJs",              (d) => (d.error && d.error.message) ? d.error.message : String(d.error ?? "error")),
    fwd("notify-unread-count-changed",  "OnUnreadCountChangedJs", (d) => d.count),
  ];

  hostDiv.appendChild(el);

  return {
    setToken(token) { el.token = token; },
    dispose() {
      for (const u of unsubs) u();
      el.remove();
    },
  };
}
