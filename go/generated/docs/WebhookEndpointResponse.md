# WebhookEndpointResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Url** | Pointer to **string** |  | [optional] 
**Status** | Pointer to **string** |  | [optional] 
**EventFilters** | Pointer to **[]string** |  | [optional] 
**Description** | Pointer to **string** |  | [optional] 
**TimeoutSeconds** | Pointer to **int32** |  | [optional] 
**SigningSecretPrefix** | Pointer to **string** | First 8 characters of the signing secret for recognition only — full secret shown only at creation/rotation. | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewWebhookEndpointResponse

`func NewWebhookEndpointResponse() *WebhookEndpointResponse`

NewWebhookEndpointResponse instantiates a new WebhookEndpointResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWebhookEndpointResponseWithDefaults

`func NewWebhookEndpointResponseWithDefaults() *WebhookEndpointResponse`

NewWebhookEndpointResponseWithDefaults instantiates a new WebhookEndpointResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WebhookEndpointResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WebhookEndpointResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WebhookEndpointResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *WebhookEndpointResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetUrl

`func (o *WebhookEndpointResponse) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *WebhookEndpointResponse) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *WebhookEndpointResponse) SetUrl(v string)`

SetUrl sets Url field to given value.

### HasUrl

`func (o *WebhookEndpointResponse) HasUrl() bool`

HasUrl returns a boolean if a field has been set.

### GetStatus

`func (o *WebhookEndpointResponse) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WebhookEndpointResponse) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WebhookEndpointResponse) SetStatus(v string)`

SetStatus sets Status field to given value.

### HasStatus

`func (o *WebhookEndpointResponse) HasStatus() bool`

HasStatus returns a boolean if a field has been set.

### GetEventFilters

`func (o *WebhookEndpointResponse) GetEventFilters() []string`

GetEventFilters returns the EventFilters field if non-nil, zero value otherwise.

### GetEventFiltersOk

`func (o *WebhookEndpointResponse) GetEventFiltersOk() (*[]string, bool)`

GetEventFiltersOk returns a tuple with the EventFilters field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEventFilters

`func (o *WebhookEndpointResponse) SetEventFilters(v []string)`

SetEventFilters sets EventFilters field to given value.

### HasEventFilters

`func (o *WebhookEndpointResponse) HasEventFilters() bool`

HasEventFilters returns a boolean if a field has been set.

### GetDescription

`func (o *WebhookEndpointResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *WebhookEndpointResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *WebhookEndpointResponse) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *WebhookEndpointResponse) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetTimeoutSeconds

`func (o *WebhookEndpointResponse) GetTimeoutSeconds() int32`

GetTimeoutSeconds returns the TimeoutSeconds field if non-nil, zero value otherwise.

### GetTimeoutSecondsOk

`func (o *WebhookEndpointResponse) GetTimeoutSecondsOk() (*int32, bool)`

GetTimeoutSecondsOk returns a tuple with the TimeoutSeconds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimeoutSeconds

`func (o *WebhookEndpointResponse) SetTimeoutSeconds(v int32)`

SetTimeoutSeconds sets TimeoutSeconds field to given value.

### HasTimeoutSeconds

`func (o *WebhookEndpointResponse) HasTimeoutSeconds() bool`

HasTimeoutSeconds returns a boolean if a field has been set.

### GetSigningSecretPrefix

`func (o *WebhookEndpointResponse) GetSigningSecretPrefix() string`

GetSigningSecretPrefix returns the SigningSecretPrefix field if non-nil, zero value otherwise.

### GetSigningSecretPrefixOk

`func (o *WebhookEndpointResponse) GetSigningSecretPrefixOk() (*string, bool)`

GetSigningSecretPrefixOk returns a tuple with the SigningSecretPrefix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSigningSecretPrefix

`func (o *WebhookEndpointResponse) SetSigningSecretPrefix(v string)`

SetSigningSecretPrefix sets SigningSecretPrefix field to given value.

### HasSigningSecretPrefix

`func (o *WebhookEndpointResponse) HasSigningSecretPrefix() bool`

HasSigningSecretPrefix returns a boolean if a field has been set.

### GetCreatedAt

`func (o *WebhookEndpointResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WebhookEndpointResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WebhookEndpointResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *WebhookEndpointResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


