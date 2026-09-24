# NotificationEventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **str** |  | [optional] 
**occurred_at** | **datetime** |  | [optional] 
**detail** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.notification_event_dto import NotificationEventDto

# TODO update the JSON string below
json = "{}"
# create an instance of NotificationEventDto from a JSON string
notification_event_dto_instance = NotificationEventDto.from_json(json)
# print the JSON string representation of the object
print(NotificationEventDto.to_json())

# convert the object into a dict
notification_event_dto_dict = notification_event_dto_instance.to_dict()
# create an instance of NotificationEventDto from a dict
notification_event_dto_from_dict = NotificationEventDto.from_dict(notification_event_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


