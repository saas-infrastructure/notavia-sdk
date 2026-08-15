/** Authentication failed (initial 401 or refresh-then-retry 401). */
export class InboxAuthError extends Error {
  readonly code: string;
  constructor(code: string, message?: string) {
    super(message ?? `Inbox authentication failed: ${code}`);
    this.name = "InboxAuthError";
    this.code = code;
  }
}

/** Network or server error (5xx, network failure). */
export class InboxNetworkError extends Error {
  readonly status?: number;
  readonly body?: unknown;
  constructor(message: string, status?: number, body?: unknown) {
    super(message);
    this.name = "InboxNetworkError";
    this.status = status;
    this.body = body;
  }
}
