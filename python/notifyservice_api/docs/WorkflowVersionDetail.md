# WorkflowVersionDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**version** | **int** |  | 
**body_json** | **str** | Raw JSON DSL body of this version. | 
**created_at** | **datetime** |  | 
**activated_at** | **datetime** |  | [optional] 
**deactivated_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.workflow_version_detail import WorkflowVersionDetail

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowVersionDetail from a JSON string
workflow_version_detail_instance = WorkflowVersionDetail.from_json(json)
# print the JSON string representation of the object
print(WorkflowVersionDetail.to_json())

# convert the object into a dict
workflow_version_detail_dict = workflow_version_detail_instance.to_dict()
# create an instance of WorkflowVersionDetail from a dict
workflow_version_detail_from_dict = WorkflowVersionDetail.from_dict(workflow_version_detail_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


