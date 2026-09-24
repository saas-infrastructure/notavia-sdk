# CreateCategoryRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Key** | **string** |  | 
**Name** | **string** |  | 
**Description** | Pointer to **string** |  | [optional] 
**IsCritical** | Pointer to **bool** |  | [optional] [default to false]
**DefaultChannels** | [**[]NotificationChannel**](NotificationChannel.md) |  | 
**DefaultOptIn** | Pointer to **bool** |  | [optional] [default to true]

## Methods

### NewCreateCategoryRequest

`func NewCreateCategoryRequest(key string, name string, defaultChannels []NotificationChannel, ) *CreateCategoryRequest`

NewCreateCategoryRequest instantiates a new CreateCategoryRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateCategoryRequestWithDefaults

`func NewCreateCategoryRequestWithDefaults() *CreateCategoryRequest`

NewCreateCategoryRequestWithDefaults instantiates a new CreateCategoryRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKey

`func (o *CreateCategoryRequest) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *CreateCategoryRequest) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *CreateCategoryRequest) SetKey(v string)`

SetKey sets Key field to given value.


### GetName

`func (o *CreateCategoryRequest) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *CreateCategoryRequest) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *CreateCategoryRequest) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *CreateCategoryRequest) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *CreateCategoryRequest) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *CreateCategoryRequest) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *CreateCategoryRequest) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetIsCritical

`func (o *CreateCategoryRequest) GetIsCritical() bool`

GetIsCritical returns the IsCritical field if non-nil, zero value otherwise.

### GetIsCriticalOk

`func (o *CreateCategoryRequest) GetIsCriticalOk() (*bool, bool)`

GetIsCriticalOk returns a tuple with the IsCritical field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCritical

`func (o *CreateCategoryRequest) SetIsCritical(v bool)`

SetIsCritical sets IsCritical field to given value.

### HasIsCritical

`func (o *CreateCategoryRequest) HasIsCritical() bool`

HasIsCritical returns a boolean if a field has been set.

### GetDefaultChannels

`func (o *CreateCategoryRequest) GetDefaultChannels() []NotificationChannel`

GetDefaultChannels returns the DefaultChannels field if non-nil, zero value otherwise.

### GetDefaultChannelsOk

`func (o *CreateCategoryRequest) GetDefaultChannelsOk() (*[]NotificationChannel, bool)`

GetDefaultChannelsOk returns a tuple with the DefaultChannels field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultChannels

`func (o *CreateCategoryRequest) SetDefaultChannels(v []NotificationChannel)`

SetDefaultChannels sets DefaultChannels field to given value.


### GetDefaultOptIn

`func (o *CreateCategoryRequest) GetDefaultOptIn() bool`

GetDefaultOptIn returns the DefaultOptIn field if non-nil, zero value otherwise.

### GetDefaultOptInOk

`func (o *CreateCategoryRequest) GetDefaultOptInOk() (*bool, bool)`

GetDefaultOptInOk returns a tuple with the DefaultOptIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultOptIn

`func (o *CreateCategoryRequest) SetDefaultOptIn(v bool)`

SetDefaultOptIn sets DefaultOptIn field to given value.

### HasDefaultOptIn

`func (o *CreateCategoryRequest) HasDefaultOptIn() bool`

HasDefaultOptIn returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


