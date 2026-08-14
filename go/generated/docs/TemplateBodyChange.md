# TemplateBodyChange

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Channel** | **string** |  | 
**Subject** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**Text** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**Html** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**Structured** | [**FieldChangeKind**](FieldChangeKind.md) |  | 

## Methods

### NewTemplateBodyChange

`func NewTemplateBodyChange(channel string, subject FieldChangeKind, text FieldChangeKind, html FieldChangeKind, structured FieldChangeKind, ) *TemplateBodyChange`

NewTemplateBodyChange instantiates a new TemplateBodyChange object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTemplateBodyChangeWithDefaults

`func NewTemplateBodyChangeWithDefaults() *TemplateBodyChange`

NewTemplateBodyChangeWithDefaults instantiates a new TemplateBodyChange object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChannel

`func (o *TemplateBodyChange) GetChannel() string`

GetChannel returns the Channel field if non-nil, zero value otherwise.

### GetChannelOk

`func (o *TemplateBodyChange) GetChannelOk() (*string, bool)`

GetChannelOk returns a tuple with the Channel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChannel

`func (o *TemplateBodyChange) SetChannel(v string)`

SetChannel sets Channel field to given value.


### GetSubject

`func (o *TemplateBodyChange) GetSubject() FieldChangeKind`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *TemplateBodyChange) GetSubjectOk() (*FieldChangeKind, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *TemplateBodyChange) SetSubject(v FieldChangeKind)`

SetSubject sets Subject field to given value.


### GetText

`func (o *TemplateBodyChange) GetText() FieldChangeKind`

GetText returns the Text field if non-nil, zero value otherwise.

### GetTextOk

`func (o *TemplateBodyChange) GetTextOk() (*FieldChangeKind, bool)`

GetTextOk returns a tuple with the Text field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetText

`func (o *TemplateBodyChange) SetText(v FieldChangeKind)`

SetText sets Text field to given value.


### GetHtml

`func (o *TemplateBodyChange) GetHtml() FieldChangeKind`

GetHtml returns the Html field if non-nil, zero value otherwise.

### GetHtmlOk

`func (o *TemplateBodyChange) GetHtmlOk() (*FieldChangeKind, bool)`

GetHtmlOk returns a tuple with the Html field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtml

`func (o *TemplateBodyChange) SetHtml(v FieldChangeKind)`

SetHtml sets Html field to given value.


### GetStructured

`func (o *TemplateBodyChange) GetStructured() FieldChangeKind`

GetStructured returns the Structured field if non-nil, zero value otherwise.

### GetStructuredOk

`func (o *TemplateBodyChange) GetStructuredOk() (*FieldChangeKind, bool)`

GetStructuredOk returns a tuple with the Structured field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStructured

`func (o *TemplateBodyChange) SetStructured(v FieldChangeKind)`

SetStructured sets Structured field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


