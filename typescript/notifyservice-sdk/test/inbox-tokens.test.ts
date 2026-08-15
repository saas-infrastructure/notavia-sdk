import { describe, it, expect } from "vitest";
import { mintInboxToken, decodeInboxToken } from "../src/inbox/index.js";

const TEST_KEY = "nsi_testkeytestkeytestkeytestkeyte";

describe("mintInboxToken", () => {
  it("round-trips with decodeInboxToken", () => {
    const token = mintInboxToken({
      organizationId: "11111111-1111-1111-1111-111111111111",
      externalUserId: "u_1",
      signingKey: TEST_KEY,
    });
    const decoded = decodeInboxToken(token);
    expect(decoded.iss).toBe("11111111-1111-1111-1111-111111111111");
    expect(decoded.sub).toBe("u_1");
    expect(decoded.scope).toBe("inbox");
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });

  it("throws on ttl < 60", () => {
    expect(() => mintInboxToken({
      organizationId: "x",
      externalUserId: "u_1",
      signingKey: TEST_KEY,
      ttlSeconds: 30,
    })).toThrow(/ttlSeconds/);
  });

  it("throws on ttl > 86400", () => {
    expect(() => mintInboxToken({
      organizationId: "x",
      externalUserId: "u_1",
      signingKey: TEST_KEY,
      ttlSeconds: 100_000,
    })).toThrow(/ttlSeconds/);
  });

  it("throws on signing key without nsi_ prefix", () => {
    expect(() => mintInboxToken({
      organizationId: "x",
      externalUserId: "u_1",
      signingKey: "wrong_prefix",
    })).toThrow(/nsi_/);
  });
});

describe("decodeInboxToken", () => {
  it("throws on malformed token (not three parts)", () => {
    expect(() => decodeInboxToken("not.valid")).toThrow();
  });
});
