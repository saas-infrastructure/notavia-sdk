# CreateTeamsEndpointRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Label** | **string** | Human-readable label for this endpoint in the dashboard. | 
**WebhookUrl** | **string** | Teams Workflows or legacy connector webhook URL. Must match one of the three accepted patterns; legacy connector URLs are rejected with &#x60;teams_legacy_connector_url&#x60; error code.  | 

## Methods

### NewCreateTeamsEndpointRequest

`func NewCreateTeamsEndpointRequest(label string, webhookUrl string, ) *CreateTeamsEndpointRequest`

NewCreateTeamsEndpointRequest instantiates a new CreateTeamsEndpointRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateTeamsEndpointRequestWithDefaults

`func NewCreateTeamsEndpointRequestWithDefaults() *CreateTeamsEndpointRequest`

NewCreateTeamsEndpointRequestWithDefaults instantiates a new CreateTeamsEndpointRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetLabel

`func (o *CreateTeamsEndpointRequest) GetLabel() string`

GetLabel returns the Label field if non-nil, zero value otherwise.

### GetLabelOk

`func (o *CreateTeamsEndpointRequest) GetLabelOk() (*string, bool)`

GetLabelOk returns a tuple with the Label field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabel

`func (o *CreateTeamsEndpointRequest) SetLabel(v string)`

SetLabel sets Label field to given value.


### GetWebhookUrl

`func (o *CreateTeamsEndpointRequest) GetWebhookUrl() string`

GetWebhookUrl returns the WebhookUrl field if non-nil, zero value otherwise.

### GetWebhookUrlOk

`func (o *CreateTeamsEndpointRequest) GetWebhookUrlOk() (*string, bool)`

GetWebhookUrlOk returns a tuple with the WebhookUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWebhookUrl

`func (o *CreateTeamsEndpointRequest) SetWebhookUrl(v string)`

SetWebhookUrl sets WebhookUrl field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


