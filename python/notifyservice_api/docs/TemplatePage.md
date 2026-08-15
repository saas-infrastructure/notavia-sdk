# TemplatePage


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[TemplateResponse]**](TemplateResponse.md) |  | [optional] 
**next_cursor** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.template_page import TemplatePage

# TODO update the JSON string below
json = "{}"
# create an instance of TemplatePage from a JSON string
template_page_instance = TemplatePage.from_json(json)
# print the JSON string representation of the object
print(TemplatePage.to_json())

# convert the object into a dict
template_page_dict = template_page_instance.to_dict()
# create an instance of TemplatePage from a dict
template_page_from_dict = TemplatePage.from_dict(template_page_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


