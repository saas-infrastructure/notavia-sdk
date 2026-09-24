# SuppressionResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**address** | **str** |  | [optional] 
**reason** | **str** |  | [optional] 
**source** | **str** |  | [optional] 
**diagnostic_detail** | **str** |  | [optional] 
**triggering_notification_id** | **str** |  | [optional] 
**suppressed_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.suppression_response import SuppressionResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SuppressionResponse from a JSON string
suppression_response_instance = SuppressionResponse.from_json(json)
# print the JSON string representation of the object
print(SuppressionResponse.to_json())

# convert the object into a dict
suppression_response_dict = suppression_response_instance.to_dict()
# create an instance of SuppressionResponse from a dict
suppression_response_from_dict = SuppressionResponse.from_dict(suppression_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


