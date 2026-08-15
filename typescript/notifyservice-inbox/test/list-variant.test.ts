import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

describe("list variant", () => {
  it("renders only <inbox-list>, no header chrome", async () => {
    installMockClient(() => makeMockClient([], 0));
    const el = document.createElement("notifyservice-inbox");
    el.setAttribute("variant", "list");
    el.publishableKey = "pk"; el.token = "a.b.c";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    const root = el.shadowRoot!;
    expect(root.querySelector("button.bell")).toBeNull();
    expect(root.querySelector(".panel")).toBeNull();
    expect(root.querySelector("inbox-list")).not.toBeNull();
  });
});
