import { afterEach, describe, expect, it } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import type { InboxItem } from "@notavia/inbox-client";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

const sample: InboxItem = {
  id: "abc", subject: "hi", htmlBody: null, textBody: "world", actionUrl: "/x",
  createdAt: "2026-05-27T00:00:00Z", readAt: null, data: null,
};

describe("custom events", () => {
  it("notify-unread-count-changed fires on client emit", async () => {
    let mock!: ReturnType<typeof makeMockClient>;
    installMockClient((o) => { mock = makeMockClient([], 0); mock.options = o; return mock; });
    const el = document.createElement("notifyservice-inbox");
    el.publishableKey = "pk"; el.token = "a.b.c";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;

    const seen: number[] = [];
    el.addEventListener("notify-unread-count-changed", (e: Event) => seen.push((e as CustomEvent).detail.count));
    mock.emit("unread-count.changed", 7);
    expect(seen).toEqual([7]);
  });

  it("notify-item-click fires when an item is clicked", async () => {
    let mock!: ReturnType<typeof makeMockClient>;
    installMockClient((o) => { mock = makeMockClient([sample], 1); mock.options = o; return mock; });
    const el = document.createElement("notifyservice-inbox");
    el.publishableKey = "pk"; el.token = "a.b.c";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    mock.emit("notification.arrived", sample);
    el.open = true; await el.updateComplete;

    const clicks: Array<{ id: string; actionUrl: string | null }> = [];
    el.addEventListener("notify-item-click", (e: Event) => clicks.push((e as CustomEvent).detail));
    const innerList = el.shadowRoot!.querySelector("inbox-list")!;
    const li = innerList.shadowRoot!.querySelector<HTMLElement>("li[data-id='abc']")!;
    li.click();
    expect(clicks[0]).toEqual(expect.objectContaining({ id: "abc", actionUrl: "/x" }));
  });
});
