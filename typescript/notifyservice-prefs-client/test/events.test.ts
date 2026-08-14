import { describe, expect, it, vi } from "vitest";
import { createEventBus } from "../src/events.js";
import type { PreferenceCell } from "../src/types.js";

function fakeCell(overrides: Partial<PreferenceCell> = {}): PreferenceCell {
  return {
    categoryKey: "marketing",
    categoryName: "Marketing",
    isCritical: false,
    channel: "email",
    optedIn: true,
    source: "endUser",
    updatedAt: "2026-05-27T00:00:00Z",
    ...overrides,
  };
}

describe("createEventBus — dispatch", () => {
  it("calls a registered handler when the event is emitted", () => {
    const bus = createEventBus();
    const handler = vi.fn();
    bus.on("prefs-changed", handler);

    const cell = fakeCell();
    bus.emit("prefs-changed", cell);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(cell);
  });

  it("calls multiple handlers registered for the same event", () => {
    const bus = createEventBus();
    const h1 = vi.fn();
    const h2 = vi.fn();
    const h3 = vi.fn();
    bus.on("prefs-changed", h1);
    bus.on("prefs-changed", h2);
    bus.on("prefs-changed", h3);

    bus.emit("prefs-changed", fakeCell());

    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(1);
    expect(h3).toHaveBeenCalledTimes(1);
  });

  it("does not call a handler that was never registered", () => {
    const bus = createEventBus();
    const handler = vi.fn();

    bus.emit("prefs-changed", fakeCell());

    expect(handler).not.toHaveBeenCalled();
  });

  it("emits error event with an Error instance", () => {
    const bus = createEventBus();
    const handler = vi.fn();
    bus.on("error", handler);

    const err = new Error("something broke");
    bus.emit("error", err);

    expect(handler).toHaveBeenCalledWith(err);
  });

  it("continues calling remaining handlers when one handler throws", () => {
    const bus = createEventBus();
    const throwing = vi.fn(() => { throw new Error("handler error"); });
    const safe = vi.fn();
    bus.on("prefs-changed", throwing);
    bus.on("prefs-changed", safe);

    bus.emit("prefs-changed", fakeCell());

    expect(throwing).toHaveBeenCalledTimes(1);
    expect(safe).toHaveBeenCalledTimes(1);
  });
});

describe("createEventBus — unsubscribe", () => {
  it("unsubscribe handle removes the listener", () => {
    const bus = createEventBus();
    const handler = vi.fn();
    const unsub = bus.on("prefs-changed", handler);

    unsub();
    bus.emit("prefs-changed", fakeCell());

    expect(handler).not.toHaveBeenCalled();
  });

  it("only removes the unsubscribed handler, not sibling handlers", () => {
    const bus = createEventBus();
    const h1 = vi.fn();
    const h2 = vi.fn();
    const unsub1 = bus.on("prefs-changed", h1);
    bus.on("prefs-changed", h2);

    unsub1();
    bus.emit("prefs-changed", fakeCell());

    expect(h1).not.toHaveBeenCalled();
    expect(h2).toHaveBeenCalledTimes(1);
  });

  it("unsubscribing twice is a no-op and does not throw", () => {
    const bus = createEventBus();
    const handler = vi.fn();
    const unsub = bus.on("prefs-changed", handler);

    unsub();
    expect(() => unsub()).not.toThrow();
  });

  it("removeAll() silences all handlers across all event names", () => {
    const bus = createEventBus();
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on("prefs-changed", h1);
    bus.on("error", h2);

    bus.removeAll();
    bus.emit("prefs-changed", fakeCell());
    bus.emit("error", new Error("x"));

    expect(h1).not.toHaveBeenCalled();
    expect(h2).not.toHaveBeenCalled();
  });
});
