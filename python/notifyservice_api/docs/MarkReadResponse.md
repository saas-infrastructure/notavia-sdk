# MarkReadResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**is_read** | **bool** |  | [optional] 
**read_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.mark_read_response import MarkReadResponse

# TODO update the JSON string below
json = "{}"
# create an instance of MarkReadResponse from a JSON string
mark_read_response_instance = MarkReadResponse.from_json(json)
# print the JSON string representation of the object
print(MarkReadResponse.to_json())

# convert the object into a dict
mark_read_response_dict = mark_read_response_instance.to_dict()
# create an instance of MarkReadResponse from a dict
mark_read_response_from_dict = MarkReadResponse.from_dict(mark_read_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


