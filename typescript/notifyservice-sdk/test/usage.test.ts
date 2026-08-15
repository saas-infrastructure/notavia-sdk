import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

const USAGE_RESPONSE = {
  plan: "free",
  period_start: "2026-06-01T00:00:00+00:00",
  period_end: "2026-06-30T23:59:59+00:00",
  included_sends: 1000,
  used_sends: 342,
  remaining_sends: 658,
  hard_limit: true,
  by_channel: { email: 300, sms: 42 },
};

describe("usage.get", () => {
  it("GETs /v1/usage and returns the camelCased usage snapshot", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: USAGE_RESPONSE });
    const notify = createNotifyClient({ apiKey: "ns_test_x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.usage.get();

    expect(calls[0].method).toBe("GET");
    expect(calls[0].url).toBe("https://api.example.com/v1/usage");
    expect(calls[0].headers["authorization"]).toBe("Bearer ns_test_x");
    expect(result.plan).toBe("free");
    expect(result.periodStart).toBe("2026-06-01T00:00:00+00:00");
    expect(result.periodEnd).toBe("2026-06-30T23:59:59+00:00");
    expect(result.includedSends).toBe(1000);
    expect(result.usedSends).toBe(342);
    expect(result.remainingSends).toBe(658);
    expect(result.hardLimit).toBe(true);
    expect(result.byChannel.email).toBe(300);
    expect(result.byChannel.sms).toBe(42);
  });

  it("preserves null included_sends/remaining_sends as null (unlimited plan)", async () => {
    const { fetch: f } = mockFetch({
      status: 200,
      body: { ...USAGE_RESPONSE, included_sends: null, remaining_sends: null, hard_limit: false },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f, retries: { enabled: false } });

    const result = await notify.usage.get();

    expect(result.includedSends).toBeNull();
    expect(result.remainingSends).toBeNull();
    expect(result.hardLimit).toBe(false);
    expect(result.usedSends).toBe(342);
  });
});
