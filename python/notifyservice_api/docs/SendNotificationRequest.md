# SendNotificationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**channel** | [**NotificationChannel**](NotificationChannel.md) |  | 
**recipient** | [**Recipient**](Recipient.md) |  | 
**subject** | **str** | Email subject line. Ignored for non-email channels. | [optional] 
**html_body** | **str** | Inline HTML body. Ignored when &#x60;template_key&#x60; is set. Email/in-app only. | [optional] 
**text_body** | **str** | Inline plain-text body. Email/SMS only. | [optional] 
**template_key** | **str** | Key of a stored template. Required for Slack, Teams, Discord channels. | [optional] 
**template_data** | **Dict[str, object]** | Liquid template variables merged at render time. | [optional] 
**action_url** | **str** | Optional CTA URL surfaced in in-app notifications. | [optional] 
**category** | **str** | Preference category key. Suppresses the send when the recipient has opted out. | [optional] 
**attachments** | [**List[AttachmentInput]**](AttachmentInput.md) | File attachments for email notifications (email channel only). Maximum 10 files; maximum 15 MB per file and 15 MB total. File content must be base64-encoded. Bytes are stored ephemerally and deleted after delivery — only metadata is retained in the audit log.  | [optional] 

## Example

```python
from notifyservice_api.models.send_notification_request import SendNotificationRequest

# TODO update the JSON string below
json = "{}"
# create an instance of SendNotificationRequest from a JSON string
send_notification_request_instance = SendNotificationRequest.from_json(json)
# print the JSON string representation of the object
print(SendNotificationRequest.to_json())

# convert the object into a dict
send_notification_request_dict = send_notification_request_instance.to_dict()
# create an instance of SendNotificationRequest from a dict
send_notification_request_from_dict = SendNotificationRequest.from_dict(send_notification_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


