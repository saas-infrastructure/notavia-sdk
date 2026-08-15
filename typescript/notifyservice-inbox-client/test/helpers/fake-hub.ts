import type { HubConnectionBuilder } from "@microsoft/signalr";

export class FakeHubConnection {
  readonly handlers = new Map<string, Set<(...args: unknown[]) => void>>();
  readonly reconnectingHandlers = new Set<() => void>();
  readonly reconnectedHandlers = new Set<() => Promise<void> | void>();
  readonly closeHandlers = new Set<() => void>();
  state: "Disconnected" | "Connected" | "Connecting" | "Reconnecting" = "Disconnected";
  startError: Error | null = null;
  startCalls = 0;

  on(method: string, h: (...args: unknown[]) => void): this {
    const set = this.handlers.get(method) ?? new Set();
    set.add(h);
    this.handlers.set(method, set);
    return this;
  }
  onreconnecting(h: () => void): this { this.reconnectingHandlers.add(h); return this; }
  onreconnected(h: () => Promise<void> | void): this { this.reconnectedHandlers.add(h); return this; }
  onclose(h: () => void): this { this.closeHandlers.add(h); return this; }

  async start(): Promise<void> {
    if (this.startError) throw this.startError;
    this.state = "Connected";
    this.startCalls = this.startCalls + 1;
    if (this.ackSubscribe) this.emit("Subscribed");
  }

  /** Mirrors the real hub acking the caller once OnConnectedAsync has joined the group. */
  ackSubscribe = true;
  async stop(): Promise<void> { this.state = "Disconnected"; }

  emit(method: string, ...args: unknown[]): void {
    for (const h of this.handlers.get(method) ?? []) h(...args);
  }
  triggerReconnecting(): void { for (const h of this.reconnectingHandlers) h(); }
  async triggerReconnected(): Promise<void> {
    if (this.ackSubscribe) this.emit("Subscribed");
    for (const h of this.reconnectedHandlers) await h();
  }
  triggerClose(): void { for (const h of this.closeHandlers) h(); }
}

export class FakeHubBuilder {
  readonly conn = new FakeHubConnection();
  withUrl() { return this; }
  withAutomaticReconnect() { return this; }
  configureLogging() { return this; }
  build() { return this.conn as unknown as ReturnType<HubConnectionBuilder["build"]>; }
}

/**
 * Returns a constructor function (compatible with `new`) that always produces
 * the given `builder` instance. Use this when injecting into `createHubBridge`
 * which calls `new deps.HubConnectionBuilder()`.
 */
export function makeBuilderCtor(builder: FakeHubBuilder): typeof HubConnectionBuilder {
  return function FakeBuilderCtor() {
    return builder;
  } as unknown as typeof HubConnectionBuilder;
}
