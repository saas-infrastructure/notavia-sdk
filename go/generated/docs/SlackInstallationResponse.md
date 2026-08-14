# SlackInstallationResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**TeamId** | Pointer to **string** | Slack workspace team id (Txxxxxxxxx). | [optional] 
**TeamName** | Pointer to **string** |  | [optional] 
**BotUserId** | Pointer to **string** | Slack bot user id (Uxxxxxxxxx). | [optional] 
**AppId** | Pointer to **string** |  | [optional] 
**Scopes** | Pointer to **[]string** | OAuth scopes granted to the bot token. | [optional] 
**AutoJoinPublicChannels** | Pointer to **bool** | When true the dispatcher will attempt to join a public channel (id starting with &#x60;C&#x60;) if the bot is not already a member.  | [optional] 
**InstalledAt** | Pointer to **time.Time** |  | [optional] 
**InstalledByUserId** | Pointer to **string** | NotifyService user id who completed the OAuth flow. | [optional] 

## Methods

### NewSlackInstallationResponse

`func NewSlackInstallationResponse() *SlackInstallationResponse`

NewSlackInstallationResponse instantiates a new SlackInstallationResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSlackInstallationResponseWithDefaults

`func NewSlackInstallationResponseWithDefaults() *SlackInstallationResponse`

NewSlackInstallationResponseWithDefaults instantiates a new SlackInstallationResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SlackInstallationResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SlackInstallationResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SlackInstallationResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SlackInstallationResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetTeamId

`func (o *SlackInstallationResponse) GetTeamId() string`

GetTeamId returns the TeamId field if non-nil, zero value otherwise.

### GetTeamIdOk

`func (o *SlackInstallationResponse) GetTeamIdOk() (*string, bool)`

GetTeamIdOk returns a tuple with the TeamId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTeamId

`func (o *SlackInstallationResponse) SetTeamId(v string)`

SetTeamId sets TeamId field to given value.

### HasTeamId

`func (o *SlackInstallationResponse) HasTeamId() bool`

HasTeamId returns a boolean if a field has been set.

### GetTeamName

`func (o *SlackInstallationResponse) GetTeamName() string`

GetTeamName returns the TeamName field if non-nil, zero value otherwise.

### GetTeamNameOk

`func (o *SlackInstallationResponse) GetTeamNameOk() (*string, bool)`

GetTeamNameOk returns a tuple with the TeamName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTeamName

`func (o *SlackInstallationResponse) SetTeamName(v string)`

SetTeamName sets TeamName field to given value.

### HasTeamName

`func (o *SlackInstallationResponse) HasTeamName() bool`

HasTeamName returns a boolean if a field has been set.

### GetBotUserId

`func (o *SlackInstallationResponse) GetBotUserId() string`

GetBotUserId returns the BotUserId field if non-nil, zero value otherwise.

### GetBotUserIdOk

`func (o *SlackInstallationResponse) GetBotUserIdOk() (*string, bool)`

GetBotUserIdOk returns a tuple with the BotUserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBotUserId

`func (o *SlackInstallationResponse) SetBotUserId(v string)`

SetBotUserId sets BotUserId field to given value.

### HasBotUserId

`func (o *SlackInstallationResponse) HasBotUserId() bool`

HasBotUserId returns a boolean if a field has been set.

### GetAppId

`func (o *SlackInstallationResponse) GetAppId() string`

GetAppId returns the AppId field if non-nil, zero value otherwise.

### GetAppIdOk

`func (o *SlackInstallationResponse) GetAppIdOk() (*string, bool)`

GetAppIdOk returns a tuple with the AppId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAppId

`func (o *SlackInstallationResponse) SetAppId(v string)`

SetAppId sets AppId field to given value.

### HasAppId

`func (o *SlackInstallationResponse) HasAppId() bool`

HasAppId returns a boolean if a field has been set.

### GetScopes

`func (o *SlackInstallationResponse) GetScopes() []string`

GetScopes returns the Scopes field if non-nil, zero value otherwise.

### GetScopesOk

`func (o *SlackInstallationResponse) GetScopesOk() (*[]string, bool)`

GetScopesOk returns a tuple with the Scopes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScopes

`func (o *SlackInstallationResponse) SetScopes(v []string)`

SetScopes sets Scopes field to given value.

### HasScopes

`func (o *SlackInstallationResponse) HasScopes() bool`

HasScopes returns a boolean if a field has been set.

### GetAutoJoinPublicChannels

`func (o *SlackInstallationResponse) GetAutoJoinPublicChannels() bool`

GetAutoJoinPublicChannels returns the AutoJoinPublicChannels field if non-nil, zero value otherwise.

### GetAutoJoinPublicChannelsOk

`func (o *SlackInstallationResponse) GetAutoJoinPublicChannelsOk() (*bool, bool)`

GetAutoJoinPublicChannelsOk returns a tuple with the AutoJoinPublicChannels field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAutoJoinPublicChannels

`func (o *SlackInstallationResponse) SetAutoJoinPublicChannels(v bool)`

SetAutoJoinPublicChannels sets AutoJoinPublicChannels field to given value.

### HasAutoJoinPublicChannels

`func (o *SlackInstallationResponse) HasAutoJoinPublicChannels() bool`

HasAutoJoinPublicChannels returns a boolean if a field has been set.

### GetInstalledAt

`func (o *SlackInstallationResponse) GetInstalledAt() time.Time`

GetInstalledAt returns the InstalledAt field if non-nil, zero value otherwise.

### GetInstalledAtOk

`func (o *SlackInstallationResponse) GetInstalledAtOk() (*time.Time, bool)`

GetInstalledAtOk returns a tuple with the InstalledAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInstalledAt

`func (o *SlackInstallationResponse) SetInstalledAt(v time.Time)`

SetInstalledAt sets InstalledAt field to given value.

### HasInstalledAt

`func (o *SlackInstallationResponse) HasInstalledAt() bool`

HasInstalledAt returns a boolean if a field has been set.

### GetInstalledByUserId

`func (o *SlackInstallationResponse) GetInstalledByUserId() string`

GetInstalledByUserId returns the InstalledByUserId field if non-nil, zero value otherwise.

### GetInstalledByUserIdOk

`func (o *SlackInstallationResponse) GetInstalledByUserIdOk() (*string, bool)`

GetInstalledByUserIdOk returns a tuple with the InstalledByUserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInstalledByUserId

`func (o *SlackInstallationResponse) SetInstalledByUserId(v string)`

SetInstalledByUserId sets InstalledByUserId field to given value.

### HasInstalledByUserId

`func (o *SlackInstallationResponse) HasInstalledByUserId() bool`

HasInstalledByUserId returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


