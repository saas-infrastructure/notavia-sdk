# NotificationPage


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[NotificationResponse]**](NotificationResponse.md) |  | [optional] 
**next_cursor** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.notification_page import NotificationPage

# TODO update the JSON string below
json = "{}"
# create an instance of NotificationPage from a JSON string
notification_page_instance = NotificationPage.from_json(json)
# print the JSON string representation of the object
print(NotificationPage.to_json())

# convert the object into a dict
notification_page_dict = notification_page_instance.to_dict()
# create an instance of NotificationPage from a dict
notification_page_from_dict = NotificationPage.from_dict(notification_page_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


