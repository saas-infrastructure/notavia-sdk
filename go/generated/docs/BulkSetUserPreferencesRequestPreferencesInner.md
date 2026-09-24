# BulkSetUserPreferencesRequestPreferencesInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CategoryKey** | **string** |  | 
**Channel** | [**NotificationChannel**](NotificationChannel.md) |  | 
**OptedIn** | **bool** |  | 

## Methods

### NewBulkSetUserPreferencesRequestPreferencesInner

`func NewBulkSetUserPreferencesRequestPreferencesInner(categoryKey string, channel NotificationChannel, optedIn bool, ) *BulkSetUserPreferencesRequestPreferencesInner`

NewBulkSetUserPreferencesRequestPreferencesInner instantiates a new BulkSetUserPreferencesRequestPreferencesInner object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBulkSetUserPreferencesRequestPreferencesInnerWithDefaults

`func NewBulkSetUserPreferencesRequestPreferencesInnerWithDefaults() *BulkSetUserPreferencesRequestPreferencesInner`

NewBulkSetUserPreferencesRequestPreferencesInnerWithDefaults instantiates a new BulkSetUserPreferencesRequestPreferencesInner object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCategoryKey

`func (o *BulkSetUserPreferencesRequestPreferencesInner) GetCategoryKey() string`

GetCategoryKey returns the CategoryKey field if non-nil, zero value otherwise.

### GetCategoryKeyOk

`func (o *BulkSetUserPreferencesRequestPreferencesInner) GetCategoryKeyOk() (*string, bool)`

GetCategoryKeyOk returns a tuple with the CategoryKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCategoryKey

`func (o *BulkSetUserPreferencesRequestPreferencesInner) SetCategoryKey(v string)`

SetCategoryKey sets CategoryKey field to given value.


### GetChannel

`func (o *BulkSetUserPreferencesRequestPreferencesInner) GetChannel() NotificationChannel`

GetChannel returns the Channel field if non-nil, zero value otherwise.

### GetChannelOk

`func (o *BulkSetUserPreferencesRequestPreferencesInner) GetChannelOk() (*NotificationChannel, bool)`

GetChannelOk returns a tuple with the Channel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChannel

`func (o *BulkSetUserPreferencesRequestPreferencesInner) SetChannel(v NotificationChannel)`

SetChannel sets Channel field to given value.


### GetOptedIn

`func (o *BulkSetUserPreferencesRequestPreferencesInner) GetOptedIn() bool`

GetOptedIn returns the OptedIn field if non-nil, zero value otherwise.

### GetOptedInOk

`func (o *BulkSetUserPreferencesRequestPreferencesInner) GetOptedInOk() (*bool, bool)`

GetOptedInOk returns a tuple with the OptedIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOptedIn

`func (o *BulkSetUserPreferencesRequestPreferencesInner) SetOptedIn(v bool)`

SetOptedIn sets OptedIn field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


