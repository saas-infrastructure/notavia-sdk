import { describe, expect, it, vi } from "vitest";
import { createPrefsClient } from "../src/client.js";
import { FakeFetch } from "./helpers/fake-fetch.js";
import { fakeJwt } from "./helpers/jwt.js";
import type { PreferenceCell } from "../src/types.js";

describe("set() — no optimistic emit", () => {
  it("does NOT emit prefs-changed before the API call resolves", async () => {
    const ff = new FakeFetch();

    let resolveRequest!: (r: Response) => void;
    const pendingResponse = new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    });

    ff.whenUrl("PATCH", "/inbox/v1/preferences/marketing/email", () => pendingResponse);

    const client = createPrefsClient({
      baseUrl: "https://api.test",
      publishableKey: "pk_test",
      token: fakeJwt(3600),
      fetch: ff.asFetch,
    });

    const emitted: PreferenceCell[] = [];
    client.on("prefs-changed", (cell) => emitted.push(cell));

    const setPromise = client.set("marketing", "email", false);

    expect(emitted).toHaveLength(0);

    const cell: PreferenceCell = {
      categoryKey: "marketing",
      categoryName: "Marketing",
      isCritical: false,
      channel: "email",
      optedIn: false,
      source: "endUser",
      updatedAt: "2026-05-27T00:00:00Z",
    };
    resolveRequest(
      new Response(
        JSON.stringify({
          category_key: cell.categoryKey,
          category_name: cell.categoryName,
          is_critical: cell.isCritical,
          channel: cell.channel,
          opted_in: cell.optedIn,
          source: cell.source,
          updated_at: cell.updatedAt,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );

    await setPromise;

    expect(emitted).toHaveLength(1);
  });
});
