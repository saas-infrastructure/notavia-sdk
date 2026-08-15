# WorkflowValidationError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Code** | **string** | Machine-readable error code. Known codes: &#x60;unknown_category&#x60;, &#x60;template_body_missing&#x60;, &#x60;delay_requires_duration_or_until&#x60;, &#x60;delay_duration_xor_until&#x60;, &#x60;invalid_duration&#x60;, &#x60;invalid_expression&#x60;, &#x60;goto_target_not_found&#x60;, &#x60;unreachable_step&#x60;, &#x60;synchronous_cycle&#x60;, &#x60;at_requires_timezone&#x60;, &#x60;unknown_timezone&#x60;, &#x60;event_required&#x60;, &#x60;invalid_max_items&#x60;, &#x60;duplicate_step_id&#x60;, &#x60;unknown_channel&#x60;.  | 
**Message** | **string** | Human-readable description of the error. | 
**Pointer** | **string** | JSON Pointer (RFC 6901) to the offending location in the body JSON. | 

## Methods

### NewWorkflowValidationError

`func NewWorkflowValidationError(code string, message string, pointer string, ) *WorkflowValidationError`

NewWorkflowValidationError instantiates a new WorkflowValidationError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowValidationErrorWithDefaults

`func NewWorkflowValidationErrorWithDefaults() *WorkflowValidationError`

NewWorkflowValidationErrorWithDefaults instantiates a new WorkflowValidationError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCode

`func (o *WorkflowValidationError) GetCode() string`

GetCode returns the Code field if non-nil, zero value otherwise.

### GetCodeOk

`func (o *WorkflowValidationError) GetCodeOk() (*string, bool)`

GetCodeOk returns a tuple with the Code field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCode

`func (o *WorkflowValidationError) SetCode(v string)`

SetCode sets Code field to given value.


### GetMessage

`func (o *WorkflowValidationError) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *WorkflowValidationError) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *WorkflowValidationError) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetPointer

`func (o *WorkflowValidationError) GetPointer() string`

GetPointer returns the Pointer field if non-nil, zero value otherwise.

### GetPointerOk

`func (o *WorkflowValidationError) GetPointerOk() (*string, bool)`

GetPointerOk returns a tuple with the Pointer field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPointer

`func (o *WorkflowValidationError) SetPointer(v string)`

SetPointer sets Pointer field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


