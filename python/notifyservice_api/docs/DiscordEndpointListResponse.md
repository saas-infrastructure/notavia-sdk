# DiscordEndpointListResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[DiscordEndpointResponse]**](DiscordEndpointResponse.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.discord_endpoint_list_response import DiscordEndpointListResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DiscordEndpointListResponse from a JSON string
discord_endpoint_list_response_instance = DiscordEndpointListResponse.from_json(json)
# print the JSON string representation of the object
print(DiscordEndpointListResponse.to_json())

# convert the object into a dict
discord_endpoint_list_response_dict = discord_endpoint_list_response_instance.to_dict()
# create an instance of DiscordEndpointListResponse from a dict
discord_endpoint_list_response_from_dict = DiscordEndpointListResponse.from_dict(discord_endpoint_list_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


