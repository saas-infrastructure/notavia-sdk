# WorkflowTriggerResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**run_id** | **str** |  | 
**status** | **str** |  | 

## Example

```python
from notifyservice_api.models.workflow_trigger_response import WorkflowTriggerResponse

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowTriggerResponse from a JSON string
workflow_trigger_response_instance = WorkflowTriggerResponse.from_json(json)
# print the JSON string representation of the object
print(WorkflowTriggerResponse.to_json())

# convert the object into a dict
workflow_trigger_response_dict = workflow_trigger_response_instance.to_dict()
# create an instance of WorkflowTriggerResponse from a dict
workflow_trigger_response_from_dict = WorkflowTriggerResponse.from_dict(workflow_trigger_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


