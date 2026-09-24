# CategoryListResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[CategoryResponse]**](CategoryResponse.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.category_list_response import CategoryListResponse

# TODO update the JSON string below
json = "{}"
# create an instance of CategoryListResponse from a JSON string
category_list_response_instance = CategoryListResponse.from_json(json)
# print the JSON string representation of the object
print(CategoryListResponse.to_json())

# convert the object into a dict
category_list_response_dict = category_list_response_instance.to_dict()
# create an instance of CategoryListResponse from a dict
category_list_response_from_dict = CategoryListResponse.from_dict(category_list_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


