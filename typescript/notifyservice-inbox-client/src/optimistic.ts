import { toCamel } from "./case.js";
import type { TypedEventBus } from "./events.js";
import { httpJson, type HttpContext } from "./http.js";
import type { InboxItem } from "./public-types.js";

export async function optimisticMarkRead(
  ctx: HttpContext,
  events: TypedEventBus,
  id: string,
  knownUnreadCount: number,
  setUnreadCount: (count: number) => void,
): Promise<InboxItem> {
  const predictedReadAt = new Date().toISOString();
  const predictedUnread = Math.max(0, knownUnreadCount - 1);

  setUnreadCount(predictedUnread);
  events.emit("notification.read", { id, readAt: predictedReadAt, unreadCount: predictedUnread });
  events.emit("unread-count.changed", predictedUnread);

  try {
    const raw = await httpJson<unknown>(ctx, "POST", `/inbox/v1/notifications/${id}/read`);
    const item = toCamel(raw) as InboxItem;
    if (item.readAt && item.readAt !== predictedReadAt) {
      events.emit("notification.read", { id, readAt: item.readAt, unreadCount: predictedUnread });
    }
    return item;
  } catch (err) {
    setUnreadCount(knownUnreadCount);
    events.emit("notification.read", { id, readAt: "", unreadCount: knownUnreadCount });
    events.emit("unread-count.changed", knownUnreadCount);
    events.emit("error", err instanceof Error ? err : new Error(String(err)));
    throw err;
  }
}
