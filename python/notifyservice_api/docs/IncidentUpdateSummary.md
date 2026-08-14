# IncidentUpdateSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | 
**body** | **str** | Human-readable update text. | 
**created_at** | **datetime** |  | 

## Example

```python
from notifyservice_api.models.incident_update_summary import IncidentUpdateSummary

# TODO update the JSON string below
json = "{}"
# create an instance of IncidentUpdateSummary from a JSON string
incident_update_summary_instance = IncidentUpdateSummary.from_json(json)
# print the JSON string representation of the object
print(IncidentUpdateSummary.to_json())

# convert the object into a dict
incident_update_summary_dict = incident_update_summary_instance.to_dict()
# create an instance of IncidentUpdateSummary from a dict
incident_update_summary_from_dict = IncidentUpdateSummary.from_dict(incident_update_summary_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


