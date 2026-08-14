# notavia

Official Python SDK for [Notavia](https://docs.notavia.saas-infrastructure.com) — send transactional email and manage templates.

**Features:** ✓ Notifications API  ✓ Templates API  ✓ Inbox API  ✓ Preferences API  ✓ Webhooks  ✓ SMS  ✓ Chat channels (Slack / Teams / Discord)  ✓ Workflows API

## Install

```
pip install notavia
```

## Send your first notification

```python
from notifyservice import NotifyClient
from notifyservice_api.models.send_notification_request import SendNotificationRequest
from notifyservice_api.models.recipient import Recipient

client = NotifyClient(
    base_url="https://api.notavia.saas-infrastructure.com",
    api_key="ns_live_...",
)

notification = client.notifications.send_notification(
    SendNotificationRequest(
        channel="email",
        recipient=Recipient(address="alice@example.com", name="Alice"),
        subject="Welcome",
        html_body="<h1>Hello!</h1>",
    )
)
print(notification.id)
```

## Idempotency

Pass `idempotency_key` to guarantee at-most-once delivery. Repeat requests with the same key within 24 hours return the original response without re-sending:

```python
notification = client.notifications.send_notification(request, idempotency_key=f"signup-{user_id}")
```

## Templates

Create a stored template, then reference it by key at send time:

```python
from notifyservice_api.models.create_template_request import CreateTemplateRequest
from notifyservice_api.models.render_template_request import RenderTemplateRequest

client.templates.create_template(
    CreateTemplateRequest(
        key="welcome",
        name="Welcome email",
        subject_template="Welcome, {{name}}!",
        html_body_template="<h1>Hello, {{name}}.</h1>",
    )
)

# Preview a template with data before sending
rendered = client.templates.render_template(
    "welcome",
    RenderTemplateRequest(data={"name": "Alice"}),
)
print(rendered.subject)   # "Welcome, Alice!"
print(rendered.html_body) # "<h1>Hello, Alice.</h1>"

# Send using the stored template
client.notifications.send_notification(
    SendNotificationRequest(
        channel="email",
        recipient=Recipient(address="alice@example.com"),
        template_key="welcome",
        template_data={"name": "Alice"},
    )
)
```

## SMS

```python
client.notifications.send_notification(
    SendNotificationRequest(
        channel="sms",
        recipient=Recipient(external_user_id="usr_1"),
        template_key="order_shipped_sms",
        template_data={"order_id": "ord_99"},
    )
)
```

## Chat channels

### Slack (DM by user id)

```python
client.notifications.send_notification(
    SendNotificationRequest(
        channel="slack",
        recipient=Recipient(external_user_id="usr_1", slack_user_id="U07XYZ123"),
        template_key="invoice_paid_slack",
        template_data={"invoice_id": "inv_42"},
    )
)
```

To post to a Slack channel instead of a user DM, use `slack_channel_id`:

```python
recipient=Recipient(external_user_id="usr_1", slack_channel_id="C07XYZ123")
```

### Microsoft Teams

Teams requires an endpoint registered first via `POST /v1/teams-endpoints`. Use the returned UUID:

```python
client.notifications.send_notification(
    SendNotificationRequest(
        channel="teams",
        recipient=Recipient(external_user_id="team_alerts", teams_endpoint_id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
        template_key="incident_alert_teams",
    )
)
```

### Discord

Discord requires an endpoint registered first via `POST /v1/discord-endpoints`. Use the returned UUID:

```python
client.notifications.send_notification(
    SendNotificationRequest(
        channel="discord",
        recipient=Recipient(external_user_id="team_alerts", discord_endpoint_id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
        template_key="incident_alert_discord",
    )
)
```

## Webhook signature verification

Verify incoming webhook payloads using your signing secret (prefixed `whsec_`):

```python
from notifyservice import verify_signature

is_valid = verify_signature(
    raw_body=request.body,
    signature_header=request.headers["X-Notify-Signature"],
    signing_secret="whsec_...",
)
if not is_valid:
    raise ValueError("Invalid webhook signature")
```

## Delegated tokens (inbox & preferences)

Mint short-lived JWTs so your frontend can access the inbox or preferences widgets directly without exposing your API key:

```python
from notifyservice import mint_inbox_token, mint_prefs_token, mint_inbox_and_prefs_token

# Inbox only
token = mint_inbox_token(
    organization_id="org_123",
    external_user_id="usr_456",
    signing_key="nsi_...",          # must start with nsi_
    ttl_seconds=900,                # default 15 min, min 60, max 86400
)

# Preferences only
token = mint_prefs_token("org_123", "usr_456", "nsi_...")

# Both scopes in one token
token = mint_inbox_and_prefs_token("org_123", "usr_456", "nsi_...")
```

Decode a token to inspect its claims:

```python
from notifyservice import decode

payload = decode(token)
print(payload.iss, payload.sub, payload.scope, payload.exp)
```

## Error handling

The generated API layer raises `notifyservice_api.exceptions.ApiException` on non-2xx responses. The `.status` attribute holds the HTTP status code and `.body` holds the raw response body (a JSON string with `code`, `message`, and `param` fields):

```python
import json
from notifyservice_api.exceptions import ApiException

try:
    client.notifications.send_notification(request)
except ApiException as exc:
    if exc.status == 400:
        error = json.loads(exc.body)
        print(f"{error['code']}: {error['message']} (param: {error.get('param')})")
    elif exc.status == 429:
        # rate-limited — the SDK already retried up to 3 times
        raise
    else:
        raise
```

## Retries

The SDK retries up to 3 times on transient failures (429, 502, 503, 504) with exponential backoff and `Retry-After` support. Adjust at construction time:

```python
client = NotifyClient(base_url="...", api_key="...", max_retries=5)
```

Disable retries entirely:

```python
client = NotifyClient(base_url="...", api_key="...", max_retries=0)
```

## Compatibility

- Python 3.9+
- Dependencies: `pydantic`, `urllib3`

## License

MIT.
