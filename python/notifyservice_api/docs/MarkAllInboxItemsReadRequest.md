# MarkAllInboxItemsReadRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**before** | **datetime** | Only mark items created before this timestamp as read. | [optional] 

## Example

```python
from notifyservice_api.models.mark_all_inbox_items_read_request import MarkAllInboxItemsReadRequest

# TODO update the JSON string below
json = "{}"
# create an instance of MarkAllInboxItemsReadRequest from a JSON string
mark_all_inbox_items_read_request_instance = MarkAllInboxItemsReadRequest.from_json(json)
# print the JSON string representation of the object
print(MarkAllInboxItemsReadRequest.to_json())

# convert the object into a dict
mark_all_inbox_items_read_request_dict = mark_all_inbox_items_read_request_instance.to_dict()
# create an instance of MarkAllInboxItemsReadRequest from a dict
mark_all_inbox_items_read_request_from_dict = MarkAllInboxItemsReadRequest.from_dict(mark_all_inbox_items_read_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


