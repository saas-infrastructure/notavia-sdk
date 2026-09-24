import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { toCamel } from "./case.js";
import type { ConnectionState, InboxItem, InboxClientOptions } from "./public-types.js";
import type { TokenStore } from "./token-store.js";

export interface HubBridge {
  start(): Promise<void>;
  stop(): Promise<void>;
  state: ConnectionState;
  onArrived(handler: (item: InboxItem) => void): () => void;
  onRead(handler: (id: string, readAt: string, unreadCount: number) => void): () => void;
  onUnreadCount(handler: (count: number) => void): () => void;
  onStateChanged(handler: (state: ConnectionState) => void): () => void;
}

interface SignalRDeps {
  HubConnectionBuilder: typeof HubConnectionBuilder;
}

export function createHubBridge(
  baseUrl: string,
  publishableKey: string,
  tokens: TokenStore,
  signalROptions: InboxClientOptions["signalR"],
  onReconnected: () => Promise<void>,
  deps: SignalRDeps = { HubConnectionBuilder },
): HubBridge {
  const url = `${baseUrl}/inbox/v1/hub?pk=${encodeURIComponent(publishableKey)}`;

  const connection: HubConnection = new deps.HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: () => tokens.current(),
      headers: { "X-NotifyService-Publishable-Key": publishableKey },
    })
    .withAutomaticReconnect()
    .configureLogging(signalROptions?.logLevel ?? LogLevel.Warning)
    .build();

  const arrivedHandlers = new Set<(item: InboxItem) => void>();
  const readHandlers = new Set<(id: string, readAt: string, unreadCount: number) => void>();
  const unreadHandlers = new Set<(count: number) => void>();
  const stateHandlers = new Set<(state: ConnectionState) => void>();

  let state: ConnectionState = "idle";
  const setState = (next: ConnectionState) => {
    if (state === next) return;
    state = next;
    for (const h of stateHandlers) { try { h(next); } catch { /* swallow */ } }
  };

  // The server joins this connection to its user's group inside OnConnectedAsync,
  // which the SignalR handshake does NOT wait for: connection.start() resolves as
  // soon as the handshake completes, so a notification published in that window is
  // pushed to a group this connection has not joined yet and is lost for good —
  // nothing polls to recover it. The server therefore acks with "Subscribed" once
  // the group join has completed, and we withhold the "connected" state until then,
  // so "connected" truthfully means "will receive pushes".
  let resolveSubscribed: (() => void) | null = null;
  let subscribed: Promise<void> = Promise.resolve();
  const armSubscribed = () => {
    subscribed = new Promise<void>((resolve) => { resolveSubscribed = resolve; });
  };
  const releaseSubscribed = () => {
    resolveSubscribed?.();
    resolveSubscribed = null;
  };

  connection.on("Subscribed", releaseSubscribed);

  // Wait for the ack, but never hang on it: a server that predates the Subscribed
  // ack (version skew against the standalone npm package) would otherwise leave the
  // client stuck in "connecting" forever. On timeout we proceed as connected —
  // degrading to the old best-effort behaviour rather than a dead inbox.
  const subscribeAckTimeoutMs = signalROptions?.subscribeAckTimeoutMs ?? 5_000;
  const awaitSubscribed = () => Promise.race([
    subscribed,
    new Promise<void>((resolve) => { setTimeout(resolve, subscribeAckTimeoutMs); }),
  ]);

  connection.on("NotificationArrived", (payload: unknown) => {
    const item = toCamel(payload) as InboxItem;
    for (const h of arrivedHandlers) { try { h(item); } catch { /* swallow */ } }
  });

  connection.on("NotificationRead", (inboxStateId: string, readAt: string, unreadCount: number) => {
    for (const h of readHandlers) {
      try { h(inboxStateId, readAt, unreadCount); } catch { /* swallow */ }
    }
  });

  connection.on("UnreadCountChanged", (count: number) => {
    for (const h of unreadHandlers) { try { h(count); } catch { /* swallow */ } }
  });

  connection.onreconnecting(() => {
    armSubscribed();
    setState("reconnecting");
  });
  connection.onreconnected(async () => {
    await awaitSubscribed();
    setState("connected");
    try { await onReconnected(); } catch { /* errors surface via client.ts event subscription */ }
  });
  connection.onclose(() => {
    releaseSubscribed();
    setState("disconnected");
  });

  return {
    get state() { return state; },
    async start() {
      if (state === "connected" || state === "connecting") return;
      setState("connecting");
      armSubscribed();
      try {
        await connection.start();
        await awaitSubscribed();
        setState(connection.state === HubConnectionState.Connected ? "connected" : "disconnected");
      } catch (err) {
        releaseSubscribed();
        setState("disconnected");
        throw err;
      }
    },
    async stop() {
      try { await connection.stop(); } catch { /* already stopped */ }
      setState("disconnected");
    },
    onArrived(h)   { arrivedHandlers.add(h); return () => arrivedHandlers.delete(h); },
    onRead(h)      { readHandlers.add(h);    return () => readHandlers.delete(h); },
    onUnreadCount(h){ unreadHandlers.add(h); return () => unreadHandlers.delete(h); },
    onStateChanged(h){ stateHandlers.add(h); return () => stateHandlers.delete(h); },
  };
}
