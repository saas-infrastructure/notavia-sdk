package com.notifyservice;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.Test;

class WebhooksTest {

    private static final byte[] RAW = "super-secret-bytes-0123456789abcd".getBytes(StandardCharsets.UTF_8);

    private static String encodedSecret() {
        return "whsec_" + Base64.getUrlEncoder().withoutPadding().encodeToString(RAW);
    }

    private static String sign(byte[] raw, long ts, String body) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(raw, "HmacSHA256"));
            byte[] sig = mac.doFinal((ts + "." + body).getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : sig) {
                hex.append(String.format("%02x", b));
            }
            return "t=" + ts + ",v1=" + hex;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void validSignaturePasses() {
        String body = "{\"event\":\"notification.delivered\"}";
        long ts = Instant.now().getEpochSecond();
        assertTrue(Webhooks.verifySignature(body, sign(RAW, ts, body), encodedSecret()));
    }

    @Test
    void tamperedBodyFails() {
        String header = sign(RAW, Instant.now().getEpochSecond(), "{\"event\":\"a\"}");
        assertFalse(Webhooks.verifySignature("{\"event\":\"b\"}", header, encodedSecret()));
    }

    @Test
    void expiredTimestampFails() {
        long ts = Instant.now().getEpochSecond() - 10_000;
        assertFalse(Webhooks.verifySignature("{}", sign(RAW, ts, "{}"), encodedSecret()));
    }

    @Test
    void wrongSecretFails() {
        long ts = Instant.now().getEpochSecond();
        String header = sign(RAW, ts, "{}");
        String other = "whsec_" + Base64.getUrlEncoder().withoutPadding()
                .encodeToString("different-secret-bytes-aaaaaaaaaa".getBytes(StandardCharsets.UTF_8));
        assertFalse(Webhooks.verifySignature("{}", header, other));
    }

    @Test
    void malformedHeaderFails() {
        assertFalse(Webhooks.verifySignature("{}", "garbage", encodedSecret()));
    }

    @Test
    void secretWithoutPrefixWorks() {
        long ts = Instant.now().getEpochSecond();
        String bare = Base64.getUrlEncoder().withoutPadding().encodeToString(RAW);
        assertTrue(Webhooks.verifySignature("{}", sign(RAW, ts, "{}"), bare));
    }
}
