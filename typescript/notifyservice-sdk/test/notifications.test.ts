import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

const QUEUED_RESPONSE = {
  id: "11111111-1111-1111-1111-111111111111",
  channel: "email",
  status: "queued",
  recipient: { address: "alice@example.com", name: "Alice" },
  template_key: null,
  subject: "Hi",
  created_at: "2026-05-26T10:00:00+00:00",
  sent_at: null,
  attempt_count: 0,
  last_error: null,
};

describe("notifications.send", () => {
  it("POSTs to /v1/notifications with bearer auth and snake-cased body", async () => {
    const { fetch: f, calls } = mockFetch({ status: 202, body: QUEUED_RESPONSE });
    const notify = createNotifyClient({ apiKey: "ns_test_x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.notifications.send({
      channel: "email",
      recipient: { address: "alice@example.com", name: "Alice" },
      subject: "Hi",
      htmlBody: "<p>x</p>",
    });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/notifications");
    expect(calls[0].headers["authorization"]).toBe("Bearer ns_test_x");
    const body = JSON.parse(calls[0].body!);
    expect(body.html_body).toBe("<p>x</p>");
    expect(body.recipient.address).toBe("alice@example.com");
    expect(result.notification.id).toBe("11111111-1111-1111-1111-111111111111");
    expect(result.notification.recipient.address).toBe("alice@example.com");
    expect(result.wasReplayed).toBe(false);
  });

  it("sets Idempotency-Key only when idempotencyKey is provided", async () => {
    const { fetch: f, calls } = mockFetch(
      { status: 202, body: QUEUED_RESPONSE },
      { status: 202, body: QUEUED_RESPONSE }
    );
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await notify.notifications.send(
      { channel: "email", recipient: { address: "a@b.com" }, subject: "S", htmlBody: "x" },
      { idempotencyKey: "abc-123" }
    );
    await notify.notifications.send(
      { channel: "email", recipient: { address: "a@b.com" }, subject: "S", htmlBody: "x" }
    );

    expect(calls[0].headers["idempotency-key"]).toBe("abc-123");
    expect(calls[1].headers["idempotency-key"]).toBeUndefined();
  });

  it("wasReplayed is true when server returns 200", async () => {
    const { fetch: f } = mockFetch({ status: 200, body: QUEUED_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });
    const result = await notify.notifications.send(
      { channel: "email", recipient: { address: "a@b.com" }, subject: "S", htmlBody: "x" },
      { idempotencyKey: "k" }
    );
    expect(result.wasReplayed).toBe(true);
  });
});

describe("notifications.get", () => {
  it("URL-encodes the id and parses snake-cased response", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: QUEUED_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    const r = await notify.notifications.get("11111111-1111-1111-1111-111111111111");
    expect(calls[0].method).toBe("GET");
    expect(calls[0].url).toBe("https://api.example.com/v1/notifications/11111111-1111-1111-1111-111111111111");
    expect(r.attemptCount).toBe(0);
    expect(r.recipient.address).toBe("alice@example.com");
  });
});

describe("notifications.send with attachments", () => {
  it("serializes attachments with snake_case keys (contentBase64 → content_base64)", async () => {
    const { fetch: f, calls } = mockFetch({ status: 202, body: QUEUED_RESPONSE });
    const notify = createNotifyClient({ apiKey: "ns_test_x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await notify.notifications.send({
      channel: "email",
      recipient: { address: "alice@example.com" },
      subject: "Invoice",
      htmlBody: "<p>See attached.</p>",
      attachments: [
        { filename: "invoice.pdf", contentType: "application/pdf", contentBase64: "SGVsbG8gV29ybGQ=" },
      ],
    });

    const body = JSON.parse(calls[0].body!);
    expect(body.attachments).toHaveLength(1);
    expect(body.attachments[0].filename).toBe("invoice.pdf");
    expect(body.attachments[0].content_type).toBe("application/pdf");
    expect(body.attachments[0].content_base64).toBe("SGVsbG8gV29ybGQ=");
    expect(body.attachments[0].contentBase64).toBeUndefined();
  });

  it("omits attachments field when not provided", async () => {
    const { fetch: f, calls } = mockFetch({ status: 202, body: QUEUED_RESPONSE });
    const notify = createNotifyClient({ apiKey: "ns_test_x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await notify.notifications.send({
      channel: "email",
      recipient: { address: "alice@example.com" },
      subject: "Hello",
      htmlBody: "<p>Hi</p>",
    });

    const body = JSON.parse(calls[0].body!);
    expect(body.attachments).toBeUndefined();
  });

  it("deserializes attachment metadata with camelCase keys (size_bytes → sizeBytes)", async () => {
    const responseWithAttachments = {
      ...QUEUED_RESPONSE,
      status: "sent",
      sent_at: "2026-06-15T10:00:05+00:00",
      attachments: [
        { filename: "invoice.pdf", content_type: "application/pdf", size_bytes: 12345, purged: true },
      ],
    };
    const { fetch: f } = mockFetch({ status: 202, body: responseWithAttachments });
    const notify = createNotifyClient({ apiKey: "ns_test_x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.notifications.send({
      channel: "email",
      recipient: { address: "alice@example.com" },
      subject: "Invoice",
      htmlBody: "<p>See attached.</p>",
    });

    expect(result.notification.attachments).toHaveLength(1);
    expect(result.notification.attachments![0].filename).toBe("invoice.pdf");
    expect(result.notification.attachments![0].contentType).toBe("application/pdf");
    expect(result.notification.attachments![0].sizeBytes).toBe(12345);
    expect(result.notification.attachments![0].purged).toBe(true);
  });
});

describe("notifications.list", () => {
  it("builds the right query string", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: { data: [QUEUED_RESPONSE], next_cursor: "abc" } });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    const page = await notify.notifications.list({
      status: "queued",
      recipient: "alice@example.com",
      createdAfter: "2026-05-26T00:00:00Z",
      createdBefore: "2026-05-26T23:59:59Z",
      limit: 50,
      cursor: "c1",
    });

    const url = new URL(calls[0].url);
    expect(url.pathname).toBe("/v1/notifications");
    expect(url.searchParams.get("status")).toBe("queued");
    expect(url.searchParams.get("recipient")).toBe("alice@example.com");
    expect(url.searchParams.get("created_after")).toBe("2026-05-26T00:00:00Z");
    expect(url.searchParams.get("created_before")).toBe("2026-05-26T23:59:59Z");
    expect(url.searchParams.get("limit")).toBe("50");
    expect(url.searchParams.get("cursor")).toBe("c1");
    expect(page.data[0].id).toBe("11111111-1111-1111-1111-111111111111");
    expect(page.nextCursor).toBe("abc");
  });

  it("omits the query string entirely when no options are provided", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: { data: [], next_cursor: null } });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });
    await notify.notifications.list();
    expect(calls[0].url).toBe("https://api.example.com/v1/notifications");
  });
});
