/**
 * Options for minting a delegated JWT for the preference centre.
 * Server-side only — never expose `signingKey` to the browser.
 */
export interface PrefsTokenOptions {
  /** Organization id that owns the signing key. Becomes the JWT `iss` claim. */
  organizationId: string;
  /** Opaque end-user identifier. Becomes the JWT `sub` claim. */
  externalUserId: string;
  /** Raw inbox signing key (the `nsi_…` value, never the hash). */
  signingKey: string;
  /** Token lifetime in seconds. Default 900 (15 minutes). Min 60, max 86400. */
  ttlSeconds?: number;
}
