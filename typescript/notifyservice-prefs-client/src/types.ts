export type NotificationChannel = "email" | "inApp";

export type PreferenceSource = "default" | "endUser" | "customer" | "listUnsubscribe";

export interface PreferenceCell {
  categoryKey: string;
  categoryName: string;
  isCritical: boolean;
  channel: NotificationChannel;
  optedIn: boolean;
  source: PreferenceSource;
  updatedAt: string;
}

export interface PrefsClientOptions {
  baseUrl?: string;
  publishableKey: string;
  token: string;
  refreshToken?: () => Promise<string>;
  fetch?: typeof fetch;
}

export type PrefsEventMap = {
  "prefs-changed": (cell: PreferenceCell) => void;
  error: (err: Error) => void;
};

export type PrefsEventName = keyof PrefsEventMap;

export interface PrefsClient {
  list(): Promise<PreferenceCell[]>;
  set(categoryKey: string, channel: NotificationChannel, optedIn: boolean): Promise<PreferenceCell>;
  unsubscribeAll(): Promise<{ unsubscribedCategories: string[]; remainingCritical: string[] }>;
  setQuietHours(opts: {
    categoryKey: string;
    channel: NotificationChannel;
    startLocal?: string;
    endLocal?: string;
    timezone?: string;
  }): Promise<PreferenceCell>;

  on(event: "prefs-changed", handler: (cell: PreferenceCell) => void): () => void;
  on(event: "error", handler: (err: Error) => void): () => void;
}
