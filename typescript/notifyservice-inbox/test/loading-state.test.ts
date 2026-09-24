import { afterEach, describe, expect, it, vi } from "vitest";
import { installMockClient, makeMockClient } from "./helpers/mock-client.js";
import type { NotifyServiceInbox } from "../src/notifyservice-inbox.js";
import type { InboxPage } from "@notavia/inbox-client";
import { messages } from "../src/messages.js";
import "../src/notifyservice-inbox.js";

afterEach(() => { document.body.innerHTML = ""; });

function emptyText(el: NotifyServiceInbox): string | null {
  const innerList = el.shadowRoot!.querySelector("inbox-list")!;
  return innerList.shadowRoot!.querySelector(".empty")?.textContent ?? null;
}

function emptyRole(el: NotifyServiceInbox): string | null {
  const innerList = el.shadowRoot!.querySelector("inbox-list")!;
  return innerList.shadowRoot!.querySelector(".empty")?.getAttribute("role") ?? null;
}

function mountPanel(): NotifyServiceInbox {
  const el = document.createElement("notifyservice-inbox") as NotifyServiceInbox;
  el.setAttribute("variant", "panel");
  el.publishableKey = "pk"; el.token = "a.b.c";
  document.body.appendChild(el);
  return el;
}

describe("loading state", () => {
  it("does not show the empty-state message before the feed resolves, and shows it once an empty feed resolves", async () => {
    let resolveFeed!: (page: InboxPage) => void;
    installMockClient((o) => {
      const mock = makeMockClient([], 0);
      mock.options = o;
      mock.feed = vi.fn(() => new Promise<InboxPage>((resolve) => { resolveFeed = resolve; }));
      return mock;
    });
    const el = mountPanel();
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;

    expect(emptyText(el)).not.toBe(messages.empty);

    resolveFeed({ data: [], nextCursor: null, unreadCount: 0 });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    expect(emptyText(el)).toBe(messages.empty);
  });

  it("does not show the empty-state message when the initial load fails", async () => {
    installMockClient((o) => {
      const mock = makeMockClient([], 0);
      mock.options = o;
      mock.connect = vi.fn(async () => { throw new Error("network down"); });
      return mock;
    });
    const el = mountPanel();
    await el.updateComplete; await new Promise((r) => setTimeout(r, 0)); await el.updateComplete;

    expect(emptyText(el)).not.toBe(messages.empty);
  });

  it("marks the load-state message with role=status across loading, loaded-empty, and error", async () => {
    let resolveFeed!: (page: InboxPage) => void;
    installMockClient((o) => {
      const mock = makeMockClient([], 0);
      mock.options = o;
      mock.feed = vi.fn(() => new Promise<InboxPage>((resolve) => { resolveFeed = resolve; }));
      return mock;
    });
    const loadingEl = mountPanel();
    await loadingEl.updateComplete; await new Promise((r) => setTimeout(r, 0)); await loadingEl.updateComplete;
    expect(emptyRole(loadingEl)).toBe("status");

    resolveFeed({ data: [], nextCursor: null, unreadCount: 0 });
    await new Promise((r) => setTimeout(r, 0)); await loadingEl.updateComplete;
    expect(emptyRole(loadingEl)).toBe("status");

    installMockClient((o) => {
      const mock = makeMockClient([], 0);
      mock.options = o;
      mock.connect = vi.fn(async () => { throw new Error("network down"); });
      return mock;
    });
    const errorEl = mountPanel();
    await errorEl.updateComplete; await new Promise((r) => setTimeout(r, 0)); await errorEl.updateComplete;
    expect(emptyRole(errorEl)).toBe("status");
  });

  it("shows the error state instead of loading forever when publishable key or token is missing", async () => {
    const el = document.createElement("notifyservice-inbox") as NotifyServiceInbox;
    el.setAttribute("variant", "panel");
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.loadState).toBe("error");
    expect(emptyText(el)).toBe(messages.loadError);
  });
});
