import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTokenStore } from "../src/token-store.js";
import { PrefsAuthError } from "../src/errors.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("token-store", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("current() returns the initial token immediately", () => {
    const token = fakeJwt(3600);
    const store = createTokenStore(token, async () => fakeJwt(3600), () => {});
    expect(store.current()).toBe(token);
  });

  it("schedules a refresh ~60s before exp and calls refreshToken once", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();

    expect(refresh).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(60_000);

    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("does NOT call refreshToken before the scheduled threshold elapses", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();

    await vi.advanceTimersByTimeAsync(59_000);

    expect(refresh).not.toHaveBeenCalled();
  });

  it("updates current() token after a successful refresh", async () => {
    const newToken = fakeJwt(7200);
    const refresh = vi.fn(async () => newToken);
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();

    await vi.advanceTimersByTimeAsync(60_000);

    expect(store.current()).toBe(newToken);
  });

  it("retry-once-on-401: refresh() returns the new token when refreshToken succeeds", async () => {
    const newToken = fakeJwt(7200);
    const refresh = vi.fn(async () => newToken);
    const store = createTokenStore(fakeJwt(3600), refresh, () => {});

    const result = await store.refresh();

    expect(result).toBe(newToken);
    expect(store.current()).toBe(newToken);
  });

  it("coalesces concurrent in-flight refresh() calls into a single refreshToken invocation", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(3600), refresh, () => {});

    const a = store.refresh();
    const b = store.refresh();
    await Promise.all([a, b]);

    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("calls onError and rejects when refreshToken throws", async () => {
    const onError = vi.fn();
    const refresh = vi.fn(async () => { throw new Error("refresh boom"); });
    const store = createTokenStore(fakeJwt(3600), refresh, onError);

    await expect(store.refresh()).rejects.toThrow("refresh boom");
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("throws PrefsAuthError when no refreshToken callback is configured", async () => {
    const store = createTokenStore(fakeJwt(3600), undefined, () => {});

    await expect(store.refresh()).rejects.toBeInstanceOf(PrefsAuthError);
  });

  it("dispose() clears the scheduled refresh timer so refreshToken is never called", async () => {
    const refresh = vi.fn(async () => fakeJwt(3600));
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();
    store.dispose();

    await vi.advanceTimersByTimeAsync(60_000);

    expect(refresh).not.toHaveBeenCalled();
  });

  it("throws PrefsAuthError when refresh() is called on a disposed store", async () => {
    const store = createTokenStore(fakeJwt(3600), async () => fakeJwt(3600), () => {});
    store.dispose();

    await expect(store.refresh()).rejects.toBeInstanceOf(PrefsAuthError);
  });

  it("re-schedules after successful refresh so the timer fires again for the new token", async () => {
    const refresh = vi.fn(async () => fakeJwt(120));
    const store = createTokenStore(fakeJwt(120), refresh, () => {});
    store.schedule();

    await vi.advanceTimersByTimeAsync(60_000);
    expect(refresh).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(60_000);
    expect(refresh).toHaveBeenCalledTimes(2);
  });
});
