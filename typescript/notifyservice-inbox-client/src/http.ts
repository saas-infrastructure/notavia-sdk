import { toCamel, toSnake } from "./case.js";
import { InboxAuthError, InboxNetworkError } from "./errors.js";
import type { TokenStore } from "./token-store.js";

export interface HttpContext {
  baseUrl: string;
  publishableKey: string;
  tokens: TokenStore;
  fetchImpl: typeof fetch;
}

export async function httpJson<T>(
  ctx: HttpContext,
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const url = `${ctx.baseUrl}${path}`;
  const init = (jwt: string): RequestInit => ({
    method,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "X-NotifyService-Publishable-Key": ctx.publishableKey,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(toSnake(body)) } : {}),
  });

  let response = await ctx.fetchImpl(url, init(ctx.tokens.current()));
  if (response.status === 401) {
    try { await ctx.tokens.refresh(); }
    catch (err) { throw err instanceof InboxAuthError ? err : new InboxAuthError("refresh_failed"); }
    response = await ctx.fetchImpl(url, init(ctx.tokens.current()));
    if (response.status === 401) throw new InboxAuthError("unauthorized");
  }

  if (!response.ok) {
    let parsed: unknown;
    try { parsed = await response.json(); } catch { /* non-JSON */ }
    throw new InboxNetworkError(
      `Inbox request ${method} ${path} failed with ${response.status}`,
      response.status,
      parsed,
    );
  }

  if (response.status === 204) return undefined as T;
  const raw = await response.json();
  return toCamel(raw) as T;
}
