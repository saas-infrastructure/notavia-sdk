# UpdateSmsSettingsRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Kind** | **string** |  | 
**FromNumber** | Pointer to **string** |  | [optional] 
**FromSenderId** | Pointer to **string** |  | [optional] 
**TwilioAccountSid** | Pointer to **string** |  | [optional] 
**TwilioAuthToken** | Pointer to **string** |  | [optional] 
**VonageApiKey** | Pointer to **string** |  | [optional] 
**VonageApiSecret** | Pointer to **string** |  | [optional] 

## Methods

### NewUpdateSmsSettingsRequest

`func NewUpdateSmsSettingsRequest(kind string, ) *UpdateSmsSettingsRequest`

NewUpdateSmsSettingsRequest instantiates a new UpdateSmsSettingsRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUpdateSmsSettingsRequestWithDefaults

`func NewUpdateSmsSettingsRequestWithDefaults() *UpdateSmsSettingsRequest`

NewUpdateSmsSettingsRequestWithDefaults instantiates a new UpdateSmsSettingsRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKind

`func (o *UpdateSmsSettingsRequest) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *UpdateSmsSettingsRequest) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *UpdateSmsSettingsRequest) SetKind(v string)`

SetKind sets Kind field to given value.


### GetFromNumber

`func (o *UpdateSmsSettingsRequest) GetFromNumber() string`

GetFromNumber returns the FromNumber field if non-nil, zero value otherwise.

### GetFromNumberOk

`func (o *UpdateSmsSettingsRequest) GetFromNumberOk() (*string, bool)`

GetFromNumberOk returns a tuple with the FromNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFromNumber

`func (o *UpdateSmsSettingsRequest) SetFromNumber(v string)`

SetFromNumber sets FromNumber field to given value.

### HasFromNumber

`func (o *UpdateSmsSettingsRequest) HasFromNumber() bool`

HasFromNumber returns a boolean if a field has been set.

### GetFromSenderId

`func (o *UpdateSmsSettingsRequest) GetFromSenderId() string`

GetFromSenderId returns the FromSenderId field if non-nil, zero value otherwise.

### GetFromSenderIdOk

`func (o *UpdateSmsSettingsRequest) GetFromSenderIdOk() (*string, bool)`

GetFromSenderIdOk returns a tuple with the FromSenderId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFromSenderId

`func (o *UpdateSmsSettingsRequest) SetFromSenderId(v string)`

SetFromSenderId sets FromSenderId field to given value.

### HasFromSenderId

`func (o *UpdateSmsSettingsRequest) HasFromSenderId() bool`

HasFromSenderId returns a boolean if a field has been set.

### GetTwilioAccountSid

`func (o *UpdateSmsSettingsRequest) GetTwilioAccountSid() string`

GetTwilioAccountSid returns the TwilioAccountSid field if non-nil, zero value otherwise.

### GetTwilioAccountSidOk

`func (o *UpdateSmsSettingsRequest) GetTwilioAccountSidOk() (*string, bool)`

GetTwilioAccountSidOk returns a tuple with the TwilioAccountSid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTwilioAccountSid

`func (o *UpdateSmsSettingsRequest) SetTwilioAccountSid(v string)`

SetTwilioAccountSid sets TwilioAccountSid field to given value.

### HasTwilioAccountSid

`func (o *UpdateSmsSettingsRequest) HasTwilioAccountSid() bool`

HasTwilioAccountSid returns a boolean if a field has been set.

### GetTwilioAuthToken

`func (o *UpdateSmsSettingsRequest) GetTwilioAuthToken() string`

GetTwilioAuthToken returns the TwilioAuthToken field if non-nil, zero value otherwise.

### GetTwilioAuthTokenOk

`func (o *UpdateSmsSettingsRequest) GetTwilioAuthTokenOk() (*string, bool)`

GetTwilioAuthTokenOk returns a tuple with the TwilioAuthToken field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTwilioAuthToken

`func (o *UpdateSmsSettingsRequest) SetTwilioAuthToken(v string)`

SetTwilioAuthToken sets TwilioAuthToken field to given value.

### HasTwilioAuthToken

`func (o *UpdateSmsSettingsRequest) HasTwilioAuthToken() bool`

HasTwilioAuthToken returns a boolean if a field has been set.

### GetVonageApiKey

`func (o *UpdateSmsSettingsRequest) GetVonageApiKey() string`

GetVonageApiKey returns the VonageApiKey field if non-nil, zero value otherwise.

### GetVonageApiKeyOk

`func (o *UpdateSmsSettingsRequest) GetVonageApiKeyOk() (*string, bool)`

GetVonageApiKeyOk returns a tuple with the VonageApiKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVonageApiKey

`func (o *UpdateSmsSettingsRequest) SetVonageApiKey(v string)`

SetVonageApiKey sets VonageApiKey field to given value.

### HasVonageApiKey

`func (o *UpdateSmsSettingsRequest) HasVonageApiKey() bool`

HasVonageApiKey returns a boolean if a field has been set.

### GetVonageApiSecret

`func (o *UpdateSmsSettingsRequest) GetVonageApiSecret() string`

GetVonageApiSecret returns the VonageApiSecret field if non-nil, zero value otherwise.

### GetVonageApiSecretOk

`func (o *UpdateSmsSettingsRequest) GetVonageApiSecretOk() (*string, bool)`

GetVonageApiSecretOk returns a tuple with the VonageApiSecret field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVonageApiSecret

`func (o *UpdateSmsSettingsRequest) SetVonageApiSecret(v string)`

SetVonageApiSecret sets VonageApiSecret field to given value.

### HasVonageApiSecret

`func (o *UpdateSmsSettingsRequest) HasVonageApiSecret() bool`

HasVonageApiSecret returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


