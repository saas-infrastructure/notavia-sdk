# InboxItemResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**subject** | **str** |  | [optional] 
**html_body** | **str** |  | [optional] 
**text_body** | **str** |  | [optional] 
**action_url** | **str** |  | [optional] 
**is_read** | **bool** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**read_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.inbox_item_response import InboxItemResponse

# TODO update the JSON string below
json = "{}"
# create an instance of InboxItemResponse from a JSON string
inbox_item_response_instance = InboxItemResponse.from_json(json)
# print the JSON string representation of the object
print(InboxItemResponse.to_json())

# convert the object into a dict
inbox_item_response_dict = inbox_item_response_instance.to_dict()
# create an instance of InboxItemResponse from a dict
inbox_item_response_from_dict = InboxItemResponse.from_dict(inbox_item_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


