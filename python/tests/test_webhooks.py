import base64, hashlib, hmac, time
import pytest
from notifyservice.webhooks import verify_signature


def _sign(secret_raw: bytes, timestamp: int, body: str) -> str:
    mac = hmac.new(secret_raw, f"{timestamp}.{body}".encode(), hashlib.sha256).hexdigest()
    return f"t={timestamp},v1={mac}"


def _secret() -> tuple[str, bytes]:
    raw = b"super-secret-bytes-0123456789abcd"
    encoded = "whsec_" + base64.urlsafe_b64encode(raw).rstrip(b"=").decode()
    return encoded, raw


def test_valid_signature_passes():
    secret, raw = _secret()
    body = '{"event":"notification.delivered"}'
    ts = int(time.time())
    assert verify_signature(body, _sign(raw, ts, body), secret) is True


def test_tampered_body_fails():
    secret, raw = _secret()
    ts = int(time.time())
    header = _sign(raw, ts, '{"event":"a"}')
    assert verify_signature('{"event":"b"}', header, secret) is False


def test_expired_timestamp_fails():
    secret, raw = _secret()
    body = "{}"
    ts = int(time.time()) - 10_000
    assert verify_signature(body, _sign(raw, ts, body), secret) is False


def test_wrong_secret_fails():
    _, raw = _secret()
    body = "{}"
    ts = int(time.time())
    header = _sign(raw, ts, body)
    other = "whsec_" + base64.urlsafe_b64encode(b"different-secret-bytes-aaaaaaaaaa").rstrip(b"=").decode()
    assert verify_signature(body, header, other) is False


def test_malformed_header_fails():
    secret, _ = _secret()
    assert verify_signature("{}", "not-a-valid-header", secret) is False


def test_secret_without_prefix_works():
    _, raw = _secret()
    body = "{}"
    ts = int(time.time())
    bare = base64.urlsafe_b64encode(raw).rstrip(b"=").decode()
    assert verify_signature(body, _sign(raw, ts, body), bare) is True


def test_golden_vector():
    # Cross-SDK parity lock: identical inputs must produce this exact hex in Python and Go.
    raw = b"0123456789abcdef0123456789abcdef"
    secret = "whsec_" + base64.urlsafe_b64encode(raw).rstrip(b"=").decode()
    body = '{"id":"evt_1"}'
    golden_hex = "5815f7d6d473ae7d0b8a17f678bd83446fe9f1456bc1161e16ec253f529cc979"
    header = f"t=1700000000,v1={golden_hex}"
    assert verify_signature(body, header, secret, tolerance_seconds=2**62) is True
