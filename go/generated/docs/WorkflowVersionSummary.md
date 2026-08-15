# WorkflowVersionSummary

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Version** | **int32** |  | 
**CreatedAt** | **time.Time** |  | 
**ActivatedAt** | Pointer to **time.Time** |  | [optional] 
**DeactivatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewWorkflowVersionSummary

`func NewWorkflowVersionSummary(version int32, createdAt time.Time, ) *WorkflowVersionSummary`

NewWorkflowVersionSummary instantiates a new WorkflowVersionSummary object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowVersionSummaryWithDefaults

`func NewWorkflowVersionSummaryWithDefaults() *WorkflowVersionSummary`

NewWorkflowVersionSummaryWithDefaults instantiates a new WorkflowVersionSummary object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetVersion

`func (o *WorkflowVersionSummary) GetVersion() int32`

GetVersion returns the Version field if non-nil, zero value otherwise.

### GetVersionOk

`func (o *WorkflowVersionSummary) GetVersionOk() (*int32, bool)`

GetVersionOk returns a tuple with the Version field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVersion

`func (o *WorkflowVersionSummary) SetVersion(v int32)`

SetVersion sets Version field to given value.


### GetCreatedAt

`func (o *WorkflowVersionSummary) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WorkflowVersionSummary) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WorkflowVersionSummary) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetActivatedAt

`func (o *WorkflowVersionSummary) GetActivatedAt() time.Time`

GetActivatedAt returns the ActivatedAt field if non-nil, zero value otherwise.

### GetActivatedAtOk

`func (o *WorkflowVersionSummary) GetActivatedAtOk() (*time.Time, bool)`

GetActivatedAtOk returns a tuple with the ActivatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActivatedAt

`func (o *WorkflowVersionSummary) SetActivatedAt(v time.Time)`

SetActivatedAt sets ActivatedAt field to given value.

### HasActivatedAt

`func (o *WorkflowVersionSummary) HasActivatedAt() bool`

HasActivatedAt returns a boolean if a field has been set.

### GetDeactivatedAt

`func (o *WorkflowVersionSummary) GetDeactivatedAt() time.Time`

GetDeactivatedAt returns the DeactivatedAt field if non-nil, zero value otherwise.

### GetDeactivatedAtOk

`func (o *WorkflowVersionSummary) GetDeactivatedAtOk() (*time.Time, bool)`

GetDeactivatedAtOk returns a tuple with the DeactivatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeactivatedAt

`func (o *WorkflowVersionSummary) SetDeactivatedAt(v time.Time)`

SetDeactivatedAt sets DeactivatedAt field to given value.

### HasDeactivatedAt

`func (o *WorkflowVersionSummary) HasDeactivatedAt() bool`

HasDeactivatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


