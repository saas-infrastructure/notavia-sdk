# TemplatePromotionDiff


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **str** |  | 
**status** | [**PromotionStatus**](PromotionStatus.md) |  | 
**name** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**bodies** | [**List[TemplateBodyChange]**](TemplateBodyChange.md) |  | 

## Example

```python
from notifyservice_api.models.template_promotion_diff import TemplatePromotionDiff

# TODO update the JSON string below
json = "{}"
# create an instance of TemplatePromotionDiff from a JSON string
template_promotion_diff_instance = TemplatePromotionDiff.from_json(json)
# print the JSON string representation of the object
print(TemplatePromotionDiff.to_json())

# convert the object into a dict
template_promotion_diff_dict = template_promotion_diff_instance.to_dict()
# create an instance of TemplatePromotionDiff from a dict
template_promotion_diff_from_dict = TemplatePromotionDiff.from_dict(template_promotion_diff_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


