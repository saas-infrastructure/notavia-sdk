/** Internal — resolved retry config used by {@link withRetry}. */
export interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  delay?: (ms: number) => Promise<void>;
}

const RETRIABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

/** Result of a single attempt. */
export type AttemptResult<T> =
  | { ok: true; value: T }
  | { ok: false; status: number; retryAfterMs: number | null; finalize: () => Promise<T> };

/**
 * Runs `fn` and retries on transient failures up to `cfg.maxAttempts` times
 * beyond the first call. If all attempts fail, invokes the last attempt's
 * `finalize()` (which throws the appropriate {@link NotifyApiError}).
 */
export async function withRetry<T>(
  fn: () => Promise<AttemptResult<T>>,
  cfg: RetryConfig
): Promise<T> {
  const delayFn = cfg.delay ?? defaultDelay;
  let attempt = 0;
  while (true) {
    const result = await fn();
    if (result.ok) return result.value;
    const shouldRetry = attempt < cfg.maxAttempts && RETRIABLE_STATUS.has(result.status);
    if (!shouldRetry) return result.finalize();
    const backoff = result.retryAfterMs ?? jitter(cfg.baseDelayMs * 2 ** attempt);
    await delayFn(backoff);
    attempt++;
  }
}

/** Parses an HTTP `Retry-After` header value into milliseconds. */
export function parseRetryAfter(header: string | null): number | null {
  if (!header) return null;
  const seconds = Number(header);
  if (!Number.isNaN(seconds) && seconds >= 0) return seconds * 1000;
  const date = Date.parse(header);
  if (!Number.isNaN(date)) {
    const ms = date - Date.now();
    return ms > 0 ? ms : 0;
  }
  return null;
}

function jitter(ms: number): number {
  return Math.floor(ms * (0.5 + Math.random()));
}

function defaultDelay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
