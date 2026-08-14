export { createPrefsClient } from "./client.js";
export type {
  PrefsClient,
  PrefsClientOptions,
  PreferenceCell,
  NotificationChannel,
  PreferenceSource,
  PrefsEventMap,
  PrefsEventName,
} from "./types.js";
export { PrefsClientError, PrefsAuthError, PrefsServerError } from "./errors.js";

export const PACKAGE_VERSION = PKG_VERSION;
