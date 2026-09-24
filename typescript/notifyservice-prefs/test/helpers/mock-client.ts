import { vi } from "vitest";
import type {
  PrefsClient,
  PrefsClientOptions,
  PreferenceCell,
  PrefsEventMap,
  PrefsEventName,
} from "@notavia/prefs-client";

export type MockClientFactory = (opts: PrefsClientOptions) => MockPrefsClient;

export interface MockPrefsClient extends PrefsClient {
  emit<K extends PrefsEventName>(event: K, ...args: Parameters<PrefsEventMap[K]>): void;
  options: PrefsClientOptions;
}

export function makeMockClient(seedCells: PreferenceCell[] = []): MockPrefsClient {
  const handlers: { [K in PrefsEventName]?: Set<PrefsEventMap[K]> } = {};
  let opts: PrefsClientOptions = { publishableKey: "", token: "" };

  const c: MockPrefsClient = {
    options: opts,
    list: vi.fn(async () => [...seedCells]),
    set: vi.fn(async (categoryKey: string, channel: string, optedIn: boolean) => {
      const existing = seedCells.find(
        (cell) => cell.categoryKey === categoryKey && cell.channel === channel,
      );
      return {
        ...(existing ?? seedCells[0]!),
        categoryKey,
        channel: channel as PreferenceCell["channel"],
        optedIn,
        updatedAt: new Date().toISOString(),
      } as PreferenceCell;
    }),
    unsubscribeAll: vi.fn(async () => ({ unsubscribedCategories: [], remainingCritical: [] })),
    setQuietHours: vi.fn(async () => seedCells[0]!),
    on(event: PrefsEventName, handler: PrefsEventMap[PrefsEventName]) {
      const set = (handlers[event] ??= new Set()) as Set<typeof handler>;
      set.add(handler);
      return () => set.delete(handler);
    },
    emit(event, ...args) {
      const set = handlers[event];
      if (!set) return;
      for (const h of set) (h as (...a: unknown[]) => void)(...args);
    },
  };

  return new Proxy(c, {
    get(target, p, recv) {
      if (p === "options") return opts;
      return Reflect.get(target, p, recv);
    },
    set(target, p, val) {
      if (p === "options") {
        opts = val as PrefsClientOptions;
        return true;
      }
      return Reflect.set(target, p, val);
    },
  });
}

let factory: MockClientFactory | null = null;

export function installMockClient(f: MockClientFactory): () => void {
  factory = f;
  return () => {
    factory = null;
  };
}

vi.mock("@notavia/prefs-client", async (importOriginal) => {
  const original = await importOriginal<typeof import("@notavia/prefs-client")>();
  return {
    ...original,
    createPrefsClient: (opts: PrefsClientOptions) => {
      if (factory) {
        const c = factory(opts);
        c.options = opts;
        return c;
      }
      return original.createPrefsClient(opts);
    },
  };
});
