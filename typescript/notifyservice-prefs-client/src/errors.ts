export class PrefsClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrefsClientError";
  }
}

export class PrefsAuthError extends PrefsClientError {
  readonly code: string;
  constructor(code: string, message?: string) {
    super(message ?? `Prefs authentication failed: ${code}`);
    this.name = "PrefsAuthError";
    this.code = code;
  }
}

export class PrefsServerError extends PrefsClientError {
  readonly status: number;
  readonly body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "PrefsServerError";
    this.status = status;
    this.body = body;
  }
}
