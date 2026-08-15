# CategoryResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Key** | Pointer to **string** |  | [optional] 
**Name** | Pointer to **string** |  | [optional] 
**Description** | Pointer to **string** |  | [optional] 
**IsCritical** | Pointer to **bool** |  | [optional] 
**DefaultChannels** | Pointer to [**[]NotificationChannel**](NotificationChannel.md) |  | [optional] 
**DefaultOptIn** | Pointer to **bool** |  | [optional] 
**IsArchived** | Pointer to **bool** |  | [optional] 

## Methods

### NewCategoryResponse

`func NewCategoryResponse() *CategoryResponse`

NewCategoryResponse instantiates a new CategoryResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCategoryResponseWithDefaults

`func NewCategoryResponseWithDefaults() *CategoryResponse`

NewCategoryResponseWithDefaults instantiates a new CategoryResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *CategoryResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *CategoryResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *CategoryResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *CategoryResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetKey

`func (o *CategoryResponse) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *CategoryResponse) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *CategoryResponse) SetKey(v string)`

SetKey sets Key field to given value.

### HasKey

`func (o *CategoryResponse) HasKey() bool`

HasKey returns a boolean if a field has been set.

### GetName

`func (o *CategoryResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *CategoryResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *CategoryResponse) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *CategoryResponse) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDescription

`func (o *CategoryResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *CategoryResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *CategoryResponse) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *CategoryResponse) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetIsCritical

`func (o *CategoryResponse) GetIsCritical() bool`

GetIsCritical returns the IsCritical field if non-nil, zero value otherwise.

### GetIsCriticalOk

`func (o *CategoryResponse) GetIsCriticalOk() (*bool, bool)`

GetIsCriticalOk returns a tuple with the IsCritical field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCritical

`func (o *CategoryResponse) SetIsCritical(v bool)`

SetIsCritical sets IsCritical field to given value.

### HasIsCritical

`func (o *CategoryResponse) HasIsCritical() bool`

HasIsCritical returns a boolean if a field has been set.

### GetDefaultChannels

`func (o *CategoryResponse) GetDefaultChannels() []NotificationChannel`

GetDefaultChannels returns the DefaultChannels field if non-nil, zero value otherwise.

### GetDefaultChannelsOk

`func (o *CategoryResponse) GetDefaultChannelsOk() (*[]NotificationChannel, bool)`

GetDefaultChannelsOk returns a tuple with the DefaultChannels field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultChannels

`func (o *CategoryResponse) SetDefaultChannels(v []NotificationChannel)`

SetDefaultChannels sets DefaultChannels field to given value.

### HasDefaultChannels

`func (o *CategoryResponse) HasDefaultChannels() bool`

HasDefaultChannels returns a boolean if a field has been set.

### GetDefaultOptIn

`func (o *CategoryResponse) GetDefaultOptIn() bool`

GetDefaultOptIn returns the DefaultOptIn field if non-nil, zero value otherwise.

### GetDefaultOptInOk

`func (o *CategoryResponse) GetDefaultOptInOk() (*bool, bool)`

GetDefaultOptInOk returns a tuple with the DefaultOptIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultOptIn

`func (o *CategoryResponse) SetDefaultOptIn(v bool)`

SetDefaultOptIn sets DefaultOptIn field to given value.

### HasDefaultOptIn

`func (o *CategoryResponse) HasDefaultOptIn() bool`

HasDefaultOptIn returns a boolean if a field has been set.

### GetIsArchived

`func (o *CategoryResponse) GetIsArchived() bool`

GetIsArchived returns the IsArchived field if non-nil, zero value otherwise.

### GetIsArchivedOk

`func (o *CategoryResponse) GetIsArchivedOk() (*bool, bool)`

GetIsArchivedOk returns a tuple with the IsArchived field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsArchived

`func (o *CategoryResponse) SetIsArchived(v bool)`

SetIsArchived sets IsArchived field to given value.

### HasIsArchived

`func (o *CategoryResponse) HasIsArchived() bool`

HasIsArchived returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


