# TeamsEndpointResponse

Microsoft Teams webhook endpoint configuration.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**label** | **str** |  | [optional] 
**webhook_url_prefix** | **str** | First 30 characters of the webhook URL for recognition only — full URL never returned. | [optional] 
**flavour** | **str** | Detected webhook flavour: &#x60;WorkflowsLogicApps&#x60;, &#x60;WorkflowsOffice&#x60;, or &#x60;LegacyConnector&#x60;.  | [optional] 
**last_success_at** | **datetime** |  | [optional] 
**last_failure_at** | **datetime** |  | [optional] 
**last_failure_reason** | **str** |  | [optional] 
**created_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.teams_endpoint_response import TeamsEndpointResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TeamsEndpointResponse from a JSON string
teams_endpoint_response_instance = TeamsEndpointResponse.from_json(json)
# print the JSON string representation of the object
print(TeamsEndpointResponse.to_json())

# convert the object into a dict
teams_endpoint_response_dict = teams_endpoint_response_instance.to_dict()
# create an instance of TeamsEndpointResponse from a dict
teams_endpoint_response_from_dict = TeamsEndpointResponse.from_dict(teams_endpoint_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


