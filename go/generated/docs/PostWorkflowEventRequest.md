# PostWorkflowEventRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**EventName** | **string** | Name of the event to deliver (e.g. &#x60;payment_confirmed&#x60;). | 
**EventData** | **map[string]interface{}** | Arbitrary JSON payload matched against the step&#39;s &#x60;match&#x60; filter. | 

## Methods

### NewPostWorkflowEventRequest

`func NewPostWorkflowEventRequest(eventName string, eventData map[string]interface{}, ) *PostWorkflowEventRequest`

NewPostWorkflowEventRequest instantiates a new PostWorkflowEventRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPostWorkflowEventRequestWithDefaults

`func NewPostWorkflowEventRequestWithDefaults() *PostWorkflowEventRequest`

NewPostWorkflowEventRequestWithDefaults instantiates a new PostWorkflowEventRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetEventName

`func (o *PostWorkflowEventRequest) GetEventName() string`

GetEventName returns the EventName field if non-nil, zero value otherwise.

### GetEventNameOk

`func (o *PostWorkflowEventRequest) GetEventNameOk() (*string, bool)`

GetEventNameOk returns a tuple with the EventName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEventName

`func (o *PostWorkflowEventRequest) SetEventName(v string)`

SetEventName sets EventName field to given value.


### GetEventData

`func (o *PostWorkflowEventRequest) GetEventData() map[string]interface{}`

GetEventData returns the EventData field if non-nil, zero value otherwise.

### GetEventDataOk

`func (o *PostWorkflowEventRequest) GetEventDataOk() (*map[string]interface{}, bool)`

GetEventDataOk returns a tuple with the EventData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEventData

`func (o *PostWorkflowEventRequest) SetEventData(v map[string]interface{})`

SetEventData sets EventData field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


