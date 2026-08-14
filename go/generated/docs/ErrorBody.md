# ErrorBody

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Type** | **string** |  | 
**Code** | **string** |  | 
**Message** | **string** |  | 
**Param** | Pointer to **string** |  | [optional] 

## Methods

### NewErrorBody

`func NewErrorBody(type_ string, code string, message string, ) *ErrorBody`

NewErrorBody instantiates a new ErrorBody object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewErrorBodyWithDefaults

`func NewErrorBodyWithDefaults() *ErrorBody`

NewErrorBodyWithDefaults instantiates a new ErrorBody object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetType

`func (o *ErrorBody) GetType() string`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *ErrorBody) GetTypeOk() (*string, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *ErrorBody) SetType(v string)`

SetType sets Type field to given value.


### GetCode

`func (o *ErrorBody) GetCode() string`

GetCode returns the Code field if non-nil, zero value otherwise.

### GetCodeOk

`func (o *ErrorBody) GetCodeOk() (*string, bool)`

GetCodeOk returns a tuple with the Code field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCode

`func (o *ErrorBody) SetCode(v string)`

SetCode sets Code field to given value.


### GetMessage

`func (o *ErrorBody) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *ErrorBody) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *ErrorBody) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetParam

`func (o *ErrorBody) GetParam() string`

GetParam returns the Param field if non-nil, zero value otherwise.

### GetParamOk

`func (o *ErrorBody) GetParamOk() (*string, bool)`

GetParamOk returns a tuple with the Param field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetParam

`func (o *ErrorBody) SetParam(v string)`

SetParam sets Param field to given value.

### HasParam

`func (o *ErrorBody) HasParam() bool`

HasParam returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


