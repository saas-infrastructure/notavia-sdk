# UpdateTemplateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**subject_template** | **str** |  | [optional] 
**html_body_template** | **str** |  | [optional] 
**text_body_template** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.update_template_request import UpdateTemplateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateTemplateRequest from a JSON string
update_template_request_instance = UpdateTemplateRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateTemplateRequest.to_json())

# convert the object into a dict
update_template_request_dict = update_template_request_instance.to_dict()
# create an instance of UpdateTemplateRequest from a dict
update_template_request_from_dict = UpdateTemplateRequest.from_dict(update_template_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


