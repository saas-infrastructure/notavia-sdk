import { afterEach, describe, expect, it, vi } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import { normalCell } from "./helpers/fixtures.js";
import type { NotifyServicePrefs } from "../src/element.js";
import type { PreferenceCell } from "@notavia/prefs-client";
import "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

async function mountWithControllableMock(cells: PreferenceCell[]) {
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

describe("error propagation", () => {
  it("dispatches notify-error when client.set rejects", async () => {
    const { el, mock } = await mountWithControllableMock([normalCell]);

    const errorEvents: Array<{ error: Error }> = [];
    el.addEventListener("notify-error", (e: Event) =>
      errorEvents.push((e as CustomEvent).detail),
    );

    (mock.set as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("network failure"));

    const toggle = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    toggle.click();
    await new Promise((r) => setTimeout(r, 0));

    expect(errorEvents.length).toBe(1);
    expect(errorEvents[0]!.error).toBeInstanceOf(Error);
    expect(errorEvents[0]!.error.message).toBe("network failure");
  });

  it("reverts optimistic update on set failure", async () => {
    const { el, mock } = await mountWithControllableMock([normalCell]);

    (mock.set as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("server error"));

    const toggleBefore = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    const checkedBefore = toggleBefore.getAttribute("aria-checked");

    toggleBefore.click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    const toggleAfter = el.shadowRoot!.querySelector<HTMLElement>("button.toggle:not(.is-disabled)")!;
    expect(toggleAfter.getAttribute("aria-checked")).toBe(checkedBefore);
  });

  it("dispatches notify-error when load fails", async () => {
    installMockClient(() => {
      const mock = makeMockClient([]);
      (mock.list as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("load failed"));
      return mock;
    });

    const el = document.createElement("notifyservice-prefs") as NotifyServicePrefs;

    const errorEvents: Array<{ error: Error }> = [];
    el.addEventListener("notify-error", (e: Event) =>
      errorEvents.push((e as CustomEvent).detail),
    );

    el.publishableKey = "pk_test";
    el.token = "header.payload.sig";
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    expect(errorEvents.length).toBe(1);
    expect(errorEvents[0]!.error.message).toBe("load failed");
  });
});
