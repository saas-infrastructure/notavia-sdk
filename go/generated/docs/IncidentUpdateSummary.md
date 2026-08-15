# IncidentUpdateSummary

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Status** | **string** |  | 
**Body** | **string** | Human-readable update text. | 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewIncidentUpdateSummary

`func NewIncidentUpdateSummary(status string, body string, createdAt time.Time, ) *IncidentUpdateSummary`

NewIncidentUpdateSummary instantiates a new IncidentUpdateSummary object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewIncidentUpdateSummaryWithDefaults

`func NewIncidentUpdateSummaryWithDefaults() *IncidentUpdateSummary`

NewIncidentUpdateSummaryWithDefaults instantiates a new IncidentUpdateSummary object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetStatus

`func (o *IncidentUpdateSummary) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *IncidentUpdateSummary) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *IncidentUpdateSummary) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetBody

`func (o *IncidentUpdateSummary) GetBody() string`

GetBody returns the Body field if non-nil, zero value otherwise.

### GetBodyOk

`func (o *IncidentUpdateSummary) GetBodyOk() (*string, bool)`

GetBodyOk returns a tuple with the Body field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBody

`func (o *IncidentUpdateSummary) SetBody(v string)`

SetBody sets Body field to given value.


### GetCreatedAt

`func (o *IncidentUpdateSummary) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *IncidentUpdateSummary) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *IncidentUpdateSummary) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


