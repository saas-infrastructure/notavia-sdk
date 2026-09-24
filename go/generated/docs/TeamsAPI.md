# \TeamsAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTeamsEndpoint**](TeamsAPI.md#CreateTeamsEndpoint) | **Post** /v1/teams-endpoints | Create a Microsoft Teams webhook endpoint
[**DeleteTeamsEndpoint**](TeamsAPI.md#DeleteTeamsEndpoint) | **Delete** /v1/teams-endpoints/{id} | Delete a Teams endpoint
[**GetTeamsEndpoint**](TeamsAPI.md#GetTeamsEndpoint) | **Get** /v1/teams-endpoints/{id} | Get a Teams endpoint by id
[**ListTeamsEndpoints**](TeamsAPI.md#ListTeamsEndpoints) | **Get** /v1/teams-endpoints | List Microsoft Teams webhook endpoints
[**SendTeamsTestMessage**](TeamsAPI.md#SendTeamsTestMessage) | **Post** /v1/teams-endpoints/{id}/send-test | Send a test Adaptive Card to a Teams endpoint
[**UpdateTeamsEndpoint**](TeamsAPI.md#UpdateTeamsEndpoint) | **Put** /v1/teams-endpoints/{id} | Update a Teams endpoint



## CreateTeamsEndpoint

> TeamsEndpointResponse CreateTeamsEndpoint(ctx).CreateTeamsEndpointRequest(createTeamsEndpointRequest).Execute()

Create a Microsoft Teams webhook endpoint

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
	createTeamsEndpointRequest := *openapiclient.NewCreateTeamsEndpointRequest("Label_example", "WebhookUrl_example") // CreateTeamsEndpointRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TeamsAPI.CreateTeamsEndpoint(context.Background()).CreateTeamsEndpointRequest(createTeamsEndpointRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TeamsAPI.CreateTeamsEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateTeamsEndpoint`: TeamsEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `TeamsAPI.CreateTeamsEndpoint`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateTeamsEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createTeamsEndpointRequest** | [**CreateTeamsEndpointRequest**](CreateTeamsEndpointRequest.md) |  | 

### Return type

[**TeamsEndpointResponse**](TeamsEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteTeamsEndpoint

> DeleteTeamsEndpoint(ctx, id).Execute()

Delete a Teams endpoint

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
	id := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TeamsAPI.DeleteTeamsEndpoint(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TeamsAPI.DeleteTeamsEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTeamsEndpointRequest struct via the builder pattern


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


## GetTeamsEndpoint

> TeamsEndpointResponse GetTeamsEndpoint(ctx, id).Execute()

Get a Teams endpoint by id

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
	id := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TeamsAPI.GetTeamsEndpoint(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TeamsAPI.GetTeamsEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTeamsEndpoint`: TeamsEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `TeamsAPI.GetTeamsEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTeamsEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**TeamsEndpointResponse**](TeamsEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListTeamsEndpoints

> TeamsEndpointListResponse ListTeamsEndpoints(ctx).Execute()

List Microsoft Teams webhook endpoints

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
	resp, r, err := apiClient.TeamsAPI.ListTeamsEndpoints(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TeamsAPI.ListTeamsEndpoints``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListTeamsEndpoints`: TeamsEndpointListResponse
	fmt.Fprintf(os.Stdout, "Response from `TeamsAPI.ListTeamsEndpoints`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListTeamsEndpointsRequest struct via the builder pattern


### Return type

[**TeamsEndpointListResponse**](TeamsEndpointListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendTeamsTestMessage

> SendTestResponse SendTeamsTestMessage(ctx, id).Execute()

Send a test Adaptive Card to a Teams endpoint

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
	id := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TeamsAPI.SendTeamsTestMessage(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TeamsAPI.SendTeamsTestMessage``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SendTeamsTestMessage`: SendTestResponse
	fmt.Fprintf(os.Stdout, "Response from `TeamsAPI.SendTeamsTestMessage`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiSendTeamsTestMessageRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SendTestResponse**](SendTestResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateTeamsEndpoint

> TeamsEndpointResponse UpdateTeamsEndpoint(ctx, id).UpdateTeamsEndpointRequest(updateTeamsEndpointRequest).Execute()

Update a Teams endpoint

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
	id := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 
	updateTeamsEndpointRequest := *openapiclient.NewUpdateTeamsEndpointRequest() // UpdateTeamsEndpointRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TeamsAPI.UpdateTeamsEndpoint(context.Background(), id).UpdateTeamsEndpointRequest(updateTeamsEndpointRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TeamsAPI.UpdateTeamsEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateTeamsEndpoint`: TeamsEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `TeamsAPI.UpdateTeamsEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateTeamsEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateTeamsEndpointRequest** | [**UpdateTeamsEndpointRequest**](UpdateTeamsEndpointRequest.md) |  | 

### Return type

[**TeamsEndpointResponse**](TeamsEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

