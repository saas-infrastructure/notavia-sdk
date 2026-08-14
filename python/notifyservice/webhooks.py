"""Webhook signature verification for NotifyService."""
import base64
import hashlib
import hmac
import time
from typing import Optional, Tuple

_DEFAULT_TOLERANCE_SECONDS = 300


def verify_signature(
    raw_body: str,
    signature_header: str,
    signing_secret: str,
    tolerance_seconds: int = _DEFAULT_TOLERANCE_SECONDS,
) -> bool:
    if raw_body is None or signature_header is None or signing_secret is None:
        return False

    timestamp, v1_hex = _parse_header(signature_header)
    if timestamp is None or v1_hex is None:
        return False

    secret = _decode_secret(signing_secret)
    if secret is None:
        return False

    if abs(int(time.time()) - timestamp) > tolerance_seconds:
        return False

    expected = hmac.new(secret, f"{timestamp}.{raw_body}".encode("utf-8"), hashlib.sha256).digest()
    actual = _decode_hex(v1_hex)
    if actual is None or len(actual) != len(expected):
        return False
    return hmac.compare_digest(expected, actual)


def _parse_header(header: str) -> Tuple[Optional[int], Optional[str]]:
    timestamp: Optional[int] = None
    v1_hex: Optional[str] = None
    for part in header.split(","):
        if "=" not in part:
            continue
        key, _, value = part.partition("=")
        key, value = key.strip(), value.strip()
        if key == "t":
            try:
                timestamp = int(value)
            except ValueError:
                return None, None
        elif key == "v1" and v1_hex is None:
            v1_hex = value
    if not timestamp:
        return None, None
    return timestamp, v1_hex


def _decode_secret(signing_secret: str) -> Optional[bytes]:
    raw = signing_secret[len("whsec_"):] if signing_secret.startswith("whsec_") else signing_secret
    raw = raw.replace("-", "+").replace("_", "/")
    pad = len(raw) % 4
    if pad == 2:
        raw += "=="
    elif pad == 3:
        raw += "="
    try:
        return base64.b64decode(raw)
    except Exception:
        return None


def _decode_hex(hex_str: str) -> Optional[bytes]:
    try:
        return bytes.fromhex(hex_str)
    except ValueError:
        return None
