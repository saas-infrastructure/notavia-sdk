# UpdateTeamsEndpointRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label** | **str** |  | [optional] 
**webhook_url** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.update_teams_endpoint_request import UpdateTeamsEndpointRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateTeamsEndpointRequest from a JSON string
update_teams_endpoint_request_instance = UpdateTeamsEndpointRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateTeamsEndpointRequest.to_json())

# convert the object into a dict
update_teams_endpoint_request_dict = update_teams_endpoint_request_instance.to_dict()
# create an instance of UpdateTeamsEndpointRequest from a dict
update_teams_endpoint_request_from_dict = UpdateTeamsEndpointRequest.from_dict(update_teams_endpoint_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


