import { toCamel, toSnake } from "./case.js";
import { NotifyApiError, type ErrorBody, type ErrorEnvelope } from "./errors.js";
import type { NotifyClientOptions, RetryOptions } from "./options.js";
import { parseRetryAfter, withRetry } from "./retry.js";

/** Internal HTTP context shared by all resources. */
export interface HttpContext {
  baseUrl: string;
  apiKey: string;
  timeoutMs: number;
  retries: Required<RetryOptions>;
  fetchImpl: typeof fetch;
}

/** Validates options + applies defaults. Throws if `apiKey` is missing or `baseUrl` is not absolute. */
export function buildHttpContext(options: NotifyClientOptions): HttpContext {
  if (!options.apiKey) throw new Error("NotifyClientOptions.apiKey is required.");

  const baseUrl = (options.baseUrl ?? "https://api.notavia.saas-infrastructure.com").replace(/\/$/, "");
  try {
    const u = new URL(baseUrl);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      throw new Error("NotifyClientOptions.baseUrl must be an http(s) URL.");
    }
  } catch {
    throw new Error("NotifyClientOptions.baseUrl must be an absolute URL.");
  }

  const fetchImpl = options.fetch ?? globalThis.fetch;
  if (!fetchImpl) {
    throw new Error("No fetch implementation available. Node 20+ provides one globally.");
  }

  return {
    baseUrl,
    apiKey: options.apiKey,
    timeoutMs: options.timeoutMs ?? 30_000,
    retries: {
      enabled: options.retries?.enabled ?? true,
      maxAttempts: options.retries?.maxAttempts ?? 3,
    },
    fetchImpl,
  };
}

export interface RequestSpec {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  extraHeaders?: Record<string, string>;
}

/** Sends a request and returns the parsed (camelCased) JSON body. Throws {@link NotifyApiError} on non-2xx. */
export async function fetchJson<T>(ctx: HttpContext, req: RequestSpec): Promise<{ status: number; data: T }> {
  const url = ctx.baseUrl + req.path;

  const buildInit = (): RequestInit => {
    const headers: Record<string, string> = {
      "Authorization": `Bearer ${ctx.apiKey}`,
      "Accept": "application/json",
      "User-Agent": `notifyservice-sdk/${PKG_VERSION} (node)`,
    };
    if (req.body !== undefined) headers["Content-Type"] = "application/json";
    if (req.extraHeaders) Object.assign(headers, req.extraHeaders);
    return {
      method: req.method,
      headers,
      body: req.body !== undefined ? JSON.stringify(toSnake(req.body)) : undefined,
      signal: AbortSignal.timeout(ctx.timeoutMs),
    };
  };

  const attempt = async () => {
    const response = await ctx.fetchImpl(url, buildInit());
    if (response.ok) {
      if (response.status === 204) {
        return { ok: true as const, value: { status: 204, data: undefined as unknown as T } };
      }
      const json = await response.json();
      return { ok: true as const, value: { status: response.status, data: toCamel(json) as T } };
    }
    const retryAfterMs = parseRetryAfter(response.headers.get("retry-after"));
    return {
      ok: false as const,
      status: response.status,
      retryAfterMs,
      finalize: () => throwApiError(response),
    };
  };

  const maxAttempts = ctx.retries.enabled ? ctx.retries.maxAttempts : 0;
  return withRetry(attempt, { maxAttempts, baseDelayMs: 200 });
}

async function throwApiError(response: Response): Promise<never> {
  const requestId = response.headers.get("x-request-id");
  let body: ErrorBody;
  try {
    const envelope = (await response.json()) as ErrorEnvelope;
    body = envelope?.error ?? synthesize(response, "");
  } catch {
    const raw = await response.text().catch(() => "");
    body = synthesize(response, raw);
  }
  throw new NotifyApiError(response.status, body, requestId);
}

function synthesize(r: Response, raw: string): ErrorBody {
  const message = raw ? raw.slice(0, 512) : (r.statusText || "no body");
  return { type: "transport_error", code: "unparsable_response", message, param: null };
}
