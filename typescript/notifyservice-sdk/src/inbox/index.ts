import { createHmac } from "node:crypto";

/**
 * Options for minting a delegated JWT for the in-app inbox.
 * Server-side only — never expose `signingKey` to the browser.
 */
export interface MintInboxTokenOptions {
  /** Organization id that owns the signing key. Becomes the JWT `iss` claim. */
  organizationId: string;
  /** Opaque end-user identifier. Becomes the JWT `sub` claim. */
  externalUserId: string;
  /** Raw inbox signing key (the `nsi_…` value, never the hash). */
  signingKey: string;
  /** Token lifetime in seconds. Default 900 (15 minutes). Min 60, max 86400. */
  ttlSeconds?: number;
}

const DEFAULT_TTL = 900;
const MIN_TTL = 60;
const MAX_TTL = 86_400;

/**
 * Mints a delegated JWT for the NotifyService in-app inbox.
 * Pure function — no network call. Server-side only.
 */
export function mintInboxToken(options: MintInboxTokenOptions): string {
  const ttl = options.ttlSeconds ?? DEFAULT_TTL;
  if (ttl < MIN_TTL || ttl > MAX_TTL) {
    throw new Error(`ttlSeconds must be between ${MIN_TTL} and ${MAX_TTL}, got ${ttl}.`);
  }
  if (!options.signingKey?.startsWith("nsi_")) {
    throw new Error("signingKey must be a NotifyService inbox signing key (prefix 'nsi_').");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const payload = base64url(Buffer.from(JSON.stringify({
    iss: options.organizationId,
    sub: options.externalUserId,
    scope: "inbox",
    iat: now,
    exp: now + ttl,
  })));
  const signingInput = `${header}.${payload}`;
  const signature = createHmac("sha256", options.signingKey)
    .update(signingInput)
    .digest();
  return `${signingInput}.${base64url(signature)}`;
}

/**
 * Decodes the payload of a token without verifying the signature.
 * For debugging only — server-side verification still required.
 */
export function decodeInboxToken(token: string): {
  iss: string;
  sub: string;
  scope: string;
  iat: number;
  exp: number;
} {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Token must have three dot-separated parts.");
  }
  const payload = JSON.parse(Buffer.from(parts[1]!, "base64url").toString("utf-8"));
  return payload;
}

function base64url(b: Buffer): string {
  return b.toString("base64url");
}
