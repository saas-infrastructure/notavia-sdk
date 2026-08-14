import { describe, expect, it, vi } from "vitest";
import { createInboxClient } from "../src/client.js";
import { InboxAuthError } from "../src/errors.js";
import { FakeFetch } from "./helpers/fake-fetch.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("auth — 401 + refresh + retry", () => {
  it("retries once after refreshToken on 401, succeeds on second attempt", async () => {
    const ff = new FakeFetch();
    let calls = 0;
    ff.whenUrl("GET", "/inbox/v1/unread-count", () => {
      calls++;
      return calls === 1 ? new Response("", { status: 401 }) : ff.json({ unread_count: 4 });
    });
    const refreshToken = vi.fn(async () => fakeJwt(3600));
    const client = createInboxClient({
      baseUrl: "https://api.test",
      publishableKey: "pk_test_abc",
      token: fakeJwt(3600),
      refreshToken,
      fetch: ff.asFetch,
    });
    expect(await client.unreadCount()).toBe(4);
    expect(refreshToken).toHaveBeenCalledTimes(1);
  });

  it("throws InboxAuthError on second consecutive 401", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/unread-count", () => new Response("", { status: 401 }));
    const errors: Error[] = [];
    const client = createInboxClient({
      baseUrl: "https://api.test",
      publishableKey: "pk",
      token: fakeJwt(3600),
      refreshToken: async () => fakeJwt(3600),
      fetch: ff.asFetch,
    });
    client.on("error", (e) => errors.push(e));
    await expect(client.unreadCount()).rejects.toBeInstanceOf(InboxAuthError);
  });

  it("emits error and rejects when refreshToken throws on 401", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/unread-count", () => new Response("", { status: 401 }));
    const errors: Error[] = [];
    const client = createInboxClient({
      baseUrl: "https://api.test",
      publishableKey: "pk",
      token: fakeJwt(3600),
      refreshToken: async () => { throw new Error("refresh boom"); },
      fetch: ff.asFetch,
    });
    client.on("error", (e) => errors.push(e));
    await expect(client.unreadCount()).rejects.toThrow();
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });
});
