# InboxFeedPage


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[InboxItemResponse]**](InboxItemResponse.md) |  | [optional] 
**next_cursor** | **str** |  | [optional] 
**unread_count** | **int** |  | [optional] 

## Example

```python
from notifyservice_api.models.inbox_feed_page import InboxFeedPage

# TODO update the JSON string below
json = "{}"
# create an instance of InboxFeedPage from a JSON string
inbox_feed_page_instance = InboxFeedPage.from_json(json)
# print the JSON string representation of the object
print(InboxFeedPage.to_json())

# convert the object into a dict
inbox_feed_page_dict = inbox_feed_page_instance.to_dict()
# create an instance of InboxFeedPage from a dict
inbox_feed_page_from_dict = InboxFeedPage.from_dict(inbox_feed_page_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


