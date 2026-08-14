package com.notifyservice;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * Verifies Svix-style NotifyService webhook signatures. Server-side only —
 * never expose the signing secret.
 */
public final class Webhooks {

    private static final long DEFAULT_TOLERANCE_SECONDS = 300;

    private Webhooks() {
    }

    public static boolean verifySignature(String rawBody, String signatureHeader, String signingSecret) {
        return verifySignature(rawBody, signatureHeader, signingSecret, DEFAULT_TOLERANCE_SECONDS);
    }

    public static boolean verifySignature(String rawBody, String signatureHeader, String signingSecret, long toleranceSeconds) {
        if (rawBody == null || signatureHeader == null || signingSecret == null) {
            return false;
        }

        long timestamp = -1;
        String v1Hex = null;
        for (String part : signatureHeader.split(",")) {
            int eq = part.indexOf('=');
            if (eq < 0) {
                continue;
            }
            String key = part.substring(0, eq).trim();
            String value = part.substring(eq + 1).trim();
            if (key.equals("t")) {
                try {
                    timestamp = Long.parseLong(value);
                } catch (NumberFormatException e) {
                    return false;
                }
            } else if (key.equals("v1") && v1Hex == null) {
                v1Hex = value;
            }
        }
        if (timestamp <= 0 || v1Hex == null) {
            return false;
        }

        byte[] secret = decodeSecret(signingSecret);
        if (secret == null || secret.length == 0) {
            return false;
        }

        if (Math.abs(Instant.now().getEpochSecond() - timestamp) > toleranceSeconds) {
            return false;
        }

        byte[] expected = hmacSha256(secret, (timestamp + "." + rawBody).getBytes(StandardCharsets.UTF_8));
        byte[] actual = decodeHex(v1Hex);
        if (actual == null || actual.length != expected.length) {
            return false;
        }
        return MessageDigest.isEqual(expected, actual);
    }

    private static byte[] decodeSecret(String signingSecret) {
        String raw = signingSecret.startsWith("whsec_") ? signingSecret.substring(6) : signingSecret;
        raw = raw.replace('-', '+').replace('_', '/');
        int pad = raw.length() % 4;
        if (pad == 2) {
            raw += "==";
        } else if (pad == 3) {
            raw += "=";
        }
        try {
            return Base64.getDecoder().decode(raw);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private static byte[] decodeHex(String hex) {
        int len = hex.length();
        if (len % 2 != 0) {
            return null;
        }
        byte[] out = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            int hi = Character.digit(hex.charAt(i), 16);
            int lo = Character.digit(hex.charAt(i + 1), 16);
            if (hi < 0 || lo < 0) {
                return null;
            }
            out[i / 2] = (byte) ((hi << 4) | lo);
        }
        return out;
    }

    static byte[] hmacSha256(byte[] key, byte[] data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(key, "HmacSHA256"));
            return mac.doFinal(data);
        } catch (java.security.GeneralSecurityException e) {
            throw new IllegalStateException(e);
        }
    }
}
