# WorkflowRunResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**WorkflowKey** | **string** |  | 
**Version** | **int32** |  | 
**Status** | **string** |  | 
**CurrentStepId** | Pointer to **string** |  | [optional] 
**TriggerData** | **string** | Raw JSON string of the trigger payload. | 
**Source** | **string** |  | 
**CreatedAt** | **time.Time** |  | 
**CompletedAt** | Pointer to **time.Time** |  | [optional] 
**FailureReason** | Pointer to **string** |  | [optional] 
**Steps** | [**[]WorkflowStepRunSummary**](WorkflowStepRunSummary.md) |  | 

## Methods

### NewWorkflowRunResponse

`func NewWorkflowRunResponse(id string, workflowKey string, version int32, status string, triggerData string, source string, createdAt time.Time, steps []WorkflowStepRunSummary, ) *WorkflowRunResponse`

NewWorkflowRunResponse instantiates a new WorkflowRunResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowRunResponseWithDefaults

`func NewWorkflowRunResponseWithDefaults() *WorkflowRunResponse`

NewWorkflowRunResponseWithDefaults instantiates a new WorkflowRunResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WorkflowRunResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WorkflowRunResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WorkflowRunResponse) SetId(v string)`

SetId sets Id field to given value.


### GetWorkflowKey

`func (o *WorkflowRunResponse) GetWorkflowKey() string`

GetWorkflowKey returns the WorkflowKey field if non-nil, zero value otherwise.

### GetWorkflowKeyOk

`func (o *WorkflowRunResponse) GetWorkflowKeyOk() (*string, bool)`

GetWorkflowKeyOk returns a tuple with the WorkflowKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWorkflowKey

`func (o *WorkflowRunResponse) SetWorkflowKey(v string)`

SetWorkflowKey sets WorkflowKey field to given value.


### GetVersion

`func (o *WorkflowRunResponse) GetVersion() int32`

GetVersion returns the Version field if non-nil, zero value otherwise.

### GetVersionOk

`func (o *WorkflowRunResponse) GetVersionOk() (*int32, bool)`

GetVersionOk returns a tuple with the Version field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVersion

`func (o *WorkflowRunResponse) SetVersion(v int32)`

SetVersion sets Version field to given value.


### GetStatus

`func (o *WorkflowRunResponse) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkflowRunResponse) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkflowRunResponse) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetCurrentStepId

`func (o *WorkflowRunResponse) GetCurrentStepId() string`

GetCurrentStepId returns the CurrentStepId field if non-nil, zero value otherwise.

### GetCurrentStepIdOk

`func (o *WorkflowRunResponse) GetCurrentStepIdOk() (*string, bool)`

GetCurrentStepIdOk returns a tuple with the CurrentStepId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCurrentStepId

`func (o *WorkflowRunResponse) SetCurrentStepId(v string)`

SetCurrentStepId sets CurrentStepId field to given value.

### HasCurrentStepId

`func (o *WorkflowRunResponse) HasCurrentStepId() bool`

HasCurrentStepId returns a boolean if a field has been set.

### GetTriggerData

`func (o *WorkflowRunResponse) GetTriggerData() string`

GetTriggerData returns the TriggerData field if non-nil, zero value otherwise.

### GetTriggerDataOk

`func (o *WorkflowRunResponse) GetTriggerDataOk() (*string, bool)`

GetTriggerDataOk returns a tuple with the TriggerData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTriggerData

`func (o *WorkflowRunResponse) SetTriggerData(v string)`

SetTriggerData sets TriggerData field to given value.


### GetSource

`func (o *WorkflowRunResponse) GetSource() string`

GetSource returns the Source field if non-nil, zero value otherwise.

### GetSourceOk

`func (o *WorkflowRunResponse) GetSourceOk() (*string, bool)`

GetSourceOk returns a tuple with the Source field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSource

`func (o *WorkflowRunResponse) SetSource(v string)`

SetSource sets Source field to given value.


### GetCreatedAt

`func (o *WorkflowRunResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WorkflowRunResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WorkflowRunResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetCompletedAt

`func (o *WorkflowRunResponse) GetCompletedAt() time.Time`

GetCompletedAt returns the CompletedAt field if non-nil, zero value otherwise.

### GetCompletedAtOk

`func (o *WorkflowRunResponse) GetCompletedAtOk() (*time.Time, bool)`

GetCompletedAtOk returns a tuple with the CompletedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompletedAt

`func (o *WorkflowRunResponse) SetCompletedAt(v time.Time)`

SetCompletedAt sets CompletedAt field to given value.

### HasCompletedAt

`func (o *WorkflowRunResponse) HasCompletedAt() bool`

HasCompletedAt returns a boolean if a field has been set.

### GetFailureReason

`func (o *WorkflowRunResponse) GetFailureReason() string`

GetFailureReason returns the FailureReason field if non-nil, zero value otherwise.

### GetFailureReasonOk

`func (o *WorkflowRunResponse) GetFailureReasonOk() (*string, bool)`

GetFailureReasonOk returns a tuple with the FailureReason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFailureReason

`func (o *WorkflowRunResponse) SetFailureReason(v string)`

SetFailureReason sets FailureReason field to given value.

### HasFailureReason

`func (o *WorkflowRunResponse) HasFailureReason() bool`

HasFailureReason returns a boolean if a field has been set.

### GetSteps

`func (o *WorkflowRunResponse) GetSteps() []WorkflowStepRunSummary`

GetSteps returns the Steps field if non-nil, zero value otherwise.

### GetStepsOk

`func (o *WorkflowRunResponse) GetStepsOk() (*[]WorkflowStepRunSummary, bool)`

GetStepsOk returns a tuple with the Steps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSteps

`func (o *WorkflowRunResponse) SetSteps(v []WorkflowStepRunSummary)`

SetSteps sets Steps field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


