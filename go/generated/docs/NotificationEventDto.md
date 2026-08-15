# NotificationEventDto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Type** | Pointer to **string** |  | [optional] 
**OccurredAt** | Pointer to **time.Time** |  | [optional] 
**Detail** | Pointer to **string** |  | [optional] 

## Methods

### NewNotificationEventDto

`func NewNotificationEventDto() *NotificationEventDto`

NewNotificationEventDto instantiates a new NotificationEventDto object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewNotificationEventDtoWithDefaults

`func NewNotificationEventDtoWithDefaults() *NotificationEventDto`

NewNotificationEventDtoWithDefaults instantiates a new NotificationEventDto object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetType

`func (o *NotificationEventDto) GetType() string`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *NotificationEventDto) GetTypeOk() (*string, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *NotificationEventDto) SetType(v string)`

SetType sets Type field to given value.

### HasType

`func (o *NotificationEventDto) HasType() bool`

HasType returns a boolean if a field has been set.

### GetOccurredAt

`func (o *NotificationEventDto) GetOccurredAt() time.Time`

GetOccurredAt returns the OccurredAt field if non-nil, zero value otherwise.

### GetOccurredAtOk

`func (o *NotificationEventDto) GetOccurredAtOk() (*time.Time, bool)`

GetOccurredAtOk returns a tuple with the OccurredAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOccurredAt

`func (o *NotificationEventDto) SetOccurredAt(v time.Time)`

SetOccurredAt sets OccurredAt field to given value.

### HasOccurredAt

`func (o *NotificationEventDto) HasOccurredAt() bool`

HasOccurredAt returns a boolean if a field has been set.

### GetDetail

`func (o *NotificationEventDto) GetDetail() string`

GetDetail returns the Detail field if non-nil, zero value otherwise.

### GetDetailOk

`func (o *NotificationEventDto) GetDetailOk() (*string, bool)`

GetDetailOk returns a tuple with the Detail field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDetail

`func (o *NotificationEventDto) SetDetail(v string)`

SetDetail sets Detail field to given value.

### HasDetail

`func (o *NotificationEventDto) HasDetail() bool`

HasDetail returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


