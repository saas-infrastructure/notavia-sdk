# UnreadCountResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unread_count** | **int** |  | [optional] 

## Example

```python
from notifyservice_api.models.unread_count_response import UnreadCountResponse

# TODO update the JSON string below
json = "{}"
# create an instance of UnreadCountResponse from a JSON string
unread_count_response_instance = UnreadCountResponse.from_json(json)
# print the JSON string representation of the object
print(UnreadCountResponse.to_json())

# convert the object into a dict
unread_count_response_dict = unread_count_response_instance.to_dict()
# create an instance of UnreadCountResponse from a dict
unread_count_response_from_dict = UnreadCountResponse.from_dict(unread_count_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


