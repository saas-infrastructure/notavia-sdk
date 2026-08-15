# CreateTemplateRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Key** | **string** |  | 
**Name** | **string** |  | 
**SubjectTemplate** | **string** |  | 
**HtmlBodyTemplate** | **string** |  | 
**TextBodyTemplate** | Pointer to **string** |  | [optional] 

## Methods

### NewCreateTemplateRequest

`func NewCreateTemplateRequest(key string, name string, subjectTemplate string, htmlBodyTemplate string, ) *CreateTemplateRequest`

NewCreateTemplateRequest instantiates a new CreateTemplateRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateTemplateRequestWithDefaults

`func NewCreateTemplateRequestWithDefaults() *CreateTemplateRequest`

NewCreateTemplateRequestWithDefaults instantiates a new CreateTemplateRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKey

`func (o *CreateTemplateRequest) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *CreateTemplateRequest) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *CreateTemplateRequest) SetKey(v string)`

SetKey sets Key field to given value.


### GetName

`func (o *CreateTemplateRequest) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *CreateTemplateRequest) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *CreateTemplateRequest) SetName(v string)`

SetName sets Name field to given value.


### GetSubjectTemplate

`func (o *CreateTemplateRequest) GetSubjectTemplate() string`

GetSubjectTemplate returns the SubjectTemplate field if non-nil, zero value otherwise.

### GetSubjectTemplateOk

`func (o *CreateTemplateRequest) GetSubjectTemplateOk() (*string, bool)`

GetSubjectTemplateOk returns a tuple with the SubjectTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubjectTemplate

`func (o *CreateTemplateRequest) SetSubjectTemplate(v string)`

SetSubjectTemplate sets SubjectTemplate field to given value.


### GetHtmlBodyTemplate

`func (o *CreateTemplateRequest) GetHtmlBodyTemplate() string`

GetHtmlBodyTemplate returns the HtmlBodyTemplate field if non-nil, zero value otherwise.

### GetHtmlBodyTemplateOk

`func (o *CreateTemplateRequest) GetHtmlBodyTemplateOk() (*string, bool)`

GetHtmlBodyTemplateOk returns a tuple with the HtmlBodyTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtmlBodyTemplate

`func (o *CreateTemplateRequest) SetHtmlBodyTemplate(v string)`

SetHtmlBodyTemplate sets HtmlBodyTemplate field to given value.


### GetTextBodyTemplate

`func (o *CreateTemplateRequest) GetTextBodyTemplate() string`

GetTextBodyTemplate returns the TextBodyTemplate field if non-nil, zero value otherwise.

### GetTextBodyTemplateOk

`func (o *CreateTemplateRequest) GetTextBodyTemplateOk() (*string, bool)`

GetTextBodyTemplateOk returns a tuple with the TextBodyTemplate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTextBodyTemplate

`func (o *CreateTemplateRequest) SetTextBodyTemplate(v string)`

SetTextBodyTemplate sets TextBodyTemplate field to given value.

### HasTextBodyTemplate

`func (o *CreateTemplateRequest) HasTextBodyTemplate() bool`

HasTextBodyTemplate returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


