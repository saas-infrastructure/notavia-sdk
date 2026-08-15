# MarkReadResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**IsRead** | Pointer to **bool** |  | [optional] 
**ReadAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewMarkReadResponse

`func NewMarkReadResponse() *MarkReadResponse`

NewMarkReadResponse instantiates a new MarkReadResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMarkReadResponseWithDefaults

`func NewMarkReadResponseWithDefaults() *MarkReadResponse`

NewMarkReadResponseWithDefaults instantiates a new MarkReadResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *MarkReadResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *MarkReadResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *MarkReadResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *MarkReadResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetIsRead

`func (o *MarkReadResponse) GetIsRead() bool`

GetIsRead returns the IsRead field if non-nil, zero value otherwise.

### GetIsReadOk

`func (o *MarkReadResponse) GetIsReadOk() (*bool, bool)`

GetIsReadOk returns a tuple with the IsRead field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsRead

`func (o *MarkReadResponse) SetIsRead(v bool)`

SetIsRead sets IsRead field to given value.

### HasIsRead

`func (o *MarkReadResponse) HasIsRead() bool`

HasIsRead returns a boolean if a field has been set.

### GetReadAt

`func (o *MarkReadResponse) GetReadAt() time.Time`

GetReadAt returns the ReadAt field if non-nil, zero value otherwise.

### GetReadAtOk

`func (o *MarkReadResponse) GetReadAtOk() (*time.Time, bool)`

GetReadAtOk returns a tuple with the ReadAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReadAt

`func (o *MarkReadResponse) SetReadAt(v time.Time)`

SetReadAt sets ReadAt field to given value.

### HasReadAt

`func (o *MarkReadResponse) HasReadAt() bool`

HasReadAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


