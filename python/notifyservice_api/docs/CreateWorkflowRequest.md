# CreateWorkflowRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **str** |  | 
**name** | **str** |  | 
**description** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.create_workflow_request import CreateWorkflowRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateWorkflowRequest from a JSON string
create_workflow_request_instance = CreateWorkflowRequest.from_json(json)
# print the JSON string representation of the object
print(CreateWorkflowRequest.to_json())

# convert the object into a dict
create_workflow_request_dict = create_workflow_request_instance.to_dict()
# create an instance of CreateWorkflowRequest from a dict
create_workflow_request_from_dict = CreateWorkflowRequest.from_dict(create_workflow_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


