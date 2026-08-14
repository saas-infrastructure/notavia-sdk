# IncidentSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | 
**title** | **str** |  | 
**impact** | **str** |  | 
**current_status** | **str** |  | 
**started_at** | **datetime** |  | 
**resolved_at** | **datetime** |  | [optional] 
**updates** | [**List[IncidentUpdateSummary]**](IncidentUpdateSummary.md) | Timestamped admin-authored updates in reverse-chronological order. | 

## Example

```python
from notifyservice_api.models.incident_summary import IncidentSummary

# TODO update the JSON string below
json = "{}"
# create an instance of IncidentSummary from a JSON string
incident_summary_instance = IncidentSummary.from_json(json)
# print the JSON string representation of the object
print(IncidentSummary.to_json())

# convert the object into a dict
incident_summary_dict = incident_summary_instance.to_dict()
# create an instance of IncidentSummary from a dict
incident_summary_from_dict = IncidentSummary.from_dict(incident_summary_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


