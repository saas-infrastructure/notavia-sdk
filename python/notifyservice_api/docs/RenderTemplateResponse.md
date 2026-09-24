# RenderTemplateResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**subject** | **str** |  | [optional] 
**html_body** | **str** |  | [optional] 
**text_body** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.render_template_response import RenderTemplateResponse

# TODO update the JSON string below
json = "{}"
# create an instance of RenderTemplateResponse from a JSON string
render_template_response_instance = RenderTemplateResponse.from_json(json)
# print the JSON string representation of the object
print(RenderTemplateResponse.to_json())

# convert the object into a dict
render_template_response_dict = render_template_response_instance.to_dict()
# create an instance of RenderTemplateResponse from a dict
render_template_response_from_dict = RenderTemplateResponse.from_dict(render_template_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


