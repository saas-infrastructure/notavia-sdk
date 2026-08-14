import { createHmac } from "node:crypto";
import type { PrefsTokenOptions } from "./types.js";

const DEFAULT_TTL = 900;
const MIN_TTL = 60;
const MAX_TTL = 86_400;

function buildToken(options: PrefsTokenOptions, scope: string): string {
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
    scope,
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
 * Mints a delegated JWT for the NotifyService preference centre.
 * Pure function — no network call. Server-side only.
 */
export function mintPrefsToken(options: PrefsTokenOptions): string {
  return buildToken(options, "prefs");
}

/**
 * Mints a delegated JWT granting access to both the in-app inbox and the
 * preference centre. Pure function — no network call. Server-side only.
 */
export function mintInboxAndPrefsToken(options: PrefsTokenOptions): string {
  return buildToken(options, "inbox prefs");
}

function base64url(b: Buffer): string {
  return b.toString("base64url");
}
