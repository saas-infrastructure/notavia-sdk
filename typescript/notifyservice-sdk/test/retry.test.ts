import { describe, it, expect } from "vitest";
import { parseRetryAfter, withRetry } from "../src/retry.js";

describe("parseRetryAfter", () => {
  it("parses integer seconds", () => {
    expect(parseRetryAfter("5")).toBe(5000);
  });

  it("parses HTTP-date", () => {
    const future = new Date(Date.now() + 10_000).toUTCString();
    const ms = parseRetryAfter(future);
    expect(ms).toBeGreaterThan(8_000);
    expect(ms).toBeLessThan(11_000);
  });

  it("returns null for missing or invalid values", () => {
    expect(parseRetryAfter(null)).toBe(null);
    expect(parseRetryAfter("not-a-number")).toBe(null);
  });
});

describe("withRetry", () => {
  function recordingDelay() {
    const delays: number[] = [];
    return { delays, fn: (ms: number) => { delays.push(ms); return Promise.resolve(); } };
  }

  it("returns the first successful attempt's value without retrying", async () => {
    const { delays, fn: delay } = recordingDelay();
    let calls = 0;
    const result = await withRetry<string>(
      async () => {
        calls++;
        return { ok: true, value: "ok" };
      },
      { maxAttempts: 3, baseDelayMs: 100, delay }
    );
    expect(result).toBe("ok");
    expect(calls).toBe(1);
    expect(delays).toEqual([]);
  });

  it("retries on 503 until maxAttempts, then calls finalize", async () => {
    const { delays, fn: delay } = recordingDelay();
    let calls = 0;
    await expect(
      withRetry<string>(
        async () => {
          calls++;
          return {
            ok: false,
            status: 503,
            retryAfterMs: null,
            finalize: async () => { throw new Error("final-503"); },
          };
        },
        { maxAttempts: 2, baseDelayMs: 100, delay }
      )
    ).rejects.toThrow("final-503");
    expect(calls).toBe(3); // initial + 2 retries
    expect(delays.length).toBe(2);
  });

  it("does not retry on a non-retriable status (e.g. 400)", async () => {
    const { delays, fn: delay } = recordingDelay();
    let calls = 0;
    await expect(
      withRetry<string>(
        async () => {
          calls++;
          return {
            ok: false,
            status: 400,
            retryAfterMs: null,
            finalize: async () => { throw new Error("bad-request"); },
          };
        },
        { maxAttempts: 3, baseDelayMs: 100, delay }
      )
    ).rejects.toThrow("bad-request");
    expect(calls).toBe(1);
    expect(delays).toEqual([]);
  });

  it("honors retryAfterMs when set", async () => {
    const { delays, fn: delay } = recordingDelay();
    let calls = 0;
    await expect(
      withRetry<string>(
        async () => {
          calls++;
          return {
            ok: false,
            status: 429,
            retryAfterMs: 5_000,
            finalize: async () => { throw new Error("rate-limited"); },
          };
        },
        { maxAttempts: 1, baseDelayMs: 100, delay }
      )
    ).rejects.toThrow("rate-limited");
    expect(delays).toEqual([5_000]);
  });
});
