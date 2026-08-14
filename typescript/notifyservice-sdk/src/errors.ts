/** Machine-readable error returned by NotifyService for every non-2xx response. */
export interface ErrorBody {
  /** Coarse error family, e.g. `invalid_request_error`, `authentication_error`. */
  type: string;
  /** Specific machine-readable code, e.g. `parameter_invalid`. */
  code: string;
  /** Human-readable description. */
  message: string;
  /** The offending request parameter, when applicable. */
  param: string | null;
}

/** Wire envelope around an {@link ErrorBody}. */
export interface ErrorEnvelope {
  error: ErrorBody;
}

/**
 * Thrown for every non-2xx response from the NotifyService API.
 * Carries the parsed {@link ErrorBody}, HTTP status code, and the server's
 * `X-Request-Id` header (if present).
 */
export class NotifyApiError extends Error {
  readonly statusCode: number;
  readonly error: ErrorBody;
  readonly requestId: string | null;

  constructor(statusCode: number, error: ErrorBody, requestId: string | null) {
    super(`NotifyService API error ${statusCode} (${error.code}): ${error.message}`);
    this.name = "NotifyApiError";
    this.statusCode = statusCode;
    this.error = error;
    this.requestId = requestId;
  }
}
