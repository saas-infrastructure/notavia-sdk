# \WorkflowsAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ActivateWorkflowVersion**](WorkflowsAPI.md#ActivateWorkflowVersion) | **Post** /v1/workflows/{key}/versions/{n}/activate | Activate a draft version (or dry-run validate it)
[**CancelWorkflowRun**](WorkflowsAPI.md#CancelWorkflowRun) | **Post** /v1/workflows/runs/{runId}/cancel | Cancel an in-progress run
[**CreateWorkflow**](WorkflowsAPI.md#CreateWorkflow) | **Post** /v1/workflows | Create a new workflow
[**CreateWorkflowVersion**](WorkflowsAPI.md#CreateWorkflowVersion) | **Post** /v1/workflows/{key}/versions | Create a new draft version
[**DisableWorkflow**](WorkflowsAPI.md#DisableWorkflow) | **Delete** /v1/workflows/{key} | Disable a workflow
[**GetWorkflow**](WorkflowsAPI.md#GetWorkflow) | **Get** /v1/workflows/{key} | Get a workflow by key
[**GetWorkflowRun**](WorkflowsAPI.md#GetWorkflowRun) | **Get** /v1/workflows/runs/{runId} | Get a run with the full step timeline
[**GetWorkflowVersion**](WorkflowsAPI.md#GetWorkflowVersion) | **Get** /v1/workflows/{key}/versions/{n} | Get a specific workflow version
[**ListWorkflowRuns**](WorkflowsAPI.md#ListWorkflowRuns) | **Get** /v1/workflows/{key}/runs | List runs for a workflow with cursor pagination
[**ListWorkflowVersions**](WorkflowsAPI.md#ListWorkflowVersions) | **Get** /v1/workflows/{key}/versions | List all versions of a workflow
[**ListWorkflows**](WorkflowsAPI.md#ListWorkflows) | **Get** /v1/workflows | List all workflows in the environment
[**PostRunEvent**](WorkflowsAPI.md#PostRunEvent) | **Post** /v1/workflows/runs/{runId}/events | Post an event to a specific run
[**PostWorkflowKeyEvent**](WorkflowsAPI.md#PostWorkflowKeyEvent) | **Post** /v1/workflows/{key}/events | Post an event to all waiting runs of a workflow
[**PromoteWorkflow**](WorkflowsAPI.md#PromoteWorkflow) | **Post** /v1/workflows/{key}/promote | Promote a workflow&#39;s active version from Test to Live
[**TriggerWorkflow**](WorkflowsAPI.md#TriggerWorkflow) | **Post** /v1/workflows/{key}/trigger | Trigger a workflow run



## ActivateWorkflowVersion

> ActivateWorkflowVersionResponse ActivateWorkflowVersion(ctx, key, n).DryRun(dryRun).Execute()

Activate a draft version (or dry-run validate it)



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	n := int32(56) // int32 | 
	dryRun := true // bool | If true, validate without changing persistent state. (optional) (default to false)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.ActivateWorkflowVersion(context.Background(), key, n).DryRun(dryRun).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.ActivateWorkflowVersion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ActivateWorkflowVersion`: ActivateWorkflowVersionResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.ActivateWorkflowVersion`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
**n** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiActivateWorkflowVersionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **dryRun** | **bool** | If true, validate without changing persistent state. | [default to false]

### Return type

[**ActivateWorkflowVersionResponse**](ActivateWorkflowVersionResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CancelWorkflowRun

> CancelWorkflowRun200Response CancelWorkflowRun(ctx, runId).Execute()

Cancel an in-progress run



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	runId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.CancelWorkflowRun(context.Background(), runId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.CancelWorkflowRun``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CancelWorkflowRun`: CancelWorkflowRun200Response
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.CancelWorkflowRun`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**runId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiCancelWorkflowRunRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**CancelWorkflowRun200Response**](CancelWorkflowRun200Response.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateWorkflow

> Workflow CreateWorkflow(ctx).CreateWorkflowRequest(createWorkflowRequest).Execute()

Create a new workflow

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	createWorkflowRequest := *openapiclient.NewCreateWorkflowRequest("Key_example", "Name_example") // CreateWorkflowRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.CreateWorkflow(context.Background()).CreateWorkflowRequest(createWorkflowRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.CreateWorkflow``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWorkflow`: Workflow
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.CreateWorkflow`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateWorkflowRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createWorkflowRequest** | [**CreateWorkflowRequest**](CreateWorkflowRequest.md) |  | 

### Return type

[**Workflow**](Workflow.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateWorkflowVersion

> WorkflowVersion CreateWorkflowVersion(ctx, key).CreateWorkflowVersionRequest(createWorkflowVersionRequest).Execute()

Create a new draft version



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	createWorkflowVersionRequest := *openapiclient.NewCreateWorkflowVersionRequest("BodyJson_example") // CreateWorkflowVersionRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.CreateWorkflowVersion(context.Background(), key).CreateWorkflowVersionRequest(createWorkflowVersionRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.CreateWorkflowVersion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWorkflowVersion`: WorkflowVersion
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.CreateWorkflowVersion`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiCreateWorkflowVersionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **createWorkflowVersionRequest** | [**CreateWorkflowVersionRequest**](CreateWorkflowVersionRequest.md) |  | 

### Return type

[**WorkflowVersion**](WorkflowVersion.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DisableWorkflow

> DisableWorkflow(ctx, key).Execute()

Disable a workflow



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.WorkflowsAPI.DisableWorkflow(context.Background(), key).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.DisableWorkflow``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiDisableWorkflowRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWorkflow

> WorkflowDetailResponse GetWorkflow(ctx, key).Execute()

Get a workflow by key

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.GetWorkflow(context.Background(), key).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.GetWorkflow``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWorkflow`: WorkflowDetailResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.GetWorkflow`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWorkflowRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**WorkflowDetailResponse**](WorkflowDetailResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWorkflowRun

> WorkflowRunResponse GetWorkflowRun(ctx, runId).Execute()

Get a run with the full step timeline

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	runId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.GetWorkflowRun(context.Background(), runId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.GetWorkflowRun``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWorkflowRun`: WorkflowRunResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.GetWorkflowRun`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**runId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWorkflowRunRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**WorkflowRunResponse**](WorkflowRunResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWorkflowVersion

> WorkflowVersionDetail GetWorkflowVersion(ctx, key, n).Execute()

Get a specific workflow version

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	n := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.GetWorkflowVersion(context.Background(), key, n).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.GetWorkflowVersion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWorkflowVersion`: WorkflowVersionDetail
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.GetWorkflowVersion`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
**n** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWorkflowVersionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



### Return type

[**WorkflowVersionDetail**](WorkflowVersionDetail.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListWorkflowRuns

> ListWorkflowRunsResponse ListWorkflowRuns(ctx, key).Status(status).ExternalUserId(externalUserId).PageToken(pageToken).Execute()

List runs for a workflow with cursor pagination

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	status := "status_example" // string |  (optional)
	externalUserId := "externalUserId_example" // string | Filter runs whose trigger data contains this `external_user_id`. (optional)
	pageToken := "pageToken_example" // string | Opaque cursor returned by a previous list response. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.ListWorkflowRuns(context.Background(), key).Status(status).ExternalUserId(externalUserId).PageToken(pageToken).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.ListWorkflowRuns``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListWorkflowRuns`: ListWorkflowRunsResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.ListWorkflowRuns`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiListWorkflowRunsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **status** | **string** |  | 
 **externalUserId** | **string** | Filter runs whose trigger data contains this &#x60;external_user_id&#x60;. | 
 **pageToken** | **string** | Opaque cursor returned by a previous list response. | 

### Return type

[**ListWorkflowRunsResponse**](ListWorkflowRunsResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListWorkflowVersions

> ListWorkflowVersions200Response ListWorkflowVersions(ctx, key).Execute()

List all versions of a workflow

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.ListWorkflowVersions(context.Background(), key).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.ListWorkflowVersions``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListWorkflowVersions`: ListWorkflowVersions200Response
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.ListWorkflowVersions`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiListWorkflowVersionsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**ListWorkflowVersions200Response**](ListWorkflowVersions200Response.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListWorkflows

> ListWorkflows200Response ListWorkflows(ctx).Execute()

List all workflows in the environment

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.ListWorkflows(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.ListWorkflows``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListWorkflows`: ListWorkflows200Response
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.ListWorkflows`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListWorkflowsRequest struct via the builder pattern


### Return type

[**ListWorkflows200Response**](ListWorkflows200Response.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PostRunEvent

> PostWorkflowEventResponse PostRunEvent(ctx, runId).PostWorkflowEventRequest(postWorkflowEventRequest).Execute()

Post an event to a specific run



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	runId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 
	postWorkflowEventRequest := *openapiclient.NewPostWorkflowEventRequest("EventName_example", map[string]interface{}{"key": interface{}(123)}) // PostWorkflowEventRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.PostRunEvent(context.Background(), runId).PostWorkflowEventRequest(postWorkflowEventRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.PostRunEvent``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `PostRunEvent`: PostWorkflowEventResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.PostRunEvent`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**runId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiPostRunEventRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **postWorkflowEventRequest** | [**PostWorkflowEventRequest**](PostWorkflowEventRequest.md) |  | 

### Return type

[**PostWorkflowEventResponse**](PostWorkflowEventResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PostWorkflowKeyEvent

> PostWorkflowEventResponse PostWorkflowKeyEvent(ctx, key).PostWorkflowEventRequest(postWorkflowEventRequest).Execute()

Post an event to all waiting runs of a workflow



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	postWorkflowEventRequest := *openapiclient.NewPostWorkflowEventRequest("EventName_example", map[string]interface{}{"key": interface{}(123)}) // PostWorkflowEventRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.PostWorkflowKeyEvent(context.Background(), key).PostWorkflowEventRequest(postWorkflowEventRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.PostWorkflowKeyEvent``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `PostWorkflowKeyEvent`: PostWorkflowEventResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.PostWorkflowKeyEvent`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiPostWorkflowKeyEventRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **postWorkflowEventRequest** | [**PostWorkflowEventRequest**](PostWorkflowEventRequest.md) |  | 

### Return type

[**PostWorkflowEventResponse**](PostWorkflowEventResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PromoteWorkflow

> PromotionResult PromoteWorkflow(ctx, key).PromoteWorkflowRequest(promoteWorkflowRequest).Execute()

Promote a workflow's active version from Test to Live



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	promoteWorkflowRequest := *openapiclient.NewPromoteWorkflowRequest() // PromoteWorkflowRequest |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.PromoteWorkflow(context.Background(), key).PromoteWorkflowRequest(promoteWorkflowRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.PromoteWorkflow``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `PromoteWorkflow`: PromotionResult
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.PromoteWorkflow`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiPromoteWorkflowRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **promoteWorkflowRequest** | [**PromoteWorkflowRequest**](PromoteWorkflowRequest.md) |  | 

### Return type

[**PromotionResult**](PromotionResult.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## TriggerWorkflow

> WorkflowTriggerResponse TriggerWorkflow(ctx, key).WorkflowTriggerRequest(workflowTriggerRequest).IdempotencyKey(idempotencyKey).Execute()

Trigger a workflow run



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	key := "key_example" // string | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
	workflowTriggerRequest := *openapiclient.NewWorkflowTriggerRequest(map[string]interface{}{"key": interface{}(123)}) // WorkflowTriggerRequest | 
	idempotencyKey := "idempotencyKey_example" // string | Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WorkflowsAPI.TriggerWorkflow(context.Background(), key).WorkflowTriggerRequest(workflowTriggerRequest).IdempotencyKey(idempotencyKey).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WorkflowsAPI.TriggerWorkflow``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `TriggerWorkflow`: WorkflowTriggerResponse
	fmt.Fprintf(os.Stdout, "Response from `WorkflowsAPI.TriggerWorkflow`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** | Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Other Parameters

Other parameters are passed through a pointer to a apiTriggerWorkflowRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **workflowTriggerRequest** | [**WorkflowTriggerRequest**](WorkflowTriggerRequest.md) |  | 
 **idempotencyKey** | **string** | Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  | 

### Return type

[**WorkflowTriggerResponse**](WorkflowTriggerResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

