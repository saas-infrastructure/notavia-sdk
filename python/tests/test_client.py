from notifyservice import NotifyClient


def test_client_exposes_tag_resources_and_auth():
    notify = NotifyClient(base_url="https://api.example.com", api_key="ns_test_abc")
    cfg = notify._api_client.configuration
    assert cfg.access_token == "ns_test_abc"
    assert cfg.host.rstrip("/") == "https://api.example.com"
    for attr in ("notifications", "templates", "usage", "workflows", "preferences"):
        assert getattr(notify, attr) is not None
