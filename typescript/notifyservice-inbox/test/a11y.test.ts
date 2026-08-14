import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

describe("accessibility — bell variant", () => {
  it("bell button has aria-haspopup=menu and aria-expanded reflecting open", async () => {
    installMockClient(() => makeMockClient([], 1));
    const el = document.createElement("notifyservice-inbox");
    el.publishableKey = "pk"; el.token = "a.b.c";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    const btn = el.shadowRoot!.querySelector("button.bell")!;
    expect(btn.getAttribute("aria-haspopup")).toBe("menu");
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    el.open = true; await el.updateComplete;
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("aria-label updates with unread count", async () => {
    installMockClient(() => makeMockClient([], 5));
    const el = document.createElement("notifyservice-inbox");
    el.publishableKey = "pk"; el.token = "a.b.c";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    expect(el.shadowRoot!.querySelector("button.bell")!.getAttribute("aria-label")).toBe("Notifications, 5 unread");
  });
});
