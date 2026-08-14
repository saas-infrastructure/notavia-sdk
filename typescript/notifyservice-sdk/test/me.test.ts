import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

describe("me resource", () => {
  it("GET /v1/me returns the camelCased tenant context", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 200,
      body: {
        organization_id: "00000000-0000-0000-0000-000000000001",
        environment_id: "00000000-0000-0000-0000-000000000002",
        environment_kind: "test",
        key_id: "00000000-0000-0000-0000-000000000003",
        key_scope: "full_access",
        key_type: "secret",
      },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    const me = await notify.me.get();
    expect(calls[0].url).toBe("https://api.example.com/v1/me");
    expect(me.organizationId).toBe("00000000-0000-0000-0000-000000000001");
    expect(me.environmentKind).toBe("test");
    expect(me.keyScope).toBe("full_access");
    expect(me.keyType).toBe("secret");
  });
});
