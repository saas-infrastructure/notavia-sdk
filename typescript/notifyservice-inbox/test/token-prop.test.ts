import { afterEach, describe, expect, it, vi } from "vitest";
import { installMockClient, makeMockClient, type MockInboxClient } from "./helpers/mock-client.js";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

describe("token property change", () => {
  it("changing token disposes the old client and creates a new one", async () => {
    const instances: MockInboxClient[] = [];
    installMockClient((o) => { const m = makeMockClient([], 0); m.options = o; instances.push(m); return m; });
    const el = document.createElement("notifyservice-inbox");
    el.publishableKey = "pk"; el.token = "first.payload.sig";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    expect(instances.length).toBe(1);

    const oldDispose = instances[0]!.dispose as ReturnType<typeof vi.fn>;
    el.token = "second.payload.sig";
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    expect(oldDispose).toHaveBeenCalled();
    expect(instances.length).toBe(2);
  });
});
