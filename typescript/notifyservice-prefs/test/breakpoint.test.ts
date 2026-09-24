import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./helpers/mock-client.js";
import { normalCell, normalCellInApp } from "./helpers/fixtures.js";
import { mountPrefs } from "./helpers/mount.js";
import "../src/index.js";

const cells = [normalCell, normalCellInApp];

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("ResizeObserver breakpoint boundary tests", () => {
  let originalResizeObserver: typeof ResizeObserver;

  beforeEach(() => {
    originalResizeObserver = globalThis.ResizeObserver;
  });

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver;
  });

  function stubResizeObserver(): { trigger: (width: number) => void } {
    let cb: ResizeObserverCallback | null = null;
    globalThis.ResizeObserver = vi.fn((callback: ResizeObserverCallback) => {
      cb = callback;
      return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
    }) as unknown as typeof ResizeObserver;

    return {
      trigger(width: number) {
        cb!([{ contentRect: { width } } as ResizeObserverEntry], null as unknown as ResizeObserver);
      },
    };
  }

  it("width=769 renders table variant", async () => {
    const { trigger } = stubResizeObserver();
    const el = await mountPrefs(cells);
    trigger(769);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("table.prefs-table")).not.toBeNull();
  });

  it("width=768 renders table variant (boundary is inclusive)", async () => {
    const { trigger } = stubResizeObserver();
    const el = await mountPrefs(cells);
    trigger(768);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("table.prefs-table")).not.toBeNull();
  });

  it("width=767 renders cards variant", async () => {
    const { trigger } = stubResizeObserver();
    const el = await mountPrefs(cells);
    trigger(767);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".prefs-cards")).not.toBeNull();
  });

  it("switches from table to cards when width drops below threshold", async () => {
    const { trigger } = stubResizeObserver();
    const el = await mountPrefs(cells);

    trigger(900);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("table.prefs-table")).not.toBeNull();

    trigger(400);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".prefs-cards")).not.toBeNull();
  });

  it("switches back to table when width rises above threshold", async () => {
    const { trigger } = stubResizeObserver();
    const el = await mountPrefs(cells);

    trigger(400);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".prefs-cards")).not.toBeNull();

    trigger(900);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("table.prefs-table")).not.toBeNull();
  });
});
