# WorkflowDetailResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | 
**key** | **str** |  | 
**name** | **str** |  | 
**description** | **str** |  | [optional] 
**status** | **str** |  | 
**active_version** | **int** |  | [optional] 
**active_body_json** | **str** | Raw JSON body of the currently active version, or null if none. | [optional] 
**created_at** | **datetime** |  | 

## Example

```python
from notifyservice_api.models.workflow_detail_response import WorkflowDetailResponse

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowDetailResponse from a JSON string
workflow_detail_response_instance = WorkflowDetailResponse.from_json(json)
# print the JSON string representation of the object
print(WorkflowDetailResponse.to_json())

# convert the object into a dict
workflow_detail_response_dict = workflow_detail_response_instance.to_dict()
# create an instance of WorkflowDetailResponse from a dict
workflow_detail_response_from_dict = WorkflowDetailResponse.from_dict(workflow_detail_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


