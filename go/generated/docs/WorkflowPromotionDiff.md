# WorkflowPromotionDiff

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Key** | **string** |  | 
**Status** | [**PromotionStatus**](PromotionStatus.md) |  | 
**Name** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**Description** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**Body** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**SourceVersion** | Pointer to **int32** | The active Test version number being promoted. | [optional] 
**TargetCurrentVersion** | Pointer to **int32** | The currently active Live version number, if any. | [optional] 
**ReferencedTemplates** | [**[]TemplatePromotionDiff**](TemplatePromotionDiff.md) | Per-referenced-template diff against Live; the cascade candidates. | 

## Methods

### NewWorkflowPromotionDiff

`func NewWorkflowPromotionDiff(key string, status PromotionStatus, name FieldChangeKind, description FieldChangeKind, body FieldChangeKind, referencedTemplates []TemplatePromotionDiff, ) *WorkflowPromotionDiff`

NewWorkflowPromotionDiff instantiates a new WorkflowPromotionDiff object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowPromotionDiffWithDefaults

`func NewWorkflowPromotionDiffWithDefaults() *WorkflowPromotionDiff`

NewWorkflowPromotionDiffWithDefaults instantiates a new WorkflowPromotionDiff object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKey

`func (o *WorkflowPromotionDiff) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *WorkflowPromotionDiff) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *WorkflowPromotionDiff) SetKey(v string)`

SetKey sets Key field to given value.


### GetStatus

`func (o *WorkflowPromotionDiff) GetStatus() PromotionStatus`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkflowPromotionDiff) GetStatusOk() (*PromotionStatus, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkflowPromotionDiff) SetStatus(v PromotionStatus)`

SetStatus sets Status field to given value.


### GetName

`func (o *WorkflowPromotionDiff) GetName() FieldChangeKind`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *WorkflowPromotionDiff) GetNameOk() (*FieldChangeKind, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *WorkflowPromotionDiff) SetName(v FieldChangeKind)`

SetName sets Name field to given value.


### GetDescription

`func (o *WorkflowPromotionDiff) GetDescription() FieldChangeKind`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *WorkflowPromotionDiff) GetDescriptionOk() (*FieldChangeKind, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *WorkflowPromotionDiff) SetDescription(v FieldChangeKind)`

SetDescription sets Description field to given value.


### GetBody

`func (o *WorkflowPromotionDiff) GetBody() FieldChangeKind`

GetBody returns the Body field if non-nil, zero value otherwise.

### GetBodyOk

`func (o *WorkflowPromotionDiff) GetBodyOk() (*FieldChangeKind, bool)`

GetBodyOk returns a tuple with the Body field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBody

`func (o *WorkflowPromotionDiff) SetBody(v FieldChangeKind)`

SetBody sets Body field to given value.


### GetSourceVersion

`func (o *WorkflowPromotionDiff) GetSourceVersion() int32`

GetSourceVersion returns the SourceVersion field if non-nil, zero value otherwise.

### GetSourceVersionOk

`func (o *WorkflowPromotionDiff) GetSourceVersionOk() (*int32, bool)`

GetSourceVersionOk returns a tuple with the SourceVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSourceVersion

`func (o *WorkflowPromotionDiff) SetSourceVersion(v int32)`

SetSourceVersion sets SourceVersion field to given value.

### HasSourceVersion

`func (o *WorkflowPromotionDiff) HasSourceVersion() bool`

HasSourceVersion returns a boolean if a field has been set.

### GetTargetCurrentVersion

`func (o *WorkflowPromotionDiff) GetTargetCurrentVersion() int32`

GetTargetCurrentVersion returns the TargetCurrentVersion field if non-nil, zero value otherwise.

### GetTargetCurrentVersionOk

`func (o *WorkflowPromotionDiff) GetTargetCurrentVersionOk() (*int32, bool)`

GetTargetCurrentVersionOk returns a tuple with the TargetCurrentVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTargetCurrentVersion

`func (o *WorkflowPromotionDiff) SetTargetCurrentVersion(v int32)`

SetTargetCurrentVersion sets TargetCurrentVersion field to given value.

### HasTargetCurrentVersion

`func (o *WorkflowPromotionDiff) HasTargetCurrentVersion() bool`

HasTargetCurrentVersion returns a boolean if a field has been set.

### GetReferencedTemplates

`func (o *WorkflowPromotionDiff) GetReferencedTemplates() []TemplatePromotionDiff`

GetReferencedTemplates returns the ReferencedTemplates field if non-nil, zero value otherwise.

### GetReferencedTemplatesOk

`func (o *WorkflowPromotionDiff) GetReferencedTemplatesOk() (*[]TemplatePromotionDiff, bool)`

GetReferencedTemplatesOk returns a tuple with the ReferencedTemplates field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReferencedTemplates

`func (o *WorkflowPromotionDiff) SetReferencedTemplates(v []TemplatePromotionDiff)`

SetReferencedTemplates sets ReferencedTemplates field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


