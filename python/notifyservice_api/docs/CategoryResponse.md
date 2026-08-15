# CategoryResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**key** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**is_critical** | **bool** |  | [optional] 
**default_channels** | [**List[NotificationChannel]**](NotificationChannel.md) |  | [optional] 
**default_opt_in** | **bool** |  | [optional] 
**is_archived** | **bool** |  | [optional] 

## Example

```python
from notifyservice_api.models.category_response import CategoryResponse

# TODO update the JSON string below
json = "{}"
# create an instance of CategoryResponse from a JSON string
category_response_instance = CategoryResponse.from_json(json)
# print the JSON string representation of the object
print(CategoryResponse.to_json())

# convert the object into a dict
category_response_dict = category_response_instance.to_dict()
# create an instance of CategoryResponse from a dict
category_response_from_dict = CategoryResponse.from_dict(category_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


