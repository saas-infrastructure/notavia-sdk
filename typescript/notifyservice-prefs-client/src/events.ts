import type { PrefsEventMap, PrefsEventName } from "./types.js";

export interface TypedEventBus {
  emit<K extends PrefsEventName>(event: K, ...args: Parameters<PrefsEventMap[K]>): void;
  on<K extends PrefsEventName>(event: K, handler: PrefsEventMap[K]): () => void;
  removeAll(): void;
}

export function createEventBus(): TypedEventBus {
  const handlers: { [K in PrefsEventName]?: Set<PrefsEventMap[K]> } = {};

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
      for (const key of Object.keys(handlers) as PrefsEventName[]) {
        handlers[key]?.clear();
      }
    },
  };
}
