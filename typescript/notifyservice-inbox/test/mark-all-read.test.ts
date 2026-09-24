import { afterEach, describe, expect, it, vi } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import type { NotifyServiceInbox } from "../src/notifyservice-inbox.js";
import type { InboxItem } from "@notavia/inbox-client";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

const unread: InboxItem = {
  id: "u1", subject: "unread", htmlBody: null, textBody: "body", actionUrl: null,
  createdAt: "2026-05-27T00:00:00Z", readAt: null, data: null,
};
const alreadyRead: InboxItem = {
  id: "r1", subject: "already read", htmlBody: null, textBody: "body", actionUrl: null,
  createdAt: "2026-05-27T00:00:00Z", readAt: "2026-05-26T00:00:00Z", data: null,
};
const arrivesDuringCall: InboxItem = {
  id: "u2", subject: "late arrival", htmlBody: null, textBody: "body", actionUrl: null,
  createdAt: "2026-05-27T00:05:00Z", readAt: null, data: null,
};

async function mount(items: InboxItem[], unreadSeed: number): Promise<{ el: NotifyServiceInbox; mock: ReturnType<typeof makeMockClient> }> {
  let mock!: ReturnType<typeof makeMockClient>;
  installMockClient((o) => { mock = makeMockClient(items, unreadSeed); mock.options = o; return mock; });
  const el = document.createElement("notifyservice-inbox") as NotifyServiceInbox;
  el.setAttribute("variant", "panel");
  el.publishableKey = "pk"; el.token = "a.b.c";
  document.body.appendChild(el);
  await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
  return { el, mock };
}

function unreadAttr(el: NotifyServiceInbox, id: string): string | null {
  const innerList = el.shadowRoot!.querySelector("inbox-list")!;
  return innerList.shadowRoot!.querySelector(`li[data-id='${id}']`)!.getAttribute("data-unread");
}

describe("markAllRead", () => {
  it("marks items that were unread at call time as read, disables the button, and leaves a late arrival unread", async () => {
    const { el, mock } = await mount([unread, alreadyRead], 1);

    let resolveMarkAllRead!: (v: { markedCount: number; unreadCount: number }) => void;
    mock.markAllRead = vi.fn(() => new Promise((resolve) => { resolveMarkAllRead = resolve; }));

    const call = el.markAllRead();
    mock.emit("notification.arrived", arrivesDuringCall);
    await el.updateComplete;
    expect(unreadAttr(el, "u2")).toBe("true");

    resolveMarkAllRead({ markedCount: 1, unreadCount: 0 });
    await call;
    await el.updateComplete;

    expect(unreadAttr(el, "u1")).toBe("false");
    expect(unreadAttr(el, "r1")).toBe("false");
    expect(unreadAttr(el, "u2")).toBe("true");
    expect(el.unreadCount).toBe(1);
    expect(el.shadowRoot!.querySelector(".panel header button")!.hasAttribute("disabled")).toBe(false);
  });

  it("leaves items unchanged when markAllRead fails", async () => {
    const { el, mock } = await mount([unread], 1);
    mock.markAllRead = vi.fn(async () => { throw new Error("boom"); });

    await el.markAllRead();
    await el.updateComplete;

    expect(unreadAttr(el, "u1")).toBe("true");
  });

  it("ignores a second markAllRead() call while one is in flight", async () => {
    const { el, mock } = await mount([unread], 1);
    let resolveMarkAllRead!: (v: { markedCount: number; unreadCount: number }) => void;
    mock.markAllRead = vi.fn(() => new Promise((resolve) => { resolveMarkAllRead = resolve; }));

    let markedAllReadEvents = 0;
    el.addEventListener("notify-marked-all-read", () => { markedAllReadEvents++; });

    const first = el.markAllRead();
    const second = el.markAllRead();
    expect(mock.markAllRead).toHaveBeenCalledTimes(1);

    resolveMarkAllRead({ markedCount: 1, unreadCount: 0 });
    await Promise.all([first, second]);
    await el.updateComplete;

    expect(markedAllReadEvents).toBe(1);
  });

  it("disables the button while a markAllRead() call is in flight, and re-enables it once settled", async () => {
    const { el, mock } = await mount([unread], 1);
    let resolveMarkAllRead!: (v: { markedCount: number; unreadCount: number }) => void;
    mock.markAllRead = vi.fn(() => new Promise((resolve) => { resolveMarkAllRead = resolve; }));

    const call = el.markAllRead();
    mock.emit("notification.arrived", arrivesDuringCall);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".panel header button")!.hasAttribute("disabled")).toBe(true);

    resolveMarkAllRead({ markedCount: 1, unreadCount: 0 });
    await call;
    await el.updateComplete;
    expect(el.markingAllRead).toBe(false);
    expect(el.shadowRoot!.querySelector(".panel header button")!.hasAttribute("disabled")).toBe(false);
  });

  it("does not apply a stale markAllRead() response after the client is rebooted mid-request", async () => {
    const instances: ReturnType<typeof makeMockClient>[] = [];
    const freshItem: InboxItem = {
      id: "f1", subject: "fresh", htmlBody: null, textBody: "body", actionUrl: null,
      createdAt: "2026-05-28T00:00:00Z", readAt: null, data: null,
    };
    installMockClient((o) => {
      const m = instances.length === 0
        ? makeMockClient([unread], 1)
        : makeMockClient([freshItem], 5);
      m.options = o;
      instances.push(m);
      return m;
    });
    const el = document.createElement("notifyservice-inbox") as NotifyServiceInbox;
    el.setAttribute("variant", "panel");
    el.publishableKey = "pk"; el.token = "first.token";
    document.body.appendChild(el);
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;

    let resolveMarkAllRead!: (v: { markedCount: number; unreadCount: number }) => void;
    instances[0]!.markAllRead = vi.fn(() => new Promise((resolve) => { resolveMarkAllRead = resolve; }));
    const call = el.markAllRead();

    el.token = "second.token";
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;

    expect(instances.length).toBe(2);
    expect(el.items).toEqual([freshItem]);
    expect(el.unreadCount).toBe(5);

    resolveMarkAllRead({ markedCount: 1, unreadCount: 0 });
    await call;
    await el.updateComplete;

    expect(el.items).toEqual([freshItem]);
    expect(el.unreadCount).toBe(5);
  });
});
