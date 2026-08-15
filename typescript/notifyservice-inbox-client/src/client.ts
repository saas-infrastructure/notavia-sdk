import { createEventBus } from "./events.js";
import { httpJson, type HttpContext } from "./http.js";
import { createHubBridge } from "./hub.js";
import { optimisticMarkRead } from "./optimistic.js";
import { createTokenStore } from "./token-store.js";
import type {
  ConnectionState,
  FeedOptions,
  InboxClient,
  InboxClientOptions,
  InboxEventMap,
  InboxEventName,
  InboxItem,
  InboxPage,
} from "./public-types.js";
import { toSnake } from "./case.js";

const DEFAULT_BASE_URL = "https://api.notavia.saas-infrastructure.com";

export function createInboxClient(options: InboxClientOptions): InboxClient {
  const events = createEventBus();
  const tokens = createTokenStore(
    options.token,
    options.refreshToken,
    (err) => events.emit("error", err),
  );

  const fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);
  const ctx: HttpContext = {
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    publishableKey: options.publishableKey,
    tokens,
    fetchImpl,
  };

  let state: ConnectionState = "idle";
  let lastUnreadCount = 0;
  const setState = (next: ConnectionState) => {
    if (state === next) return;
    state = next;
    events.emit("state.changed", next);
  };

  const setUnreadCount = (count: number) => {
    if (lastUnreadCount === count) return;
    lastUnreadCount = count;
  };

  async function feed(o?: FeedOptions): Promise<InboxPage> {
    const params = new URLSearchParams();
    if (o?.limit !== undefined) params.set("limit", String(o.limit));
    if (o?.cursor !== undefined) params.set("cursor", o.cursor);
    if (o?.status !== undefined) params.set("status", o.status);
    const qs = params.toString();
    const page = await httpJson<InboxPage>(ctx, "GET", `/inbox/v1/feed${qs ? `?${qs}` : ""}`);
    setUnreadCount(page.unreadCount);
    return page;
  }

  async function get(id: string): Promise<InboxItem> {
    return httpJson<InboxItem>(ctx, "GET", `/inbox/v1/notifications/${id}`);
  }

  function markRead(id: string): Promise<InboxItem> {
    return optimisticMarkRead(ctx, events, id, lastUnreadCount, setUnreadCount);
  }

  async function markAllRead(beforeIso?: string): Promise<{ markedCount: number; unreadCount: number }> {
    const body = beforeIso ? toSnake({ before: beforeIso }) : {};
    const res = await httpJson<{ markedCount: number; unreadCount: number }>(
      ctx, "POST", "/inbox/v1/notifications/mark-all-read", body,
    );
    setUnreadCount(res.unreadCount);
    events.emit("unread-count.changed", res.unreadCount);
    return res;
  }

  async function unreadCount(): Promise<number> {
    const res = await httpJson<{ unreadCount: number }>(ctx, "GET", "/inbox/v1/unread-count");
    setUnreadCount(res.unreadCount);
    return res.unreadCount;
  }

  let highestSeenId: string | null = null;
  const trackSeen = (item: InboxItem): boolean => {
    if (highestSeenId !== null && item.id <= highestSeenId) return false;
    highestSeenId = item.id;
    return true;
  };

  const hub = createHubBridge(
    ctx.baseUrl, ctx.publishableKey, tokens, options.signalR,
    async () => {
      try {
        const c = await unreadCount();
        const page = await feed({ limit: 20 });
        events.emit("unread-count.changed", c);
        for (const item of page.data) {
          if (trackSeen(item)) events.emit("notification.arrived", item);
        }
      } catch (err) {
        events.emit("error", err instanceof Error ? err : new Error(String(err)));
      }
    },
  );

  hub.onArrived((item) => {
    if (trackSeen(item)) events.emit("notification.arrived", item);
  });
  hub.onRead((id, readAt, count) => {
    setUnreadCount(count);
    events.emit("notification.read", { id, readAt, unreadCount: count });
    events.emit("unread-count.changed", count);
  });
  hub.onUnreadCount((count) => {
    setUnreadCount(count);
    events.emit("unread-count.changed", count);
  });
  hub.onStateChanged(setState);

  let disposed = false;

  return {
    feed, get, markRead, markAllRead, unreadCount,
    async connect() {
      if (disposed) throw new Error("inbox client disposed");
      tokens.schedule();
      await hub.start();
    },
    async disconnect() {
      await hub.stop();
    },
    get state() { return state; },
    on<K extends InboxEventName>(event: K, handler: InboxEventMap[K]): () => void {
      return events.on(event, handler);
    },
    async dispose() {
      if (disposed) return;
      disposed = true;
      await hub.stop();
      tokens.dispose();
      events.removeAll();
    },
  };
}
