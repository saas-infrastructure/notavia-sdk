import { fetchJson, type HttpContext } from "../http.js";
import type { PromotionResult } from "./promotion.js";

/** Body of `POST /v1/templates`. */
export interface CreateTemplateRequest {
  key: string;
  name: string;
  subjectTemplate: string;
  htmlBodyTemplate: string;
  textBodyTemplate?: string;
}

/** Body of `PATCH /v1/templates/{key}`. Omit fields to leave them unchanged. */
export interface UpdateTemplateRequest {
  name?: string;
  subjectTemplate?: string;
  htmlBodyTemplate?: string;
  textBodyTemplate?: string;
}

/** Server-side representation of a template. */
export interface TemplateResponse {
  id: string;
  key: string;
  name: string;
  subjectTemplate: string;
  htmlBodyTemplate: string;
  textBodyTemplate: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Query parameters for {@link TemplatesResource.list}. */
export interface ListTemplatesOptions {
  /** Page size. Defaults to 20. */
  limit?: number;
  /** Cursor from a previous page's `nextCursor`. */
  cursor?: string;
}

/** One page of templates. */
export interface TemplatePage {
  data: TemplateResponse[];
  nextCursor: string | null;
}

/** Result of {@link TemplatesResource.render}. */
export interface RenderResult {
  subject: string;
  htmlBody: string;
  textBody: string | null;
}

/** The `/v1/templates` resource. */
export interface TemplatesResource {
  /** Create a template in the current environment. */
  create(request: CreateTemplateRequest): Promise<TemplateResponse>;
  /** Fetch a template by its stable key. */
  get(key: string): Promise<TemplateResponse>;
  /** List templates in the current environment, paged by cursor. */
  list(options?: ListTemplatesOptions): Promise<TemplatePage>;
  /** Patch fields on an existing template. Omitted fields are left unchanged. */
  update(key: string, request: UpdateTemplateRequest): Promise<TemplateResponse>;
  /** Delete a template by key. */
  delete(key: string): Promise<void>;
  /** Render a template with sample data. Does not send anything. */
  render(key: string, data: Record<string, unknown> | null): Promise<RenderResult>;
  /**
   * Promotes a Test-environment template to the Live environment.
   *
   * @param key - The stable template key to promote.
   * @param options - Optional `dryRun` flag — when `true` the server returns the diff without writing.
   * @returns A {@link PromotionResult} describing what was (or would be) changed.
   */
  promote(key: string, options?: { dryRun?: boolean }): Promise<PromotionResult>;
}

export function templatesResource(ctx: HttpContext): TemplatesResource {
  return {
    async create(request) {
      const { data } = await fetchJson<TemplateResponse>(ctx, {
        method: "POST",
        path: "/v1/templates",
        body: request,
      });
      return data;
    },

    async get(key) {
      const { data } = await fetchJson<TemplateResponse>(ctx, {
        method: "GET",
        path: `/v1/templates/${encodeURIComponent(key)}`,
      });
      return data;
    },

    async list(options) {
      const params = new URLSearchParams();
      if (options?.limit !== undefined) params.set("limit", String(options.limit));
      if (options?.cursor) params.set("cursor", options.cursor);
      const qs = params.toString();
      const { data } = await fetchJson<TemplatePage>(ctx, {
        method: "GET",
        path: "/v1/templates" + (qs ? "?" + qs : ""),
      });
      return data;
    },

    async update(key, request) {
      const { data } = await fetchJson<TemplateResponse>(ctx, {
        method: "PATCH",
        path: `/v1/templates/${encodeURIComponent(key)}`,
        body: request,
      });
      return data;
    },

    async delete(key) {
      await fetchJson<void>(ctx, {
        method: "DELETE",
        path: `/v1/templates/${encodeURIComponent(key)}`,
      });
    },

    async render(key, data) {
      const { data: result } = await fetchJson<RenderResult>(ctx, {
        method: "POST",
        path: `/v1/templates/${encodeURIComponent(key)}/render`,
        body: { data },
      });
      return result;
    },

    async promote(key, options) {
      const { data } = await fetchJson<PromotionResult>(ctx, {
        method: "POST",
        path: `/v1/templates/${encodeURIComponent(key)}/promote`,
        body: { dryRun: options?.dryRun },
      });
      return data;
    },
  };
}
