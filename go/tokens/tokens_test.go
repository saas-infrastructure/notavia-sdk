package tokens

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"strings"
	"testing"
	"time"
)

const (
	key  = "nsi_test_signing_key_value"
	org  = "11111111-1111-1111-1111-111111111111"
	user = "external-user-42"
)

func verifyToken(t *testing.T, token string) {
	t.Helper()
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		t.Fatalf("expected 3 parts, got %d", len(parts))
	}
	mac := hmac.New(sha256.New, []byte(key))
	mac.Write([]byte(parts[0] + "." + parts[1]))
	sig, _ := base64.RawURLEncoding.DecodeString(parts[2])
	if !hmac.Equal(mac.Sum(nil), sig) {
		t.Fatal("signature mismatch")
	}
}

func TestMintInbox(t *testing.T) {
	tok, err := MintInbox(Options{OrganizationID: org, ExternalUserID: user, SigningKey: key})
	if err != nil {
		t.Fatal(err)
	}
	verifyToken(t, tok)
	p, _ := Decode(tok)
	if p.Iss != org || p.Sub != user || p.Scope != "inbox" {
		t.Fatalf("unexpected payload %+v", p)
	}
	if p.Exp-p.Iat != 900 {
		t.Fatalf("expected 900s ttl, got %d", p.Exp-p.Iat)
	}
}

func TestScopes(t *testing.T) {
	pt, _ := MintPrefs(Options{OrganizationID: org, ExternalUserID: user, SigningKey: key})
	if p, _ := Decode(pt); p.Scope != "prefs" {
		t.Fatalf("want prefs got %s", p.Scope)
	}
	bt, _ := MintInboxAndPrefs(Options{OrganizationID: org, ExternalUserID: user, SigningKey: key})
	if p, _ := Decode(bt); p.Scope != "inbox prefs" {
		t.Fatalf("want 'inbox prefs' got %s", p.Scope)
	}
}

func TestRejectsBadKey(t *testing.T) {
	if _, err := MintInbox(Options{OrganizationID: org, ExternalUserID: user, SigningKey: "bad"}); err == nil {
		t.Fatal("expected error for key without nsi_ prefix")
	}
}

func TestRejectsTTLBounds(t *testing.T) {
	if _, err := MintInbox(Options{OrganizationID: org, ExternalUserID: user, SigningKey: key, TTL: 10 * time.Second}); err == nil {
		t.Fatal("expected error for ttl below min")
	}
	if _, err := MintInbox(Options{OrganizationID: org, ExternalUserID: user, SigningKey: key, TTL: 25 * time.Hour}); err == nil {
		t.Fatal("expected error for ttl above max")
	}
}
