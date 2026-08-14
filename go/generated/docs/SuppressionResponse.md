# SuppressionResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Address** | Pointer to **string** |  | [optional] 
**Reason** | Pointer to **string** |  | [optional] 
**Source** | Pointer to **string** |  | [optional] 
**DiagnosticDetail** | Pointer to **string** |  | [optional] 
**TriggeringNotificationId** | Pointer to **string** |  | [optional] 
**SuppressedAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewSuppressionResponse

`func NewSuppressionResponse() *SuppressionResponse`

NewSuppressionResponse instantiates a new SuppressionResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSuppressionResponseWithDefaults

`func NewSuppressionResponseWithDefaults() *SuppressionResponse`

NewSuppressionResponseWithDefaults instantiates a new SuppressionResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SuppressionResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SuppressionResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SuppressionResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SuppressionResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetAddress

`func (o *SuppressionResponse) GetAddress() string`

GetAddress returns the Address field if non-nil, zero value otherwise.

### GetAddressOk

`func (o *SuppressionResponse) GetAddressOk() (*string, bool)`

GetAddressOk returns a tuple with the Address field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddress

`func (o *SuppressionResponse) SetAddress(v string)`

SetAddress sets Address field to given value.

### HasAddress

`func (o *SuppressionResponse) HasAddress() bool`

HasAddress returns a boolean if a field has been set.

### GetReason

`func (o *SuppressionResponse) GetReason() string`

GetReason returns the Reason field if non-nil, zero value otherwise.

### GetReasonOk

`func (o *SuppressionResponse) GetReasonOk() (*string, bool)`

GetReasonOk returns a tuple with the Reason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReason

`func (o *SuppressionResponse) SetReason(v string)`

SetReason sets Reason field to given value.

### HasReason

`func (o *SuppressionResponse) HasReason() bool`

HasReason returns a boolean if a field has been set.

### GetSource

`func (o *SuppressionResponse) GetSource() string`

GetSource returns the Source field if non-nil, zero value otherwise.

### GetSourceOk

`func (o *SuppressionResponse) GetSourceOk() (*string, bool)`

GetSourceOk returns a tuple with the Source field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSource

`func (o *SuppressionResponse) SetSource(v string)`

SetSource sets Source field to given value.

### HasSource

`func (o *SuppressionResponse) HasSource() bool`

HasSource returns a boolean if a field has been set.

### GetDiagnosticDetail

`func (o *SuppressionResponse) GetDiagnosticDetail() string`

GetDiagnosticDetail returns the DiagnosticDetail field if non-nil, zero value otherwise.

### GetDiagnosticDetailOk

`func (o *SuppressionResponse) GetDiagnosticDetailOk() (*string, bool)`

GetDiagnosticDetailOk returns a tuple with the DiagnosticDetail field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDiagnosticDetail

`func (o *SuppressionResponse) SetDiagnosticDetail(v string)`

SetDiagnosticDetail sets DiagnosticDetail field to given value.

### HasDiagnosticDetail

`func (o *SuppressionResponse) HasDiagnosticDetail() bool`

HasDiagnosticDetail returns a boolean if a field has been set.

### GetTriggeringNotificationId

`func (o *SuppressionResponse) GetTriggeringNotificationId() string`

GetTriggeringNotificationId returns the TriggeringNotificationId field if non-nil, zero value otherwise.

### GetTriggeringNotificationIdOk

`func (o *SuppressionResponse) GetTriggeringNotificationIdOk() (*string, bool)`

GetTriggeringNotificationIdOk returns a tuple with the TriggeringNotificationId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTriggeringNotificationId

`func (o *SuppressionResponse) SetTriggeringNotificationId(v string)`

SetTriggeringNotificationId sets TriggeringNotificationId field to given value.

### HasTriggeringNotificationId

`func (o *SuppressionResponse) HasTriggeringNotificationId() bool`

HasTriggeringNotificationId returns a boolean if a field has been set.

### GetSuppressedAt

`func (o *SuppressionResponse) GetSuppressedAt() time.Time`

GetSuppressedAt returns the SuppressedAt field if non-nil, zero value otherwise.

### GetSuppressedAtOk

`func (o *SuppressionResponse) GetSuppressedAtOk() (*time.Time, bool)`

GetSuppressedAtOk returns a tuple with the SuppressedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSuppressedAt

`func (o *SuppressionResponse) SetSuppressedAt(v time.Time)`

SetSuppressedAt sets SuppressedAt field to given value.

### HasSuppressedAt

`func (o *SuppressionResponse) HasSuppressedAt() bool`

HasSuppressedAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


