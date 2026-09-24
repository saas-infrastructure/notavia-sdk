"""Top-level NotifyService client: bearer auth, 429 retry, grouped tag resources."""
from urllib3.util.retry import Retry

from notifyservice_api.api_client import ApiClient
from notifyservice_api.configuration import Configuration
from notifyservice_api.api.notifications_api import NotificationsApi
from notifyservice_api.api.templates_api import TemplatesApi
from notifyservice_api.api.usage_api import UsageApi
from notifyservice_api.api.preferences_api import PreferencesApi
from notifyservice_api.api.workflows_api import WorkflowsApi
from notifyservice_api.api.webhooks_api import WebhooksApi
from notifyservice_api.api.inbox_api import InboxApi
from notifyservice_api.api.sms_api import SMSApi
from notifyservice_api.api.slack_api import SlackApi
from notifyservice_api.api.teams_api import TeamsApi
from notifyservice_api.api.discord_api import DiscordApi


class NotifyClient:
    def __init__(self, base_url: str, api_key: str, *, max_retries: int = 3):
        configuration = Configuration(host=base_url.rstrip("/"), access_token=api_key)
        configuration.retries = Retry(
            total=max_retries, status_forcelist=[429, 502, 503, 504],
            allowed_methods=None, backoff_factor=0.5, respect_retry_after_header=True,
        )
        self._api_client = ApiClient(configuration)

        self.notifications = NotificationsApi(self._api_client)
        self.templates = TemplatesApi(self._api_client)
        self.usage = UsageApi(self._api_client)
        self.preferences = PreferencesApi(self._api_client)
        self.workflows = WorkflowsApi(self._api_client)
        self.webhooks = WebhooksApi(self._api_client)
        self.inbox = InboxApi(self._api_client)
        self.sms = SMSApi(self._api_client)
        self.slack = SlackApi(self._api_client)
        self.teams = TeamsApi(self._api_client)
        self.discord = DiscordApi(self._api_client)

    def close(self) -> None:
        self._api_client.close()
