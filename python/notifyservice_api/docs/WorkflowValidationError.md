# WorkflowValidationError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **str** | Machine-readable error code. Known codes: &#x60;unknown_category&#x60;, &#x60;template_body_missing&#x60;, &#x60;delay_requires_duration_or_until&#x60;, &#x60;delay_duration_xor_until&#x60;, &#x60;invalid_duration&#x60;, &#x60;invalid_expression&#x60;, &#x60;goto_target_not_found&#x60;, &#x60;unreachable_step&#x60;, &#x60;synchronous_cycle&#x60;, &#x60;at_requires_timezone&#x60;, &#x60;unknown_timezone&#x60;, &#x60;event_required&#x60;, &#x60;invalid_max_items&#x60;, &#x60;duplicate_step_id&#x60;, &#x60;unknown_channel&#x60;.  | 
**message** | **str** | Human-readable description of the error. | 
**pointer** | **str** | JSON Pointer (RFC 6901) to the offending location in the body JSON. | 

## Example

```python
from notifyservice_api.models.workflow_validation_error import WorkflowValidationError

# TODO update the JSON string below
json = "{}"
# create an instance of WorkflowValidationError from a JSON string
workflow_validation_error_instance = WorkflowValidationError.from_json(json)
# print the JSON string representation of the object
print(WorkflowValidationError.to_json())

# convert the object into a dict
workflow_validation_error_dict = workflow_validation_error_instance.to_dict()
# create an instance of WorkflowValidationError from a dict
workflow_validation_error_from_dict = WorkflowValidationError.from_dict(workflow_validation_error_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


