# UserPreferencesResponseDataInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CategoryKey** | Pointer to **string** |  | [optional] 
**Channel** | Pointer to [**NotificationChannel**](NotificationChannel.md) |  | [optional] 
**OptedIn** | Pointer to **bool** |  | [optional] 

## Methods

### NewUserPreferencesResponseDataInner

`func NewUserPreferencesResponseDataInner() *UserPreferencesResponseDataInner`

NewUserPreferencesResponseDataInner instantiates a new UserPreferencesResponseDataInner object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUserPreferencesResponseDataInnerWithDefaults

`func NewUserPreferencesResponseDataInnerWithDefaults() *UserPreferencesResponseDataInner`

NewUserPreferencesResponseDataInnerWithDefaults instantiates a new UserPreferencesResponseDataInner object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCategoryKey

`func (o *UserPreferencesResponseDataInner) GetCategoryKey() string`

GetCategoryKey returns the CategoryKey field if non-nil, zero value otherwise.

### GetCategoryKeyOk

`func (o *UserPreferencesResponseDataInner) GetCategoryKeyOk() (*string, bool)`

GetCategoryKeyOk returns a tuple with the CategoryKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCategoryKey

`func (o *UserPreferencesResponseDataInner) SetCategoryKey(v string)`

SetCategoryKey sets CategoryKey field to given value.

### HasCategoryKey

`func (o *UserPreferencesResponseDataInner) HasCategoryKey() bool`

HasCategoryKey returns a boolean if a field has been set.

### GetChannel

`func (o *UserPreferencesResponseDataInner) GetChannel() NotificationChannel`

GetChannel returns the Channel field if non-nil, zero value otherwise.

### GetChannelOk

`func (o *UserPreferencesResponseDataInner) GetChannelOk() (*NotificationChannel, bool)`

GetChannelOk returns a tuple with the Channel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChannel

`func (o *UserPreferencesResponseDataInner) SetChannel(v NotificationChannel)`

SetChannel sets Channel field to given value.

### HasChannel

`func (o *UserPreferencesResponseDataInner) HasChannel() bool`

HasChannel returns a boolean if a field has been set.

### GetOptedIn

`func (o *UserPreferencesResponseDataInner) GetOptedIn() bool`

GetOptedIn returns the OptedIn field if non-nil, zero value otherwise.

### GetOptedInOk

`func (o *UserPreferencesResponseDataInner) GetOptedInOk() (*bool, bool)`

GetOptedInOk returns a tuple with the OptedIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOptedIn

`func (o *UserPreferencesResponseDataInner) SetOptedIn(v bool)`

SetOptedIn sets OptedIn field to given value.

### HasOptedIn

`func (o *UserPreferencesResponseDataInner) HasOptedIn() bool`

HasOptedIn returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


