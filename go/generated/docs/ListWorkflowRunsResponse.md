# ListWorkflowRunsResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Items** | [**[]WorkflowRunSummary**](WorkflowRunSummary.md) |  | 
**NextPageToken** | Pointer to **string** | Opaque cursor. Pass as &#x60;page_token&#x60; query param to retrieve the next page. | [optional] 

## Methods

### NewListWorkflowRunsResponse

`func NewListWorkflowRunsResponse(items []WorkflowRunSummary, ) *ListWorkflowRunsResponse`

NewListWorkflowRunsResponse instantiates a new ListWorkflowRunsResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewListWorkflowRunsResponseWithDefaults

`func NewListWorkflowRunsResponseWithDefaults() *ListWorkflowRunsResponse`

NewListWorkflowRunsResponseWithDefaults instantiates a new ListWorkflowRunsResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetItems

`func (o *ListWorkflowRunsResponse) GetItems() []WorkflowRunSummary`

GetItems returns the Items field if non-nil, zero value otherwise.

### GetItemsOk

`func (o *ListWorkflowRunsResponse) GetItemsOk() (*[]WorkflowRunSummary, bool)`

GetItemsOk returns a tuple with the Items field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetItems

`func (o *ListWorkflowRunsResponse) SetItems(v []WorkflowRunSummary)`

SetItems sets Items field to given value.


### GetNextPageToken

`func (o *ListWorkflowRunsResponse) GetNextPageToken() string`

GetNextPageToken returns the NextPageToken field if non-nil, zero value otherwise.

### GetNextPageTokenOk

`func (o *ListWorkflowRunsResponse) GetNextPageTokenOk() (*string, bool)`

GetNextPageTokenOk returns a tuple with the NextPageToken field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextPageToken

`func (o *ListWorkflowRunsResponse) SetNextPageToken(v string)`

SetNextPageToken sets NextPageToken field to given value.

### HasNextPageToken

`func (o *ListWorkflowRunsResponse) HasNextPageToken() bool`

HasNextPageToken returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


