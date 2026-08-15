# PromotionResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applied** | **bool** | True when the promotion was written; false for dry runs and no-op (&#x60;identical&#x60;) promotions. | 
**status** | [**PromotionStatus**](PromotionStatus.md) |  | 
**template_diff** | [**TemplatePromotionDiff**](TemplatePromotionDiff.md) |  | [optional] 
**workflow_diff** | [**WorkflowPromotionDiff**](WorkflowPromotionDiff.md) |  | [optional] 
**target_version** | **int** | For workflow promotions, the new Live version number that was created and activated. | [optional] 

## Example

```python
from notifyservice_api.models.promotion_result import PromotionResult

# TODO update the JSON string below
json = "{}"
# create an instance of PromotionResult from a JSON string
promotion_result_instance = PromotionResult.from_json(json)
# print the JSON string representation of the object
print(PromotionResult.to_json())

# convert the object into a dict
promotion_result_dict = promotion_result_instance.to_dict()
# create an instance of PromotionResult from a dict
promotion_result_from_dict = PromotionResult.from_dict(promotion_result_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


