# IncidentSummary

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**Title** | **string** |  | 
**Impact** | **string** |  | 
**CurrentStatus** | **string** |  | 
**StartedAt** | **time.Time** |  | 
**ResolvedAt** | Pointer to **time.Time** |  | [optional] 
**Updates** | [**[]IncidentUpdateSummary**](IncidentUpdateSummary.md) | Timestamped admin-authored updates in reverse-chronological order. | 

## Methods

### NewIncidentSummary

`func NewIncidentSummary(id string, title string, impact string, currentStatus string, startedAt time.Time, updates []IncidentUpdateSummary, ) *IncidentSummary`

NewIncidentSummary instantiates a new IncidentSummary object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewIncidentSummaryWithDefaults

`func NewIncidentSummaryWithDefaults() *IncidentSummary`

NewIncidentSummaryWithDefaults instantiates a new IncidentSummary object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *IncidentSummary) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *IncidentSummary) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *IncidentSummary) SetId(v string)`

SetId sets Id field to given value.


### GetTitle

`func (o *IncidentSummary) GetTitle() string`

GetTitle returns the Title field if non-nil, zero value otherwise.

### GetTitleOk

`func (o *IncidentSummary) GetTitleOk() (*string, bool)`

GetTitleOk returns a tuple with the Title field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTitle

`func (o *IncidentSummary) SetTitle(v string)`

SetTitle sets Title field to given value.


### GetImpact

`func (o *IncidentSummary) GetImpact() string`

GetImpact returns the Impact field if non-nil, zero value otherwise.

### GetImpactOk

`func (o *IncidentSummary) GetImpactOk() (*string, bool)`

GetImpactOk returns a tuple with the Impact field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImpact

`func (o *IncidentSummary) SetImpact(v string)`

SetImpact sets Impact field to given value.


### GetCurrentStatus

`func (o *IncidentSummary) GetCurrentStatus() string`

GetCurrentStatus returns the CurrentStatus field if non-nil, zero value otherwise.

### GetCurrentStatusOk

`func (o *IncidentSummary) GetCurrentStatusOk() (*string, bool)`

GetCurrentStatusOk returns a tuple with the CurrentStatus field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCurrentStatus

`func (o *IncidentSummary) SetCurrentStatus(v string)`

SetCurrentStatus sets CurrentStatus field to given value.


### GetStartedAt

`func (o *IncidentSummary) GetStartedAt() time.Time`

GetStartedAt returns the StartedAt field if non-nil, zero value otherwise.

### GetStartedAtOk

`func (o *IncidentSummary) GetStartedAtOk() (*time.Time, bool)`

GetStartedAtOk returns a tuple with the StartedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStartedAt

`func (o *IncidentSummary) SetStartedAt(v time.Time)`

SetStartedAt sets StartedAt field to given value.


### GetResolvedAt

`func (o *IncidentSummary) GetResolvedAt() time.Time`

GetResolvedAt returns the ResolvedAt field if non-nil, zero value otherwise.

### GetResolvedAtOk

`func (o *IncidentSummary) GetResolvedAtOk() (*time.Time, bool)`

GetResolvedAtOk returns a tuple with the ResolvedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResolvedAt

`func (o *IncidentSummary) SetResolvedAt(v time.Time)`

SetResolvedAt sets ResolvedAt field to given value.

### HasResolvedAt

`func (o *IncidentSummary) HasResolvedAt() bool`

HasResolvedAt returns a boolean if a field has been set.

### GetUpdates

`func (o *IncidentSummary) GetUpdates() []IncidentUpdateSummary`

GetUpdates returns the Updates field if non-nil, zero value otherwise.

### GetUpdatesOk

`func (o *IncidentSummary) GetUpdatesOk() (*[]IncidentUpdateSummary, bool)`

GetUpdatesOk returns a tuple with the Updates field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdates

`func (o *IncidentSummary) SetUpdates(v []IncidentUpdateSummary)`

SetUpdates sets Updates field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


