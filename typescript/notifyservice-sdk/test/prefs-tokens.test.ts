import { describe, it, expect } from "vitest";
import { mintPrefsToken, mintInboxAndPrefsToken, decodePrefsToken } from "../src/prefs/index.js";

const TEST_KEY = "nsi_testkeytestkeytestkeytestkeyte";

describe("mintPrefsToken", () => {
  it("round-trips with decodePrefsToken — scope is 'prefs'", () => {
    const token = mintPrefsToken({
      organizationId: "22222222-2222-2222-2222-222222222222",
      externalUserId: "u_prefs",
      signingKey: TEST_KEY,
    });
    const decoded = decodePrefsToken(token);
    expect(decoded.iss).toBe("22222222-2222-2222-2222-222222222222");
    expect(decoded.sub).toBe("u_prefs");
    expect(decoded.scope).toBe("prefs");
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });

  it("throws on ttl < 60", () => {
    expect(() => mintPrefsToken({
      organizationId: "x",
      externalUserId: "u_1",
      signingKey: TEST_KEY,
      ttlSeconds: 30,
    })).toThrow(/ttlSeconds/);
  });

  it("throws on ttl > 86400", () => {
    expect(() => mintPrefsToken({
      organizationId: "x",
      externalUserId: "u_1",
      signingKey: TEST_KEY,
      ttlSeconds: 100_000,
    })).toThrow(/ttlSeconds/);
  });

  it("throws on signing key without nsi_ prefix", () => {
    expect(() => mintPrefsToken({
      organizationId: "x",
      externalUserId: "u_1",
      signingKey: "wrong_prefix",
    })).toThrow(/nsi_/);
  });
});

describe("mintInboxAndPrefsToken", () => {
  it("round-trips with decodePrefsToken — scope contains both 'inbox' and 'prefs'", () => {
    const token = mintInboxAndPrefsToken({
      organizationId: "33333333-3333-3333-3333-333333333333",
      externalUserId: "u_both",
      signingKey: TEST_KEY,
    });
    const decoded = decodePrefsToken(token);
    expect(decoded.iss).toBe("33333333-3333-3333-3333-333333333333");
    expect(decoded.sub).toBe("u_both");
    const scopes = decoded.scope.split(" ");
    expect(scopes).toContain("inbox");
    expect(scopes).toContain("prefs");
  });
});

describe("decodePrefsToken", () => {
  it("parses all claims correctly from a valid token", () => {
    const token = mintPrefsToken({
      organizationId: "44444444-4444-4444-4444-444444444444",
      externalUserId: "u_decode",
      signingKey: TEST_KEY,
      ttlSeconds: 300,
    });
    const decoded = decodePrefsToken(token);
    expect(decoded.iss).toBe("44444444-4444-4444-4444-444444444444");
    expect(decoded.sub).toBe("u_decode");
    expect(decoded.scope).toBe("prefs");
    expect(typeof decoded.iat).toBe("number");
    expect(typeof decoded.exp).toBe("number");
    expect(decoded.exp - decoded.iat).toBe(300);
  });

  it("throws on malformed token (not three parts)", () => {
    expect(() => decodePrefsToken("not.valid")).toThrow();
  });
});
