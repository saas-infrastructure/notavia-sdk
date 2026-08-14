# WorkflowDetailResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Key** | **string** |  | 
**Name** | **string** |  | 
**Description** | Pointer to **string** |  | [optional] 
**Status** | **string** |  | 
**ActiveVersion** | Pointer to **int32** |  | [optional] 
**ActiveBodyJson** | Pointer to **string** | Raw JSON body of the currently active version, or null if none. | [optional] 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewWorkflowDetailResponse

`func NewWorkflowDetailResponse(id string, key string, name string, status string, createdAt time.Time, ) *WorkflowDetailResponse`

NewWorkflowDetailResponse instantiates a new WorkflowDetailResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkflowDetailResponseWithDefaults

`func NewWorkflowDetailResponseWithDefaults() *WorkflowDetailResponse`

NewWorkflowDetailResponseWithDefaults instantiates a new WorkflowDetailResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WorkflowDetailResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WorkflowDetailResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WorkflowDetailResponse) SetId(v string)`

SetId sets Id field to given value.


### GetKey

`func (o *WorkflowDetailResponse) GetKey() string`

GetKey returns the Key field if non-nil, zero value otherwise.

### GetKeyOk

`func (o *WorkflowDetailResponse) GetKeyOk() (*string, bool)`

GetKeyOk returns a tuple with the Key field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKey

`func (o *WorkflowDetailResponse) SetKey(v string)`

SetKey sets Key field to given value.


### GetName

`func (o *WorkflowDetailResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *WorkflowDetailResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *WorkflowDetailResponse) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *WorkflowDetailResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *WorkflowDetailResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *WorkflowDetailResponse) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *WorkflowDetailResponse) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetStatus

`func (o *WorkflowDetailResponse) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkflowDetailResponse) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkflowDetailResponse) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetActiveVersion

`func (o *WorkflowDetailResponse) GetActiveVersion() int32`

GetActiveVersion returns the ActiveVersion field if non-nil, zero value otherwise.

### GetActiveVersionOk

`func (o *WorkflowDetailResponse) GetActiveVersionOk() (*int32, bool)`

GetActiveVersionOk returns a tuple with the ActiveVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActiveVersion

`func (o *WorkflowDetailResponse) SetActiveVersion(v int32)`

SetActiveVersion sets ActiveVersion field to given value.

### HasActiveVersion

`func (o *WorkflowDetailResponse) HasActiveVersion() bool`

HasActiveVersion returns a boolean if a field has been set.

### GetActiveBodyJson

`func (o *WorkflowDetailResponse) GetActiveBodyJson() string`

GetActiveBodyJson returns the ActiveBodyJson field if non-nil, zero value otherwise.

### GetActiveBodyJsonOk

`func (o *WorkflowDetailResponse) GetActiveBodyJsonOk() (*string, bool)`

GetActiveBodyJsonOk returns a tuple with the ActiveBodyJson field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActiveBodyJson

`func (o *WorkflowDetailResponse) SetActiveBodyJson(v string)`

SetActiveBodyJson sets ActiveBodyJson field to given value.

### HasActiveBodyJson

`func (o *WorkflowDetailResponse) HasActiveBodyJson() bool`

HasActiveBodyJson returns a boolean if a field has been set.

### GetCreatedAt

`func (o *WorkflowDetailResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *WorkflowDetailResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *WorkflowDetailResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


