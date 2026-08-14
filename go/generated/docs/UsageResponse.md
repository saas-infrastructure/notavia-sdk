# UsageResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Plan** | **string** | Resolved plan key (e.g. &#x60;free&#x60;, &#x60;oem&#x60;). | 
**PeriodStart** | **time.Time** | Inclusive UTC start of the current billing period (first of the month). | 
**PeriodEnd** | **time.Time** | Exclusive UTC end of the current billing period (first of the next month). | 
**IncludedSends** | Pointer to **int64** | Monthly included send allowance, or null for unmetered plans. | [optional] 
**UsedSends** | **int64** | Live (non-test) sends consumed in the current period. | 
**RemainingSends** | Pointer to **int64** | Sends remaining before the cap, or null when there is no cap. | [optional] 
**HardLimit** | **bool** | When true, sends are rejected once the included allowance is exhausted. | 
**ByChannel** | **map[string]int64** | Live sends consumed in the current period, keyed by lowercase channel name. | 

## Methods

### NewUsageResponse

`func NewUsageResponse(plan string, periodStart time.Time, periodEnd time.Time, usedSends int64, hardLimit bool, byChannel map[string]int64, ) *UsageResponse`

NewUsageResponse instantiates a new UsageResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUsageResponseWithDefaults

`func NewUsageResponseWithDefaults() *UsageResponse`

NewUsageResponseWithDefaults instantiates a new UsageResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPlan

`func (o *UsageResponse) GetPlan() string`

GetPlan returns the Plan field if non-nil, zero value otherwise.

### GetPlanOk

`func (o *UsageResponse) GetPlanOk() (*string, bool)`

GetPlanOk returns a tuple with the Plan field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPlan

`func (o *UsageResponse) SetPlan(v string)`

SetPlan sets Plan field to given value.


### GetPeriodStart

`func (o *UsageResponse) GetPeriodStart() time.Time`

GetPeriodStart returns the PeriodStart field if non-nil, zero value otherwise.

### GetPeriodStartOk

`func (o *UsageResponse) GetPeriodStartOk() (*time.Time, bool)`

GetPeriodStartOk returns a tuple with the PeriodStart field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPeriodStart

`func (o *UsageResponse) SetPeriodStart(v time.Time)`

SetPeriodStart sets PeriodStart field to given value.


### GetPeriodEnd

`func (o *UsageResponse) GetPeriodEnd() time.Time`

GetPeriodEnd returns the PeriodEnd field if non-nil, zero value otherwise.

### GetPeriodEndOk

`func (o *UsageResponse) GetPeriodEndOk() (*time.Time, bool)`

GetPeriodEndOk returns a tuple with the PeriodEnd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPeriodEnd

`func (o *UsageResponse) SetPeriodEnd(v time.Time)`

SetPeriodEnd sets PeriodEnd field to given value.


### GetIncludedSends

`func (o *UsageResponse) GetIncludedSends() int64`

GetIncludedSends returns the IncludedSends field if non-nil, zero value otherwise.

### GetIncludedSendsOk

`func (o *UsageResponse) GetIncludedSendsOk() (*int64, bool)`

GetIncludedSendsOk returns a tuple with the IncludedSends field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIncludedSends

`func (o *UsageResponse) SetIncludedSends(v int64)`

SetIncludedSends sets IncludedSends field to given value.

### HasIncludedSends

`func (o *UsageResponse) HasIncludedSends() bool`

HasIncludedSends returns a boolean if a field has been set.

### GetUsedSends

`func (o *UsageResponse) GetUsedSends() int64`

GetUsedSends returns the UsedSends field if non-nil, zero value otherwise.

### GetUsedSendsOk

`func (o *UsageResponse) GetUsedSendsOk() (*int64, bool)`

GetUsedSendsOk returns a tuple with the UsedSends field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsedSends

`func (o *UsageResponse) SetUsedSends(v int64)`

SetUsedSends sets UsedSends field to given value.


### GetRemainingSends

`func (o *UsageResponse) GetRemainingSends() int64`

GetRemainingSends returns the RemainingSends field if non-nil, zero value otherwise.

### GetRemainingSendsOk

`func (o *UsageResponse) GetRemainingSendsOk() (*int64, bool)`

GetRemainingSendsOk returns a tuple with the RemainingSends field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRemainingSends

`func (o *UsageResponse) SetRemainingSends(v int64)`

SetRemainingSends sets RemainingSends field to given value.

### HasRemainingSends

`func (o *UsageResponse) HasRemainingSends() bool`

HasRemainingSends returns a boolean if a field has been set.

### GetHardLimit

`func (o *UsageResponse) GetHardLimit() bool`

GetHardLimit returns the HardLimit field if non-nil, zero value otherwise.

### GetHardLimitOk

`func (o *UsageResponse) GetHardLimitOk() (*bool, bool)`

GetHardLimitOk returns a tuple with the HardLimit field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHardLimit

`func (o *UsageResponse) SetHardLimit(v bool)`

SetHardLimit sets HardLimit field to given value.


### GetByChannel

`func (o *UsageResponse) GetByChannel() map[string]int64`

GetByChannel returns the ByChannel field if non-nil, zero value otherwise.

### GetByChannelOk

`func (o *UsageResponse) GetByChannelOk() (*map[string]int64, bool)`

GetByChannelOk returns a tuple with the ByChannel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetByChannel

`func (o *UsageResponse) SetByChannel(v map[string]int64)`

SetByChannel sets ByChannel field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


