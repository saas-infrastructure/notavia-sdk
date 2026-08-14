# CreateWebhookEndpointRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Url** | **string** |  | 
**EventFilters** | Pointer to **[]string** | List of event types to deliver (empty means all events). | [optional] 
**Description** | Pointer to **string** |  | [optional] 
**TimeoutSeconds** | Pointer to **int32** |  | [optional] 

## Methods

### NewCreateWebhookEndpointRequest

`func NewCreateWebhookEndpointRequest(url string, ) *CreateWebhookEndpointRequest`

NewCreateWebhookEndpointRequest instantiates a new CreateWebhookEndpointRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateWebhookEndpointRequestWithDefaults

`func NewCreateWebhookEndpointRequestWithDefaults() *CreateWebhookEndpointRequest`

NewCreateWebhookEndpointRequestWithDefaults instantiates a new CreateWebhookEndpointRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUrl

`func (o *CreateWebhookEndpointRequest) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *CreateWebhookEndpointRequest) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *CreateWebhookEndpointRequest) SetUrl(v string)`

SetUrl sets Url field to given value.


### GetEventFilters

`func (o *CreateWebhookEndpointRequest) GetEventFilters() []string`

GetEventFilters returns the EventFilters field if non-nil, zero value otherwise.

### GetEventFiltersOk

`func (o *CreateWebhookEndpointRequest) GetEventFiltersOk() (*[]string, bool)`

GetEventFiltersOk returns a tuple with the EventFilters field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEventFilters

`func (o *CreateWebhookEndpointRequest) SetEventFilters(v []string)`

SetEventFilters sets EventFilters field to given value.

### HasEventFilters

`func (o *CreateWebhookEndpointRequest) HasEventFilters() bool`

HasEventFilters returns a boolean if a field has been set.

### GetDescription

`func (o *CreateWebhookEndpointRequest) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *CreateWebhookEndpointRequest) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *CreateWebhookEndpointRequest) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *CreateWebhookEndpointRequest) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetTimeoutSeconds

`func (o *CreateWebhookEndpointRequest) GetTimeoutSeconds() int32`

GetTimeoutSeconds returns the TimeoutSeconds field if non-nil, zero value otherwise.

### GetTimeoutSecondsOk

`func (o *CreateWebhookEndpointRequest) GetTimeoutSecondsOk() (*int32, bool)`

GetTimeoutSecondsOk returns a tuple with the TimeoutSeconds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimeoutSeconds

`func (o *CreateWebhookEndpointRequest) SetTimeoutSeconds(v int32)`

SetTimeoutSeconds sets TimeoutSeconds field to given value.

### HasTimeoutSeconds

`func (o *CreateWebhookEndpointRequest) HasTimeoutSeconds() bool`

HasTimeoutSeconds returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


