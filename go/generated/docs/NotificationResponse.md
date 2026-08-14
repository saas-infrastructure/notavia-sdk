# NotificationResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Status** | Pointer to [**NotificationStatus**](NotificationStatus.md) |  | [optional] 
**Channel** | Pointer to [**NotificationChannel**](NotificationChannel.md) |  | [optional] 
**Recipient** | Pointer to [**NotificationResponseRecipient**](NotificationResponseRecipient.md) |  | [optional] 
**Subject** | Pointer to **string** |  | [optional] 
**HtmlBody** | Pointer to **string** |  | [optional] 
**TextBody** | Pointer to **string** |  | [optional] 
**TemplateKey** | Pointer to **string** |  | [optional] 
**TemplateData** | Pointer to **map[string]interface{}** |  | [optional] 
**IdempotencyKey** | Pointer to **string** |  | [optional] 
**ActionUrl** | Pointer to **string** |  | [optional] 
**AttemptCount** | Pointer to **int32** |  | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 
**Events** | Pointer to [**[]NotificationEventDto**](NotificationEventDto.md) |  | [optional] 
**SuppressionReason** | Pointer to **string** |  | [optional] 
**Attachments** | Pointer to [**[]AttachmentMetadata**](AttachmentMetadata.md) | Metadata for files that were attached to this email notification. Bytes are purged after delivery; the &#x60;purged&#x60; flag indicates whether this has occurred. Omitted when the notification had no attachments.  | [optional] 

## Methods

### NewNotificationResponse

`func NewNotificationResponse() *NotificationResponse`

NewNotificationResponse instantiates a new NotificationResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewNotificationResponseWithDefaults

`func NewNotificationResponseWithDefaults() *NotificationResponse`

NewNotificationResponseWithDefaults instantiates a new NotificationResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *NotificationResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *NotificationResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *NotificationResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *NotificationResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetStatus

