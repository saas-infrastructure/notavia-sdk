# CreateDiscordEndpointRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Label** | **string** |  | 
**WebhookUrl** | **string** | Discord webhook URL. Must match &#x60;https://discord.com/api/webhooks/{id}/{token}&#x60; (also accepts &#x60;discordapp.com&#x60; alias).  | 
**DefaultUsername** | Pointer to **string** |  | [optional] 
**DefaultAvatarUrl** | Pointer to **string** |  | [optional] 

## Methods

### NewCreateDiscordEndpointRequest

`func NewCreateDiscordEndpointRequest(label string, webhookUrl string, ) *CreateDiscordEndpointRequest`

NewCreateDiscordEndpointRequest instantiates a new CreateDiscordEndpointRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateDiscordEndpointRequestWithDefaults

`func NewCreateDiscordEndpointRequestWithDefaults() *CreateDiscordEndpointRequest`

NewCreateDiscordEndpointRequestWithDefaults instantiates a new CreateDiscordEndpointRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetLabel

`func (o *CreateDiscordEndpointRequest) GetLabel() string`

GetLabel returns the Label field if non-nil, zero value otherwise.

### GetLabelOk

`func (o *CreateDiscordEndpointRequest) GetLabelOk() (*string, bool)`

GetLabelOk returns a tuple with the Label field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabel

`func (o *CreateDiscordEndpointRequest) SetLabel(v string)`

SetLabel sets Label field to given value.


### GetWebhookUrl

`func (o *CreateDiscordEndpointRequest) GetWebhookUrl() string`

GetWebhookUrl returns the WebhookUrl field if non-nil, zero value otherwise.

### GetWebhookUrlOk

`func (o *CreateDiscordEndpointRequest) GetWebhookUrlOk() (*string, bool)`

GetWebhookUrlOk returns a tuple with the WebhookUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWebhookUrl

`func (o *CreateDiscordEndpointRequest) SetWebhookUrl(v string)`

SetWebhookUrl sets WebhookUrl field to given value.


### GetDefaultUsername

`func (o *CreateDiscordEndpointRequest) GetDefaultUsername() string`

GetDefaultUsername returns the DefaultUsername field if non-nil, zero value otherwise.

### GetDefaultUsernameOk

`func (o *CreateDiscordEndpointRequest) GetDefaultUsernameOk() (*string, bool)`

GetDefaultUsernameOk returns a tuple with the DefaultUsername field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultUsername

`func (o *CreateDiscordEndpointRequest) SetDefaultUsername(v string)`

SetDefaultUsername sets DefaultUsername field to given value.

### HasDefaultUsername

`func (o *CreateDiscordEndpointRequest) HasDefaultUsername() bool`

HasDefaultUsername returns a boolean if a field has been set.

### GetDefaultAvatarUrl

`func (o *CreateDiscordEndpointRequest) GetDefaultAvatarUrl() string`

GetDefaultAvatarUrl returns the DefaultAvatarUrl field if non-nil, zero value otherwise.

### GetDefaultAvatarUrlOk

`func (o *CreateDiscordEndpointRequest) GetDefaultAvatarUrlOk() (*string, bool)`

GetDefaultAvatarUrlOk returns a tuple with the DefaultAvatarUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultAvatarUrl

`func (o *CreateDiscordEndpointRequest) SetDefaultAvatarUrl(v string)`

SetDefaultAvatarUrl sets DefaultAvatarUrl field to given value.

### HasDefaultAvatarUrl

`func (o *CreateDiscordEndpointRequest) HasDefaultAvatarUrl() bool`

HasDefaultAvatarUrl returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


