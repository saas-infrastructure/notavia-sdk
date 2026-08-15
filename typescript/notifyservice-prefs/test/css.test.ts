import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import { normalCell } from "./helpers/fixtures.js";
import type { NotifyServicePrefs } from "../src/element.js";
import "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

async function mountWithTheme(theme: Record<string, string>): Promise<NotifyServicePrefs> {
  installMockClient(() => makeMockClient([normalCell]));
  const el = document.createElement("notifyservice-prefs") as NotifyServicePrefs;
  el.publishableKey = "pk_test";
  el.token = "header.payload.sig";
  el.setAttribute("layout", "table");
  el.theme = theme;
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return el;
}

describe("CSS variable theming", () => {
  it("custom --notify-color-primary set via theme prop is reflected in element style", async () => {
    const el = await mountWithTheme({ "--notify-color-primary": "#ff0000" });
    const value = el.style.getPropertyValue("--notify-color-primary");
    expect(value).toBe("#ff0000");
  });

  it("multiple theme tokens are all applied", async () => {
    const el = await mountWithTheme({
      "--notify-color-primary": "#abcdef",
      "--notify-radius": "8px",
    });
    expect(el.style.getPropertyValue("--notify-color-primary")).toBe("#abcdef");
    expect(el.style.getPropertyValue("--notify-radius")).toBe("8px");
  });

  it("element without theme prop has no inline --notify-color-primary", async () => {
    installMockClient(() => makeMockClient([normalCell]));
    const el = document.createElement("notifyservice-prefs") as NotifyServicePrefs;
    el.publishableKey = "pk_test";
    el.token = "header.payload.sig";
    el.setAttribute("layout", "table");
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.style.getPropertyValue("--notify-color-primary")).toBe("");
  });
});
