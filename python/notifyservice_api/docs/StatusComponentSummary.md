# StatusComponentSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **str** | Machine identifier (e.g. &#x60;notify&#x60;). | 
**name** | **str** | Display name (e.g. &#x60;Notify&#x60;). | 
**status** | **str** |  | 

## Example

```python
from notifyservice_api.models.status_component_summary import StatusComponentSummary

# TODO update the JSON string below
json = "{}"
# create an instance of StatusComponentSummary from a JSON string
status_component_summary_instance = StatusComponentSummary.from_json(json)
# print the JSON string representation of the object
print(StatusComponentSummary.to_json())

# convert the object into a dict
status_component_summary_dict = status_component_summary_instance.to_dict()
# create an instance of StatusComponentSummary from a dict
status_component_summary_from_dict = StatusComponentSummary.from_dict(status_component_summary_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


