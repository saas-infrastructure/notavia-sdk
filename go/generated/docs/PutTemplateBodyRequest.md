# PutTemplateBodyRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**SubjectTemplate** | Pointer to **string** |  | [optional] 
**TextTemplate** | Pointer to **string** |  | [optional] 
**HtmlTemplate** | Pointer to **string** |  | [optional] 
**StructuredTemplate** | Pointer to **string** | JSON string containing the channel-specific structured body. For Slack this is a Block Kit blocks array rendered via Liquid. For Teams this is an Adaptive Card v1.5 object rendered via Liquid. For Discord this is an embed object rendered via Liquid.  | [optional] 

## Methods

### NewPutTemplateBodyRequest

`func NewPutTemplateBodyRequest() *PutTemplateBodyRequest`

NewPutTemplateBodyRequest instantiates a new PutTemplateBodyRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPutTemplateBodyRequestWithDefaults

`func NewPutTemplateBodyRequestWithDefaults() *PutTemplateBodyRequest`

NewPutTemplateBodyRequestWithDefaults instantiates a new PutTemplateBodyRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSubjectTemplate

`func (o *PutTemplateBodyRequest) GetSubjectTemplate() string`

GetSubjectTemplate returns the SubjectTemplate field if non-nil, zero value otherwise.

### GetSubjectTemplateOk

`func (o *PutTemplateBodyRequest) GetSubjectTemplateOk() (*string, bool)`

GetSubjectTemplateOk returns a tuple with the SubjectTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubjectTemplate

`func (o *PutTemplateBodyRequest) SetSubjectTemplate(v string)`

SetSubjectTemplate sets SubjectTemplate field to given value.

### HasSubjectTemplate

`func (o *PutTemplateBodyRequest) HasSubjectTemplate() bool`

HasSubjectTemplate returns a boolean if a field has been set.

### GetTextTemplate

`func (o *PutTemplateBodyRequest) GetTextTemplate() string`

GetTextTemplate returns the TextTemplate field if non-nil, zero value otherwise.

### GetTextTemplateOk

`func (o *PutTemplateBodyRequest) GetTextTemplateOk() (*string, bool)`

GetTextTemplateOk returns a tuple with the TextTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTextTemplate

`func (o *PutTemplateBodyRequest) SetTextTemplate(v string)`

SetTextTemplate sets TextTemplate field to given value.

### HasTextTemplate

`func (o *PutTemplateBodyRequest) HasTextTemplate() bool`

HasTextTemplate returns a boolean if a field has been set.

### GetHtmlTemplate

`func (o *PutTemplateBodyRequest) GetHtmlTemplate() string`

GetHtmlTemplate returns the HtmlTemplate field if non-nil, zero value otherwise.

### GetHtmlTemplateOk

`func (o *PutTemplateBodyRequest) GetHtmlTemplateOk() (*string, bool)`

GetHtmlTemplateOk returns a tuple with the HtmlTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtmlTemplate

`func (o *PutTemplateBodyRequest) SetHtmlTemplate(v string)`

SetHtmlTemplate sets HtmlTemplate field to given value.

### HasHtmlTemplate

`func (o *PutTemplateBodyRequest) HasHtmlTemplate() bool`

HasHtmlTemplate returns a boolean if a field has been set.

### GetStructuredTemplate

`func (o *PutTemplateBodyRequest) GetStructuredTemplate() string`

GetStructuredTemplate returns the StructuredTemplate field if non-nil, zero value otherwise.

### GetStructuredTemplateOk

`func (o *PutTemplateBodyRequest) GetStructuredTemplateOk() (*string, bool)`

GetStructuredTemplateOk returns a tuple with the StructuredTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStructuredTemplate

`func (o *PutTemplateBodyRequest) SetStructuredTemplate(v string)`

SetStructuredTemplate sets StructuredTemplate field to given value.

### HasStructuredTemplate

`func (o *PutTemplateBodyRequest) HasStructuredTemplate() bool`

HasStructuredTemplate returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


