import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

describe("createNotifyClient", () => {
  it("rejects missing apiKey", () => {
    expect(() =>
      createNotifyClient({ apiKey: "", baseUrl: "https://api.example.com" })
    ).toThrow(/apiKey.*required/i);
  });

  it("rejects a relative baseUrl", () => {
    expect(() =>
      createNotifyClient({ apiKey: "x", baseUrl: "not-a-url" })
    ).toThrow(/baseUrl/i);
  });

  it("applies default baseUrl when omitted", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: { organization_id: "00000000-0000-0000-0000-000000000001", environment_id: "00000000-0000-0000-0000-000000000002", environment_kind: "test", key_id: "00000000-0000-0000-0000-000000000003", key_scope: "full_access", key_type: "secret" } });
    const notify = createNotifyClient({ apiKey: "ns_test_x", fetch: f });
    await notify.me.get();
    expect(calls[0].url).toBe("https://api.notavia.saas-infrastructure.com/v1/me");
  });

  it("returns a client with all three resources", () => {
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com" });
    expect(typeof notify.notifications.send).toBe("function");
    expect(typeof notify.templates.create).toBe("function");
    expect(typeof notify.me.get).toBe("function");
  });
});
