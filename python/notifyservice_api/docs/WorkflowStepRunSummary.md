# WorkflowStepRunSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**step_id** | **str** |  | 
**kind** | **str** |  | 
**attempt_id** | **int** |  | 
**status** | **str** |  | 
**outcome** | **str** |  | [optional] 
**notification_id** | **str** |  | [optional] 
**output_json** | **str** | JSON snapshot of the step output captured at completion. | [optional] 
**next_step_id** | **str** |  | [optional] 
**next_scheduled_at** | **datetime** |  | [optional] 
**started_at** | **datetime** |  | 
**completed_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.workflow_step_run_summary import WorkflowStepRunSummary

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowStepRunSummary from a JSON string
workflow_step_run_summary_instance = WorkflowStepRunSummary.from_json(json)
# print the JSON string representation of the object
print(WorkflowStepRunSummary.to_json())

# convert the object into a dict
workflow_step_run_summary_dict = workflow_step_run_summary_instance.to_dict()
# create an instance of WorkflowStepRunSummary from a dict
workflow_step_run_summary_from_dict = WorkflowStepRunSummary.from_dict(workflow_step_run_summary_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


