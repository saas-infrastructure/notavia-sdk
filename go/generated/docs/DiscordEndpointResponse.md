# DiscordEndpointResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Label** | Pointer to **string** |  | [optional] 
**WebhookUrlPrefix** | Pointer to **string** | First 30 characters of the webhook URL for recognition only — full URL never returned. | [optional] 
**DefaultUsername** | Pointer to **string** | Default bot username shown in Discord. Overridden per-send via template data. | [optional] 
**DefaultAvatarUrl** | Pointer to **string** | Default bot avatar URL. Overridden per-send via template data. | [optional] 
**LastSuccessAt** | Pointer to **time.Time** |  | [optional] 
**LastFailureAt** | Pointer to **time.Time** |  | [optional] 
**LastFailureReason** | Pointer to **string** |  | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewDiscordEndpointResponse

`func NewDiscordEndpointResponse() *DiscordEndpointResponse`

NewDiscordEndpointResponse instantiates a new DiscordEndpointResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDiscordEndpointResponseWithDefaults

`func NewDiscordEndpointResponseWithDefaults() *DiscordEndpointResponse`

NewDiscordEndpointResponseWithDefaults instantiates a new DiscordEndpointResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *DiscordEndpointResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *DiscordEndpointResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *DiscordEndpointResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *DiscordEndpointResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetLabel

`func (o *DiscordEndpointResponse) GetLabel() string`

GetLabel returns the Label field if non-nil, zero value otherwise.

### GetLabelOk

`func (o *DiscordEndpointResponse) GetLabelOk() (*string, bool)`

GetLabelOk returns a tuple with the Label field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabel

`func (o *DiscordEndpointResponse) SetLabel(v string)`

SetLabel sets Label field to given value.

### HasLabel

`func (o *DiscordEndpointResponse) HasLabel() bool`

HasLabel returns a boolean if a field has been set.

### GetWebhookUrlPrefix

`func (o *DiscordEndpointResponse) GetWebhookUrlPrefix() string`

GetWebhookUrlPrefix returns the WebhookUrlPrefix field if non-nil, zero value otherwise.

### GetWebhookUrlPrefixOk

`func (o *DiscordEndpointResponse) GetWebhookUrlPrefixOk() (*string, bool)`

GetWebhookUrlPrefixOk returns a tuple with the WebhookUrlPrefix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWebhookUrlPrefix

`func (o *DiscordEndpointResponse) SetWebhookUrlPrefix(v string)`

SetWebhookUrlPrefix sets WebhookUrlPrefix field to given value.

### HasWebhookUrlPrefix

`func (o *DiscordEndpointResponse) HasWebhookUrlPrefix() bool`

HasWebhookUrlPrefix returns a boolean if a field has been set.

### GetDefaultUsername

`func (o *DiscordEndpointResponse) GetDefaultUsername() string`

GetDefaultUsername returns the DefaultUsername field if non-nil, zero value otherwise.

### GetDefaultUsernameOk

`func (o *DiscordEndpointResponse) GetDefaultUsernameOk() (*string, bool)`

GetDefaultUsernameOk returns a tuple with the DefaultUsername field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultUsername

`func (o *DiscordEndpointResponse) SetDefaultUsername(v string)`

SetDefaultUsername sets DefaultUsername field to given value.

### HasDefaultUsername

`func (o *DiscordEndpointResponse) HasDefaultUsername() bool`

HasDefaultUsername returns a boolean if a field has been set.

### GetDefaultAvatarUrl

`func (o *DiscordEndpointResponse) GetDefaultAvatarUrl() string`

GetDefaultAvatarUrl returns the DefaultAvatarUrl field if non-nil, zero value otherwise.

### GetDefaultAvatarUrlOk

`func (o *DiscordEndpointResponse) GetDefaultAvatarUrlOk() (*string, bool)`

GetDefaultAvatarUrlOk returns a tuple with the DefaultAvatarUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultAvatarUrl

`func (o *DiscordEndpointResponse) SetDefaultAvatarUrl(v string)`

SetDefaultAvatarUrl sets DefaultAvatarUrl field to given value.

### HasDefaultAvatarUrl

`func (o *DiscordEndpointResponse) HasDefaultAvatarUrl() bool`

HasDefaultAvatarUrl returns a boolean if a field has been set.

### GetLastSuccessAt

`func (o *DiscordEndpointResponse) GetLastSuccessAt() time.Time`

GetLastSuccessAt returns the LastSuccessAt field if non-nil, zero value otherwise.

### GetLastSuccessAtOk

`func (o *DiscordEndpointResponse) GetLastSuccessAtOk() (*time.Time, bool)`

GetLastSuccessAtOk returns a tuple with the LastSuccessAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastSuccessAt

`func (o *DiscordEndpointResponse) SetLastSuccessAt(v time.Time)`

SetLastSuccessAt sets LastSuccessAt field to given value.

### HasLastSuccessAt

`func (o *DiscordEndpointResponse) HasLastSuccessAt() bool`

HasLastSuccessAt returns a boolean if a field has been set.

### GetLastFailureAt

`func (o *DiscordEndpointResponse) GetLastFailureAt() time.Time`

GetLastFailureAt returns the LastFailureAt field if non-nil, zero value otherwise.

### GetLastFailureAtOk

`func (o *DiscordEndpointResponse) GetLastFailureAtOk() (*time.Time, bool)`

GetLastFailureAtOk returns a tuple with the LastFailureAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastFailureAt

`func (o *DiscordEndpointResponse) SetLastFailureAt(v time.Time)`

SetLastFailureAt sets LastFailureAt field to given value.

### HasLastFailureAt

`func (o *DiscordEndpointResponse) HasLastFailureAt() bool`

HasLastFailureAt returns a boolean if a field has been set.

### GetLastFailureReason

`func (o *DiscordEndpointResponse) GetLastFailureReason() string`

GetLastFailureReason returns the LastFailureReason field if non-nil, zero value otherwise.

### GetLastFailureReasonOk

`func (o *DiscordEndpointResponse) GetLastFailureReasonOk() (*string, bool)`

GetLastFailureReasonOk returns a tuple with the LastFailureReason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastFailureReason

`func (o *DiscordEndpointResponse) SetLastFailureReason(v string)`

SetLastFailureReason sets LastFailureReason field to given value.

### HasLastFailureReason

`func (o *DiscordEndpointResponse) HasLastFailureReason() bool`

HasLastFailureReason returns a boolean if a field has been set.

### GetCreatedAt

`func (o *DiscordEndpointResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *DiscordEndpointResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *DiscordEndpointResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *DiscordEndpointResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


