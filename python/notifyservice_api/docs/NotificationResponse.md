# NotificationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**status** | [**NotificationStatus**](NotificationStatus.md) |  | [optional] 
**channel** | [**NotificationChannel**](NotificationChannel.md) |  | [optional] 
**recipient** | [**NotificationResponseRecipient**](NotificationResponseRecipient.md) |  | [optional] 
**subject** | **str** |  | [optional] 
**html_body** | **str** |  | [optional] 
**text_body** | **str** |  | [optional] 
**template_key** | **str** |  | [optional] 
**template_data** | **Dict[str, object]** |  | [optional] 
**idempotency_key** | **str** |  | [optional] 
**action_url** | **str** |  | [optional] 
**attempt_count** | **int** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**events** | [**List[NotificationEventDto]**](NotificationEventDto.md) |  | [optional] 
**suppression_reason** | **str** |  | [optional] 
**attachments** | [**List[AttachmentMetadata]**](AttachmentMetadata.md) | Metadata for files that were attached to this email notification. Bytes are purged after delivery; the &#x60;purged&#x60; flag indicates whether this has occurred. Omitted when the notification had no attachments.  | [optional] 

## Example

```python
from notifyservice_api.models.notification_response import NotificationResponse

# TODO update the JSON string below
json = "{}"
# create an instance of NotificationResponse from a JSON string
notification_response_instance = NotificationResponse.from_json(json)
# print the JSON string representation of the object
print(NotificationResponse.to_json())

# convert the object into a dict
notification_response_dict = notification_response_instance.to_dict()
# create an instance of NotificationResponse from a dict
notification_response_from_dict = NotificationResponse.from_dict(notification_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


