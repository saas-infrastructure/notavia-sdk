# WorkflowTriggerRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**trigger_data** | **Dict[str, object]** | Arbitrary JSON object passed as the run&#39;s trigger payload. | 

## Example

```python
from notifyservice_api.models.workflow_trigger_request import WorkflowTriggerRequest

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowTriggerRequest from a JSON string
workflow_trigger_request_instance = WorkflowTriggerRequest.from_json(json)
# print the JSON string representation of the object
print(WorkflowTriggerRequest.to_json())

# convert the object into a dict
workflow_trigger_request_dict = workflow_trigger_request_instance.to_dict()
# create an instance of WorkflowTriggerRequest from a dict
workflow_trigger_request_from_dict = WorkflowTriggerRequest.from_dict(workflow_trigger_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


