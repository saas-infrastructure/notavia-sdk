import { fetchJson, type HttpContext } from "../http.js";
import { NotifyApiError } from "../errors.js";

/** Server-side representation of a suppression. */
export interface SuppressionResponse {
  id: string;
  address: string;
  reason: string;
  source: string;
  diagnosticDetail: string | null;
  triggeringNotificationId: string | null;
  suppressedAt: string;
}

/** Query parameters for {@link SuppressionsResource.list}. */
export interface ListSuppressionsOptions {
  address?: string;
  reason?: string;
  /** Page size. */
  limit?: number;
  /** Cursor from a previous page's `nextCursor`. */
  cursor?: string;
}

/** One page of suppressions. */
export interface SuppressionPage {
  data: SuppressionResponse[];
  hasMore: boolean;
  nextCursor: string | null;
}

/** The `/v1/suppressions` resource. */
export interface SuppressionsResource {
  /** List suppressions in the current environment, paged by cursor. */
  list(options?: ListSuppressionsOptions): Promise<SuppressionPage>;
  /** Fetch a suppression by email address. Returns null if not found. */
  get(address: string): Promise<SuppressionResponse | null>;
  /** Add a suppression for the given address. Returns the suppression (201 created or 200 already existed). */
  add(address: string): Promise<SuppressionResponse>;
  /** Remove a suppression for the given address. Resolves void — tolerates 404. */
  remove(address: string): Promise<void>;
}

export function suppressionsResource(ctx: HttpContext): SuppressionsResource {
  return {
    async list(options) {
      const qs = buildQuery(options);
      const { data } = await fetchJson<SuppressionPage>(ctx, {
        method: "GET",
        path: "/v1/suppressions" + qs,
      });
      return data;
    },

    async get(address) {
      try {
        const { data } = await fetchJson<SuppressionResponse>(ctx, {
          method: "GET",
          path: `/v1/suppressions/${encodeURIComponent(address)}`,
        });
        return data;
      } catch (err) {
        if (err instanceof NotifyApiError && err.statusCode === 404) return null;
        throw err;
      }
    },

    async add(address) {
      const { data } = await fetchJson<SuppressionResponse>(ctx, {
        method: "POST",
        path: "/v1/suppressions",
        body: { address },
      });
      return data;
    },

    async remove(address) {
      try {
        await fetchJson<void>(ctx, {
          method: "DELETE",
          path: `/v1/suppressions/${encodeURIComponent(address)}`,
        });
      } catch (err) {
        if (err instanceof NotifyApiError && err.statusCode === 404) return;
        throw err;
      }
    },
  };
}

function buildQuery(o: ListSuppressionsOptions | undefined): string {
  if (!o) return "";
  const params = new URLSearchParams();
  if (o.address) params.set("address", o.address);
  if (o.reason) params.set("reason", o.reason);
  if (o.limit !== undefined) params.set("limit", String(o.limit));
  if (o.cursor) params.set("cursor", o.cursor);
  const s = params.toString();
  return s ? "?" + s : "";
}
