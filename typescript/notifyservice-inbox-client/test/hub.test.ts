import { describe, expect, it } from "vitest";
import { createHubBridge } from "../src/hub.js";
import { createTokenStore } from "../src/token-store.js";
import { FakeHubBuilder, makeBuilderCtor } from "./helpers/fake-hub.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("hub bridge", () => {
  function bridge(reconnected: () => Promise<void> = async () => {}) {
    const builder = new FakeHubBuilder();
    const tokens = createTokenStore(fakeJwt(3600), undefined, () => {});
    const b = createHubBridge(
      "https://api.test", "pk", tokens, undefined, reconnected,
      { HubConnectionBuilder: makeBuilderCtor(builder) },
    );
    return { b, builder };
  }

  it("subscribes to the three named methods", async () => {
    const { b, builder } = bridge();
    await b.start();
    expect(builder.conn.handlers.has("NotificationArrived")).toBe(true);
    expect(builder.conn.handlers.has("NotificationRead")).toBe(true);
    expect(builder.conn.handlers.has("UnreadCountChanged")).toBe(true);
  });

  it("normalizes snake_case NotificationArrived payload to camelCase", async () => {
    const { b, builder } = bridge();
    const arrived: unknown[] = [];
    b.onArrived((i) => arrived.push(i));
    await b.start();
    builder.conn.emit("NotificationArrived", {
      id: "i1", subject: "s", html_body: null, text_body: null, action_url: "/x",
      created_at: "2026-05-27T00:00:00Z", read_at: null, data: null,
    });
    expect((arrived[0] as { actionUrl: string }).actionUrl).toBe("/x");
  });

  it("runs onReconnected callback after a reconnect", async () => {
    let called = 0;
    const { b, builder } = bridge(async () => { called++; });
    await b.start();
    await builder.conn.triggerReconnected();
    expect(called).toBe(1);
  });
});
