# TemplateBodyChange


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**channel** | **str** |  | 
**subject** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**text** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**html** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**structured** | [**FieldChangeKind**](FieldChangeKind.md) |  | 

## Example

```python
from notifyservice_api.models.template_body_change import TemplateBodyChange

# TODO update the JSON string below
json = "{}"
# create an instance of TemplateBodyChange from a JSON string
template_body_change_instance = TemplateBodyChange.from_json(json)
# print the JSON string representation of the object
print(TemplateBodyChange.to_json())

# convert the object into a dict
template_body_change_dict = template_body_change_instance.to_dict()
# create an instance of TemplateBodyChange from a dict
template_body_change_from_dict = TemplateBodyChange.from_dict(template_body_change_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


