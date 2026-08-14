# CreateWorkflowVersionRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**BodyJson** | **string** | Full workflow definition JSON. Must conform to the workflow DSL schema (fetch from &#x60;GET /workflows/schema.json&#x60;). The server runs the structural parser at creation time; semantic validation (category existence, template bodies, expression syntax) runs only at activation.  | 

## Methods

### NewCreateWorkflowVersionRequest

`func NewCreateWorkflowVersionRequest(bodyJson string, ) *CreateWorkflowVersionRequest`

NewCreateWorkflowVersionRequest instantiates a new CreateWorkflowVersionRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateWorkflowVersionRequestWithDefaults

`func NewCreateWorkflowVersionRequestWithDefaults() *CreateWorkflowVersionRequest`

NewCreateWorkflowVersionRequestWithDefaults instantiates a new CreateWorkflowVersionRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetBodyJson

`func (o *CreateWorkflowVersionRequest) GetBodyJson() string`

GetBodyJson returns the BodyJson field if non-nil, zero value otherwise.

### GetBodyJsonOk

`func (o *CreateWorkflowVersionRequest) GetBodyJsonOk() (*string, bool)`

GetBodyJsonOk returns a tuple with the BodyJson field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBodyJson

`func (o *CreateWorkflowVersionRequest) SetBodyJson(v string)`

SetBodyJson sets BodyJson field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


