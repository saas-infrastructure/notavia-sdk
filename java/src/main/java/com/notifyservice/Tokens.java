package com.notifyservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;

/** Mints NotifyService inbox/prefs delegated JWTs (HS256). Server-side only. */
public final class Tokens {

    private static final long DEFAULT_TTL = 900;
    private static final long MIN_TTL = 60;
    private static final long MAX_TTL = 86_400;
    private static final String HEADER_JSON = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private Tokens() {
    }

    public static String mintInbox(String organizationId, String externalUserId, String signingKey) {
        return mint(organizationId, externalUserId, signingKey, "inbox", DEFAULT_TTL);
    }

    public static String mintInbox(String organizationId, String externalUserId, String signingKey, long ttlSeconds) {
        return mint(organizationId, externalUserId, signingKey, "inbox", ttlSeconds);
    }

    public static String mintPrefs(String organizationId, String externalUserId, String signingKey) {
        return mint(organizationId, externalUserId, signingKey, "prefs", DEFAULT_TTL);
    }

    public static String mintPrefs(String organizationId, String externalUserId, String signingKey, long ttlSeconds) {
        return mint(organizationId, externalUserId, signingKey, "prefs", ttlSeconds);
    }

    public static String mintInboxAndPrefs(String organizationId, String externalUserId, String signingKey) {
        return mint(organizationId, externalUserId, signingKey, "inbox prefs", DEFAULT_TTL);
    }

    public static String mintInboxAndPrefs(String organizationId, String externalUserId, String signingKey, long ttlSeconds) {
        return mint(organizationId, externalUserId, signingKey, "inbox prefs", ttlSeconds);
    }

    public static TokenPayload decode(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Token must have three dot-separated parts.");
        }
        byte[] json = Base64.getUrlDecoder().decode(pad(parts[1]));
        try {
            return MAPPER.readValue(json, TokenPayload.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid token payload.", e);
        }
    }

    private static String mint(String organizationId, String externalUserId, String signingKey, String scope, long ttlSeconds) {
        if (ttlSeconds < MIN_TTL || ttlSeconds > MAX_TTL) {
            throw new IllegalArgumentException("ttlSeconds must be between 60 and 86400.");
        }
        if (signingKey == null || !signingKey.startsWith("nsi_")) {
            throw new IllegalArgumentException("signingKey must start with 'nsi_'.");
        }

        long now = Instant.now().getEpochSecond();
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("iss", organizationId);
        payload.put("sub", externalUserId);
        payload.put("scope", scope);
        payload.put("iat", now);
        payload.put("exp", now + ttlSeconds);

        String payloadJson;
        try {
            payloadJson = MAPPER.writeValueAsString(payload);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }

        String headerB64 = b64url(HEADER_JSON.getBytes(StandardCharsets.UTF_8));
        String payloadB64 = b64url(payloadJson.getBytes(StandardCharsets.UTF_8));
        String signingInput = headerB64 + "." + payloadB64;
        byte[] sig = Webhooks.hmacSha256(signingKey.getBytes(StandardCharsets.UTF_8), signingInput.getBytes(StandardCharsets.UTF_8));
        return signingInput + "." + b64url(sig);
    }

    private static String b64url(byte[] data) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(data);
    }

    private static String pad(String s) {
        int rem = s.length() % 4;
        if (rem == 0) {
            return s;
        }
        return s + "====".substring(rem);
    }
}
