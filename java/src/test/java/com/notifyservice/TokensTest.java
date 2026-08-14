package com.notifyservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.Test;

class TokensTest {

    private static final String KEY = "nsi_test_signing_key_value";
    private static final String ORG = "11111111-1111-1111-1111-111111111111";
    private static final String USER = "external-user-42";

    private static boolean verify(String token) throws Exception {
        String[] parts = token.split("\\.");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] expected = mac.doFinal((parts[0] + "." + parts[1]).getBytes(StandardCharsets.UTF_8));
        byte[] actual = Base64.getUrlDecoder().decode(parts[2]);
        return MessageDigest.isEqual(expected, actual);
    }

    @Test
    void inboxTokenIsSignedAndDecodes() throws Exception {
        String token = Tokens.mintInbox(ORG, USER, KEY);
        assertTrue(verify(token));
        TokenPayload p = Tokens.decode(token);
        assertEquals(ORG, p.iss);
        assertEquals(USER, p.sub);
        assertEquals("inbox", p.scope);
        assertEquals(900, p.exp - p.iat);
    }

    @Test
    void prefsScope() {
        assertEquals("prefs", Tokens.decode(Tokens.mintPrefs(ORG, USER, KEY)).scope);
    }

    @Test
    void combinedScope() {
        assertEquals("inbox prefs", Tokens.decode(Tokens.mintInboxAndPrefs(ORG, USER, KEY)).scope);
    }

    @Test
    void rejectsKeyWithoutPrefix() {
        assertThrows(IllegalArgumentException.class, () -> Tokens.mintInbox(ORG, USER, "bad_key"));
    }

    @Test
    void rejectsTtlBelowMin() {
        assertThrows(IllegalArgumentException.class, () -> Tokens.mintInbox(ORG, USER, KEY, 10));
    }

    @Test
    void rejectsTtlAboveMax() {
        assertThrows(IllegalArgumentException.class, () -> Tokens.mintInbox(ORG, USER, KEY, 90_000));
    }
}
