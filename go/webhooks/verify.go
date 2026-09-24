// Package webhooks verifies Svix-style NotifyService webhook signatures.
package webhooks

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"strconv"
	"strings"
	"time"
)

const defaultToleranceSeconds = 300

// VerifyOption configures Verify.
type VerifyOption func(*verifyConfig)

type verifyConfig struct{ toleranceSeconds int64 }

// WithTolerance overrides the default 300s timestamp tolerance.
func WithTolerance(d time.Duration) VerifyOption {
	return func(c *verifyConfig) { c.toleranceSeconds = int64(d.Seconds()) }
}

// Verify reports whether signatureHeader is a valid signature for rawBody under
// signingSecret. Server-side only — never expose the signing secret.
func Verify(rawBody, signatureHeader, signingSecret string, opts ...VerifyOption) bool {
	cfg := verifyConfig{toleranceSeconds: defaultToleranceSeconds}
	for _, o := range opts {
		o(&cfg)
	}

	timestamp, v1Hex, ok := parseHeader(signatureHeader)
	if !ok {
		return false
	}
	secret, ok := decodeSecret(signingSecret)
	if !ok {
		return false
	}
	if abs(time.Now().Unix()-timestamp) > cfg.toleranceSeconds {
		return false
	}
	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(strconv.FormatInt(timestamp, 10) + "." + rawBody))
	expected := mac.Sum(nil)
	actual, err := hex.DecodeString(v1Hex)
	if err != nil || len(actual) != len(expected) {
		return false
	}
	return hmac.Equal(expected, actual)
}

func parseHeader(header string) (int64, string, bool) {
	var timestamp int64
	var v1Hex string
	for _, part := range strings.Split(header, ",") {
		eq := strings.IndexByte(part, '=')
		if eq < 0 {
			continue
		}
		key := strings.TrimSpace(part[:eq])
		value := strings.TrimSpace(part[eq+1:])
		switch {
		case key == "t":
			if ts, err := strconv.ParseInt(value, 10, 64); err == nil {
				timestamp = ts
			}
		case key == "v1" && v1Hex == "":
			v1Hex = value
		}
	}
	if timestamp == 0 || v1Hex == "" {
		return 0, "", false
	}
	return timestamp, v1Hex, true
}

func decodeSecret(secret string) ([]byte, bool) {
	raw := strings.TrimPrefix(secret, "whsec_")
	for _, enc := range []*base64.Encoding{base64.RawURLEncoding, base64.StdEncoding, base64.URLEncoding, base64.RawStdEncoding} {
		if b, err := enc.DecodeString(raw); err == nil {
			return b, true
		}
	}
	return nil, false
}

func abs(x int64) int64 {
	if x < 0 {
		return -x
	}
	return x
}
