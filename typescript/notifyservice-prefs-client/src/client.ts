import { createEventBus } from "./events.js";
import { httpJson, type HttpContext } from "./http.js";
import { createTokenStore } from "./token-store.js";
import type {
  NotificationChannel,
  PreferenceCell,
  PrefsClient,
  PrefsClientOptions,
  PrefsEventMap,
  PrefsEventName,
} from "./types.js";

const DEFAULT_BASE_URL = "https://api.notavia.saas-infrastructure.com";

export function createPrefsClient(options: PrefsClientOptions): PrefsClient {
  const events = createEventBus();
  const tokens = createTokenStore(
    options.token,
    options.refreshToken,
    (err) => events.emit("error", err),
  );

  tokens.schedule();

  const fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);
  const ctx: HttpContext = {
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    publishableKey: options.publishableKey,
    tokens,
    fetchImpl,
  };

  async function list(): Promise<PreferenceCell[]> {
    const res = await httpJson<{ data: PreferenceCell[] }>(ctx, "GET", "/inbox/v1/preferences");
    return res.data;
  }

  async function set(
    categoryKey: string,
    channel: NotificationChannel,
    optedIn: boolean,
  ): Promise<PreferenceCell> {
    const cell = await httpJson<PreferenceCell>(
      ctx,
      "PATCH",
      `/inbox/v1/preferences/${encodeURIComponent(categoryKey)}/${encodeURIComponent(channel)}`,
      { optedIn },
    );
    events.emit("prefs-changed", cell);
    return cell;
  }

  async function unsubscribeAll(): Promise<{ unsubscribedCategories: string[]; remainingCritical: string[] }> {
    const res = await httpJson<{ unsubscribedCategories: string[]; remainingCritical: string[] }>(
      ctx,
      "POST",
      "/inbox/v1/preferences/unsubscribe-all",
      {},
    );
    return res;
  }

  async function setQuietHours(opts: {
    categoryKey: string;
    channel: NotificationChannel;
    startLocal?: string;
    endLocal?: string;
    timezone?: string;
  }): Promise<PreferenceCell> {
    const { categoryKey, channel, startLocal, endLocal, timezone } = opts;
    const cell = await httpJson<PreferenceCell>(
      ctx,
      "PATCH",
      `/inbox/v1/preferences/${encodeURIComponent(categoryKey)}/${encodeURIComponent(channel)}`,
      {
        ...(startLocal !== undefined ? { quietHoursStartLocal: startLocal } : {}),
        ...(endLocal !== undefined ? { quietHoursEndLocal: endLocal } : {}),
        ...(timezone !== undefined ? { timezone } : {}),
      },
    );
    events.emit("prefs-changed", cell);
    return cell;
  }

  function on(event: "prefs-changed", handler: (cell: PreferenceCell) => void): () => void;
  function on(event: "error", handler: (err: Error) => void): () => void;
  function on<K extends PrefsEventName>(event: K, handler: PrefsEventMap[K]): () => void {
    return events.on(event, handler);
  }

  return { list, set, unsubscribeAll, setQuietHours, on };
}
