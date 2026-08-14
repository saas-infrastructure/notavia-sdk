import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

describe("panel variant", () => {
  it("renders header + list, no popover", async () => {
    installMockClient(() => makeMockClient([], 2));
    const el = document.createElement("notifyservice-inbox");
    el.setAttribute("variant", "panel");
    el.publishableKey = "pk"; el.token = "a.b.c";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    const root = el.shadowRoot!;
    expect(root.querySelector(".panel")).not.toBeNull();
    expect(root.querySelector(".popover")).toBeNull();
    expect(root.querySelector(".panel header button")).not.toBeNull();
  });
});
