# CreateCategoryRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **str** |  | 
**name** | **str** |  | 
**description** | **str** |  | [optional] 
**is_critical** | **bool** |  | [optional] [default to False]
**default_channels** | [**List[NotificationChannel]**](NotificationChannel.md) |  | 
**default_opt_in** | **bool** |  | [optional] [default to True]

## Example

```python
from notifyservice_api.models.create_category_request import CreateCategoryRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateCategoryRequest from a JSON string
create_category_request_instance = CreateCategoryRequest.from_json(json)
# print the JSON string representation of the object
print(CreateCategoryRequest.to_json())

# convert the object into a dict
create_category_request_dict = create_category_request_instance.to_dict()
# create an instance of CreateCategoryRequest from a dict
create_category_request_from_dict = CreateCategoryRequest.from_dict(create_category_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


