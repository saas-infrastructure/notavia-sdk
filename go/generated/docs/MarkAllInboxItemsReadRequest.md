# MarkAllInboxItemsReadRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Before** | Pointer to **time.Time** | Only mark items created before this timestamp as read. | [optional] 

## Methods

### NewMarkAllInboxItemsReadRequest

`func NewMarkAllInboxItemsReadRequest() *MarkAllInboxItemsReadRequest`

NewMarkAllInboxItemsReadRequest instantiates a new MarkAllInboxItemsReadRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMarkAllInboxItemsReadRequestWithDefaults

`func NewMarkAllInboxItemsReadRequestWithDefaults() *MarkAllInboxItemsReadRequest`

NewMarkAllInboxItemsReadRequestWithDefaults instantiates a new MarkAllInboxItemsReadRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetBefore

`func (o *MarkAllInboxItemsReadRequest) GetBefore() time.Time`

GetBefore returns the Before field if non-nil, zero value otherwise.

### GetBeforeOk

`func (o *MarkAllInboxItemsReadRequest) GetBeforeOk() (*time.Time, bool)`

GetBeforeOk returns a tuple with the Before field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBefore

`func (o *MarkAllInboxItemsReadRequest) SetBefore(v time.Time)`

SetBefore sets Before field to given value.

### HasBefore

`func (o *MarkAllInboxItemsReadRequest) HasBefore() bool`

HasBefore returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


