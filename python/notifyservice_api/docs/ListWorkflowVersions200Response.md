# ListWorkflowVersions200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[WorkflowVersionSummary]**](WorkflowVersionSummary.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.list_workflow_versions200_response import ListWorkflowVersions200Response

# TODO update the JSON string below
json = "{}"
# create an instance of ListWorkflowVersions200Response from a JSON string
list_workflow_versions200_response_instance = ListWorkflowVersions200Response.from_json(json)
# print the JSON string representation of the object
print(ListWorkflowVersions200Response.to_json())

# convert the object into a dict
list_workflow_versions200_response_dict = list_workflow_versions200_response_instance.to_dict()
# create an instance of ListWorkflowVersions200Response from a dict
list_workflow_versions200_response_from_dict = ListWorkflowVersions200Response.from_dict(list_workflow_versions200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


