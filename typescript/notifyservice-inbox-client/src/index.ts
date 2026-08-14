export { createInboxClient } from "./client.js";
export type {
  InboxClient,
  InboxClientOptions,
  ConnectionState,
  InboxItem,
  InboxPage,
  FeedOptions,
  NotificationReadEvent,
  InboxEventMap,
  InboxEventName,
} from "./public-types.js";
export { InboxAuthError, InboxNetworkError } from "./errors.js";

export const PACKAGE_VERSION = PKG_VERSION;
