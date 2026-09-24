import { describe, expect, it } from "vitest";
import { createPrefsClient } from "../src/client.js";
import { FakeFetch } from "./helpers/fake-fetch.js";
import { fakeJwt } from "./helpers/jwt.js";

function makeCell(overrides: Partial<{
  categoryKey: string;
  categoryName: string;
  isCritical: boolean;
  channel: string;
  optedIn: boolean;
  source: string;
  updatedAt: string;
}> = {}) {
  return {
    category_key: overrides.categoryKey ?? "marketing",
    category_name: overrides.categoryName ?? "Marketing",
    is_critical: overrides.isCritical ?? false,
    channel: overrides.channel ?? "email",
    opted_in: overrides.optedIn ?? true,
    source: overrides.source ?? "endUser",
    updated_at: overrides.updatedAt ?? "2026-05-27T00:00:00Z",
  };
}

describe("createPrefsClient — REST surface", () => {
  function setup() {
    const ff = new FakeFetch();
    const client = createPrefsClient({
      baseUrl: "https://api.test",
      publishableKey: "pk_test_abc",
      token: fakeJwt(3600),
      fetch: ff.asFetch,
    });
    return { ff, client };
  }

  it("list() GETs /inbox/v1/preferences and returns camelCase cells", async () => {
    const { ff, client } = setup();
    ff.whenUrl("GET", "/inbox/v1/preferences", () =>
      ff.json({ data: [makeCell()] }));

    const cells = await client.list();
    expect(cells).toHaveLength(1);
    expect(cells[0]!.categoryKey).toBe("marketing");
    expect(cells[0]!.categoryName).toBe("Marketing");
    expect(cells[0]!.isCritical).toBe(false);
    expect(cells[0]!.optedIn).toBe(true);
  });

  it("list() sends both required headers", async () => {
    const { ff, client } = setup();
    ff.whenUrl("GET", "/inbox/v1/preferences", () => ff.json({ data: [] }));

    await client.list();

    const call = ff.calls[0]!;
    expect(call.headers["authorization"]).toMatch(/^Bearer /);
    expect(call.headers["x-notifyservice-publishable-key"]).toBe("pk_test_abc");
  });

  it("set() PATCHes the correct URL and returns the updated cell", async () => {
    const { ff, client } = setup();
    const updated = makeCell({ optedIn: false });
    ff.whenUrl("PATCH", "/inbox/v1/preferences/marketing/email", () =>
      ff.json(updated));

    const cell = await client.set("marketing", "email", false);

    expect(cell.optedIn).toBe(false);
    expect(ff.calls[0]!.method).toBe("PATCH");
  });

  it("set() sends both required headers on the PATCH request", async () => {
    const { ff, client } = setup();
    ff.whenUrl("PATCH", "/inbox/v1/preferences/marketing/email", () =>
      ff.json(makeCell()));

    await client.set("marketing", "email", true);

    const call = ff.calls[0]!;
    expect(call.headers["authorization"]).toMatch(/^Bearer /);
    expect(call.headers["x-notifyservice-publishable-key"]).toBe("pk_test_abc");
  });

  it("set() encodes special characters in categoryKey and channel", async () => {
    const { ff, client } = setup();
    ff.when(
      (u) => u.includes("/inbox/v1/preferences/"),
      () => ff.json(makeCell({ categoryKey: "cat/1", channel: "inApp" })),
    );

    await client.set("cat/1", "inApp", true);

    expect(ff.calls[0]!.url).toContain("cat%2F1");
    expect(ff.calls[0]!.url).toContain("inApp");
  });

  it("unsubscribeAll() POSTs to the correct URL and returns the response shape", async () => {
    const { ff, client } = setup();
    ff.whenUrl("POST", "/inbox/v1/preferences/unsubscribe-all", () =>
      ff.json({ unsubscribed_categories: ["marketing", "product"], remaining_critical: ["security"] }));

    const res = await client.unsubscribeAll();

    expect(res.unsubscribedCategories).toEqual(["marketing", "product"]);
    expect(res.remainingCritical).toEqual(["security"]);
    expect(ff.calls[0]!.method).toBe("POST");
  });

  it("set() emits prefs-changed event after successful API call", async () => {
    const { ff, client } = setup();
    ff.whenUrl("PATCH", "/inbox/v1/preferences/marketing/email", () =>
      ff.json(makeCell({ optedIn: false })));

    const emitted: unknown[] = [];
    client.on("prefs-changed", (cell) => emitted.push(cell));

    await client.set("marketing", "email", false);

    expect(emitted).toHaveLength(1);
    expect((emitted[0] as { optedIn: boolean }).optedIn).toBe(false);
  });
});
