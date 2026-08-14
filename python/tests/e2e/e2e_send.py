import json
import os
import sys
import time

from notifyservice import NotifyClient
from notifyservice_api.models.send_notification_request import SendNotificationRequest
from notifyservice_api.models.recipient import Recipient

_TERMINAL_STATUSES = {"sent", "failed", "suppressed"}


def main() -> None:
    base_url = os.environ.get("NOTIFY_BASE_URL")
    api_key = os.environ.get("NOTIFY_API_KEY")
    if not base_url or not api_key:
        print("NOTIFY_BASE_URL and NOTIFY_API_KEY must be set.", file=sys.stderr)
        sys.exit(2)

    client = NotifyClient(base_url=base_url, api_key=api_key)
    sent = client.notifications.send_notification(
        SendNotificationRequest(
            channel="email",
            recipient=Recipient(address="alice@example.com"),
            subject="E2E smoke test",
            html_body="<p>E2E smoke test</p>",
        )
    )
    notification_id = sent.id

    deadline = time.monotonic() + 30.0
    status_str = "unknown"
    while time.monotonic() < deadline:
        latest = client.notifications.get_notification(notification_id)
        raw_status = getattr(latest.status, "value", latest.status)
        status_str = str(raw_status).lower()
        if status_str in _TERMINAL_STATUSES:
            break
        time.sleep(0.5)

    print(json.dumps({"id": notification_id, "status": status_str}))
    sys.exit(0 if status_str == "sent" else 1)


if __name__ == "__main__":
    main()
