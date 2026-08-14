# RenderTemplateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | **Dict[str, object]** |  | [optional] 

## Example

```python
from notifyservice_api.models.render_template_request import RenderTemplateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of RenderTemplateRequest from a JSON string
render_template_request_instance = RenderTemplateRequest.from_json(json)
# print the JSON string representation of the object
print(RenderTemplateRequest.to_json())

# convert the object into a dict
render_template_request_dict = render_template_request_instance.to_dict()
# create an instance of RenderTemplateRequest from a dict
render_template_request_from_dict = RenderTemplateRequest.from_dict(render_template_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


