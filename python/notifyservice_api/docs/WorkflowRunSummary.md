# WorkflowRunSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | 
**workflow_key** | **str** |  | 
**status** | **str** |  | 
**source** | **str** |  | 
**created_at** | **datetime** |  | 
**completed_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.workflow_run_summary import WorkflowRunSummary

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowRunSummary from a JSON string
workflow_run_summary_instance = WorkflowRunSummary.from_json(json)
# print the JSON string representation of the object
print(WorkflowRunSummary.to_json())

# convert the object into a dict
workflow_run_summary_dict = workflow_run_summary_instance.to_dict()
# create an instance of WorkflowRunSummary from a dict
workflow_run_summary_from_dict = WorkflowRunSummary.from_dict(workflow_run_summary_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


