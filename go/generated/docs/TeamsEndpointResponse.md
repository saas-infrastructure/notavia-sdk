# TeamsEndpointResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Label** | Pointer to **string** |  | [optional] 
**WebhookUrlPrefix** | Pointer to **string** | First 30 characters of the webhook URL for recognition only — full URL never returned. | [optional] 
**Flavour** | Pointer to **string** | Detected webhook flavour: &#x60;WorkflowsLogicApps&#x60;, &#x60;WorkflowsOffice&#x60;, or &#x60;LegacyConnector&#x60;.  | [optional] 
**LastSuccessAt** | Pointer to **time.Time** |  | [optional] 
**LastFailureAt** | Pointer to **time.Time** |  | [optional] 
**LastFailureReason** | Pointer to **string** |  | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewTeamsEndpointResponse

`func NewTeamsEndpointResponse() *TeamsEndpointResponse`

NewTeamsEndpointResponse instantiates a new TeamsEndpointResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTeamsEndpointResponseWithDefaults

`func NewTeamsEndpointResponseWithDefaults() *TeamsEndpointResponse`

NewTeamsEndpointResponseWithDefaults instantiates a new TeamsEndpointResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *TeamsEndpointResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *TeamsEndpointResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *TeamsEndpointResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *TeamsEndpointResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetLabel

`func (o *TeamsEndpointResponse) GetLabel() string`

GetLabel returns the Label field if non-nil, zero value otherwise.

### GetLabelOk

`func (o *TeamsEndpointResponse) GetLabelOk() (*string, bool)`

GetLabelOk returns a tuple with the Label field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabel

`func (o *TeamsEndpointResponse) SetLabel(v string)`

SetLabel sets Label field to given value.

### HasLabel

`func (o *TeamsEndpointResponse) HasLabel() bool`

HasLabel returns a boolean if a field has been set.

### GetWebhookUrlPrefix

`func (o *TeamsEndpointResponse) GetWebhookUrlPrefix() string`

GetWebhookUrlPrefix returns the WebhookUrlPrefix field if non-nil, zero value otherwise.

### GetWebhookUrlPrefixOk

`func (o *TeamsEndpointResponse) GetWebhookUrlPrefixOk() (*string, bool)`

GetWebhookUrlPrefixOk returns a tuple with the WebhookUrlPrefix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWebhookUrlPrefix

`func (o *TeamsEndpointResponse) SetWebhookUrlPrefix(v string)`

SetWebhookUrlPrefix sets WebhookUrlPrefix field to given value.

### HasWebhookUrlPrefix

`func (o *TeamsEndpointResponse) HasWebhookUrlPrefix() bool`

HasWebhookUrlPrefix returns a boolean if a field has been set.

### GetFlavour

`func (o *TeamsEndpointResponse) GetFlavour() string`

GetFlavour returns the Flavour field if non-nil, zero value otherwise.

### GetFlavourOk

`func (o *TeamsEndpointResponse) GetFlavourOk() (*string, bool)`

GetFlavourOk returns a tuple with the Flavour field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFlavour

`func (o *TeamsEndpointResponse) SetFlavour(v string)`

SetFlavour sets Flavour field to given value.

### HasFlavour

`func (o *TeamsEndpointResponse) HasFlavour() bool`

HasFlavour returns a boolean if a field has been set.

### GetLastSuccessAt

`func (o *TeamsEndpointResponse) GetLastSuccessAt() time.Time`

GetLastSuccessAt returns the LastSuccessAt field if non-nil, zero value otherwise.

### GetLastSuccessAtOk

`func (o *TeamsEndpointResponse) GetLastSuccessAtOk() (*time.Time, bool)`

GetLastSuccessAtOk returns a tuple with the LastSuccessAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastSuccessAt

`func (o *TeamsEndpointResponse) SetLastSuccessAt(v time.Time)`

SetLastSuccessAt sets LastSuccessAt field to given value.

### HasLastSuccessAt

`func (o *TeamsEndpointResponse) HasLastSuccessAt() bool`

HasLastSuccessAt returns a boolean if a field has been set.

### GetLastFailureAt

`func (o *TeamsEndpointResponse) GetLastFailureAt() time.Time`

GetLastFailureAt returns the LastFailureAt field if non-nil, zero value otherwise.

### GetLastFailureAtOk

`func (o *TeamsEndpointResponse) GetLastFailureAtOk() (*time.Time, bool)`

GetLastFailureAtOk returns a tuple with the LastFailureAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastFailureAt

`func (o *TeamsEndpointResponse) SetLastFailureAt(v time.Time)`

SetLastFailureAt sets LastFailureAt field to given value.

### HasLastFailureAt

`func (o *TeamsEndpointResponse) HasLastFailureAt() bool`

HasLastFailureAt returns a boolean if a field has been set.

### GetLastFailureReason

`func (o *TeamsEndpointResponse) GetLastFailureReason() string`

GetLastFailureReason returns the LastFailureReason field if non-nil, zero value otherwise.

### GetLastFailureReasonOk

`func (o *TeamsEndpointResponse) GetLastFailureReasonOk() (*string, bool)`

GetLastFailureReasonOk returns a tuple with the LastFailureReason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastFailureReason

`func (o *TeamsEndpointResponse) SetLastFailureReason(v string)`

SetLastFailureReason sets LastFailureReason field to given value.

### HasLastFailureReason

`func (o *TeamsEndpointResponse) HasLastFailureReason() bool`

HasLastFailureReason returns a boolean if a field has been set.

### GetCreatedAt

`func (o *TeamsEndpointResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *TeamsEndpointResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *TeamsEndpointResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *TeamsEndpointResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


