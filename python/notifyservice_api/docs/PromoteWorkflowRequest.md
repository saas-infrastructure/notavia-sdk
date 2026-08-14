# PromoteWorkflowRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**dry_run** | **bool** | If true, return the diff and cascade candidates without writing to Live. | [optional] [default to False]
**include_templates** | **List[str]** | Keys of referenced templates to promote into Live in the same transaction, before the workflow version is validated and activated.  | [optional] 

## Example

```python
from notifyservice_api.models.promote_workflow_request import PromoteWorkflowRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PromoteWorkflowRequest from a JSON string
promote_workflow_request_instance = PromoteWorkflowRequest.from_json(json)
# print the JSON string representation of the object
print(PromoteWorkflowRequest.to_json())

# convert the object into a dict
promote_workflow_request_dict = promote_workflow_request_instance.to_dict()
# create an instance of PromoteWorkflowRequest from a dict
promote_workflow_request_from_dict = PromoteWorkflowRequest.from_dict(promote_workflow_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


