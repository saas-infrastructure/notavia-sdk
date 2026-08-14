package webhooks

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"strconv"
	"testing"
	"time"
)

func secret() (encoded string, raw []byte) {
	raw = []byte("super-secret-bytes-0123456789abcd")
	return "whsec_" + base64.RawURLEncoding.EncodeToString(raw), raw
}

func sign(raw []byte, ts int64, body string) string {
	mac := hmac.New(sha256.New, raw)
	mac.Write([]byte(strconv.FormatInt(ts, 10) + "." + body))
	return fmt.Sprintf("t=%d,v1=%s", ts, hex.EncodeToString(mac.Sum(nil)))
}

func TestValidSignaturePasses(t *testing.T) {
	enc, raw := secret()
	body := `{"event":"notification.delivered"}`
	if !Verify(body, sign(raw, time.Now().Unix(), body), enc) {
		t.Fatal("expected valid signature to pass")
	}
}

func TestTamperedBodyFails(t *testing.T) {
	enc, raw := secret()
	h := sign(raw, time.Now().Unix(), `{"event":"a"}`)
	if Verify(`{"event":"b"}`, h, enc) {
		t.Fatal("expected tampered body to fail")
	}
}

func TestExpiredTimestampFails(t *testing.T) {
	enc, raw := secret()
	body := "{}"
	if Verify(body, sign(raw, time.Now().Unix()-10_000, body), enc) {
		t.Fatal("expected expired timestamp to fail")
	}
}

func TestMalformedHeaderFails(t *testing.T) {
	enc, _ := secret()
	if Verify("{}", "garbage", enc) {
		t.Fatal("expected malformed header to fail")
	}
}

func TestWrongSecretFails(t *testing.T) {
	_, raw := secret()
	body := "{}"
	h := sign(raw, time.Now().Unix(), body)
	other := "whsec_" + base64.RawURLEncoding.EncodeToString([]byte("different-secret-bytes-aaaaaaaaaa"))
	if Verify(body, h, other) {
		t.Fatal("expected wrong secret to fail")
	}
}

func TestGoldenVector(t *testing.T) {
	// Cross-SDK parity lock: identical inputs must produce this exact hex in Python and Go.
	raw := []byte("0123456789abcdef0123456789abcdef")
	signingSecret := "whsec_" + base64.RawURLEncoding.EncodeToString(raw)
	body := `{"id":"evt_1"}`
	const goldenHex = "5815f7d6d473ae7d0b8a17f678bd83446fe9f1456bc1161e16ec253f529cc979"
	header := "t=1700000000,v1=" + goldenHex
	if !Verify(body, header, signingSecret, WithTolerance(100*365*24*time.Hour)) {
		t.Fatal("golden vector mismatch: Go and Python HMAC outputs diverged")
	}
}
