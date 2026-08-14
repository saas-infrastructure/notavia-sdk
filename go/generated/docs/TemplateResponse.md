# TemplateResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Key** | Pointer to **string** |  | [optional] 
**Name** | Pointer to **string** |  | [optional] 
**SubjectTemplate** | Pointer to **string** | Populated from the Email channel body for backwards compatibility. | [optional] 
**HtmlBodyTemplate** | Pointer to **string** | Populated from the Email channel body for backwards compatibility. | [optional] 
**TextBodyTemplate** | Pointer to **string** | Populated from the Email/SMS channel body for backwards compatibility. | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 
**UpdatedAt** | Pointer to **time.Time** |  | [optional] 
**Bodies** | Pointer to [**[]TemplateChannelBodyResponse**](TemplateChannelBodyResponse.md) | Per-channel body variants. Replaces the legacy flat fields for new integrations. | [optional] 
**BodyChannels** | Pointer to [**[]NotificationChannelKebab**](NotificationChannelKebab.md) | Kebab-case list of channels for which a body variant exists. | [optional] 

## Methods

### NewTemplateResponse

`func NewTemplateResponse() *TemplateResponse`

NewTemplateResponse instantiates a new TemplateResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTemplateResponseWithDefaults

`func NewTemplateResponseWithDefaults() *TemplateResponse`

NewTemplateResponseWithDefaults instantiates a new TemplateResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *TemplateResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *TemplateResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *TemplateResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *TemplateResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetKey

`func (o *TemplateResponse) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *TemplateResponse) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *TemplateResponse) SetKey(v string)`

SetKey sets Key field to given value.

### HasKey

`func (o *TemplateResponse) HasKey() bool`

HasKey returns a boolean if a field has been set.

### GetName

`func (o *TemplateResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *TemplateResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *TemplateResponse) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *TemplateResponse) HasName() bool`

HasName returns a boolean if a field has been set.

### GetSubjectTemplate

`func (o *TemplateResponse) GetSubjectTemplate() string`

GetSubjectTemplate returns the SubjectTemplate field if non-nil, zero value otherwise.

### GetSubjectTemplateOk

`func (o *TemplateResponse) GetSubjectTemplateOk() (*string, bool)`

GetSubjectTemplateOk returns a tuple with the SubjectTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubjectTemplate

`func (o *TemplateResponse) SetSubjectTemplate(v string)`

SetSubjectTemplate sets SubjectTemplate field to given value.

### HasSubjectTemplate

`func (o *TemplateResponse) HasSubjectTemplate() bool`

HasSubjectTemplate returns a boolean if a field has been set.

### GetHtmlBodyTemplate

`func (o *TemplateResponse) GetHtmlBodyTemplate() string`

GetHtmlBodyTemplate returns the HtmlBodyTemplate field if non-nil, zero value otherwise.

### GetHtmlBodyTemplateOk

`func (o *TemplateResponse) GetHtmlBodyTemplateOk() (*string, bool)`

GetHtmlBodyTemplateOk returns a tuple with the HtmlBodyTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtmlBodyTemplate

`func (o *TemplateResponse) SetHtmlBodyTemplate(v string)`

SetHtmlBodyTemplate sets HtmlBodyTemplate field to given value.

### HasHtmlBodyTemplate

`func (o *TemplateResponse) HasHtmlBodyTemplate() bool`

HasHtmlBodyTemplate returns a boolean if a field has been set.

### GetTextBodyTemplate

`func (o *TemplateResponse) GetTextBodyTemplate() string`

GetTextBodyTemplate returns the TextBodyTemplate field if non-nil, zero value otherwise.

### GetTextBodyTemplateOk

`func (o *TemplateResponse) GetTextBodyTemplateOk() (*string, bool)`

GetTextBodyTemplateOk returns a tuple with the TextBodyTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTextBodyTemplate

`func (o *TemplateResponse) SetTextBodyTemplate(v string)`

SetTextBodyTemplate sets TextBodyTemplate field to given value.

### HasTextBodyTemplate

`func (o *TemplateResponse) HasTextBodyTemplate() bool`

HasTextBodyTemplate returns a boolean if a field has been set.

### GetCreatedAt

`func (o *TemplateResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *TemplateResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *TemplateResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *TemplateResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.

### GetUpdatedAt

`func (o *TemplateResponse) GetUpdatedAt() time.Time`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *TemplateResponse) GetUpdatedAtOk() (*time.Time, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *TemplateResponse) SetUpdatedAt(v time.Time)`

SetUpdatedAt sets UpdatedAt field to given value.

### HasUpdatedAt

`func (o *TemplateResponse) HasUpdatedAt() bool`

HasUpdatedAt returns a boolean if a field has been set.

### GetBodies

`func (o *TemplateResponse) GetBodies() []TemplateChannelBodyResponse`

GetBodies returns the Bodies field if non-nil, zero value otherwise.

### GetBodiesOk

`func (o *TemplateResponse) GetBodiesOk() (*[]TemplateChannelBodyResponse, bool)`

GetBodiesOk returns a tuple with the Bodies field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBodies

`func (o *TemplateResponse) SetBodies(v []TemplateChannelBodyResponse)`

SetBodies sets Bodies field to given value.

### HasBodies

`func (o *TemplateResponse) HasBodies() bool`

HasBodies returns a boolean if a field has been set.

### GetBodyChannels

`func (o *TemplateResponse) GetBodyChannels() []NotificationChannelKebab`

GetBodyChannels returns the BodyChannels field if non-nil, zero value otherwise.

### GetBodyChannelsOk

`func (o *TemplateResponse) GetBodyChannelsOk() (*[]NotificationChannelKebab, bool)`

GetBodyChannelsOk returns a tuple with the BodyChannels field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBodyChannels

`func (o *TemplateResponse) SetBodyChannels(v []NotificationChannelKebab)`

SetBodyChannels sets BodyChannels field to given value.

### HasBodyChannels

`func (o *TemplateResponse) HasBodyChannels() bool`

HasBodyChannels returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


