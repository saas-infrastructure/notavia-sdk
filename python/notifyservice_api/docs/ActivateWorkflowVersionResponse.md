# ActivateWorkflowVersionResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**valid** | **bool** |  | 
**errors** | [**List[WorkflowValidationError]**](WorkflowValidationError.md) |  | 

## Example

```python
from notifyservice_api.models.activate_workflow_version_response import ActivateWorkflowVersionResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ActivateWorkflowVersionResponse from a JSON string
activate_workflow_version_response_instance = ActivateWorkflowVersionResponse.from_json(json)
# print the JSON string representation of the object
print(ActivateWorkflowVersionResponse.to_json())

# convert the object into a dict
activate_workflow_version_response_dict = activate_workflow_version_response_instance.to_dict()
# create an instance of ActivateWorkflowVersionResponse from a dict
activate_workflow_version_response_from_dict = ActivateWorkflowVersionResponse.from_dict(activate_workflow_version_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


