import notifyservice


def test_public_api_is_importable():
    for name in ("NotifyClient", "verify_signature", "mint_inbox_token",
                 "mint_prefs_token", "mint_inbox_and_prefs_token", "decode", "TokenPayload"):
        assert hasattr(notifyservice, name)
