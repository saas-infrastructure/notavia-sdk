# AttachmentInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**filename** | **str** | File name shown to the recipient, e.g. &#x60;\&quot;statement.pdf\&quot;&#x60;. | 
**content_type** | **str** | MIME type of the file, e.g. &#x60;\&quot;application/pdf\&quot;&#x60;. | 
**content_base64** | **str** | Base64-encoded file content. | 

## Example

```python
from notifyservice_api.models.attachment_input import AttachmentInput

# TODO update the JSON string below
json = "{}"
# create an instance of AttachmentInput from a JSON string
attachment_input_instance = AttachmentInput.from_json(json)
# print the JSON string representation of the object
print(AttachmentInput.to_json())

# convert the object into a dict
attachment_input_dict = attachment_input_instance.to_dict()
# create an instance of AttachmentInput from a dict
attachment_input_from_dict = AttachmentInput.from_dict(attachment_input_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


