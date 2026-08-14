import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import { verifyWebhookSignature } from "../src/webhooks/index.js";

const SECRET = "whsec_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const SECRET_BYTES = Buffer.alloc(32, 0);

function mintSignature(body: string, t: number, secretBytes: Buffer = SECRET_BYTES): string {
  const signedPayload = `${t}.${body}`;
  const hex = createHmac("sha256", secretBytes).update(signedPayload, "utf8").digest("hex");
  return `t=${t},v1=${hex}`;
}

describe("verifyWebhookSignature", () => {
  it("returns true for a valid signature", () => {
    const body = "test";
    const t = Math.floor(Date.now() / 1000);
    const header = mintSignature(body, t);
    expect(verifyWebhookSignature({ rawBody: body, signatureHeader: header, secret: SECRET })).toBe(true);
  });

  it("returns false when body is tampered", () => {
    const t = Math.floor(Date.now() / 1000);
    const header = mintSignature("test", t);
    expect(verifyWebhookSignature({ rawBody: "tampered", signatureHeader: header, secret: SECRET })).toBe(false);
  });

  it("returns false for a wrong secret", () => {
    const body = "test";
    const t = Math.floor(Date.now() / 1000);
    const wrongSecret = "whsec_AQIDAQIDAQIDAQIDAQIDAQIDAQIDAQIDAQIDAQIDAQI";
    const header = mintSignature(body, t);
    expect(verifyWebhookSignature({ rawBody: body, signatureHeader: header, secret: wrongSecret })).toBe(false);
  });

  it("returns false when timestamp drift exceeds tolerance", () => {
    const body = "test";
    const t = Math.floor(Date.now() / 1000) - 600;
    const header = mintSignature(body, t);
    expect(verifyWebhookSignature({ rawBody: body, signatureHeader: header, secret: SECRET, toleranceSeconds: 300 })).toBe(false);
  });

  it("returns false for a malformed header (missing v1=)", () => {
    const t = Math.floor(Date.now() / 1000);
    const header = `t=${t},v2=deadbeef`;
    expect(verifyWebhookSignature({ rawBody: "test", signatureHeader: header, secret: SECRET })).toBe(false);
  });
});
