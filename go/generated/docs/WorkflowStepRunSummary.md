# WorkflowStepRunSummary

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**StepId** | **string** |  | 
**Kind** | **string** |  | 
**AttemptId** | **int32** |  | 
**Status** | **string** |  | 
**Outcome** | Pointer to **string** |  | [optional] 
**NotificationId** | Pointer to **string** |  | [optional] 
**OutputJson** | Pointer to **string** | JSON snapshot of the step output captured at completion. | [optional] 
**NextStepId** | Pointer to **string** |  | [optional] 
**NextScheduledAt** | Pointer to **time.Time** |  | [optional] 
**StartedAt** | **time.Time** |  | 
**CompletedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewWorkflowStepRunSummary

`func NewWorkflowStepRunSummary(stepId string, kind string, attemptId int32, status string, startedAt time.Time, ) *WorkflowStepRunSummary`

NewWorkflowStepRunSummary instantiates a new WorkflowStepRunSummary object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowStepRunSummaryWithDefaults

`func NewWorkflowStepRunSummaryWithDefaults() *WorkflowStepRunSummary`

NewWorkflowStepRunSummaryWithDefaults instantiates a new WorkflowStepRunSummary object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetStepId

`func (o *WorkflowStepRunSummary) GetStepId() string`

GetStepId returns the StepId field if non-nil, zero value otherwise.

### GetStepIdOk

`func (o *WorkflowStepRunSummary) GetStepIdOk() (*string, bool)`

GetStepIdOk returns a tuple with the StepId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStepId

`func (o *WorkflowStepRunSummary) SetStepId(v string)`

SetStepId sets StepId field to given value.


### GetKind

`func (o *WorkflowStepRunSummary) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *WorkflowStepRunSummary) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *WorkflowStepRunSummary) SetKind(v string)`

SetKind sets Kind field to given value.


### GetAttemptId

`func (o *WorkflowStepRunSummary) GetAttemptId() int32`

GetAttemptId returns the AttemptId field if non-nil, zero value otherwise.

### GetAttemptIdOk

`func (o *WorkflowStepRunSummary) GetAttemptIdOk() (*int32, bool)`

GetAttemptIdOk returns a tuple with the AttemptId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAttemptId

`func (o *WorkflowStepRunSummary) SetAttemptId(v int32)`

SetAttemptId sets AttemptId field to given value.


### GetStatus

`func (o *WorkflowStepRunSummary) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkflowStepRunSummary) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkflowStepRunSummary) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetOutcome

`func (o *WorkflowStepRunSummary) GetOutcome() string`

GetOutcome returns the Outcome field if non-nil, zero value otherwise.

### GetOutcomeOk

`func (o *WorkflowStepRunSummary) GetOutcomeOk() (*string, bool)`

GetOutcomeOk returns a tuple with the Outcome field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOutcome

`func (o *WorkflowStepRunSummary) SetOutcome(v string)`

SetOutcome sets Outcome field to given value.

### HasOutcome

`func (o *WorkflowStepRunSummary) HasOutcome() bool`

HasOutcome returns a boolean if a field has been set.

### GetNotificationId

`func (o *WorkflowStepRunSummary) GetNotificationId() string`

GetNotificationId returns the NotificationId field if non-nil, zero value otherwise.

### GetNotificationIdOk

`func (o *WorkflowStepRunSummary) GetNotificationIdOk() (*string, bool)`

GetNotificationIdOk returns a tuple with the NotificationId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNotificationId

`func (o *WorkflowStepRunSummary) SetNotificationId(v string)`

SetNotificationId sets NotificationId field to given value.

### HasNotificationId

`func (o *WorkflowStepRunSummary) HasNotificationId() bool`

HasNotificationId returns a boolean if a field has been set.

### GetOutputJson

`func (o *WorkflowStepRunSummary) GetOutputJson() string`

GetOutputJson returns the OutputJson field if non-nil, zero value otherwise.

### GetOutputJsonOk

`func (o *WorkflowStepRunSummary) GetOutputJsonOk() (*string, bool)`

GetOutputJsonOk returns a tuple with the OutputJson field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOutputJson

`func (o *WorkflowStepRunSummary) SetOutputJson(v string)`

SetOutputJson sets OutputJson field to given value.

### HasOutputJson

`func (o *WorkflowStepRunSummary) HasOutputJson() bool`

HasOutputJson returns a boolean if a field has been set.

### GetNextStepId

`func (o *WorkflowStepRunSummary) GetNextStepId() string`

GetNextStepId returns the NextStepId field if non-nil, zero value otherwise.

### GetNextStepIdOk

`func (o *WorkflowStepRunSummary) GetNextStepIdOk() (*string, bool)`

GetNextStepIdOk returns a tuple with the NextStepId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextStepId

`func (o *WorkflowStepRunSummary) SetNextStepId(v string)`

SetNextStepId sets NextStepId field to given value.

### HasNextStepId

`func (o *WorkflowStepRunSummary) HasNextStepId() bool`

HasNextStepId returns a boolean if a field has been set.

### GetNextScheduledAt

`func (o *WorkflowStepRunSummary) GetNextScheduledAt() time.Time`

GetNextScheduledAt returns the NextScheduledAt field if non-nil, zero value otherwise.

### GetNextScheduledAtOk

`func (o *WorkflowStepRunSummary) GetNextScheduledAtOk() (*time.Time, bool)`

GetNextScheduledAtOk returns a tuple with the NextScheduledAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextScheduledAt

`func (o *WorkflowStepRunSummary) SetNextScheduledAt(v time.Time)`

SetNextScheduledAt sets NextScheduledAt field to given value.

### HasNextScheduledAt

`func (o *WorkflowStepRunSummary) HasNextScheduledAt() bool`

HasNextScheduledAt returns a boolean if a field has been set.

### GetStartedAt

`func (o *WorkflowStepRunSummary) GetStartedAt() time.Time`

GetStartedAt returns the StartedAt field if non-nil, zero value otherwise.

### GetStartedAtOk

`func (o *WorkflowStepRunSummary) GetStartedAtOk() (*time.Time, bool)`

GetStartedAtOk returns a tuple with the StartedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStartedAt

`func (o *WorkflowStepRunSummary) SetStartedAt(v time.Time)`

SetStartedAt sets StartedAt field to given value.


### GetCompletedAt

`func (o *WorkflowStepRunSummary) GetCompletedAt() time.Time`

GetCompletedAt returns the CompletedAt field if non-nil, zero value otherwise.

### GetCompletedAtOk

`func (o *WorkflowStepRunSummary) GetCompletedAtOk() (*time.Time, bool)`

GetCompletedAtOk returns a tuple with the CompletedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompletedAt

`func (o *WorkflowStepRunSummary) SetCompletedAt(v time.Time)`

SetCompletedAt sets CompletedAt field to given value.

### HasCompletedAt

`func (o *WorkflowStepRunSummary) HasCompletedAt() bool`

HasCompletedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


