import { afterEach, describe, expect, it } from "vitest";
import "./helpers/mock-client.js";
import { mountPrefs } from "./helpers/mount.js";
import { criticalCell, normalCell, normalCellInApp, criticalCellInApp } from "./helpers/fixtures.js";
import "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("accessibility — critical category (table layout)", () => {
  it("critical toggle has aria-disabled='true'", async () => {
    const el = await mountPrefs([criticalCell], { layout: "table" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle.is-disabled")!;
    expect(toggle.getAttribute("aria-disabled")).toBe("true");
  });

  it("critical toggle has tabindex='-1'", async () => {
    const el = await mountPrefs([criticalCell], { layout: "table" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle.is-disabled")!;
    expect(toggle.getAttribute("tabindex")).toBe("-1");
  });

  it("critical toggle has descriptive title", async () => {
    const el = await mountPrefs([criticalCell], { layout: "table" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle.is-disabled")!;
    expect(toggle.getAttribute("title")).toBe("Required — cannot be turned off");
  });

  it("non-critical toggle does NOT have tabindex='-1'", async () => {
    const el = await mountPrefs([normalCell], { layout: "table" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    expect(toggle.getAttribute("tabindex")).not.toBe("-1");
  });

  it("non-critical toggle does NOT have aria-disabled", async () => {
    const el = await mountPrefs([normalCell], { layout: "table" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    expect(toggle.getAttribute("aria-disabled")).toBeNull();
  });
});

describe("accessibility — critical category (cards layout)", () => {
  it("critical toggle in cards has aria-disabled='true'", async () => {
    const el = await mountPrefs([criticalCell], { layout: "cards" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle.is-disabled")!;
    expect(toggle.getAttribute("aria-disabled")).toBe("true");
  });

  it("critical toggle in cards has tabindex='-1' — not keyboard-tabbable", async () => {
    const el = await mountPrefs([criticalCell, criticalCellInApp], { layout: "cards" });
    const toggles = el.shadowRoot!.querySelectorAll<HTMLElement>("button.toggle.is-disabled");
    expect(toggles.length).toBeGreaterThan(0);
    for (const toggle of Array.from(toggles)) {
      expect(toggle.getAttribute("tabindex")).toBe("-1");
    }
  });

  it("critical toggle in cards has title", async () => {
    const el = await mountPrefs([criticalCell], { layout: "cards" });
    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle.is-disabled")!;
    expect(toggle.getAttribute("title")).toBe("Required — cannot be turned off");
  });
});

describe("accessibility — toggle roles", () => {
  it("all toggle buttons carry role=switch", async () => {
    const el = await mountPrefs([normalCell, criticalCell], { layout: "table" });
    const toggles = el.shadowRoot!.querySelectorAll<HTMLElement>("button.toggle");
    for (const toggle of Array.from(toggles)) {
      expect(toggle.getAttribute("role")).toBe("switch");
    }
  });
});
