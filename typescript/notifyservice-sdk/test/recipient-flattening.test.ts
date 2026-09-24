import { describe, it, expect } from "vitest";
import { flattenRecipient } from "../src/resources/notifications.js";

describe("recipient flattening", () => {
  it("slack user id -> address", () => {
    const r = flattenRecipient("slack", { externalUserId: "u", slackUserId: "U123ABC" });
    expect(r.address).toBe("U123ABC");
    expect(r.slackUserId).toBeUndefined();
  });

  it("slack channel id -> address", () => {
    const r = flattenRecipient("slack", { externalUserId: "u", slackChannelId: "C123ABC" });
    expect(r.address).toBe("C123ABC");
    expect(r.slackChannelId).toBeUndefined();
  });

  it("slack user id takes priority over channel id", () => {
    const r = flattenRecipient("slack", { externalUserId: "u", slackUserId: "U123ABC", slackChannelId: "C123ABC" });
    expect(r.address).toBe("U123ABC");
    expect(r.slackUserId).toBeUndefined();
    expect(r.slackChannelId).toBeUndefined();
  });

  it("teams endpoint id -> address", () => {
    const r = flattenRecipient("teams", { externalUserId: "u", teamsEndpointId: "00000000-0000-0000-0000-000000000001" });
    expect(r.address).toBe("00000000-0000-0000-0000-000000000001");
    expect(r.teamsEndpointId).toBeUndefined();
  });

  it("discord endpoint id -> address", () => {
    const r = flattenRecipient("discord", { externalUserId: "u", discordEndpointId: "00000000-0000-0000-0000-000000000002" });
    expect(r.address).toBe("00000000-0000-0000-0000-000000000002");
    expect(r.discordEndpointId).toBeUndefined();
  });

  it("sms phone -> address", () => {
    const r = flattenRecipient("sms", { externalUserId: "u", phone: "+15551234567" });
    expect(r.address).toBe("+15551234567");
    expect(r.phone).toBeUndefined();
  });

  it("sms address takes priority over phone", () => {
    const r = flattenRecipient("sms", { externalUserId: "u", address: "+10001112222", phone: "+15551234567" });
    expect(r.address).toBe("+10001112222");
    expect(r.phone).toBeUndefined();
  });

  it("email passes through unchanged", () => {
    const r = flattenRecipient("email", { externalUserId: "u", address: "a@b.com" });
    expect(r.address).toBe("a@b.com");
  });

  it("in_app passes through unchanged", () => {
    const r = flattenRecipient("in_app", { externalUserId: "u", address: "a@b.com" });
    expect(r.address).toBe("a@b.com");
  });

  it("webhook passes through unchanged", () => {
    const r = flattenRecipient("webhook", { externalUserId: "u", address: "https://example.com/hook" });
    expect(r.address).toBe("https://example.com/hook");
  });
});
