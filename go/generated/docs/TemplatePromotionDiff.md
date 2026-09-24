# TemplatePromotionDiff

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Key** | **string** |  | 
**Status** | [**PromotionStatus**](PromotionStatus.md) |  | 
**Name** | [**FieldChangeKind**](FieldChangeKind.md) |  | 
**Bodies** | [**[]TemplateBodyChange**](TemplateBodyChange.md) |  | 

## Methods

### NewTemplatePromotionDiff

`func NewTemplatePromotionDiff(key string, status PromotionStatus, name FieldChangeKind, bodies []TemplateBodyChange, ) *TemplatePromotionDiff`

NewTemplatePromotionDiff instantiates a new TemplatePromotionDiff object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTemplatePromotionDiffWithDefaults

`func NewTemplatePromotionDiffWithDefaults() *TemplatePromotionDiff`

NewTemplatePromotionDiffWithDefaults instantiates a new TemplatePromotionDiff object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKey

`func (o *TemplatePromotionDiff) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *TemplatePromotionDiff) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *TemplatePromotionDiff) SetKey(v string)`

SetKey sets Key field to given value.


### GetStatus

`func (o *TemplatePromotionDiff) GetStatus() PromotionStatus`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *TemplatePromotionDiff) GetStatusOk() (*PromotionStatus, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *TemplatePromotionDiff) SetStatus(v PromotionStatus)`

SetStatus sets Status field to given value.


### GetName

`func (o *TemplatePromotionDiff) GetName() FieldChangeKind`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *TemplatePromotionDiff) GetNameOk() (*FieldChangeKind, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *TemplatePromotionDiff) SetName(v FieldChangeKind)`

SetName sets Name field to given value.


### GetBodies

`func (o *TemplatePromotionDiff) GetBodies() []TemplateBodyChange`

GetBodies returns the Bodies field if non-nil, zero value otherwise.

### GetBodiesOk

`func (o *TemplatePromotionDiff) GetBodiesOk() (*[]TemplateBodyChange, bool)`

GetBodiesOk returns a tuple with the Bodies field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBodies

`func (o *TemplatePromotionDiff) SetBodies(v []TemplateBodyChange)`

SetBodies sets Bodies field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


