import { fetchJson, type HttpContext } from "../http.js";

/** Response from `GET /v1/me` — describes the tenant context the current API key authenticates. */
export interface MeResponse {
  organizationId: string;
  environmentId: string;
  /** `"test"` or `"live"`. */
  environmentKind: "test" | "live";
  keyId: string;
  /** `"full_access"` or `"send_only"`. */
  keyScope: "full_access" | "send_only";
  /** `"secret"` or `"publishable"`. Phase 1 always returns `"secret"`. */
  keyType: "secret" | "publishable";
}

/** The `/v1/me` resource — inspect the current API key's tenant context. */
export interface MeResource {
  /** Fetch the current API key's tenant context. */
  get(): Promise<MeResponse>;
}

export function meResource(ctx: HttpContext): MeResource {
  return {
    async get() {
      const { data } = await fetchJson<MeResponse>(ctx, {
        method: "GET",
        path: "/v1/me",
      });
      return data;
    },
  };
}
