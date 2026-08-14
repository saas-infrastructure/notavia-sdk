// Package tokens mints NotifyService inbox/prefs delegated JWTs. Server-side only.
package tokens

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"strings"
	"time"
)

const (
	DefaultInboxTTL = 15 * time.Minute
	DefaultPrefsTTL = 900 * time.Second
	minTTL          = 60 * time.Second
	maxTTL          = 24 * time.Hour
)

// Options are the inputs for minting a delegated token.
type Options struct {
	OrganizationID string
	ExternalUserID string
	SigningKey      string
	TTL            time.Duration // zero => scope default
}

// Payload is the decoded JWT body.
type Payload struct {
	Iss   string `json:"iss"`
	Sub   string `json:"sub"`
	Scope string `json:"scope"`
	Iat   int64  `json:"iat"`
	Exp   int64  `json:"exp"`
}

// MintInbox mints a token with scope "inbox".
func MintInbox(o Options) (string, error) { return mint(o, "inbox", DefaultInboxTTL) }

// MintPrefs mints a token with scope "prefs".
func MintPrefs(o Options) (string, error) { return mint(o, "prefs", DefaultPrefsTTL) }

// MintInboxAndPrefs mints a token with scope "inbox prefs".
func MintInboxAndPrefs(o Options) (string, error) { return mint(o, "inbox prefs", DefaultPrefsTTL) }

// Decode parses the payload without verifying the signature. Debugging only.
func Decode(token string) (Payload, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return Payload{}, errors.New("token must have three dot-separated parts")
	}
	raw, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return Payload{}, err
	}
	var p Payload
	if err := json.Unmarshal(raw, &p); err != nil {
		return Payload{}, err
	}
	return p, nil
}

func mint(o Options, scope string, defaultTTL time.Duration) (string, error) {
	ttl := o.TTL
	if ttl == 0 {
		ttl = defaultTTL
	}
	if ttl < minTTL || ttl > maxTTL {
		return "", errors.New("ttl must be between 60s and 24h")
	}
	if !strings.HasPrefix(o.SigningKey, "nsi_") {
		return "", errors.New("signing key must start with 'nsi_'")
	}
	now := time.Now().Unix()
	payload, err := json.Marshal(Payload{Iss: o.OrganizationID, Sub: o.ExternalUserID, Scope: scope, Iat: now, Exp: now + int64(ttl.Seconds())})
	if err != nil {
		return "", err
	}
	headerB64 := base64.RawURLEncoding.EncodeToString([]byte(`{"alg":"HS256","typ":"JWT"}`))
	payloadB64 := base64.RawURLEncoding.EncodeToString(payload)
	signingInput := headerB64 + "." + payloadB64
	mac := hmac.New(sha256.New, []byte(o.SigningKey))
	mac.Write([]byte(signingInput))
	return signingInput + "." + base64.RawURLEncoding.EncodeToString(mac.Sum(nil)), nil
}
