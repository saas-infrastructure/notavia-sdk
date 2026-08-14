import { describe, expect, it } from "vitest";

describe("custom element registration", () => {
  it("imports register <notifyservice-inbox>", async () => {
    await import("../src/notifyservice-inbox.js");
    expect(customElements.get("notifyservice-inbox")).toBeDefined();
    expect(customElements.get("inbox-list")).toBeDefined();
  });

  it("double-import is a no-op (does not throw)", async () => {
    await import("../src/notifyservice-inbox.js");
    await expect(import("../src/notifyservice-inbox.js")).resolves.toBeDefined();
  });
});
