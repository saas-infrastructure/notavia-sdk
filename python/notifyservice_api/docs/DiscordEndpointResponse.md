# DiscordEndpointResponse

Discord webhook endpoint configuration.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**label** | **str** |  | [optional] 
**webhook_url_prefix** | **str** | First 30 characters of the webhook URL for recognition only — full URL never returned. | [optional] 
**default_username** | **str** | Default bot username shown in Discord. Overridden per-send via template data. | [optional] 
**default_avatar_url** | **str** | Default bot avatar URL. Overridden per-send via template data. | [optional] 
**last_success_at** | **datetime** |  | [optional] 
**last_failure_at** | **datetime** |  | [optional] 
**last_failure_reason** | **str** |  | [optional] 
**created_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.discord_endpoint_response import DiscordEndpointResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DiscordEndpointResponse from a JSON string
discord_endpoint_response_instance = DiscordEndpointResponse.from_json(json)
# print the JSON string representation of the object
print(DiscordEndpointResponse.to_json())

# convert the object into a dict
discord_endpoint_response_dict = discord_endpoint_response_instance.to_dict()
# create an instance of DiscordEndpointResponse from a dict
discord_endpoint_response_from_dict = DiscordEndpointResponse.from_dict(discord_endpoint_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


