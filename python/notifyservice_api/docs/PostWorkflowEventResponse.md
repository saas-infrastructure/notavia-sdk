# PostWorkflowEventResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awoken_run_count** | **int** | Number of runs that were awoken by this event. | 

## Example

```python
from notifyservice_api.models.post_workflow_event_response import PostWorkflowEventResponse

# TODO update the JSON string below
json = "{}"
# create an instance of PostWorkflowEventResponse from a JSON string
post_workflow_event_response_instance = PostWorkflowEventResponse.from_json(json)
# print the JSON string representation of the object
print(PostWorkflowEventResponse.to_json())

# convert the object into a dict
post_workflow_event_response_dict = post_workflow_event_response_instance.to_dict()
# create an instance of PostWorkflowEventResponse from a dict
post_workflow_event_response_from_dict = PostWorkflowEventResponse.from_dict(post_workflow_event_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


