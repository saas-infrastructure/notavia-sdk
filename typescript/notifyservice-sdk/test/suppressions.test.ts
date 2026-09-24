import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

const SUPPRESSION_RESPONSE = {
  id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  address: "bounce@example.com",
  reason: "hard_bounce",
  source: "delivery_feedback",
  diagnostic_detail: "550 5.1.1 User unknown",
  triggering_notification_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  suppressed_at: "2026-05-30T10:00:00+00:00",
};

describe("suppressions.add", () => {
  it("POSTs to /v1/suppressions with the address in the body (status 201)", async () => {
    const { fetch: f, calls } = mockFetch({ status: 201, body: SUPPRESSION_RESPONSE });
    const notify = createNotifyClient({ apiKey: "ns_test_x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.suppressions.add("bounce@example.com");

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/suppressions");
    expect(calls[0].headers["authorization"]).toBe("Bearer ns_test_x");
    const body = JSON.parse(calls[0].body!);
    expect(body.address).toBe("bounce@example.com");
    expect(result.id).toBe("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    expect(result.address).toBe("bounce@example.com");
    expect(result.reason).toBe("hard_bounce");
    expect(result.diagnosticDetail).toBe("550 5.1.1 User unknown");
    expect(result.triggeringNotificationId).toBe("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
    expect(result.suppressedAt).toBe("2026-05-30T10:00:00+00:00");
  });

  it("also succeeds when the server returns 200 (already existed)", async () => {
    const { fetch: f } = mockFetch({ status: 200, body: SUPPRESSION_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.suppressions.add("bounce@example.com");
    expect(result.id).toBe("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
  });
});

describe("suppressions.list", () => {
  it("GETs /v1/suppressions with the right query string", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 200,
      body: { data: [SUPPRESSION_RESPONSE], has_more: true, next_cursor: "cur1" },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const page = await notify.suppressions.list({
      address: "bounce@example.com",
      reason: "hard_bounce",
      limit: 10,
      cursor: "prev",
    });

    expect(calls[0].method).toBe("GET");
    const url = new URL(calls[0].url);
    expect(url.pathname).toBe("/v1/suppressions");
    expect(url.searchParams.get("address")).toBe("bounce@example.com");
    expect(url.searchParams.get("reason")).toBe("hard_bounce");
    expect(url.searchParams.get("limit")).toBe("10");
    expect(url.searchParams.get("cursor")).toBe("prev");
    expect(page.data[0].id).toBe("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    expect(page.hasMore).toBe(true);
    expect(page.nextCursor).toBe("cur1");
  });

  it("omits the query string when no options are provided", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: { data: [], has_more: false, next_cursor: null } });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await notify.suppressions.list();
    expect(calls[0].url).toBe("https://api.example.com/v1/suppressions");
  });
});

describe("suppressions.get", () => {
  it("URL-encodes the address and returns the suppression", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: SUPPRESSION_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.suppressions.get("bounce@example.com");

    expect(calls[0].method).toBe("GET");
    expect(calls[0].url).toBe("https://api.example.com/v1/suppressions/bounce%40example.com");
    expect(result).not.toBeNull();
    expect(result!.id).toBe("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    expect(result!.source).toBe("delivery_feedback");
  });

  it("returns null when the server responds with 404", async () => {
    const { fetch: f } = mockFetch({
      status: 404,
      body: { error: { type: "not_found_error", code: "suppression_not_found", message: "Not found.", param: null } },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.suppressions.get("unknown@example.com");
    expect(result).toBeNull();
  });
});

describe("suppressions.remove", () => {
  it("DELETEs the URL-encoded address", async () => {
    const { fetch: f, calls } = mockFetch({ status: 204 });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await notify.suppressions.remove("bounce@example.com");

    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url).toBe("https://api.example.com/v1/suppressions/bounce%40example.com");
  });

  it("resolves void without throwing when the server responds with 404", async () => {
    const { fetch: f } = mockFetch({
      status: 404,
      body: { error: { type: "not_found_error", code: "suppression_not_found", message: "Not found.", param: null } },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await expect(notify.suppressions.remove("unknown@example.com")).resolves.toBeUndefined();
  });
});
