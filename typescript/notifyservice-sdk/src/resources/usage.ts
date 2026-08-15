import { fetchJson, type HttpContext } from "../http.js";

/** Response from `GET /v1/usage` — the current billing period's send usage for the environment. */
export interface UsageResponse {
  /** The plan the environment is on, e.g. `"free"`. */
  plan: string;
  /** ISO-8601 start of the current usage period. */
  periodStart: string;
  /** ISO-8601 end of the current usage period. */
  periodEnd: string;
  /** Sends included in the plan, or `null` when unlimited. */
  includedSends: number | null;
  /** Sends consumed so far in the current period. */
  usedSends: number;
  /** Sends remaining in the current period, or `null` when unlimited. */
  remainingSends: number | null;
  /** Whether the plan enforces a hard limit once `includedSends` is exhausted. */
  hardLimit: boolean;
  /** Sends consumed in the current period, broken down by channel. */
  byChannel: Record<string, number>;
}

/** The `/v1/usage` resource — inspect the current period's send usage. */
export interface UsageResource {
  /** Fetch the current billing period's send usage for the environment. */
  get(): Promise<UsageResponse>;
}

export function usageResource(ctx: HttpContext): UsageResource {
  return {
    async get() {
      const { data } = await fetchJson<UsageResponse>(ctx, {
        method: "GET",
        path: "/v1/usage",
      });
      return data;
    },
  };
}
