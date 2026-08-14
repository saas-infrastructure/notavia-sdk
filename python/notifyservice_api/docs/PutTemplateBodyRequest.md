# PutTemplateBodyRequest

Provide the fields relevant to the target channel. Fields not applicable to the channel are ignored. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**subject_template** | **str** |  | [optional] 
**text_template** | **str** |  | [optional] 
**html_template** | **str** |  | [optional] 
**structured_template** | **str** | JSON string containing the channel-specific structured body. For Slack this is a Block Kit blocks array rendered via Liquid. For Teams this is an Adaptive Card v1.5 object rendered via Liquid. For Discord this is an embed object rendered via Liquid.  | [optional] 

## Example

```python
from notifyservice_api.models.put_template_body_request import PutTemplateBodyRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PutTemplateBodyRequest from a JSON string
put_template_body_request_instance = PutTemplateBodyRequest.from_json(json)
# print the JSON string representation of the object
print(PutTemplateBodyRequest.to_json())

# convert the object into a dict
put_template_body_request_dict = put_template_body_request_instance.to_dict()
# create an instance of PutTemplateBodyRequest from a dict
put_template_body_request_from_dict = PutTemplateBodyRequest.from_dict(put_template_body_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


