"""Delegated inbox and preferences token minting for NotifyService."""
import base64
import hashlib
import hmac
import json
import time
from dataclasses import dataclass

_DEFAULT_INBOX_TTL = 900
_DEFAULT_PREFS_TTL = 900
_MIN_TTL = 60
_MAX_TTL = 24 * 60 * 60


@dataclass(frozen=True)
class TokenPayload:
    iss: str
    sub: str
    scope: str
    iat: int
    exp: int


def mint_inbox_token(organization_id, external_user_id, signing_key, ttl_seconds=_DEFAULT_INBOX_TTL):
    return _mint(organization_id, external_user_id, signing_key, "inbox", ttl_seconds)


def mint_prefs_token(organization_id, external_user_id, signing_key, ttl_seconds=_DEFAULT_PREFS_TTL):
    return _mint(organization_id, external_user_id, signing_key, "prefs", ttl_seconds)


def mint_inbox_and_prefs_token(organization_id, external_user_id, signing_key, ttl_seconds=_DEFAULT_PREFS_TTL):
    return _mint(organization_id, external_user_id, signing_key, "inbox prefs", ttl_seconds)


def decode(token: str) -> TokenPayload:
    parts = token.split(".")
    if len(parts) != 3:
        raise ValueError("Token must have three dot-separated parts.")
    payload = json.loads(_b64url_decode(parts[1]))
    return TokenPayload(payload["iss"], payload["sub"], payload["scope"], payload["iat"], payload["exp"])


def _mint(organization_id, external_user_id, signing_key, scope, ttl_seconds):
    if ttl_seconds < _MIN_TTL or ttl_seconds > _MAX_TTL:
        raise ValueError(f"ttl_seconds must be between {_MIN_TTL} and {_MAX_TTL}.")
    if not signing_key.startswith("nsi_"):
        raise ValueError("signing_key must start with 'nsi_'.")

    now = int(time.time())
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {"iss": str(organization_id), "sub": external_user_id, "scope": scope, "iat": now, "exp": now + ttl_seconds}

    header_b64 = _b64url(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_b64 = _b64url(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signing_input = f"{header_b64}.{payload_b64}"
    sig = hmac.new(signing_key.encode("utf-8"), signing_input.encode("utf-8"), hashlib.sha256).digest()
    return f"{signing_input}.{_b64url(sig)}"


def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def _b64url_decode(s: str) -> bytes:
    return base64.urlsafe_b64decode(s + "=" * ((-len(s)) % 4))
