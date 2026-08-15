# UpdateCategoryRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | **string** |  | 
**Description** | Pointer to **string** |  | [optional] 
**DefaultChannels** | [**[]NotificationChannel**](NotificationChannel.md) |  | 
**DefaultOptIn** | **bool** |  | 

## Methods

### NewUpdateCategoryRequest

`func NewUpdateCategoryRequest(name string, defaultChannels []NotificationChannel, defaultOptIn bool, ) *UpdateCategoryRequest`

NewUpdateCategoryRequest instantiates a new UpdateCategoryRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUpdateCategoryRequestWithDefaults

`func NewUpdateCategoryRequestWithDefaults() *UpdateCategoryRequest`

NewUpdateCategoryRequestWithDefaults instantiates a new UpdateCategoryRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *UpdateCategoryRequest) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *UpdateCategoryRequest) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *UpdateCategoryRequest) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *UpdateCategoryRequest) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *UpdateCategoryRequest) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *UpdateCategoryRequest) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *UpdateCategoryRequest) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetDefaultChannels

`func (o *UpdateCategoryRequest) GetDefaultChannels() []NotificationChannel`

GetDefaultChannels returns the DefaultChannels field if non-nil, zero value otherwise.

### GetDefaultChannelsOk

`func (o *UpdateCategoryRequest) GetDefaultChannelsOk() (*[]NotificationChannel, bool)`

GetDefaultChannelsOk returns a tuple with the DefaultChannels field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultChannels

`func (o *UpdateCategoryRequest) SetDefaultChannels(v []NotificationChannel)`

SetDefaultChannels sets DefaultChannels field to given value.


### GetDefaultOptIn

`func (o *UpdateCategoryRequest) GetDefaultOptIn() bool`

GetDefaultOptIn returns the DefaultOptIn field if non-nil, zero value otherwise.

### GetDefaultOptInOk

`func (o *UpdateCategoryRequest) GetDefaultOptInOk() (*bool, bool)`

GetDefaultOptInOk returns a tuple with the DefaultOptIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultOptIn

`func (o *UpdateCategoryRequest) SetDefaultOptIn(v bool)`

SetDefaultOptIn sets DefaultOptIn field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


