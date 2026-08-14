# ServiceStatusResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Status** | **string** | Overall service status — worst-case across all components. | 
**CheckedAt** | **time.Time** | UTC timestamp of when the response was generated. | 
**Components** | [**[]StatusComponentSummary**](StatusComponentSummary.md) | Per-product component statuses. | 
**ActiveIncidents** | [**[]IncidentSummary**](IncidentSummary.md) | Currently open incidents (not yet resolved). | 
**RecentIncidents** | [**[]IncidentSummary**](IncidentSummary.md) | Incidents resolved within the last 14 days. | 

## Methods

### NewServiceStatusResponse

`func NewServiceStatusResponse(status string, checkedAt time.Time, components []StatusComponentSummary, activeIncidents []IncidentSummary, recentIncidents []IncidentSummary, ) *ServiceStatusResponse`

NewServiceStatusResponse instantiates a new ServiceStatusResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewServiceStatusResponseWithDefaults

`func NewServiceStatusResponseWithDefaults() *ServiceStatusResponse`

NewServiceStatusResponseWithDefaults instantiates a new ServiceStatusResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetStatus

`func (o *ServiceStatusResponse) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *ServiceStatusResponse) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *ServiceStatusResponse) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetCheckedAt

`func (o *ServiceStatusResponse) GetCheckedAt() time.Time`

GetCheckedAt returns the CheckedAt field if non-nil, zero value otherwise.

### GetCheckedAtOk

`func (o *ServiceStatusResponse) GetCheckedAtOk() (*time.Time, bool)`

GetCheckedAtOk returns a tuple with the CheckedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCheckedAt

`func (o *ServiceStatusResponse) SetCheckedAt(v time.Time)`

SetCheckedAt sets CheckedAt field to given value.


### GetComponents

`func (o *ServiceStatusResponse) GetComponents() []StatusComponentSummary`

GetComponents returns the Components field if non-nil, zero value otherwise.

### GetComponentsOk

`func (o *ServiceStatusResponse) GetComponentsOk() (*[]StatusComponentSummary, bool)`

GetComponentsOk returns a tuple with the Components field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetComponents

`func (o *ServiceStatusResponse) SetComponents(v []StatusComponentSummary)`

SetComponents sets Components field to given value.


### GetActiveIncidents

`func (o *ServiceStatusResponse) GetActiveIncidents() []IncidentSummary`

GetActiveIncidents returns the ActiveIncidents field if non-nil, zero value otherwise.

### GetActiveIncidentsOk

`func (o *ServiceStatusResponse) GetActiveIncidentsOk() (*[]IncidentSummary, bool)`

GetActiveIncidentsOk returns a tuple with the ActiveIncidents field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetActiveIncidents

`func (o *ServiceStatusResponse) SetActiveIncidents(v []IncidentSummary)`

SetActiveIncidents sets ActiveIncidents field to given value.


### GetRecentIncidents

`func (o *ServiceStatusResponse) GetRecentIncidents() []IncidentSummary`

GetRecentIncidents returns the RecentIncidents field if non-nil, zero value otherwise.

### GetRecentIncidentsOk

`func (o *ServiceStatusResponse) GetRecentIncidentsOk() (*[]IncidentSummary, bool)`

GetRecentIncidentsOk returns a tuple with the RecentIncidents field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecentIncidents

`func (o *ServiceStatusResponse) SetRecentIncidents(v []IncidentSummary)`

SetRecentIncidents sets RecentIncidents field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


