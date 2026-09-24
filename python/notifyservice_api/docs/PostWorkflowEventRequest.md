# PostWorkflowEventRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**event_name** | **str** | Name of the event to deliver (e.g. &#x60;payment_confirmed&#x60;). | 
**event_data** | **Dict[str, object]** | Arbitrary JSON payload matched against the step&#39;s &#x60;match&#x60; filter. | 

## Example

```python
from notifyservice_api.models.post_workflow_event_request import PostWorkflowEventRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PostWorkflowEventRequest from a JSON string
post_workflow_event_request_instance = PostWorkflowEventRequest.from_json(json)
# print the JSON string representation of the object
print(PostWorkflowEventRequest.to_json())

# convert the object into a dict
post_workflow_event_request_dict = post_workflow_event_request_instance.to_dict()
# create an instance of PostWorkflowEventRequest from a dict
post_workflow_event_request_from_dict = PostWorkflowEventRequest.from_dict(post_workflow_event_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


