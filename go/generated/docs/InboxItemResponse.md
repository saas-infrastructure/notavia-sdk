# InboxItemResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Subject** | Pointer to **string** |  | [optional] 
**HtmlBody** | Pointer to **string** |  | [optional] 
**TextBody** | Pointer to **string** |  | [optional] 
**ActionUrl** | Pointer to **string** |  | [optional] 
**IsRead** | Pointer to **bool** |  | [optional] 
**CreatedAt** | Pointer to **time.Time** |  | [optional] 
**ReadAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewInboxItemResponse

`func NewInboxItemResponse() *InboxItemResponse`

NewInboxItemResponse instantiates a new InboxItemResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInboxItemResponseWithDefaults

`func NewInboxItemResponseWithDefaults() *InboxItemResponse`

NewInboxItemResponseWithDefaults instantiates a new InboxItemResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *InboxItemResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *InboxItemResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *InboxItemResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *InboxItemResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetSubject

`func (o *InboxItemResponse) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *InboxItemResponse) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *InboxItemResponse) SetSubject(v string)`

SetSubject sets Subject field to given value.

### HasSubject

`func (o *InboxItemResponse) HasSubject() bool`

HasSubject returns a boolean if a field has been set.

### GetHtmlBody

`func (o *InboxItemResponse) GetHtmlBody() string`

GetHtmlBody returns the HtmlBody field if non-nil, zero value otherwise.

### GetHtmlBodyOk

`func (o *InboxItemResponse) GetHtmlBodyOk() (*string, bool)`

GetHtmlBodyOk returns a tuple with the HtmlBody field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHtmlBody

`func (o *InboxItemResponse) SetHtmlBody(v string)`

SetHtmlBody sets HtmlBody field to given value.

### HasHtmlBody

`func (o *InboxItemResponse) HasHtmlBody() bool`

HasHtmlBody returns a boolean if a field has been set.

### GetTextBody

`func (o *InboxItemResponse) GetTextBody() string`

GetTextBody returns the TextBody field if non-nil, zero value otherwise.

### GetTextBodyOk

`func (o *InboxItemResponse) GetTextBodyOk() (*string, bool)`

GetTextBodyOk returns a tuple with the TextBody field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTextBody

`func (o *InboxItemResponse) SetTextBody(v string)`

SetTextBody sets TextBody field to given value.

### HasTextBody

`func (o *InboxItemResponse) HasTextBody() bool`

HasTextBody returns a boolean if a field has been set.

### GetActionUrl

`func (o *InboxItemResponse) GetActionUrl() string`

GetActionUrl returns the ActionUrl field if non-nil, zero value otherwise.

### GetActionUrlOk

`func (o *InboxItemResponse) GetActionUrlOk() (*string, bool)`

GetActionUrlOk returns a tuple with the ActionUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActionUrl

`func (o *InboxItemResponse) SetActionUrl(v string)`

SetActionUrl sets ActionUrl field to given value.

### HasActionUrl

`func (o *InboxItemResponse) HasActionUrl() bool`

HasActionUrl returns a boolean if a field has been set.

### GetIsRead

`func (o *InboxItemResponse) GetIsRead() bool`

GetIsRead returns the IsRead field if non-nil, zero value otherwise.

### GetIsReadOk

`func (o *InboxItemResponse) GetIsReadOk() (*bool, bool)`

GetIsReadOk returns a tuple with the IsRead field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsRead

`func (o *InboxItemResponse) SetIsRead(v bool)`

SetIsRead sets IsRead field to given value.

### HasIsRead

`func (o *InboxItemResponse) HasIsRead() bool`

HasIsRead returns a boolean if a field has been set.

### GetCreatedAt

`func (o *InboxItemResponse) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *InboxItemResponse) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *InboxItemResponse) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.

### HasCreatedAt

`func (o *InboxItemResponse) HasCreatedAt() bool`

HasCreatedAt returns a boolean if a field has been set.

### GetReadAt

`func (o *InboxItemResponse) GetReadAt() time.Time`

GetReadAt returns the ReadAt field if non-nil, zero value otherwise.

### GetReadAtOk

`func (o *InboxItemResponse) GetReadAtOk() (*time.Time, bool)`

GetReadAtOk returns a tuple with the ReadAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReadAt

`func (o *InboxItemResponse) SetReadAt(v time.Time)`

SetReadAt sets ReadAt field to given value.

### HasReadAt

`func (o *InboxItemResponse) HasReadAt() bool`

HasReadAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


