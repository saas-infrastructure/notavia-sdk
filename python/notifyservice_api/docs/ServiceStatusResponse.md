# ServiceStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** | Overall service status — worst-case across all components. | 
**checked_at** | **datetime** | UTC timestamp of when the response was generated. | 
**components** | [**List[StatusComponentSummary]**](StatusComponentSummary.md) | Per-product component statuses. | 
**active_incidents** | [**List[IncidentSummary]**](IncidentSummary.md) | Currently open incidents (not yet resolved). | 
**recent_incidents** | [**List[IncidentSummary]**](IncidentSummary.md) | Incidents resolved within the last 14 days. | 

## Example

```python
from notifyservice_api.models.service_status_response import ServiceStatusResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ServiceStatusResponse from a JSON string
service_status_response_instance = ServiceStatusResponse.from_json(json)
# print the JSON string representation of the object
print(ServiceStatusResponse.to_json())

# convert the object into a dict
service_status_response_dict = service_status_response_instance.to_dict()
# create an instance of ServiceStatusResponse from a dict
service_status_response_from_dict = ServiceStatusResponse.from_dict(service_status_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


