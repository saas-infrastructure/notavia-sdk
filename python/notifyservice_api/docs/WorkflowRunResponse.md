# WorkflowRunResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | 
**workflow_key** | **str** |  | 
**version** | **int** |  | 
**status** | **str** |  | 
**current_step_id** | **str** |  | [optional] 
**trigger_data** | **str** | Raw JSON string of the trigger payload. | 
**source** | **str** |  | 
**created_at** | **datetime** |  | 
**completed_at** | **datetime** |  | [optional] 
**failure_reason** | **str** |  | [optional] 
**steps** | [**List[WorkflowStepRunSummary]**](WorkflowStepRunSummary.md) |  | 

## Example

```python
from notifyservice_api.models.workflow_run_response import WorkflowRunResponse

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowRunResponse from a JSON string
workflow_run_response_instance = WorkflowRunResponse.from_json(json)
# print the JSON string representation of the object
print(WorkflowRunResponse.to_json())

# convert the object into a dict
workflow_run_response_dict = workflow_run_response_instance.to_dict()
# create an instance of WorkflowRunResponse from a dict
workflow_run_response_from_dict = WorkflowRunResponse.from_dict(workflow_run_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


