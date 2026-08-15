# UpdateDiscordEndpointRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label** | **str** |  | [optional] 
**webhook_url** | **str** |  | [optional] 
**default_username** | **str** |  | [optional] 
**default_avatar_url** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.update_discord_endpoint_request import UpdateDiscordEndpointRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateDiscordEndpointRequest from a JSON string
update_discord_endpoint_request_instance = UpdateDiscordEndpointRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateDiscordEndpointRequest.to_json())

# convert the object into a dict
update_discord_endpoint_request_dict = update_discord_endpoint_request_instance.to_dict()
# create an instance of UpdateDiscordEndpointRequest from a dict
update_discord_endpoint_request_from_dict = UpdateDiscordEndpointRequest.from_dict(update_discord_endpoint_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


