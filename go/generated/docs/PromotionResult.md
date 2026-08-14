# PromotionResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Applied** | **bool** | True when the promotion was written; false for dry runs and no-op (&#x60;identical&#x60;) promotions. | 
**Status** | [**PromotionStatus**](PromotionStatus.md) |  | 
**TemplateDiff** | Pointer to [**TemplatePromotionDiff**](TemplatePromotionDiff.md) |  | [optional] 
**WorkflowDiff** | Pointer to [**WorkflowPromotionDiff**](WorkflowPromotionDiff.md) |  | [optional] 
**TargetVersion** | Pointer to **int32** | For workflow promotions, the new Live version number that was created and activated. | [optional] 

## Methods

### NewPromotionResult

`func NewPromotionResult(applied bool, status PromotionStatus, ) *PromotionResult`

NewPromotionResult instantiates a new PromotionResult object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPromotionResultWithDefaults

`func NewPromotionResultWithDefaults() *PromotionResult`

NewPromotionResultWithDefaults instantiates a new PromotionResult object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetApplied

`func (o *PromotionResult) GetApplied() bool`

GetApplied returns the Applied field if non-nil, zero value otherwise.

### GetAppliedOk

`func (o *PromotionResult) GetAppliedOk() (*bool, bool)`

GetAppliedOk returns a tuple with the Applied field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApplied

`func (o *PromotionResult) SetApplied(v bool)`

SetApplied sets Applied field to given value.


### GetStatus

`func (o *PromotionResult) GetStatus() PromotionStatus`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *PromotionResult) GetStatusOk() (*PromotionStatus, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *PromotionResult) SetStatus(v PromotionStatus)`

SetStatus sets Status field to given value.


### GetTemplateDiff

`func (o *PromotionResult) GetTemplateDiff() TemplatePromotionDiff`

GetTemplateDiff returns the TemplateDiff field if non-nil, zero value otherwise.

### GetTemplateDiffOk

`func (o *PromotionResult) GetTemplateDiffOk() (*TemplatePromotionDiff, bool)`

GetTemplateDiffOk returns a tuple with the TemplateDiff field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTemplateDiff

`func (o *PromotionResult) SetTemplateDiff(v TemplatePromotionDiff)`

SetTemplateDiff sets TemplateDiff field to given value.

### HasTemplateDiff

`func (o *PromotionResult) HasTemplateDiff() bool`

HasTemplateDiff returns a boolean if a field has been set.

### GetWorkflowDiff

`func (o *PromotionResult) GetWorkflowDiff() WorkflowPromotionDiff`

GetWorkflowDiff returns the WorkflowDiff field if non-nil, zero value otherwise.

### GetWorkflowDiffOk

`func (o *PromotionResult) GetWorkflowDiffOk() (*WorkflowPromotionDiff, bool)`

GetWorkflowDiffOk returns a tuple with the WorkflowDiff field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWorkflowDiff

`func (o *PromotionResult) SetWorkflowDiff(v WorkflowPromotionDiff)`

SetWorkflowDiff sets WorkflowDiff field to given value.

### HasWorkflowDiff

`func (o *PromotionResult) HasWorkflowDiff() bool`

HasWorkflowDiff returns a boolean if a field has been set.

### GetTargetVersion

`func (o *PromotionResult) GetTargetVersion() int32`

GetTargetVersion returns the TargetVersion field if non-nil, zero value otherwise.

### GetTargetVersionOk

`func (o *PromotionResult) GetTargetVersionOk() (*int32, bool)`

GetTargetVersionOk returns a tuple with the TargetVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTargetVersion

`func (o *PromotionResult) SetTargetVersion(v int32)`

SetTargetVersion sets TargetVersion field to given value.

### HasTargetVersion

`func (o *PromotionResult) HasTargetVersion() bool`

HasTargetVersion returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


