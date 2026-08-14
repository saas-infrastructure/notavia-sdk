# CreateTeamsEndpointRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label** | **str** | Human-readable label for this endpoint in the dashboard. | 
**webhook_url** | **str** | Teams Workflows or legacy connector webhook URL. Must match one of the three accepted patterns; legacy connector URLs are rejected with &#x60;teams_legacy_connector_url&#x60; error code.  | 

## Example

```python
from notifyservice_api.models.create_teams_endpoint_request import CreateTeamsEndpointRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateTeamsEndpointRequest from a JSON string
create_teams_endpoint_request_instance = CreateTeamsEndpointRequest.from_json(json)
# print the JSON string representation of the object
print(CreateTeamsEndpointRequest.to_json())

# convert the object into a dict
create_teams_endpoint_request_dict = create_teams_endpoint_request_instance.to_dict()
# create an instance of CreateTeamsEndpointRequest from a dict
create_teams_endpoint_request_from_dict = CreateTeamsEndpointRequest.from_dict(create_teams_endpoint_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


