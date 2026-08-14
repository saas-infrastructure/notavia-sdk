import { createHmac, timingSafeEqual } from "node:crypto";
import type { VerifyWebhookOptions } from "./types.js";

const DEFAULT_TOLERANCE = 300;

function decodeBase64urlToBuffer(input: string): Buffer {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64");
}

/**
 * Verifies a NotifyService webhook signature.
 * Returns `true` when the signature is valid and the timestamp is within
 * tolerance. Returns `false` for any failure — never throws.
 * Server-side only.
 */
export function verifyWebhookSignature(opts: VerifyWebhookOptions): boolean {
  try {
    const tolerance = opts.toleranceSeconds ?? DEFAULT_TOLERANCE;

    const pairs = opts.signatureHeader.split(",");
    let timestamp: string | undefined;
    const v1Signatures: string[] = [];

    for (const pair of pairs) {
      const eqIdx = pair.indexOf("=");
      if (eqIdx === -1) continue;
      const key = pair.slice(0, eqIdx).trim();
      const val = pair.slice(eqIdx + 1).trim();
      if (key === "t") timestamp = val;
      else if (key === "v1") v1Signatures.push(val);
    }

    if (!timestamp || v1Signatures.length === 0) return false;

    const t = parseInt(timestamp, 10);
    if (!Number.isFinite(t)) return false;

    if (tolerance > 0) {
      const now = Math.floor(Date.now() / 1000);
      if (Math.abs(now - t) > tolerance) return false;
    }

    const secretPayload = opts.secret.startsWith("whsec_")
      ? opts.secret.slice("whsec_".length)
      : opts.secret;
    const secretBytes = decodeBase64urlToBuffer(secretPayload);

    const signedPayload = `${t}.${opts.rawBody}`;
    const expectedHex = createHmac("sha256", secretBytes)
      .update(signedPayload, "utf8")
      .digest("hex");

    const expectedBuf = Buffer.from(expectedHex, "utf8");

    for (const candidate of v1Signatures) {
      const candidateBuf = Buffer.from(candidate, "utf8");
      if (
        candidateBuf.length === expectedBuf.length &&
        timingSafeEqual(candidateBuf, expectedBuf)
      ) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}
