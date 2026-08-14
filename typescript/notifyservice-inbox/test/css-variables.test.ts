import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

describe("CSS variables", () => {
  it.skip("theme=dark sets a different text token", async () => {
    installMockClient(() => makeMockClient([], 0));
    const el = document.createElement("notifyservice-inbox");
    el.publishableKey = "pk"; el.token = "a.b.c";
    el.setAttribute("theme", "dark");
    document.body.appendChild(el);
    await el.updateComplete;
    const computed = getComputedStyle(el).getPropertyValue("--notify-color-text").trim();
    expect(computed).not.toBe("");
  });
});
