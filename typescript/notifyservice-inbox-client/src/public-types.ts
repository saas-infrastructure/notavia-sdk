import type { LogLevel } from "@microsoft/signalr";

export type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

export interface InboxItem {
  id: string;
  subject: string;
  htmlBody: string | null;
  textBody: string | null;
  actionUrl: string | null;
  createdAt: string;
  readAt: string | null;
  data: Record<string, unknown> | null;
}

export interface InboxPage {
  data: InboxItem[];
  nextCursor: string | null;
  unreadCount: number;
}

export interface FeedOptions {
  limit?: number;
  cursor?: string;
  status?: "unread" | "read" | "all";
}

export interface InboxClientOptions {
  baseUrl?: string;
  publishableKey: string;
  token: string;
  refreshToken?: () => Promise<string>;
  fetch?: typeof fetch;
  signalR?: { logLevel?: LogLevel; subscribeAckTimeoutMs?: number };
}

export interface NotificationReadEvent {
  id: string;
  readAt: string;
  unreadCount: number;
}

export type InboxEventMap = {
  "notification.arrived": (item: InboxItem) => void;
  "notification.read": (e: NotificationReadEvent) => void;
  "unread-count.changed": (count: number) => void;
  "state.changed": (state: ConnectionState) => void;
  error: (err: Error) => void;
};

export type InboxEventName = keyof InboxEventMap;

export interface InboxClient {
  feed(options?: FeedOptions): Promise<InboxPage>;
  get(id: string): Promise<InboxItem>;
  markRead(id: string): Promise<InboxItem>;
  markAllRead(beforeIso?: string): Promise<{ markedCount: number; unreadCount: number }>;
  unreadCount(): Promise<number>;

  connect(): Promise<void>;
  disconnect(): Promise<void>;
  readonly state: ConnectionState;

  on<K extends InboxEventName>(event: K, handler: InboxEventMap[K]): () => void;
  dispose(): Promise<void>;
}
