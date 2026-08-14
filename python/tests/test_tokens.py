import base64, hashlib, hmac, json
import pytest
from notifyservice.tokens import (
    mint_inbox_token, mint_prefs_token, mint_inbox_and_prefs_token, decode,
)

KEY = "nsi_test_signing_key_value"
ORG = "11111111-1111-1111-1111-111111111111"
USER = "external-user-42"


def _verify(token: str) -> bool:
    header_b64, payload_b64, sig_b64 = token.split(".")
    signing_input = f"{header_b64}.{payload_b64}".encode()
    expected = hmac.new(KEY.encode(), signing_input, hashlib.sha256).digest()
    pad = (-len(sig_b64)) % 4
    actual = base64.urlsafe_b64decode(sig_b64 + "=" * pad)
    return hmac.compare_digest(expected, actual)


def test_inbox_token_is_signed_and_decodes():
    token = mint_inbox_token(ORG, USER, KEY)
    assert _verify(token)
    p = decode(token)
    assert p.iss == ORG and p.sub == USER and p.scope == "inbox"
    assert p.exp - p.iat == 900


def test_prefs_scope():
    assert decode(mint_prefs_token(ORG, USER, KEY)).scope == "prefs"


def test_combined_scope():
    assert decode(mint_inbox_and_prefs_token(ORG, USER, KEY)).scope == "inbox prefs"


def test_rejects_key_without_prefix():
    with pytest.raises(ValueError):
        mint_inbox_token(ORG, USER, "bad_key")


def test_rejects_ttl_below_min():
    with pytest.raises(ValueError):
        mint_inbox_token(ORG, USER, KEY, ttl_seconds=10)


def test_rejects_ttl_above_max():
    with pytest.raises(ValueError):
        mint_inbox_token(ORG, USER, KEY, ttl_seconds=90_000)
