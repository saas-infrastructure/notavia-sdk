import type { InboxEventMap, InboxEventName } from "./public-types.js";

export interface TypedEventBus {
  emit<K extends InboxEventName>(event: K, ...args: Parameters<InboxEventMap[K]>): void;
  on<K extends InboxEventName>(event: K, handler: InboxEventMap[K]): () => void;
  removeAll(): void;
}

export function createEventBus(): TypedEventBus {
  const handlers: { [K in InboxEventName]?: Set<InboxEventMap[K]> } = {};

  return {
    emit(event, ...args) {
      const set = handlers[event];
      if (!set) return;
      for (const h of set) {
        try {
          (h as (...a: unknown[]) => void)(...args);
        } catch {
          // handler threw — swallow so other handlers still run
        }
      }
    },
    on(event, handler) {
      if (!handlers[event]) {
        (handlers as Record<string, Set<unknown>>)[event] = new Set();
      }
      const set = handlers[event] as Set<typeof handler>;
      set.add(handler);
      return () => set.delete(handler);
    },
    removeAll() {
      for (const key of Object.keys(handlers) as InboxEventName[]) {
        handlers[key]?.clear();
      }
    },
  };
}
