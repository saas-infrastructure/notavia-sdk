import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./helpers/mock-client.js";
import { normalCell } from "./helpers/fixtures.js";
import { mountPrefs } from "./helpers/mount.js";
import "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("lifecycle — ResizeObserver cleanup", () => {
  let originalResizeObserver: typeof ResizeObserver;

  beforeEach(() => {
    originalResizeObserver = globalThis.ResizeObserver;
  });

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver;
  });

  it("disconnects ResizeObserver when element is removed from DOM", async () => {
    const disconnect = vi.fn();
    globalThis.ResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect,
    })) as unknown as typeof ResizeObserver;

    const el = await mountPrefs([normalCell]);
    expect(disconnect).not.toHaveBeenCalled();

    document.body.removeChild(el);
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("does NOT create a ResizeObserver when layout is explicitly set to 'table'", async () => {
    const observerConstructor = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    globalThis.ResizeObserver = observerConstructor as unknown as typeof ResizeObserver;

    await mountPrefs([normalCell], { layout: "table" });
    expect(observerConstructor).not.toHaveBeenCalled();
  });

  it("does NOT create a ResizeObserver when layout is explicitly set to 'cards'", async () => {
    const observerConstructor = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    globalThis.ResizeObserver = observerConstructor as unknown as typeof ResizeObserver;

    await mountPrefs([normalCell], { layout: "cards" });
    expect(observerConstructor).not.toHaveBeenCalled();
  });
});
