# AddSuppressionRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** |  | 

## Example

```python
from notifyservice_api.models.add_suppression_request import AddSuppressionRequest

# TODO update the JSON string below
json = "{}"
# create an instance of AddSuppressionRequest from a JSON string
add_suppression_request_instance = AddSuppressionRequest.from_json(json)
# print the JSON string representation of the object
print(AddSuppressionRequest.to_json())

# convert the object into a dict
add_suppression_request_dict = add_suppression_request_instance.to_dict()
# create an instance of AddSuppressionRequest from a dict
add_suppression_request_from_dict = AddSuppressionRequest.from_dict(add_suppression_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


