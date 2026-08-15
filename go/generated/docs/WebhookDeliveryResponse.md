# WebhookDeliveryResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**EndpointId** | Pointer to **string** |  | [optional] 
**EventType** | Pointer to **string** |  | [optional] 
**Status** | Pointer to **string** |  | [optional] 
**HttpStatusCode** | Pointer to **int32** |  | [optional] 
**ResponseSnippet** | Pointer to **string** |  | [optional] 
**LatencyMs** | Pointer to **int32** |  | [optional] 
**AttemptCount** | Pointer to **int32** |  | [optional] 
**NextAttemptAt** | Pointer to **time.Time** |  | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewWebhookDeliveryResponse

`func NewWebhookDeliveryResponse() *WebhookDeliveryResponse`

NewWebhookDeliveryResponse instantiates a new WebhookDeliveryResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWebhookDeliveryResponseWithDefaults

`func NewWebhookDeliveryResponseWithDefaults() *WebhookDeliveryResponse`

NewWebhookDeliveryResponseWithDefaults instantiates a new WebhookDeliveryResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WebhookDeliveryResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WebhookDeliveryResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WebhookDeliveryResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *WebhookDeliveryResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetEndpointId

`func (o *WebhookDeliveryResponse) GetEndpointId() string`

GetEndpointId returns the EndpointId field if non-nil, zero value otherwise.

### GetEndpointIdOk

`func (o *WebhookDeliveryResponse) GetEndpointIdOk() (*string, bool)`

GetEndpointIdOk returns a tuple with the EndpointId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndpointId

`func (o *WebhookDeliveryResponse) SetEndpointId(v string)`

SetEndpointId sets EndpointId field to given value.

### HasEndpointId

`func (o *WebhookDeliveryResponse) HasEndpointId() bool`

HasEndpointId returns a boolean if a field has been set.

### GetEventType

`func (o *WebhookDeliveryResponse) GetEventType() string`

GetEventType returns the EventType field if non-nil, zero value otherwise.

### GetEventTypeOk

`func (o *WebhookDeliveryResponse) GetEventTypeOk() (*string, bool)`

GetEventTypeOk returns a tuple with the EventType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEventType

`func (o *WebhookDeliveryResponse) SetEventType(v string)`

SetEventType sets EventType field to given value.

### HasEventType

`func (o *WebhookDeliveryResponse) HasEventType() bool`

HasEventType returns a boolean if a field has been set.

### GetStatus

`func (o *WebhookDeliveryResponse) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WebhookDeliveryResponse) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WebhookDeliveryResponse) SetStatus(v string)`

SetStatus sets Status field to given value.

### HasStatus

`func (o *WebhookDeliveryResponse) HasStatus() bool`

HasStatus returns a boolean if a field has been set.

### GetHttpStatusCode

`func (o *WebhookDeliveryResponse) GetHttpStatusCode() int32`

GetHttpStatusCode returns the HttpStatusCode field if non-nil, zero value otherwise.

### GetHttpStatusCodeOk

`func (o *WebhookDeliveryResponse) GetHttpStatusCodeOk() (*int32, bool)`

GetHttpStatusCodeOk returns a tuple with the HttpStatusCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHttpStatusCode

`func (o *WebhookDeliveryResponse) SetHttpStatusCode(v int32)`

SetHttpStatusCode sets HttpStatusCode field to given value.

### HasHttpStatusCode

`func (o *WebhookDeliveryResponse) HasHttpStatusCode() bool`

HasHttpStatusCode returns a boolean if a field has been set.

### GetResponseSnippet

`func (o *WebhookDeliveryResponse) GetResponseSnippet() string`

GetResponseSnippet returns the ResponseSnippet field if non-nil, zero value otherwise.

### GetResponseSnippetOk

`func (o *WebhookDeliveryResponse) GetResponseSnippetOk() (*string, bool)`

GetResponseSnippetOk returns a tuple with the ResponseSnippet field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResponseSnippet

`func (o *WebhookDeliveryResponse) SetResponseSnippet(v string)`

SetResponseSnippet sets ResponseSnippet field to given value.

### HasResponseSnippet

`func (o *WebhookDeliveryResponse) HasResponseSnippet() bool`

HasResponseSnippet returns a boolean if a field has been set.

### GetLatencyMs

`func (o *WebhookDeliveryResponse) GetLatencyMs() int32`

GetLatencyMs returns the LatencyMs field if non-nil, zero value otherwise.

### GetLatencyMsOk

`func (o *WebhookDeliveryResponse) GetLatencyMsOk() (*int32, bool)`

GetLatencyMsOk returns a tuple with the LatencyMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLatencyMs

`func (o *WebhookDeliveryResponse) SetLatencyMs(v int32)`

SetLatencyMs sets LatencyMs field to given value.

### HasLatencyMs

`func (o *WebhookDeliveryResponse) HasLatencyMs() bool`

HasLatencyMs returns a boolean if a field has been set.

### GetAttemptCount

`func (o *WebhookDeliveryResponse) GetAttemptCount() int32`

GetAttemptCount returns the AttemptCount field if non-nil, zero value otherwise.

### GetAttemptCountOk

`func (o *WebhookDeliveryResponse) GetAttemptCountOk() (*int32, bool)`

GetAttemptCountOk returns a tuple with the AttemptCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAttemptCount

`func (o *WebhookDeliveryResponse) SetAttemptCount(v int32)`

SetAttemptCount sets AttemptCount field to given value.

### HasAttemptCount

`func (o *WebhookDeliveryResponse) HasAttemptCount() bool`

HasAttemptCount returns a boolean if a field has been set.

### GetNextAttemptAt

`func (o *WebhookDeliveryResponse) GetNextAttemptAt() time.Time`

GetNextAttemptAt returns the NextAttemptAt field if non-nil, zero value otherwise.

### GetNextAttemptAtOk

`func (o *WebhookDeliveryResponse) GetNextAttemptAtOk() (*time.Time, bool)`

GetNextAttemptAtOk returns a tuple with the NextAttemptAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextAttemptAt

`func (o *WebhookDeliveryResponse) SetNextAttemptAt(v time.Time)`

SetNextAttemptAt sets NextAttemptAt field to given value.

### HasNextAttemptAt

`func (o *WebhookDeliveryResponse) HasNextAttemptAt() bool`

HasNextAttemptAt returns a boolean if a field has been set.

### GetCreatedAt

`func (o *WebhookDeliveryResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WebhookDeliveryResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WebhookDeliveryResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *WebhookDeliveryResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


