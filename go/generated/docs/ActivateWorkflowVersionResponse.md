# ActivateWorkflowVersionResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Valid** | **bool** |  | 
**Errors** | [**[]WorkflowValidationError**](WorkflowValidationError.md) |  | 

## Methods

### NewActivateWorkflowVersionResponse

`func NewActivateWorkflowVersionResponse(valid bool, errors []WorkflowValidationError, ) *ActivateWorkflowVersionResponse`

NewActivateWorkflowVersionResponse instantiates a new ActivateWorkflowVersionResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewActivateWorkflowVersionResponseWithDefaults

`func NewActivateWorkflowVersionResponseWithDefaults() *ActivateWorkflowVersionResponse`

NewActivateWorkflowVersionResponseWithDefaults instantiates a new ActivateWorkflowVersionResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetValid

`func (o *ActivateWorkflowVersionResponse) GetValid() bool`

GetValid returns the Valid field if non-nil, zero value otherwise.

### GetValidOk

`func (o *ActivateWorkflowVersionResponse) GetValidOk() (*bool, bool)`

GetValidOk returns a tuple with the Valid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetValid

`func (o *ActivateWorkflowVersionResponse) SetValid(v bool)`

SetValid sets Valid field to given value.


### GetErrors

`func (o *ActivateWorkflowVersionResponse) GetErrors() []WorkflowValidationError`

GetErrors returns the Errors field if non-nil, zero value otherwise.

### GetErrorsOk

`func (o *ActivateWorkflowVersionResponse) GetErrorsOk() (*[]WorkflowValidationError, bool)`

GetErrorsOk returns a tuple with the Errors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetErrors

`func (o *ActivateWorkflowVersionResponse) SetErrors(v []WorkflowValidationError)`

SetErrors sets Errors field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


