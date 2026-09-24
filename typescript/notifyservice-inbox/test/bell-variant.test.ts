import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import type { NotifyServiceInbox } from "../src/notifyservice-inbox.js";
import "../src/notifyservice-inbox.js";

async function mount(unread = 3): Promise<NotifyServiceInbox> {
  installMockClient(() => makeMockClient([], unread));
  const el = document.createElement("notifyservice-inbox");
  el.publishableKey = "pk_test";
  el.token = "header.payload.sig";
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return el;
}

let restore: () => void;
beforeEach(() => { restore = () => {}; });
afterEach(() => { restore(); document.body.innerHTML = ""; });

describe("bell variant", () => {
  it("renders the bell button and shows the badge when unreadCount > 0", async () => {
    const el = await mount(3);
    const root = el.shadowRoot!;
    expect(root.querySelector("button.bell")).not.toBeNull();
    expect(root.querySelector(".badge")?.textContent).toBe("3");
  });

  it("hides the badge when unreadCount === 0", async () => {
    const el = await mount(0);
    expect(el.shadowRoot!.querySelector(".badge")).toBeNull();
  });

  it("clicking the bell toggles open", async () => {
    const el = await mount(1);
    el.shadowRoot!.querySelector<HTMLButtonElement>("button.bell")!.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    expect(el.shadowRoot!.querySelector(".popover")).not.toBeNull();
  });

  it("ESC closes the popover", async () => {
    const el = await mount(1);
    el.open = true; await el.updateComplete;
    const popover = el.shadowRoot!.querySelector(".popover") as HTMLElement;
    popover.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });
});
