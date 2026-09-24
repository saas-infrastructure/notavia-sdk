import { InboxAuthError } from "./errors.js";

export interface TokenStore {
  current(): string;
  schedule(): void;
  refresh(): Promise<string>;
  dispose(): void;
}

interface JwtClaims {
  exp: number;
}

const REFRESH_LEAD_SECONDS = 60;

export function createTokenStore(
  initial: string,
  refreshToken: (() => Promise<string>) | undefined,
  onError: (err: Error) => void,
): TokenStore {
  let token = initial;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let inFlight: Promise<string> | null = null;
  let disposed = false;

  function parseExp(jwt: string): number | null {
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1]!.replace(/-/g, "+").replace(/_/g, "/"))) as JwtClaims;
      return typeof payload.exp === "number" ? payload.exp : null;
    } catch {
      return null;
    }
  }

  function schedule(): void {
    if (disposed) return;
    if (timer) { clearTimeout(timer); timer = null; }
    if (!refreshToken) return;

    const exp = parseExp(token);
    if (exp === null) return;

    const nowSec = Date.now() / 1000;
    const delaySec = Math.max(0, exp - nowSec - REFRESH_LEAD_SECONDS);
    timer = setTimeout(() => {
      void refresh().catch(() => {});
    }, delaySec * 1000);
  }

  async function refresh(): Promise<string> {
    if (disposed) throw new InboxAuthError("disposed", "token store is disposed");
    if (!refreshToken) throw new InboxAuthError("no_refresh_callback");

    if (inFlight) return inFlight;
    inFlight = (async () => {
      try {
        const next = await refreshToken();
        if (!next) throw new InboxAuthError("refresh_returned_empty");
        token = next;
        schedule();
        return token;
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      } finally {
        inFlight = null;
      }
    })();
    return inFlight;
  }

  return {
    current: () => token,
    schedule,
    refresh,
    dispose: () => {
      disposed = true;
      if (timer) { clearTimeout(timer); timer = null; }
    },
  };
}
