import { vi } from "vitest";
import type { InboxClient, InboxClientOptions, InboxEventMap, InboxEventName, InboxItem } from "@notavia/inbox-client";

export type MockClientFactory = (opts: InboxClientOptions) => MockInboxClient;

export interface MockInboxClient extends InboxClient {
  emit<K extends InboxEventName>(event: K, ...args: Parameters<InboxEventMap[K]>): void;
  options: InboxClientOptions;
}

export function makeMockClient(seedItems: InboxItem[] = [], unreadSeed = 0): MockInboxClient {
  const handlers: { [K in InboxEventName]?: Set<InboxEventMap[K]> } = {};
  let opts: InboxClientOptions = { publishableKey: "", token: "" };

  const c: MockInboxClient = {
    options: opts,
    feed: vi.fn(async () => ({ data: seedItems, nextCursor: null, unreadCount: unreadSeed })),
    get:  vi.fn(async (id: string) => seedItems.find((i) => i.id === id)!),
    markRead: vi.fn(async (id: string) => ({ ...seedItems.find((i) => i.id === id)!, readAt: new Date().toISOString() })),
    markAllRead: vi.fn(async () => ({ markedCount: seedItems.filter((i) => i.readAt === null).length, unreadCount: 0 })),
    unreadCount: vi.fn(async () => unreadSeed),
    connect: vi.fn(async () => {}),
    disconnect: vi.fn(async () => {}),
    state: "connected",
    on(event, handler) {
      const set = (handlers[event] ??= new Set()) as Set<typeof handler>;
      set.add(handler);
      return () => set.delete(handler);
    },
    dispose: vi.fn(async () => {}),
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
      if (p === "options") { opts = val as InboxClientOptions; return true; }
      return Reflect.set(target, p, val);
    },
  });
}

let factory: MockClientFactory | null = null;
export function installMockClient(f: MockClientFactory): () => void {
  factory = f;
  return () => { factory = null; };
}

vi.mock("@notavia/inbox-client", async (importOriginal) => {
  const original = await importOriginal<typeof import("@notavia/inbox-client")>();
  return {
    ...original,
    createInboxClient: (opts: InboxClientOptions) => {
      if (factory) {
        const c = factory(opts);
        c.options = opts;
        return c;
      }
      return original.createInboxClient(opts);
    },
  };
});
