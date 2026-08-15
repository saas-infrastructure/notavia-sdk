# WorkflowSummaryResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Key** | **string** |  | 
**Name** | **string** |  | 
**Status** | **string** |  | 
**ActiveVersion** | Pointer to **int32** |  | [optional] 
**TriggerCount7d** | **int64** |  | 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewWorkflowSummaryResponse

`func NewWorkflowSummaryResponse(id string, key string, name string, status string, triggerCount7d int64, createdAt time.Time, ) *WorkflowSummaryResponse`

NewWorkflowSummaryResponse instantiates a new WorkflowSummaryResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowSummaryResponseWithDefaults

`func NewWorkflowSummaryResponseWithDefaults() *WorkflowSummaryResponse`

NewWorkflowSummaryResponseWithDefaults instantiates a new WorkflowSummaryResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WorkflowSummaryResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WorkflowSummaryResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WorkflowSummaryResponse) SetId(v string)`

SetId sets Id field to given value.


### GetKey

`func (o *WorkflowSummaryResponse) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *WorkflowSummaryResponse) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *WorkflowSummaryResponse) SetKey(v string)`

SetKey sets Key field to given value.


### GetName

`func (o *WorkflowSummaryResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *WorkflowSummaryResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *WorkflowSummaryResponse) SetName(v string)`

SetName sets Name field to given value.


### GetStatus

`func (o *WorkflowSummaryResponse) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkflowSummaryResponse) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkflowSummaryResponse) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetActiveVersion

`func (o *WorkflowSummaryResponse) GetActiveVersion() int32`

GetActiveVersion returns the ActiveVersion field if non-nil, zero value otherwise.

### GetActiveVersionOk

`func (o *WorkflowSummaryResponse) GetActiveVersionOk() (*int32, bool)`

GetActiveVersionOk returns a tuple with the ActiveVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActiveVersion

`func (o *WorkflowSummaryResponse) SetActiveVersion(v int32)`

SetActiveVersion sets ActiveVersion field to given value.

### HasActiveVersion

`func (o *WorkflowSummaryResponse) HasActiveVersion() bool`

HasActiveVersion returns a boolean if a field has been set.

### GetTriggerCount7d

`func (o *WorkflowSummaryResponse) GetTriggerCount7d() int64`

GetTriggerCount7d returns the TriggerCount7d field if non-nil, zero value otherwise.

### GetTriggerCount7dOk

`func (o *WorkflowSummaryResponse) GetTriggerCount7dOk() (*int64, bool)`

GetTriggerCount7dOk returns a tuple with the TriggerCount7d field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTriggerCount7d

`func (o *WorkflowSummaryResponse) SetTriggerCount7d(v int64)`

SetTriggerCount7d sets TriggerCount7d field to given value.


### GetCreatedAt

`func (o *WorkflowSummaryResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WorkflowSummaryResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WorkflowSummaryResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


