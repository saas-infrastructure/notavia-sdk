import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./helpers/mock-client.js";
import { mountPrefs } from "./helpers/mount.js";
import { normalCell, normalCellInApp } from "./helpers/fixtures.js";
import "../src/index.js";

const cells = [normalCell, normalCellInApp];

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("layout variants", () => {
  let originalResizeObserver: typeof ResizeObserver;

  beforeEach(() => {
    originalResizeObserver = globalThis.ResizeObserver;
  });

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver;
  });

  it("renders a table when layout=table", async () => {
    const el = await mountPrefs(cells, { layout: "table" });
    const root = el.shadowRoot!;
    expect(root.querySelector("table.prefs-table")).not.toBeNull();
    expect(root.querySelector(".prefs-cards")).toBeNull();
  });

  it("renders cards when layout=cards", async () => {
    const el = await mountPrefs(cells, { layout: "cards" });
    const root = el.shadowRoot!;
    expect(root.querySelector(".prefs-cards")).not.toBeNull();
    expect(root.querySelector("table.prefs-table")).toBeNull();
  });

  it("auto layout defaults to table when ResizeObserver fires width >= 768", async () => {
    let observerCallback: ResizeObserverCallback | null = null;
    globalThis.ResizeObserver = vi.fn((cb: ResizeObserverCallback) => {
      observerCallback = cb;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    }) as unknown as typeof ResizeObserver;

    const el = await mountPrefs(cells);
    observerCallback!([{ contentRect: { width: 900 } } as ResizeObserverEntry], null as unknown as ResizeObserver);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("table.prefs-table")).not.toBeNull();
  });

  it("auto layout switches to cards when ResizeObserver fires width < 768", async () => {
    let observerCallback: ResizeObserverCallback | null = null;
    globalThis.ResizeObserver = vi.fn((cb: ResizeObserverCallback) => {
      observerCallback = cb;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    }) as unknown as typeof ResizeObserver;

    const el = await mountPrefs(cells);
    observerCallback!([{ contentRect: { width: 500 } } as ResizeObserverEntry], null as unknown as ResizeObserver);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector(".prefs-cards")).not.toBeNull();
  });
});
