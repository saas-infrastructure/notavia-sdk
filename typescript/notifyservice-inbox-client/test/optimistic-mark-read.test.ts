import { describe, expect, it } from "vitest";
import { createInboxClient } from "../src/client.js";
import { FakeFetch } from "./helpers/fake-fetch.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("optimistic mark-read", () => {
  it("emits predicted read event immediately, replaces with server result", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/feed?limit=1", () => ff.json({
      data: [], next_cursor: null, unread_count: 5,
    }));
    ff.whenUrl("POST", "/inbox/v1/notifications/abc/read", () =>
      ff.json({ id: "abc", subject: "x", html_body: null, text_body: null, action_url: null, created_at: "2026-05-27T00:00:00Z", read_at: "2026-05-27T10:00:00Z", data: null }));

    const client = createInboxClient({
      baseUrl: "https://api.test", publishableKey: "pk", token: fakeJwt(3600), fetch: ff.asFetch,
    });
    await client.feed({ limit: 1 });

    const reads: Array<{ id: string; readAt: string; unreadCount: number }> = [];
    client.on("notification.read", (e) => reads.push(e));
    await client.markRead("abc");

    expect(reads.length).toBeGreaterThanOrEqual(2);
    expect(reads[0]!.unreadCount).toBe(4);
    expect(reads[reads.length - 1]!.readAt).toBe("2026-05-27T10:00:00Z");
  });

  it("rolls back unread count and re-emits on failure", async () => {
    const ff = new FakeFetch();
    ff.whenUrl("GET", "/inbox/v1/feed?limit=1", () => ff.json({
      data: [], next_cursor: null, unread_count: 5,
    }));
    ff.whenUrl("POST", "/inbox/v1/notifications/abc/read", () => new Response("", { status: 500 }));

    const client = createInboxClient({
      baseUrl: "https://api.test", publishableKey: "pk", token: fakeJwt(3600), fetch: ff.asFetch,
    });
    await client.feed({ limit: 1 });

    const counts: number[] = [];
    client.on("unread-count.changed", (c) => counts.push(c));
    await expect(client.markRead("abc")).rejects.toThrow();
    expect(counts).toEqual([4, 5]);
  });
});