`func (o *NotificationResponse) GetStatus() NotificationStatus`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *NotificationResponse) GetStatusOk() (*NotificationStatus, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *NotificationResponse) SetStatus(v NotificationStatus)`

SetStatus sets Status field to given value.

### HasStatus

`func (o *NotificationResponse) HasStatus() bool`

HasStatus returns a boolean if a field has been set.

### GetChannel

`func (o *NotificationResponse) GetChannel() NotificationChannel`

GetChannel returns the Channel field if non-nil, zero value otherwise.

### GetChannelOk

`func (o *NotificationResponse) GetChannelOk() (*NotificationChannel, bool)`

GetChannelOk returns a tuple with the Channel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChannel

`func (o *NotificationResponse) SetChannel(v NotificationChannel)`

SetChannel sets Channel field to given value.

### HasChannel

`func (o *NotificationResponse) HasChannel() bool`

HasChannel returns a boolean if a field has been set.

### GetRecipient

`func (o *NotificationResponse) GetRecipient() NotificationResponseRecipient`

GetRecipient returns the Recipient field if non-nil, zero value otherwise.

### GetRecipientOk

`func (o *NotificationResponse) GetRecipientOk() (*NotificationResponseRecipient, bool)`

GetRecipientOk returns a tuple with the Recipient field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipient

`func (o *NotificationResponse) SetRecipient(v NotificationResponseRecipient)`

SetRecipient sets Recipient field to given value.

### HasRecipient

`func (o *NotificationResponse) HasRecipient() bool`

HasRecipient returns a boolean if a field has been set.

### GetSubject

`func (o *NotificationResponse) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *NotificationResponse) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *NotificationResponse) SetSubject(v string)`

SetSubject sets Subject field to given value.

### HasSubject

`func (o *NotificationResponse) HasSubject() bool`

HasSubject returns a boolean if a field has been set.

### GetHtmlBody

`func (o *NotificationResponse) GetHtmlBody() string`

GetHtmlBody returns the HtmlBody field if non-nil, zero value otherwise.

### GetHtmlBodyOk

`func (o *NotificationResponse) GetHtmlBodyOk() (*string, bool)`

GetHtmlBodyOk returns a tuple with the HtmlBody field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtmlBody

`func (o *NotificationResponse) SetHtmlBody(v string)`

SetHtmlBody sets HtmlBody field to given value.

### HasHtmlBody

`func (o *NotificationResponse) HasHtmlBody() bool`

HasHtmlBody returns a boolean if a field has been set.

### GetTextBody

`func (o *NotificationResponse) GetTextBody() string`

GetTextBody returns the TextBody field if non-nil, zero value otherwise.

### GetTextBodyOk

`func (o *NotificationResponse) GetTextBodyOk() (*string, bool)`

GetTextBodyOk returns a tuple with the TextBody field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTextBody

`func (o *NotificationResponse) SetTextBody(v string)`

SetTextBody sets TextBody field to given value.

### HasTextBody

`func (o *NotificationResponse) HasTextBody() bool`

HasTextBody returns a boolean if a field has been set.

### GetTemplateKey

`func (o *NotificationResponse) GetTemplateKey() string`

GetTemplateKey returns the TemplateKey field if non-nil, zero value otherwise.

### GetTemplateKeyOk

`func (o *NotificationResponse) GetTemplateKeyOk() (*string, bool)`

GetTemplateKeyOk returns a tuple with the TemplateKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTemplateKey

`func (o *NotificationResponse) SetTemplateKey(v string)`

SetTemplateKey sets TemplateKey field to given value.

### HasTemplateKey

`func (o *NotificationResponse) HasTemplateKey() bool`

HasTemplateKey returns a boolean if a field has been set.

### GetTemplateData

`func (o *NotificationResponse) GetTemplateData() map[string]interface{}`

GetTemplateData returns the TemplateData field if non-nil, zero value otherwise.

### GetTemplateDataOk

`func (o *NotificationResponse) GetTemplateDataOk() (*map[string]interface{}, bool)`

GetTemplateDataOk returns a tuple with the TemplateData field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTemplateData

`func (o *NotificationResponse) SetTemplateData(v map[string]interface{})`

SetTemplateData sets TemplateData field to given value.

### HasTemplateData

`func (o *NotificationResponse) HasTemplateData() bool`

HasTemplateData returns a boolean if a field has been set.

### GetIdempotencyKey

`func (o *NotificationResponse) GetIdempotencyKey() string`

GetIdempotencyKey returns the IdempotencyKey field if non-nil, zero value otherwise.

### GetIdempotencyKeyOk

`func (o *NotificationResponse) GetIdempotencyKeyOk() (*string, bool)`

GetIdempotencyKeyOk returns a tuple with the IdempotencyKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIdempotencyKey

`func (o *NotificationResponse) SetIdempotencyKey(v string)`

SetIdempotencyKey sets IdempotencyKey field to given value.

### HasIdempotencyKey

`func (o *NotificationResponse) HasIdempotencyKey() bool`

HasIdempotencyKey returns a boolean if a field has been set.

### GetActionUrl

`func (o *NotificationResponse) GetActionUrl() string`

GetActionUrl returns the ActionUrl field if non-nil, zero value otherwise.

### GetActionUrlOk

`func (o *NotificationResponse) GetActionUrlOk() (*string, bool)`

GetActionUrlOk returns a tuple with the ActionUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActionUrl

`func (o *NotificationResponse) SetActionUrl(v string)`

SetActionUrl sets ActionUrl field to given value.

### HasActionUrl

`func (o *NotificationResponse) HasActionUrl() bool`

HasActionUrl returns a boolean if a field has been set.

### GetAttemptCount

`func (o *NotificationResponse) GetAttemptCount() int32`

GetAttemptCount returns the AttemptCount field if non-nil, zero value otherwise.

### GetAttemptCountOk

`func (o *NotificationResponse) GetAttemptCountOk() (*int32, bool)`

GetAttemptCountOk returns a tuple with the AttemptCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAttemptCount

`func (o *NotificationResponse) SetAttemptCount(v int32)`

SetAttemptCount sets AttemptCount field to given value.

### HasAttemptCount

`func (o *NotificationResponse) HasAttemptCount() bool`

HasAttemptCount returns a boolean if a field has been set.

### GetCreatedAt

`func (o *NotificationResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *NotificationResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *NotificationResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *NotificationResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.

### GetEvents

`func (o *NotificationResponse) GetEvents() []NotificationEventDto`

GetEvents returns the Events field if non-nil, zero value otherwise.

### GetEventsOk

`func (o *NotificationResponse) GetEventsOk() (*[]NotificationEventDto, bool)`

GetEventsOk returns a tuple with the Events field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEvents

`func (o *NotificationResponse) SetEvents(v []NotificationEventDto)`

SetEvents sets Events field to given value.

### HasEvents

`func (o *NotificationResponse) HasEvents() bool`

HasEvents returns a boolean if a field has been set.

### GetSuppressionReason

`func (o *NotificationResponse) GetSuppressionReason() string`

GetSuppressionReason returns the SuppressionReason field if non-nil, zero value otherwise.

### GetSuppressionReasonOk

`func (o *NotificationResponse) GetSuppressionReasonOk() (*string, bool)`

GetSuppressionReasonOk returns a tuple with the SuppressionReason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSuppressionReason

`func (o *NotificationResponse) SetSuppressionReason(v string)`

SetSuppressionReason sets SuppressionReason field to given value.

### HasSuppressionReason

`func (o *NotificationResponse) HasSuppressionReason() bool`

HasSuppressionReason returns a boolean if a field has been set.

### GetAttachments

`func (o *NotificationResponse) GetAttachments() []AttachmentMetadata`

GetAttachments returns the Attachments field if non-nil, zero value otherwise.

### GetAttachmentsOk

`func (o *NotificationResponse) GetAttachmentsOk() (*[]AttachmentMetadata, bool)`

GetAttachmentsOk returns a tuple with the Attachments field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAttachments

`func (o *NotificationResponse) SetAttachments(v []AttachmentMetadata)`

SetAttachments sets Attachments field to given value.

### HasAttachments

`func (o *NotificationResponse) HasAttachments() bool`

HasAttachments returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


