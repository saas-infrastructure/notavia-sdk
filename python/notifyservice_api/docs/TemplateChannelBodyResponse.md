# TemplateChannelBodyResponse

Per-channel body variant for a template. The channel-specific fields that apply depend on the channel: - **Email:** `subject_template` + `html_template` (+ optional `text_template`) - **InApp:** `html_template` (or `text_template` for plain-text in-app) - **SMS:** `text_template` - **Slack:** `structured_template` (Block Kit JSON as Liquid template) - **Teams:** `structured_template` (Adaptive Card v1.5 JSON as Liquid template) - **Discord:** `text_template` (content) and/or `structured_template` (embed JSON) 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**channel** | [**NotificationChannel**](NotificationChannel.md) |  | [optional] 
**subject_template** | **str** |  | [optional] 
**text_template** | **str** |  | [optional] 
**html_template** | **str** |  | [optional] 
**structured_template** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.template_channel_body_response import TemplateChannelBodyResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TemplateChannelBodyResponse from a JSON string
template_channel_body_response_instance = TemplateChannelBodyResponse.from_json(json)
# print the JSON string representation of the object
print(TemplateChannelBodyResponse.to_json())

# convert the object into a dict
template_channel_body_response_dict = template_channel_body_response_instance.to_dict()
# create an instance of TemplateChannelBodyResponse from a dict
template_channel_body_response_from_dict = TemplateChannelBodyResponse.from_dict(template_channel_body_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


