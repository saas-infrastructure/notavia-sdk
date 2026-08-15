# WorkflowTriggerRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**TriggerData** | **map[string]interface{}** | Arbitrary JSON object passed as the run&#39;s trigger payload. | 

## Methods

### NewWorkflowTriggerRequest

`func NewWorkflowTriggerRequest(triggerData map[string]interface{}, ) *WorkflowTriggerRequest`

NewWorkflowTriggerRequest instantiates a new WorkflowTriggerRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowTriggerRequestWithDefaults

`func NewWorkflowTriggerRequestWithDefaults() *WorkflowTriggerRequest`

NewWorkflowTriggerRequestWithDefaults instantiates a new WorkflowTriggerRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTriggerData

`func (o *WorkflowTriggerRequest) GetTriggerData() map[string]interface{}`

GetTriggerData returns the TriggerData field if non-nil, zero value otherwise.

### GetTriggerDataOk

`func (o *WorkflowTriggerRequest) GetTriggerDataOk() (*map[string]interface{}, bool)`

GetTriggerDataOk returns a tuple with the TriggerData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTriggerData

`func (o *WorkflowTriggerRequest) SetTriggerData(v map[string]interface{})`

SetTriggerData sets TriggerData field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


