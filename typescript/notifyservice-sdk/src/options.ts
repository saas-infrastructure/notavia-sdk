/** Configures the NotifyService client. */
export interface NotifyClientOptions {
  /** The NotifyService API base URL. Defaults to `https://api.notavia.saas-infrastructure.com`. */
  baseUrl?: string;
  /** A NotifyService API key (Secret scope). Required. */
  apiKey: string;
  /** Per-request timeout in milliseconds. Defaults to 30_000. */
  timeoutMs?: number;
  /** Retry policy applied to transient HTTP failures. */
  retries?: RetryOptions;
  /** Testing seam — overrides the global fetch. Defaults to `globalThis.fetch`. */
  fetch?: typeof fetch;
}

/**
 * Controls the retry behavior applied to transient HTTP failures
 * (5xx, 408, 429, and thrown network errors).
 */
export interface RetryOptions {
  /** Whether retries are enabled. Defaults to `true`. */
  enabled?: boolean;
  /**
   * Maximum number of retries beyond the first request.
   * Default 3, so up to 4 total outgoing requests per call.
   */
  maxAttempts?: number;
}
