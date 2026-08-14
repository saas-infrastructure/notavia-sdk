# ListWorkflows200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[WorkflowSummaryResponse]**](WorkflowSummaryResponse.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.list_workflows200_response import ListWorkflows200Response

# TODO update the JSON string below
json = "{}"
# create an instance of ListWorkflows200Response from a JSON string
list_workflows200_response_instance = ListWorkflows200Response.from_json(json)
# print the JSON string representation of the object
print(ListWorkflows200Response.to_json())

# convert the object into a dict
list_workflows200_response_dict = list_workflows200_response_instance.to_dict()
# create an instance of ListWorkflows200Response from a dict
list_workflows200_response_from_dict = ListWorkflows200Response.from_dict(list_workflows200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


