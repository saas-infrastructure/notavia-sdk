# CreateTemplateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **str** |  | 
**name** | **str** |  | 
**subject_template** | **str** |  | 
**html_body_template** | **str** |  | 
**text_body_template** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.create_template_request import CreateTemplateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateTemplateRequest from a JSON string
create_template_request_instance = CreateTemplateRequest.from_json(json)
# print the JSON string representation of the object
print(CreateTemplateRequest.to_json())

# convert the object into a dict
create_template_request_dict = create_template_request_instance.to_dict()
# create an instance of CreateTemplateRequest from a dict
create_template_request_from_dict = CreateTemplateRequest.from_dict(create_template_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


