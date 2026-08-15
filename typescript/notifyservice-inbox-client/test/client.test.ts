import { describe, expect, it } from "vitest";
import { createInboxClient } from "../src/client.js";
import { FakeFetch } from "./helpers/fake-fetch.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("createInboxClient — REST surface", () => {
  function setup() {
    const ff = new FakeFetch();
    const client = createInboxClient({
      baseUrl: "https://api.test",
      publishableKey: "pk_test_abc",
      token: fakeJwt(3600),
      fetch: ff.asFetch,
    });
    return { ff, client };
  }

  it("feed() GETs /inbox/v1/feed with snake_case query and snake-cased response", async () => {
    const { ff, client } = setup();
    ff.whenUrl("GET", "/inbox/v1/feed?limit=20&status=unread", () =>
      ff.json({
        data: [{ id: "i1", subject: "hi", html_body: null, text_body: null, action_url: null, created_at: "2026-05-27T00:00:00Z", read_at: null, data: null }],
        next_cursor: null,
        unread_count: 1,
      }));
    const page = await client.feed({ limit: 20, status: "unread" });
    expect(page.unreadCount).toBe(1);
    expect(page.data[0]!.id).toBe("i1");
    expect(ff.calls[0]!.headers["x-notifyservice-publishable-key"]).toBe("pk_test_abc");
    expect(ff.calls[0]!.headers["authorization"]).toMatch(/^Bearer /);
  });

  it("unreadCount() returns the count", async () => {
    const { ff, client } = setup();
    ff.whenUrl("GET", "/inbox/v1/unread-count", () => ff.json({ unread_count: 7 }));
    expect(await client.unreadCount()).toBe(7);
  });

  it("get(id) returns a single item", async () => {
    const { ff, client } = setup();
    ff.whenUrl("GET", "/inbox/v1/notifications/abc", () =>
      ff.json({ id: "abc", subject: "s", html_body: null, text_body: null, action_url: "/x", created_at: "2026-05-27T00:00:00Z", read_at: null, data: null }));
    const item = await client.get("abc");
    expect(item.actionUrl).toBe("/x");
  });

  it("markAllRead() POSTs the snake_case body and updates unread count", async () => {
    const { ff, client } = setup();
    ff.whenUrl("POST", "/inbox/v1/notifications/mark-all-read", () =>
      ff.json({ marked_count: 3, unread_count: 0 }));
    const res = await client.markAllRead("2026-05-27T00:00:00Z");
    expect(res.markedCount).toBe(3);
    expect(res.unreadCount).toBe(0);
    expect(ff.calls[0]!.body).toEqual({ before: "2026-05-27T00:00:00Z" });
  });
});
