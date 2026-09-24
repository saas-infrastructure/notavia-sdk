import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTokenStore } from "../src/token-store.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("token-store", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("schedules a refresh at exp - 60s and calls refreshToken once", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();
    expect(refresh).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("coalesces concurrent in-flight refresh calls", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(3600), refresh, () => {});
    const a = store.refresh();
    const b = store.refresh();
    await Promise.all([a, b]);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("reports error and does not retry when refreshToken throws", async () => {
    const onError = vi.fn();
    const refresh = vi.fn(async () => { throw new Error("boom"); });
    const store = createTokenStore(fakeJwt(3600), refresh, onError);
    await expect(store.refresh()).rejects.toThrow("boom");
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("dispose() clears the scheduled refresh timer", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();
    store.dispose();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(refresh).not.toHaveBeenCalled();
  });
});
