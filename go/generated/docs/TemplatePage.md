# TemplatePage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | Pointer to [**[]TemplateResponse**](TemplateResponse.md) |  | [optional] 
**NextCursor** | Pointer to **string** |  | [optional] 

## Methods

### NewTemplatePage

`func NewTemplatePage() *TemplatePage`

NewTemplatePage instantiates a new TemplatePage object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTemplatePageWithDefaults

`func NewTemplatePageWithDefaults() *TemplatePage`

NewTemplatePageWithDefaults instantiates a new TemplatePage object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *TemplatePage) GetData() []TemplateResponse`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *TemplatePage) GetDataOk() (*[]TemplateResponse, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *TemplatePage) SetData(v []TemplateResponse)`

SetData sets Data field to given value.

### HasData

`func (o *TemplatePage) HasData() bool`

HasData returns a boolean if a field has been set.

### GetNextCursor

`func (o *TemplatePage) GetNextCursor() string`

GetNextCursor returns the NextCursor field if non-nil, zero value otherwise.

### GetNextCursorOk

`func (o *TemplatePage) GetNextCursorOk() (*string, bool)`

GetNextCursorOk returns a tuple with the NextCursor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextCursor

`func (o *TemplatePage) SetNextCursor(v string)`

SetNextCursor sets NextCursor field to given value.

### HasNextCursor

`func (o *TemplatePage) HasNextCursor() bool`

HasNextCursor returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


