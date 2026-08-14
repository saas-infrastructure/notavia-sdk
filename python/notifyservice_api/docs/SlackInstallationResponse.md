# SlackInstallationResponse

Represents a Slack workspace installation for an environment.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**team_id** | **str** | Slack workspace team id (Txxxxxxxxx). | [optional] 
**team_name** | **str** |  | [optional] 
**bot_user_id** | **str** | Slack bot user id (Uxxxxxxxxx). | [optional] 
**app_id** | **str** |  | [optional] 
**scopes** | **List[str]** | OAuth scopes granted to the bot token. | [optional] 
**auto_join_public_channels** | **bool** | When true the dispatcher will attempt to join a public channel (id starting with &#x60;C&#x60;) if the bot is not already a member.  | [optional] 
**installed_at** | **datetime** |  | [optional] 
**installed_by_user_id** | **str** | NotifyService user id who completed the OAuth flow. | [optional] 

## Example

```python
from notifyservice_api.models.slack_installation_response import SlackInstallationResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SlackInstallationResponse from a JSON string
slack_installation_response_instance = SlackInstallationResponse.from_json(json)
# print the JSON string representation of the object
print(SlackInstallationResponse.to_json())

# convert the object into a dict
slack_installation_response_dict = slack_installation_response_instance.to_dict()
# create an instance of SlackInstallationResponse from a dict
slack_installation_response_from_dict = SlackInstallationResponse.from_dict(slack_installation_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


