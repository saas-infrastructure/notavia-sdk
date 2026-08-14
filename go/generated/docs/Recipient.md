# Recipient

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Address** | Pointer to **string** |  | [optional] 
**Name** | Pointer to **string** |  | [optional] 
**ExternalUserId** | Pointer to **string** |  | [optional] 
**Endpoint** | Pointer to **string** | The **key** of a Discord or Teams endpoint (e.g. &#x60;\&quot;billing-alerts\&quot;&#x60;). Preferred over the legacy UUID fields. When set, &#x60;teams_endpoint_id&#x60; / &#x60;discord_endpoint_id&#x60; are ignored.  | [optional] 
**SlackUserId** | Pointer to **string** | Slack user id (Uxxxxxxxx) for DM delivery. Mutually exclusive with &#x60;slack_channel_id&#x60;. | [optional] 
**SlackChannelId** | Pointer to **string** | Slack channel id (Cxxxxxxxx) for channel-post delivery. Mutually exclusive with &#x60;slack_user_id&#x60;. | [optional] 
**TeamsEndpointId** | Pointer to **string** | UUID of the &#x60;TeamsWebhookEndpoint&#x60; to send to. Legacy — prefer &#x60;endpoint&#x60; (the key). | [optional] 
**DiscordEndpointId** | Pointer to **string** | UUID of the &#x60;DiscordWebhookEndpoint&#x60; to send to. Legacy — prefer &#x60;endpoint&#x60; (the key). | [optional] 

## Methods

### NewRecipient

`func NewRecipient() *Recipient`

NewRecipient instantiates a new Recipient object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewRecipientWithDefaults

`func NewRecipientWithDefaults() *Recipient`

NewRecipientWithDefaults instantiates a new Recipient object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAddress

`func (o *Recipient) GetAddress() string`

GetAddress returns the Address field if non-nil, zero value otherwise.

### GetAddressOk

`func (o *Recipient) GetAddressOk() (*string, bool)`

GetAddressOk returns a tuple with the Address field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddress

`func (o *Recipient) SetAddress(v string)`

SetAddress sets Address field to given value.

### HasAddress

`func (o *Recipient) HasAddress() bool`

HasAddress returns a boolean if a field has been set.

### GetName

`func (o *Recipient) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *Recipient) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *Recipient) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *Recipient) HasName() bool`

HasName returns a boolean if a field has been set.

### GetExternalUserId

`func (o *Recipient) GetExternalUserId() string`

GetExternalUserId returns the ExternalUserId field if non-nil, zero value otherwise.

### GetExternalUserIdOk

`func (o *Recipient) GetExternalUserIdOk() (*string, bool)`

GetExternalUserIdOk returns a tuple with the ExternalUserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExternalUserId

`func (o *Recipient) SetExternalUserId(v string)`

SetExternalUserId sets ExternalUserId field to given value.

### HasExternalUserId

`func (o *Recipient) HasExternalUserId() bool`

HasExternalUserId returns a boolean if a field has been set.

### GetEndpoint

`func (o *Recipient) GetEndpoint() string`

GetEndpoint returns the Endpoint field if non-nil, zero value otherwise.

### GetEndpointOk

`func (o *Recipient) GetEndpointOk() (*string, bool)`

GetEndpointOk returns a tuple with the Endpoint field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndpoint

`func (o *Recipient) SetEndpoint(v string)`

SetEndpoint sets Endpoint field to given value.

### HasEndpoint

`func (o *Recipient) HasEndpoint() bool`

HasEndpoint returns a boolean if a field has been set.

### GetSlackUserId

`func (o *Recipient) GetSlackUserId() string`

GetSlackUserId returns the SlackUserId field if non-nil, zero value otherwise.

### GetSlackUserIdOk

`func (o *Recipient) GetSlackUserIdOk() (*string, bool)`

GetSlackUserIdOk returns a tuple with the SlackUserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlackUserId

`func (o *Recipient) SetSlackUserId(v string)`

SetSlackUserId sets SlackUserId field to given value.

### HasSlackUserId

`func (o *Recipient) HasSlackUserId() bool`

HasSlackUserId returns a boolean if a field has been set.

### GetSlackChannelId

`func (o *Recipient) GetSlackChannelId() string`

GetSlackChannelId returns the SlackChannelId field if non-nil, zero value otherwise.

### GetSlackChannelIdOk

`func (o *Recipient) GetSlackChannelIdOk() (*string, bool)`

GetSlackChannelIdOk returns a tuple with the SlackChannelId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlackChannelId

`func (o *Recipient) SetSlackChannelId(v string)`

SetSlackChannelId sets SlackChannelId field to given value.

### HasSlackChannelId

`func (o *Recipient) HasSlackChannelId() bool`

HasSlackChannelId returns a boolean if a field has been set.

### GetTeamsEndpointId

`func (o *Recipient) GetTeamsEndpointId() string`

GetTeamsEndpointId returns the TeamsEndpointId field if non-nil, zero value otherwise.

### GetTeamsEndpointIdOk

`func (o *Recipient) GetTeamsEndpointIdOk() (*string, bool)`

GetTeamsEndpointIdOk returns a tuple with the TeamsEndpointId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTeamsEndpointId

`func (o *Recipient) SetTeamsEndpointId(v string)`

SetTeamsEndpointId sets TeamsEndpointId field to given value.

### HasTeamsEndpointId

`func (o *Recipient) HasTeamsEndpointId() bool`

HasTeamsEndpointId returns a boolean if a field has been set.

### GetDiscordEndpointId

`func (o *Recipient) GetDiscordEndpointId() string`

GetDiscordEndpointId returns the DiscordEndpointId field if non-nil, zero value otherwise.

### GetDiscordEndpointIdOk

`func (o *Recipient) GetDiscordEndpointIdOk() (*string, bool)`

GetDiscordEndpointIdOk returns a tuple with the DiscordEndpointId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDiscordEndpointId

`func (o *Recipient) SetDiscordEndpointId(v string)`

SetDiscordEndpointId sets DiscordEndpointId field to given value.

### HasDiscordEndpointId

`func (o *Recipient) HasDiscordEndpointId() bool`

HasDiscordEndpointId returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


