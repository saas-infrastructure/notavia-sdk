import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import { normalCell, criticalCell } from "./helpers/fixtures.js";
import type { NotifyServicePrefs } from "../src/element.js";
import type { PreferenceCell } from "@notavia/prefs-client";
import "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

async function mountWithMock(cells: PreferenceCell[]) {
  let mock!: ReturnType<typeof makeMockClient>;
  installMockClient(() => {
    mock = makeMockClient(cells);
    return mock;
  });
  const el = document.createElement("notifyservice-prefs") as NotifyServicePrefs;
  el.publishableKey = "pk_test";
  el.token = "header.payload.sig";
  el.setAttribute("layout", "table");
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return { el, mock };
}

describe("custom events", () => {
  it("notify-prefs-changed fires after toggling a non-critical cell", async () => {
    const { el } = await mountWithMock([normalCell]);

    const events: Array<{ cell: PreferenceCell }> = [];
    el.addEventListener("notify-prefs-changed", (e: Event) =>
      events.push((e as CustomEvent).detail),
    );

    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    toggle.click();
    await new Promise((r) => setTimeout(r, 0));

    expect(events.length).toBe(1);
    expect(events[0]!.cell).toMatchObject({
      categoryKey: normalCell.categoryKey,
      channel: normalCell.channel,
    });
  });

  it("notify-prefs-changed detail contains the updated cell", async () => {
    const { el } = await mountWithMock([normalCell]);

    let received: PreferenceCell | null = null;
    el.addEventListener("notify-prefs-changed", (e: Event) => {
      received = (e as CustomEvent<{ cell: PreferenceCell }>).detail.cell;
    });

    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    toggle.click();
    await new Promise((r) => setTimeout(r, 0));

    expect(received).not.toBeNull();
    expect(received!.categoryKey).toBe(normalCell.categoryKey);
    expect(received!.channel).toBe(normalCell.channel);
  });

  it("does NOT dispatch notify-prefs-changed when clicking a critical toggle", async () => {
    const { el } = await mountWithMock([criticalCell]);

    const events: Event[] = [];
    el.addEventListener("notify-prefs-changed", (e) => events.push(e));

    const criticalToggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle.is-disabled");
    if (criticalToggle) {
      criticalToggle.click();
      await new Promise((r) => setTimeout(r, 0));
    }

    expect(events.length).toBe(0);
  });

  it("notify-prefs-changed bubbles and is composed (received at window)", async () => {
    const { el } = await mountWithMock([normalCell]);

    const windowEvents: Event[] = [];
    const handler = (e: Event) => windowEvents.push(e);
    window.addEventListener("notify-prefs-changed", handler);

    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    toggle.click();
    await new Promise((r) => setTimeout(r, 0));

    window.removeEventListener("notify-prefs-changed", handler);

    expect(windowEvents.length).toBeGreaterThan(0);
  });
});
