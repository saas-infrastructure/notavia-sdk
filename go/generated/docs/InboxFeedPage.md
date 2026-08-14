# InboxFeedPage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | Pointer to [**[]InboxItemResponse**](InboxItemResponse.md) |  | [optional] 
**NextCursor** | Pointer to **string** |  | [optional] 
**UnreadCount** | Pointer to **int32** |  | [optional] 

## Methods

### NewInboxFeedPage

`func NewInboxFeedPage() *InboxFeedPage`

NewInboxFeedPage instantiates a new InboxFeedPage object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInboxFeedPageWithDefaults

`func NewInboxFeedPageWithDefaults() *InboxFeedPage`

NewInboxFeedPageWithDefaults instantiates a new InboxFeedPage object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *InboxFeedPage) GetData() []InboxItemResponse`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *InboxFeedPage) GetDataOk() (*[]InboxItemResponse, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *InboxFeedPage) SetData(v []InboxItemResponse)`

SetData sets Data field to given value.

### HasData

`func (o *InboxFeedPage) HasData() bool`

HasData returns a boolean if a field has been set.

### GetNextCursor

`func (o *InboxFeedPage) GetNextCursor() string`

GetNextCursor returns the NextCursor field if non-nil, zero value otherwise.

### GetNextCursorOk

`func (o *InboxFeedPage) GetNextCursorOk() (*string, bool)`

GetNextCursorOk returns a tuple with the NextCursor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextCursor

`func (o *InboxFeedPage) SetNextCursor(v string)`

SetNextCursor sets NextCursor field to given value.

### HasNextCursor

`func (o *InboxFeedPage) HasNextCursor() bool`

HasNextCursor returns a boolean if a field has been set.

### GetUnreadCount

`func (o *InboxFeedPage) GetUnreadCount() int32`

GetUnreadCount returns the UnreadCount field if non-nil, zero value otherwise.

### GetUnreadCountOk

`func (o *InboxFeedPage) GetUnreadCountOk() (*int32, bool)`

GetUnreadCountOk returns a tuple with the UnreadCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnreadCount

`func (o *InboxFeedPage) SetUnreadCount(v int32)`

SetUnreadCount sets UnreadCount field to given value.

### HasUnreadCount

`func (o *InboxFeedPage) HasUnreadCount() bool`

HasUnreadCount returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


