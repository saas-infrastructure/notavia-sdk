# NotificationResponseRecipient


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** |  | [optional] 
**name** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.notification_response_recipient import NotificationResponseRecipient

# TODO update the JSON string below
json = "{}"
# create an instance of NotificationResponseRecipient from a JSON string
notification_response_recipient_instance = NotificationResponseRecipient.from_json(json)
# print the JSON string representation of the object
print(NotificationResponseRecipient.to_json())

# convert the object into a dict
notification_response_recipient_dict = notification_response_recipient_instance.to_dict()
# create an instance of NotificationResponseRecipient from a dict
notification_response_recipient_from_dict = NotificationResponseRecipient.from_dict(notification_response_recipient_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


