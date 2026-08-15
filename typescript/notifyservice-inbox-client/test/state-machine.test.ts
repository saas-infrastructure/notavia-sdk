import { describe, expect, it } from "vitest";
import { createHubBridge } from "../src/hub.js";
import { createTokenStore } from "../src/token-store.js";
import { FakeHubBuilder, makeBuilderCtor } from "./helpers/fake-hub.js";
import { fakeJwt } from "./helpers/jwt.js";

describe("connection state machine", () => {
  it("transitions idle → connecting → connected → reconnecting → connected → disconnected", async () => {
    const builder = new FakeHubBuilder();
    const tokens = createTokenStore(fakeJwt(3600), undefined, () => {});
    const states: string[] = [];
    const b = createHubBridge(
      "https://api.test", "pk", tokens, undefined, async () => {},
      { HubConnectionBuilder: makeBuilderCtor(builder) },
    );
    b.onStateChanged((s) => states.push(s));

    await b.start();
    builder.conn.triggerReconnecting();
    await builder.conn.triggerReconnected();
    builder.conn.triggerClose();

    expect(states).toEqual(["connecting", "connected", "reconnecting", "connected", "disconnected"]);
  });

  it("does not emit duplicate adjacent states", async () => {
    const builder = new FakeHubBuilder();
    const tokens = createTokenStore(fakeJwt(3600), undefined, () => {});
    const states: string[] = [];
    const b = createHubBridge(
      "https://api.test", "pk", tokens, undefined, async () => {},
      { HubConnectionBuilder: makeBuilderCtor(builder) },
    );
    b.onStateChanged((s) => states.push(s));
    await b.start();
    await b.start();
    expect(states).toEqual(["connecting", "connected"]);
  });
});
