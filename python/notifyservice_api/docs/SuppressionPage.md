# SuppressionPage


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[SuppressionResponse]**](SuppressionResponse.md) |  | [optional] 
**has_more** | **bool** |  | [optional] 
**next_cursor** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.suppression_page import SuppressionPage

# TODO update the JSON string below
json = "{}"
# create an instance of SuppressionPage from a JSON string
suppression_page_instance = SuppressionPage.from_json(json)
# print the JSON string representation of the object
print(SuppressionPage.to_json())

# convert the object into a dict
suppression_page_dict = suppression_page_instance.to_dict()
# create an instance of SuppressionPage from a dict
suppression_page_from_dict = SuppressionPage.from_dict(suppression_page_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


