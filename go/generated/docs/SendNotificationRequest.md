# SendNotificationRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Channel** | [**NotificationChannel**](NotificationChannel.md) |  | 
**Recipient** | [**Recipient**](Recipient.md) |  | 
**Subject** | Pointer to **string** | Email subject line. Ignored for non-email channels. | [optional] 
**HtmlBody** | Pointer to **string** | Inline HTML body. Ignored when &#x60;template_key&#x60; is set. Email/in-app only. | [optional] 
**TextBody** | Pointer to **string** | Inline plain-text body. Email/SMS only. | [optional] 
**TemplateKey** | Pointer to **string** | Key of a stored template. Required for Slack, Teams, Discord channels. | [optional] 
**TemplateData** | Pointer to **map[string]interface{}** | Liquid template variables merged at render time. | [optional] 
**ActionUrl** | Pointer to **string** | Optional CTA URL surfaced in in-app notifications. | [optional] 
**Category** | Pointer to **string** | Preference category key. Suppresses the send when the recipient has opted out. | [optional] 
**Attachments** | Pointer to [**[]AttachmentInput**](AttachmentInput.md) | File attachments for email notifications (email channel only). Maximum 10 files; maximum 15 MB per file and 15 MB total. File content must be base64-encoded. Bytes are stored ephemerally and deleted after delivery — only metadata is retained in the audit log.  | [optional] 

## Methods

### NewSendNotificationRequest

`func NewSendNotificationRequest(channel NotificationChannel, recipient Recipient, ) *SendNotificationRequest`

NewSendNotificationRequest instantiates a new SendNotificationRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSendNotificationRequestWithDefaults

`func NewSendNotificationRequestWithDefaults() *SendNotificationRequest`

NewSendNotificationRequestWithDefaults instantiates a new SendNotificationRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChannel

`func (o *SendNotificationRequest) GetChannel() NotificationChannel`

GetChannel returns the Channel field if non-nil, zero value otherwise.

### GetChannelOk

`func (o *SendNotificationRequest) GetChannelOk() (*NotificationChannel, bool)`

GetChannelOk returns a tuple with the Channel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChannel

`func (o *SendNotificationRequest) SetChannel(v NotificationChannel)`

SetChannel sets Channel field to given value.


### GetRecipient

`func (o *SendNotificationRequest) GetRecipient() Recipient`

GetRecipient returns the Recipient field if non-nil, zero value otherwise.

### GetRecipientOk

`func (o *SendNotificationRequest) GetRecipientOk() (*Recipient, bool)`

GetRecipientOk returns a tuple with the Recipient field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipient

`func (o *SendNotificationRequest) SetRecipient(v Recipient)`

SetRecipient sets Recipient field to given value.


### GetSubject

`func (o *SendNotificationRequest) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *SendNotificationRequest) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *SendNotificationRequest) SetSubject(v string)`

SetSubject sets Subject field to given value.

### HasSubject

`func (o *SendNotificationRequest) HasSubject() bool`

HasSubject returns a boolean if a field has been set.

### GetHtmlBody

`func (o *SendNotificationRequest) GetHtmlBody() string`

GetHtmlBody returns the HtmlBody field if non-nil, zero value otherwise.

### GetHtmlBodyOk

`func (o *SendNotificationRequest) GetHtmlBodyOk() (*string, bool)`

GetHtmlBodyOk returns a tuple with the HtmlBody field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtmlBody

`func (o *SendNotificationRequest) SetHtmlBody(v string)`

SetHtmlBody sets HtmlBody field to given value.

### HasHtmlBody

`func (o *SendNotificationRequest) HasHtmlBody() bool`

HasHtmlBody returns a boolean if a field has been set.

### GetTextBody

`func (o *SendNotificationRequest) GetTextBody() string`

GetTextBody returns the TextBody field if non-nil, zero value otherwise.

### GetTextBodyOk

`func (o *SendNotificationRequest) GetTextBodyOk() (*string, bool)`

GetTextBodyOk returns a tuple with the TextBody field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTextBody

`func (o *SendNotificationRequest) SetTextBody(v string)`

SetTextBody sets TextBody field to given value.

### HasTextBody

`func (o *SendNotificationRequest) HasTextBody() bool`

HasTextBody returns a boolean if a field has been set.

### GetTemplateKey

`func (o *SendNotificationRequest) GetTemplateKey() string`

GetTemplateKey returns the TemplateKey field if non-nil, zero value otherwise.

### GetTemplateKeyOk

`func (o *SendNotificationRequest) GetTemplateKeyOk() (*string, bool)`

GetTemplateKeyOk returns a tuple with the TemplateKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTemplateKey

`func (o *SendNotificationRequest) SetTemplateKey(v string)`

SetTemplateKey sets TemplateKey field to given value.

### HasTemplateKey

`func (o *SendNotificationRequest) HasTemplateKey() bool`

HasTemplateKey returns a boolean if a field has been set.

### GetTemplateData

`func (o *SendNotificationRequest) GetTemplateData() map[string]interface{}`

GetTemplateData returns the TemplateData field if non-nil, zero value otherwise.

### GetTemplateDataOk

`func (o *SendNotificationRequest) GetTemplateDataOk() (*map[string]interface{}, bool)`

GetTemplateDataOk returns a tuple with the TemplateData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTemplateData

`func (o *SendNotificationRequest) SetTemplateData(v map[string]interface{})`

SetTemplateData sets TemplateData field to given value.

### HasTemplateData

`func (o *SendNotificationRequest) HasTemplateData() bool`

HasTemplateData returns a boolean if a field has been set.

### GetActionUrl

`func (o *SendNotificationRequest) GetActionUrl() string`

GetActionUrl returns the ActionUrl field if non-nil, zero value otherwise.

### GetActionUrlOk

`func (o *SendNotificationRequest) GetActionUrlOk() (*string, bool)`

GetActionUrlOk returns a tuple with the ActionUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActionUrl

`func (o *SendNotificationRequest) SetActionUrl(v string)`

SetActionUrl sets ActionUrl field to given value.

### HasActionUrl

`func (o *SendNotificationRequest) HasActionUrl() bool`

HasActionUrl returns a boolean if a field has been set.

### GetCategory

`func (o *SendNotificationRequest) GetCategory() string`

GetCategory returns the Category field if non-nil, zero value otherwise.

### GetCategoryOk

`func (o *SendNotificationRequest) GetCategoryOk() (*string, bool)`

GetCategoryOk returns a tuple with the Category field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCategory

`func (o *SendNotificationRequest) SetCategory(v string)`

SetCategory sets Category field to given value.

### HasCategory

`func (o *SendNotificationRequest) HasCategory() bool`

HasCategory returns a boolean if a field has been set.

### GetAttachments

`func (o *SendNotificationRequest) GetAttachments() []AttachmentInput`

GetAttachments returns the Attachments field if non-nil, zero value otherwise.

### GetAttachmentsOk

`func (o *SendNotificationRequest) GetAttachmentsOk() (*[]AttachmentInput, bool)`

GetAttachmentsOk returns a tuple with the Attachments field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAttachments

`func (o *SendNotificationRequest) SetAttachments(v []AttachmentInput)`

SetAttachments sets Attachments field to given value.

### HasAttachments

`func (o *SendNotificationRequest) HasAttachments() bool`

HasAttachments returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


