# PromoteWorkflowRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DryRun** | Pointer to **bool** | If true, return the diff and cascade candidates without writing to Live. | [optional] [default to false]
**IncludeTemplates** | Pointer to **[]string** | Keys of referenced templates to promote into Live in the same transaction, before the workflow version is validated and activated.  | [optional] 

## Methods

### NewPromoteWorkflowRequest

`func NewPromoteWorkflowRequest() *PromoteWorkflowRequest`

NewPromoteWorkflowRequest instantiates a new PromoteWorkflowRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPromoteWorkflowRequestWithDefaults

`func NewPromoteWorkflowRequestWithDefaults() *PromoteWorkflowRequest`

NewPromoteWorkflowRequestWithDefaults instantiates a new PromoteWorkflowRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDryRun

`func (o *PromoteWorkflowRequest) GetDryRun() bool`

GetDryRun returns the DryRun field if non-nil, zero value otherwise.

### GetDryRunOk

`func (o *PromoteWorkflowRequest) GetDryRunOk() (*bool, bool)`

GetDryRunOk returns a tuple with the DryRun field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDryRun

`func (o *PromoteWorkflowRequest) SetDryRun(v bool)`

SetDryRun sets DryRun field to given value.

### HasDryRun

`func (o *PromoteWorkflowRequest) HasDryRun() bool`

HasDryRun returns a boolean if a field has been set.

### GetIncludeTemplates

`func (o *PromoteWorkflowRequest) GetIncludeTemplates() []string`

GetIncludeTemplates returns the IncludeTemplates field if non-nil, zero value otherwise.

### GetIncludeTemplatesOk

`func (o *PromoteWorkflowRequest) GetIncludeTemplatesOk() (*[]string, bool)`

GetIncludeTemplatesOk returns a tuple with the IncludeTemplates field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIncludeTemplates

`func (o *PromoteWorkflowRequest) SetIncludeTemplates(v []string)`

SetIncludeTemplates sets IncludeTemplates field to given value.

### HasIncludeTemplates

`func (o *PromoteWorkflowRequest) HasIncludeTemplates() bool`

HasIncludeTemplates returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


