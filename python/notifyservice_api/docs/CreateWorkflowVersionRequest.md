# CreateWorkflowVersionRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**body_json** | **str** | Full workflow definition JSON. Must conform to the workflow DSL schema (fetch from &#x60;GET /workflows/schema.json&#x60;). The server runs the structural parser at creation time; semantic validation (category existence, template bodies, expression syntax) runs only at activation.  | 

## Example

```python
from notifyservice_api.models.create_workflow_version_request import CreateWorkflowVersionRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateWorkflowVersionRequest from a JSON string
create_workflow_version_request_instance = CreateWorkflowVersionRequest.from_json(json)
# print the JSON string representation of the object
print(CreateWorkflowVersionRequest.to_json())

# convert the object into a dict
create_workflow_version_request_dict = create_workflow_version_request_instance.to_dict()
# create an instance of CreateWorkflowVersionRequest from a dict
create_workflow_version_request_from_dict = CreateWorkflowVersionRequest.from_dict(create_workflow_version_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


