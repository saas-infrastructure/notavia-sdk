# WorkflowVersionDetail

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Version** | **int32** |  | 
**BodyJson** | **string** | Raw JSON DSL body of this version. | 
**CreatedAt** | **time.Time** |  | 
**ActivatedAt** | Pointer to **time.Time** |  | [optional] 
**DeactivatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewWorkflowVersionDetail

`func NewWorkflowVersionDetail(version int32, bodyJson string, createdAt time.Time, ) *WorkflowVersionDetail`

NewWorkflowVersionDetail instantiates a new WorkflowVersionDetail object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowVersionDetailWithDefaults

`func NewWorkflowVersionDetailWithDefaults() *WorkflowVersionDetail`

NewWorkflowVersionDetailWithDefaults instantiates a new WorkflowVersionDetail object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetVersion

`func (o *WorkflowVersionDetail) GetVersion() int32`

GetVersion returns the Version field if non-nil, zero value otherwise.

### GetVersionOk

`func (o *WorkflowVersionDetail) GetVersionOk() (*int32, bool)`

GetVersionOk returns a tuple with the Version field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVersion

`func (o *WorkflowVersionDetail) SetVersion(v int32)`

SetVersion sets Version field to given value.


### GetBodyJson

`func (o *WorkflowVersionDetail) GetBodyJson() string`

GetBodyJson returns the BodyJson field if non-nil, zero value otherwise.

### GetBodyJsonOk

`func (o *WorkflowVersionDetail) GetBodyJsonOk() (*string, bool)`

GetBodyJsonOk returns a tuple with the BodyJson field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBodyJson

`func (o *WorkflowVersionDetail) SetBodyJson(v string)`

SetBodyJson sets BodyJson field to given value.


### GetCreatedAt

`func (o *WorkflowVersionDetail) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WorkflowVersionDetail) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WorkflowVersionDetail) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetActivatedAt

`func (o *WorkflowVersionDetail) GetActivatedAt() time.Time`

GetActivatedAt returns the ActivatedAt field if non-nil, zero value otherwise.

### GetActivatedAtOk

`func (o *WorkflowVersionDetail) GetActivatedAtOk() (*time.Time, bool)`

GetActivatedAtOk returns a tuple with the ActivatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActivatedAt

`func (o *WorkflowVersionDetail) SetActivatedAt(v time.Time)`

SetActivatedAt sets ActivatedAt field to given value.

### HasActivatedAt

`func (o *WorkflowVersionDetail) HasActivatedAt() bool`

HasActivatedAt returns a boolean if a field has been set.

### GetDeactivatedAt

`func (o *WorkflowVersionDetail) GetDeactivatedAt() time.Time`

GetDeactivatedAt returns the DeactivatedAt field if non-nil, zero value otherwise.

### GetDeactivatedAtOk

`func (o *WorkflowVersionDetail) GetDeactivatedAtOk() (*time.Time, bool)`

GetDeactivatedAtOk returns a tuple with the DeactivatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeactivatedAt

`func (o *WorkflowVersionDetail) SetDeactivatedAt(v time.Time)`

SetDeactivatedAt sets DeactivatedAt field to given value.

### HasDeactivatedAt

`func (o *WorkflowVersionDetail) HasDeactivatedAt() bool`

HasDeactivatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


