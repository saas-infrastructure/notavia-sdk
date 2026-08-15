# TeamsEndpointListResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[TeamsEndpointResponse]**](TeamsEndpointResponse.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.teams_endpoint_list_response import TeamsEndpointListResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TeamsEndpointListResponse from a JSON string
teams_endpoint_list_response_instance = TeamsEndpointListResponse.from_json(json)
# print the JSON string representation of the object
print(TeamsEndpointListResponse.to_json())

# convert the object into a dict
teams_endpoint_list_response_dict = teams_endpoint_list_response_instance.to_dict()
# create an instance of TeamsEndpointListResponse from a dict
teams_endpoint_list_response_from_dict = TeamsEndpointListResponse.from_dict(teams_endpoint_list_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


