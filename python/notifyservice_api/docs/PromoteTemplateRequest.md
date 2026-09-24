# PromoteTemplateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**dry_run** | **bool** | If true, return the diff without writing to Live. | [optional] [default to False]

## Example

```python
from notifyservice_api.models.promote_template_request import PromoteTemplateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PromoteTemplateRequest from a JSON string
promote_template_request_instance = PromoteTemplateRequest.from_json(json)
# print the JSON string representation of the object
print(PromoteTemplateRequest.to_json())

# convert the object into a dict
promote_template_request_dict = promote_template_request_instance.to_dict()
# create an instance of PromoteTemplateRequest from a dict
promote_template_request_from_dict = PromoteTemplateRequest.from_dict(promote_template_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


