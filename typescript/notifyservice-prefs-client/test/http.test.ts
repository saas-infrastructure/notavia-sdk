import { describe, expect, it } from "vitest";
import { httpJson } from "../src/http.js";
import { PrefsAuthError, PrefsServerError } from "../src/errors.js";
import { createTokenStore } from "../src/token-store.js";
import { FakeFetch } from "./helpers/fake-fetch.js";
import { fakeJwt } from "./helpers/jwt.js";

function makeCtx(ff: FakeFetch, token = fakeJwt(3600)) {
  const tokens = createTokenStore(token, undefined, () => {});
  return {
    baseUrl: "https://api.test",
    publishableKey: "pk_http_test",
    tokens,
    fetchImpl: ff.asFetch,
  };
}

describe("httpJson — header construction", () => {
  it("sends Authorization: Bearer <token>", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () =>
      ff.json({ data: [] }));
    const ctx = makeCtx(ff);

    await httpJson(ctx, "GET", "/inbox/v1/preferences");

    const call = ff.calls[0]!;
    expect(call.headers["authorization"]).toMatch(/^Bearer /);
    expect(call.headers["authorization"]).toContain("fake-signature");
  });

  it("sends X-NotifyService-Publishable-Key header", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => ff.json({ data: [] }));
    const ctx = makeCtx(ff);

    await httpJson(ctx, "GET", "/inbox/v1/preferences");

    expect(ff.calls[0]!.headers["x-notifyservice-publishable-key"]).toBe("pk_http_test");
  });

  it("sends Content-Type: application/json when body is provided", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("PATCH", "/inbox/v1/preferences/cat/ch", () => ff.json({}));
    const ctx = makeCtx(ff);

    await httpJson(ctx, "PATCH", "/inbox/v1/preferences/cat/ch", { optedIn: true });

    expect(ff.calls[0]!.headers["content-type"]).toBe("application/json");
  });

  it("does NOT send Content-Type when body is absent", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => ff.json({ data: [] }));
    const ctx = makeCtx(ff);

    await httpJson(ctx, "GET", "/inbox/v1/preferences");

    expect(ff.calls[0]!.headers["content-type"]).toBeUndefined();
  });

  it("snake_cases the request body", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("PATCH", "/inbox/v1/preferences/cat/ch", () => ff.json({}));
    const ctx = makeCtx(ff);

    await httpJson(ctx, "PATCH", "/inbox/v1/preferences/cat/ch", { optedIn: true });

    expect(ff.calls[0]!.body).toEqual({ opted_in: true });
  });
});

describe("httpJson — error handling", () => {
  it("throws PrefsAuthError on 401 when no refreshToken is available", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => new Response("", { status: 401 }));
    const tokens = createTokenStore(fakeJwt(3600), undefined, () => {});
    const ctx = { baseUrl: "https://api.test", publishableKey: "pk", tokens, fetchImpl: ff.asFetch };

    await expect(httpJson(ctx, "GET", "/inbox/v1/preferences"))
      .rejects.toBeInstanceOf(PrefsAuthError);
  });

  it("throws PrefsAuthError on second 401 even after refresh", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => new Response("", { status: 401 }));
    const tokens = createTokenStore(
      fakeJwt(3600),
      async () => fakeJwt(3600),
      () => {},
    );
    const ctx = { baseUrl: "https://api.test", publishableKey: "pk", tokens, fetchImpl: ff.asFetch };

    await expect(httpJson(ctx, "GET", "/inbox/v1/preferences"))
      .rejects.toBeInstanceOf(PrefsAuthError);
  });

  it("throws PrefsServerError on 500", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () =>
      new Response(JSON.stringify({ message: "boom" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      }));
    const ctx = makeCtx(ff);

    await expect(httpJson(ctx, "GET", "/inbox/v1/preferences"))
      .rejects.toBeInstanceOf(PrefsServerError);
  });

  it("PrefsServerError carries the status code", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => new Response("", { status: 503 }));
    const ctx = makeCtx(ff);

    const err = await httpJson(ctx, "GET", "/inbox/v1/preferences").catch((e) => e);
    expect(err).toBeInstanceOf(PrefsServerError);
    expect((err as PrefsServerError).status).toBe(503);
  });

  it("PrefsServerError body is undefined for non-JSON 5xx", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => new Response("plain text error", { status: 500 }));
    const ctx = makeCtx(ff);

    const err = await httpJson(ctx, "GET", "/inbox/v1/preferences").catch((e) => e);
    expect((err as PrefsServerError).body).toBeUndefined();
  });

  it("returns undefined for 204 No Content", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("DELETE", "/inbox/v1/test", () => new Response(null, { status: 204 }));
    const ctx = makeCtx(ff);

    const result = await httpJson(ctx, "DELETE", "/inbox/v1/test");
    expect(result).toBeUndefined();
  });

  it("camelCases the JSON response", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/preferences", () =>
      ff.json({
        category_key: "marketing",
        category_name: "Marketing",
        is_critical: false,
        channel: "email",
        opted_in: true,
        source: "endUser",
        updated_at: "2026-05-27T00:00:00Z",
      }));
    const ctx = makeCtx(ff);

    const res = await httpJson<{ categoryKey: string; isCritical: boolean }>(
      ctx, "GET", "/inbox/v1/preferences",
    );
    expect(res.categoryKey).toBe("marketing");
    expect(res.isCritical).toBe(false);
  });
});
