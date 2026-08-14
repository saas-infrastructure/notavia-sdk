/**
 * Decodes the payload of a prefs token without verifying the signature.
 * For debugging only — server-side verification still required.
 */
export function decodePrefsToken(token: string): {
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
