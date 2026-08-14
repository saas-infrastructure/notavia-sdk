# Recipient

Identifies the notification target. At most one typed field should be set; the server selects the correct field based on `channel`.  - **Email / SMS / In-app:** use `address` (email address, phone number E.164, or opaque external user id). - **Slack:** use `slack_user_id` (for DMs) or `slack_channel_id` (for channel posts). - **Teams / Discord:** use `endpoint` (the endpoint **key**, e.g. `\"billing-alerts\"`) or the legacy   `teams_endpoint_id` / `discord_endpoint_id` (UUID of the configured endpoint). - `external_user_id` resolves the recipient via stored preference/inbox records. - `name` is used only for email `To:` display name and in-app display. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**external_user_id** | **str** |  | [optional] 
**endpoint** | **str** | The **key** of a Discord or Teams endpoint (e.g. &#x60;\&quot;billing-alerts\&quot;&#x60;). Preferred over the legacy UUID fields. When set, &#x60;teams_endpoint_id&#x60; / &#x60;discord_endpoint_id&#x60; are ignored.  | [optional] 
**slack_user_id** | **str** | Slack user id (Uxxxxxxxx) for DM delivery. Mutually exclusive with &#x60;slack_channel_id&#x60;. | [optional] 
**slack_channel_id** | **str** | Slack channel id (Cxxxxxxxx) for channel-post delivery. Mutually exclusive with &#x60;slack_user_id&#x60;. | [optional] 
**teams_endpoint_id** | **str** | UUID of the &#x60;TeamsWebhookEndpoint&#x60; to send to. Legacy — prefer &#x60;endpoint&#x60; (the key). | [optional] 
**discord_endpoint_id** | **str** | UUID of the &#x60;DiscordWebhookEndpoint&#x60; to send to. Legacy — prefer &#x60;endpoint&#x60; (the key). | [optional] 

## Example

```python
from notifyservice_api.models.recipient import Recipient

# TODO update the JSON string below
json = "{}"
# create an instance of Recipient from a JSON string
recipient_instance = Recipient.from_json(json)
# print the JSON string representation of the object
print(Recipient.to_json())

# convert the object into a dict
recipient_dict = recipient_instance.to_dict()
# create an instance of Recipient from a dict
recipient_from_dict = Recipient.from_dict(recipient_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


