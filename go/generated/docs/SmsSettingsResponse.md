# SmsSettingsResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Kind** | Pointer to **string** |  | [optional] 
**FromNumber** | Pointer to **string** |  | [optional] 
**FromSenderId** | Pointer to **string** |  | [optional] 
**CredentialsValidated** | Pointer to **bool** |  | [optional] 
**CredentialsValidatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewSmsSettingsResponse

`func NewSmsSettingsResponse() *SmsSettingsResponse`

NewSmsSettingsResponse instantiates a new SmsSettingsResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSmsSettingsResponseWithDefaults

`func NewSmsSettingsResponseWithDefaults() *SmsSettingsResponse`

NewSmsSettingsResponseWithDefaults instantiates a new SmsSettingsResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SmsSettingsResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SmsSettingsResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SmsSettingsResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SmsSettingsResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetKind

`func (o *SmsSettingsResponse) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *SmsSettingsResponse) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *SmsSettingsResponse) SetKind(v string)`

SetKind sets Kind field to given value.

### HasKind

`func (o *SmsSettingsResponse) HasKind() bool`

HasKind returns a boolean if a field has been set.

### GetFromNumber

`func (o *SmsSettingsResponse) GetFromNumber() string`

GetFromNumber returns the FromNumber field if non-nil, zero value otherwise.

### GetFromNumberOk

`func (o *SmsSettingsResponse) GetFromNumberOk() (*string, bool)`

GetFromNumberOk returns a tuple with the FromNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFromNumber

`func (o *SmsSettingsResponse) SetFromNumber(v string)`

SetFromNumber sets FromNumber field to given value.

### HasFromNumber

`func (o *SmsSettingsResponse) HasFromNumber() bool`

HasFromNumber returns a boolean if a field has been set.

### GetFromSenderId

`func (o *SmsSettingsResponse) GetFromSenderId() string`

GetFromSenderId returns the FromSenderId field if non-nil, zero value otherwise.

### GetFromSenderIdOk

`func (o *SmsSettingsResponse) GetFromSenderIdOk() (*string, bool)`

GetFromSenderIdOk returns a tuple with the FromSenderId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFromSenderId

`func (o *SmsSettingsResponse) SetFromSenderId(v string)`

SetFromSenderId sets FromSenderId field to given value.

### HasFromSenderId

`func (o *SmsSettingsResponse) HasFromSenderId() bool`

HasFromSenderId returns a boolean if a field has been set.

### GetCredentialsValidated

`func (o *SmsSettingsResponse) GetCredentialsValidated() bool`

GetCredentialsValidated returns the CredentialsValidated field if non-nil, zero value otherwise.

### GetCredentialsValidatedOk

`func (o *SmsSettingsResponse) GetCredentialsValidatedOk() (*bool, bool)`

GetCredentialsValidatedOk returns a tuple with the CredentialsValidated field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCredentialsValidated

`func (o *SmsSettingsResponse) SetCredentialsValidated(v bool)`

SetCredentialsValidated sets CredentialsValidated field to given value.

### HasCredentialsValidated

`func (o *SmsSettingsResponse) HasCredentialsValidated() bool`

HasCredentialsValidated returns a boolean if a field has been set.

### GetCredentialsValidatedAt

`func (o *SmsSettingsResponse) GetCredentialsValidatedAt() time.Time`

GetCredentialsValidatedAt returns the CredentialsValidatedAt field if non-nil, zero value otherwise.

### GetCredentialsValidatedAtOk

`func (o *SmsSettingsResponse) GetCredentialsValidatedAtOk() (*time.Time, bool)`

GetCredentialsValidatedAtOk returns a tuple with the CredentialsValidatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCredentialsValidatedAt

`func (o *SmsSettingsResponse) SetCredentialsValidatedAt(v time.Time)`

SetCredentialsValidatedAt sets CredentialsValidatedAt field to given value.

### HasCredentialsValidatedAt

`func (o *SmsSettingsResponse) HasCredentialsValidatedAt() bool`

HasCredentialsValidatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


