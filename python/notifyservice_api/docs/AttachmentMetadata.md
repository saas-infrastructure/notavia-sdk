# AttachmentMetadata


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**filename** | **str** | Original file name. | [optional] 
**content_type** | **str** | MIME type of the file. | [optional] 
**size_bytes** | **int** | File size in bytes. | [optional] 
**purged** | **bool** | True when the attachment bytes have been deleted from ephemeral storage after delivery. The metadata fields (filename, content_type, size_bytes) are always retained.  | [optional] 

## Example

```python
from notifyservice_api.models.attachment_metadata import AttachmentMetadata

# TODO update the JSON string below
json = "{}"
# create an instance of AttachmentMetadata from a JSON string
attachment_metadata_instance = AttachmentMetadata.from_json(json)
# print the JSON string representation of the object
print(AttachmentMetadata.to_json())

# convert the object into a dict
attachment_metadata_dict = attachment_metadata_instance.to_dict()
# create an instance of AttachmentMetadata from a dict
attachment_metadata_from_dict = AttachmentMetadata.from_dict(attachment_metadata_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


