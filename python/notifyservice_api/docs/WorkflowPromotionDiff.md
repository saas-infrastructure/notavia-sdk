# WorkflowPromotionDiff


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **str** |  | 
**status** | [**PromotionStatus**](PromotionStatus.md) |  | 
**name** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**description** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**body** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**source_version** | **int** | The active Test version number being promoted. | [optional] 
**target_current_version** | **int** | The currently active Live version number, if any. | [optional] 
**referenced_templates** | [**List[TemplatePromotionDiff]**](TemplatePromotionDiff.md) | Per-referenced-template diff against Live; the cascade candidates. | 

## Example

```python
from notifyservice_api.models.workflow_promotion_diff import WorkflowPromotionDiff

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowPromotionDiff from a JSON string
workflow_promotion_diff_instance = WorkflowPromotionDiff.from_json(json)
# print the JSON string representation of the object
print(WorkflowPromotionDiff.to_json())

# convert the object into a dict
workflow_promotion_diff_dict = workflow_promotion_diff_instance.to_dict()
# create an instance of WorkflowPromotionDiff from a dict
workflow_promotion_diff_from_dict = WorkflowPromotionDiff.from_dict(workflow_promotion_diff_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


