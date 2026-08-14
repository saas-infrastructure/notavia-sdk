# SendSlackTestRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**SlackUserId** | Pointer to **string** | Deliver as a DM to this Slack user id. | [optional] 
**SlackChannelId** | Pointer to **string** | Post to this Slack channel id. | [optional] 

## Methods

### NewSendSlackTestRequest

`func NewSendSlackTestRequest() *SendSlackTestRequest`

NewSendSlackTestRequest instantiates a new SendSlackTestRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSendSlackTestRequestWithDefaults

`func NewSendSlackTestRequestWithDefaults() *SendSlackTestRequest`

NewSendSlackTestRequestWithDefaults instantiates a new SendSlackTestRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSlackUserId

`func (o *SendSlackTestRequest) GetSlackUserId() string`

GetSlackUserId returns the SlackUserId field if non-nil, zero value otherwise.

### GetSlackUserIdOk

`func (o *SendSlackTestRequest) GetSlackUserIdOk() (*string, bool)`

GetSlackUserIdOk returns a tuple with the SlackUserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlackUserId

`func (o *SendSlackTestRequest) SetSlackUserId(v string)`

SetSlackUserId sets SlackUserId field to given value.

### HasSlackUserId

`func (o *SendSlackTestRequest) HasSlackUserId() bool`

HasSlackUserId returns a boolean if a field has been set.

### GetSlackChannelId

`func (o *SendSlackTestRequest) GetSlackChannelId() string`

GetSlackChannelId returns the SlackChannelId field if non-nil, zero value otherwise.

### GetSlackChannelIdOk

`func (o *SendSlackTestRequest) GetSlackChannelIdOk() (*string, bool)`

GetSlackChannelIdOk returns a tuple with the SlackChannelId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlackChannelId

`func (o *SendSlackTestRequest) SetSlackChannelId(v string)`

SetSlackChannelId sets SlackChannelId field to given value.

### HasSlackChannelId

`func (o *SendSlackTestRequest) HasSlackChannelId() bool`

HasSlackChannelId returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


