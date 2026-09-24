import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { NotifyApiError } from "../src/errors.js";
import { mockFetch } from "./helpers/mockFetch.js";

describe("error translation", () => {
  it("parses structured ErrorEnvelope and surfaces statusCode + code + requestId", async () => {
    const { fetch: f } = mockFetch({
      status: 400,
      body: { error: { type: "invalid_request_error", code: "parameter_invalid", message: "Channel unsupported", param: "channel" } },
      headers: { "X-Request-Id": "req_abc" },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await expect(
      notify.notifications.send({ channel: "email" as const, recipient: { address: "a@b.com" } })
    ).rejects.toMatchObject({
      name: "NotifyApiError",
      statusCode: 400,
      error: { code: "parameter_invalid", param: "channel" },
      requestId: "req_abc",
    });
  });

  it("instanceof NotifyApiError works", async () => {
    const { fetch: f } = mockFetch({
      status: 404,
      body: { error: { type: "not_found", code: "template_not_found", message: "Unknown template", param: null } },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });
    try {
      await notify.templates.get("does-not-exist");
      throw new Error("expected throw");
    } catch (e) {
      expect(e).toBeInstanceOf(NotifyApiError);
    }
  });

  it("synthesizes transport_error when the body is not JSON", async () => {
    const { fetch: f } = mockFetch({
      status: 502,
      body: "<html>upstream broke</html>",
      contentType: "text/html",
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    await expect(notify.notifications.get("11111111-1111-1111-1111-111111111111"))
      .rejects.toMatchObject({
        statusCode: 502,
        error: { type: "transport_error", code: "unparsable_response" },
      });
  });
});
