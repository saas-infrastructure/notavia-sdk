# Workflow

A named, versioned, per-environment notification workflow.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | 
**key** | **str** | Stable slug, unique per environment. Pattern &#x60;^[a-z][a-z0-9_]{0,99}$&#x60;. | 
**name** | **str** |  | 
**description** | **str** |  | [optional] 
**status** | **str** |  | 
**created_at** | **datetime** |  | 

## Example

```python
from notifyservice_api.models.workflow import Workflow

# TODO update the JSON string below
json = "{}"
# create an instance of Workflow from a JSON string
workflow_instance = Workflow.from_json(json)
# print the JSON string representation of the object
print(Workflow.to_json())

# convert the object into a dict
workflow_dict = workflow_instance.to_dict()
# create an instance of Workflow from a dict
workflow_from_dict = Workflow.from_dict(workflow_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


