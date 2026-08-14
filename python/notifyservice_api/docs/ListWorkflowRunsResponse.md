# ListWorkflowRunsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**items** | [**List[WorkflowRunSummary]**](WorkflowRunSummary.md) |  | 
**next_page_token** | **str** | Opaque cursor. Pass as &#x60;page_token&#x60; query param to retrieve the next page. | [optional] 

## Example

```python
from notifyservice_api.models.list_workflow_runs_response import ListWorkflowRunsResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ListWorkflowRunsResponse from a JSON string
list_workflow_runs_response_instance = ListWorkflowRunsResponse.from_json(json)
# print the JSON string representation of the object
print(ListWorkflowRunsResponse.to_json())

# convert the object into a dict
list_workflow_runs_response_dict = list_workflow_runs_response_instance.to_dict()
# create an instance of ListWorkflowRunsResponse from a dict
list_workflow_runs_response_from_dict = ListWorkflowRunsResponse.from_dict(list_workflow_runs_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


