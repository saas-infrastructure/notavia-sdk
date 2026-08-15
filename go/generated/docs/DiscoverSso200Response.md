# DiscoverSso200Response

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**HasSso** | **bool** |  | 
**Protocol** | Pointer to **string** |  | [optional] 
**OrgName** | Pointer to **string** |  | [optional] 
**ForceSso** | **bool** |  | 

## Methods

### NewDiscoverSso200Response

`func NewDiscoverSso200Response(hasSso bool, forceSso bool, ) *DiscoverSso200Response`

NewDiscoverSso200Response instantiates a new DiscoverSso200Response object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDiscoverSso200ResponseWithDefaults

`func NewDiscoverSso200ResponseWithDefaults() *DiscoverSso200Response`

NewDiscoverSso200ResponseWithDefaults instantiates a new DiscoverSso200Response object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetHasSso

`func (o *DiscoverSso200Response) GetHasSso() bool`

GetHasSso returns the HasSso field if non-nil, zero value otherwise.

### GetHasSsoOk

`func (o *DiscoverSso200Response) GetHasSsoOk() (*bool, bool)`

GetHasSsoOk returns a tuple with the HasSso field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHasSso

`func (o *DiscoverSso200Response) SetHasSso(v bool)`

SetHasSso sets HasSso field to given value.


### GetProtocol

`func (o *DiscoverSso200Response) GetProtocol() string`

GetProtocol returns the Protocol field if non-nil, zero value otherwise.

### GetProtocolOk

`func (o *DiscoverSso200Response) GetProtocolOk() (*string, bool)`

GetProtocolOk returns a tuple with the Protocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocol

`func (o *DiscoverSso200Response) SetProtocol(v string)`

SetProtocol sets Protocol field to given value.

### HasProtocol

`func (o *DiscoverSso200Response) HasProtocol() bool`

HasProtocol returns a boolean if a field has been set.

### GetOrgName

`func (o *DiscoverSso200Response) GetOrgName() string`

GetOrgName returns the OrgName field if non-nil, zero value otherwise.

### GetOrgNameOk

`func (o *DiscoverSso200Response) GetOrgNameOk() (*string, bool)`

GetOrgNameOk returns a tuple with the OrgName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOrgName

`func (o *DiscoverSso200Response) SetOrgName(v string)`

SetOrgName sets OrgName field to given value.

### HasOrgName

`func (o *DiscoverSso200Response) HasOrgName() bool`

HasOrgName returns a boolean if a field has been set.

### GetForceSso

`func (o *DiscoverSso200Response) GetForceSso() bool`

GetForceSso returns the ForceSso field if non-nil, zero value otherwise.

### GetForceSsoOk

`func (o *DiscoverSso200Response) GetForceSsoOk() (*bool, bool)`

GetForceSsoOk returns a tuple with the ForceSso field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetForceSso

`func (o *DiscoverSso200Response) SetForceSso(v bool)`

SetForceSso sets ForceSso field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


