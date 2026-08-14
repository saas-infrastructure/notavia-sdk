# WebhookDeliveryListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | Pointer to [**[]WebhookDeliveryResponse**](WebhookDeliveryResponse.md) |  | [optional] 
**NextCursor** | Pointer to **string** |  | [optional] 

## Methods

### NewWebhookDeliveryListResponse

`func NewWebhookDeliveryListResponse() *WebhookDeliveryListResponse`

NewWebhookDeliveryListResponse instantiates a new WebhookDeliveryListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWebhookDeliveryListResponseWithDefaults

`func NewWebhookDeliveryListResponseWithDefaults() *WebhookDeliveryListResponse`

NewWebhookDeliveryListResponseWithDefaults instantiates a new WebhookDeliveryListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *WebhookDeliveryListResponse) GetData() []WebhookDeliveryResponse`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *WebhookDeliveryListResponse) GetDataOk() (*[]WebhookDeliveryResponse, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *WebhookDeliveryListResponse) SetData(v []WebhookDeliveryResponse)`

SetData sets Data field to given value.

### HasData

`func (o *WebhookDeliveryListResponse) HasData() bool`

HasData returns a boolean if a field has been set.

### GetNextCursor

`func (o *WebhookDeliveryListResponse) GetNextCursor() string`

GetNextCursor returns the NextCursor field if non-nil, zero value otherwise.

### GetNextCursorOk

`func (o *WebhookDeliveryListResponse) GetNextCursorOk() (*string, bool)`

GetNextCursorOk returns a tuple with the NextCursor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextCursor

`func (o *WebhookDeliveryListResponse) SetNextCursor(v string)`

SetNextCursor sets NextCursor field to given value.

### HasNextCursor

`func (o *WebhookDeliveryListResponse) HasNextCursor() bool`

HasNextCursor returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


