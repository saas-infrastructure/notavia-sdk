import os
import uuid
import pytest
from notifyservice import NotifyClient
from notifyservice_api.models.send_notification_request import SendNotificationRequest
from notifyservice_api.models.recipient import Recipient
from notifyservice_api.models.create_template_request import CreateTemplateRequest
from notifyservice_api.models.render_template_request import RenderTemplateRequest

BASE_URL = os.environ.get("NOTIFY_BASE_URL")
API_KEY = os.environ.get("NOTIFY_API_KEY")
pytestmark = pytest.mark.skipif(not (BASE_URL and API_KEY), reason="host env not set")


def make_client() -> NotifyClient:
    return NotifyClient(base_url=BASE_URL, api_key=API_KEY)


def test_send_then_list():
    client = make_client()
    sent = client.notifications.send_notification(
        SendNotificationRequest(
            channel="email",
            recipient=Recipient(address="alice@example.com"),
            subject="Integration test",
            html_body="<p>hello</p>",
        )
    )
    page = client.notifications.list_notifications(limit=5)
    ids = [n.id for n in (page.data or [])]
    assert sent.id in ids


def test_create_and_render_template():
    client = make_client()
    key = "int-" + uuid.uuid4().hex[:8]
    client.templates.create_template(
        CreateTemplateRequest(
            key=key,
            name="Integration template",
            subject_template="Hi {{name}}",
            html_body_template="<p>Hi {{name}}</p>",
        )
    )
    rendered = client.templates.render_template(
        key,
        RenderTemplateRequest(data={"name": "Alice"}),
    )
    assert rendered.subject == "Hi Alice"
