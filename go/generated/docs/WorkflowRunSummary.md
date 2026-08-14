# WorkflowRunSummary

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**WorkflowKey** | **string** |  | 
**Status** | **string** |  | 
**Source** | **string** |  | 
**CreatedAt** | **time.Time** |  | 
**CompletedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewWorkflowRunSummary

`func NewWorkflowRunSummary(id string, workflowKey string, status string, source string, createdAt time.Time, ) *WorkflowRunSummary`

NewWorkflowRunSummary instantiates a new WorkflowRunSummary object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowRunSummaryWithDefaults

`func NewWorkflowRunSummaryWithDefaults() *WorkflowRunSummary`

NewWorkflowRunSummaryWithDefaults instantiates a new WorkflowRunSummary object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WorkflowRunSummary) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WorkflowRunSummary) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WorkflowRunSummary) SetId(v string)`

SetId sets Id field to given value.


### GetWorkflowKey

`func (o *WorkflowRunSummary) GetWorkflowKey() string`

GetWorkflowKey returns the WorkflowKey field if non-nil, zero value otherwise.

### GetWorkflowKeyOk

`func (o *WorkflowRunSummary) GetWorkflowKeyOk() (*string, bool)`

GetWorkflowKeyOk returns a tuple with the WorkflowKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWorkflowKey

`func (o *WorkflowRunSummary) SetWorkflowKey(v string)`

SetWorkflowKey sets WorkflowKey field to given value.


### GetStatus

`func (o *WorkflowRunSummary) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkflowRunSummary) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkflowRunSummary) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetSource

`func (o *WorkflowRunSummary) GetSource() string`

GetSource returns the Source field if non-nil, zero value otherwise.

### GetSourceOk

`func (o *WorkflowRunSummary) GetSourceOk() (*string, bool)`

GetSourceOk returns a tuple with the Source field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSource

`func (o *WorkflowRunSummary) SetSource(v string)`

SetSource sets Source field to given value.


### GetCreatedAt

`func (o *WorkflowRunSummary) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WorkflowRunSummary) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WorkflowRunSummary) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetCompletedAt

`func (o *WorkflowRunSummary) GetCompletedAt() time.Time`

GetCompletedAt returns the CompletedAt field if non-nil, zero value otherwise.

### GetCompletedAtOk

`func (o *WorkflowRunSummary) GetCompletedAtOk() (*time.Time, bool)`

GetCompletedAtOk returns a tuple with the CompletedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompletedAt

`func (o *WorkflowRunSummary) SetCompletedAt(v time.Time)`

SetCompletedAt sets CompletedAt field to given value.

### HasCompletedAt

`func (o *WorkflowRunSummary) HasCompletedAt() bool`

HasCompletedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


