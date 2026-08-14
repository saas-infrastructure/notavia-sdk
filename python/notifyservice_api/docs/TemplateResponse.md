# TemplateResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**key** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**subject_template** | **str** | Populated from the Email channel body for backwards compatibility. | [optional] 
**html_body_template** | **str** | Populated from the Email channel body for backwards compatibility. | [optional] 
**text_body_template** | **str** | Populated from the Email/SMS channel body for backwards compatibility. | [optional] 
**created_at** | **datetime** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 
**bodies** | [**List[TemplateChannelBodyResponse]**](TemplateChannelBodyResponse.md) | Per-channel body variants. Replaces the legacy flat fields for new integrations. | [optional] 
**body_channels** | [**List[NotificationChannelKebab]**](NotificationChannelKebab.md) | Kebab-case list of channels for which a body variant exists. | [optional] 

## Example

```python
from notifyservice_api.models.template_response import TemplateResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TemplateResponse from a JSON string
template_response_instance = TemplateResponse.from_json(json)
# print the JSON string representation of the object
print(TemplateResponse.to_json())

# convert the object into a dict
template_response_dict = template_response_instance.to_dict()
# create an instance of TemplateResponse from a dict
template_response_from_dict = TemplateResponse.from_dict(template_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


