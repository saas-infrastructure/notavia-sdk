# CreateDiscordEndpointRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label** | **str** |  | 
**webhook_url** | **str** | Discord webhook URL. Must match &#x60;https://discord.com/api/webhooks/{id}/{token}&#x60; (also accepts &#x60;discordapp.com&#x60; alias).  | 
**default_username** | **str** |  | [optional] 
**default_avatar_url** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.create_discord_endpoint_request import CreateDiscordEndpointRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateDiscordEndpointRequest from a JSON string
create_discord_endpoint_request_instance = CreateDiscordEndpointRequest.from_json(json)
# print the JSON string representation of the object
print(CreateDiscordEndpointRequest.to_json())

# convert the object into a dict
create_discord_endpoint_request_dict = create_discord_endpoint_request_instance.to_dict()
# create an instance of CreateDiscordEndpointRequest from a dict
create_discord_endpoint_request_from_dict = CreateDiscordEndpointRequest.from_dict(create_discord_endpoint_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


