# \DiscordAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateDiscordEndpoint**](DiscordAPI.md#CreateDiscordEndpoint) | **Post** /v1/discord-endpoints | Create a Discord webhook endpoint
[**DeleteDiscordEndpoint**](DiscordAPI.md#DeleteDiscordEndpoint) | **Delete** /v1/discord-endpoints/{id} | Delete a Discord endpoint
[**GetDiscordEndpoint**](DiscordAPI.md#GetDiscordEndpoint) | **Get** /v1/discord-endpoints/{id} | Get a Discord endpoint by id
[**ListDiscordEndpoints**](DiscordAPI.md#ListDiscordEndpoints) | **Get** /v1/discord-endpoints | List Discord webhook endpoints
[**SendDiscordTestMessage**](DiscordAPI.md#SendDiscordTestMessage) | **Post** /v1/discord-endpoints/{id}/send-test | Send a test message to a Discord endpoint
[**UpdateDiscordEndpoint**](DiscordAPI.md#UpdateDiscordEndpoint) | **Put** /v1/discord-endpoints/{id} | Update a Discord endpoint



## CreateDiscordEndpoint

> DiscordEndpointResponse CreateDiscordEndpoint(ctx).CreateDiscordEndpointRequest(createDiscordEndpointRequest).Execute()

Create a Discord webhook endpoint

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
	createDiscordEndpointRequest := *openapiclient.NewCreateDiscordEndpointRequest("Label_example", "WebhookUrl_example") // CreateDiscordEndpointRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DiscordAPI.CreateDiscordEndpoint(context.Background()).CreateDiscordEndpointRequest(createDiscordEndpointRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DiscordAPI.CreateDiscordEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateDiscordEndpoint`: DiscordEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `DiscordAPI.CreateDiscordEndpoint`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateDiscordEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createDiscordEndpointRequest** | [**CreateDiscordEndpointRequest**](CreateDiscordEndpointRequest.md) |  | 

### Return type

[**DiscordEndpointResponse**](DiscordEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteDiscordEndpoint

> DeleteDiscordEndpoint(ctx, id).Execute()

Delete a Discord endpoint

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
	r, err := apiClient.DiscordAPI.DeleteDiscordEndpoint(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DiscordAPI.DeleteDiscordEndpoint``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteDiscordEndpointRequest struct via the builder pattern


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


## GetDiscordEndpoint

> DiscordEndpointResponse GetDiscordEndpoint(ctx, id).Execute()

Get a Discord endpoint by id

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
	resp, r, err := apiClient.DiscordAPI.GetDiscordEndpoint(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DiscordAPI.GetDiscordEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetDiscordEndpoint`: DiscordEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `DiscordAPI.GetDiscordEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetDiscordEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**DiscordEndpointResponse**](DiscordEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListDiscordEndpoints

> DiscordEndpointListResponse ListDiscordEndpoints(ctx).Execute()

List Discord webhook endpoints

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
	resp, r, err := apiClient.DiscordAPI.ListDiscordEndpoints(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DiscordAPI.ListDiscordEndpoints``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListDiscordEndpoints`: DiscordEndpointListResponse
	fmt.Fprintf(os.Stdout, "Response from `DiscordAPI.ListDiscordEndpoints`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListDiscordEndpointsRequest struct via the builder pattern


### Return type

[**DiscordEndpointListResponse**](DiscordEndpointListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendDiscordTestMessage

> SendTestResponse SendDiscordTestMessage(ctx, id).Execute()

Send a test message to a Discord endpoint

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
	resp, r, err := apiClient.DiscordAPI.SendDiscordTestMessage(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DiscordAPI.SendDiscordTestMessage``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SendDiscordTestMessage`: SendTestResponse
	fmt.Fprintf(os.Stdout, "Response from `DiscordAPI.SendDiscordTestMessage`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiSendDiscordTestMessageRequest struct via the builder pattern


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


## UpdateDiscordEndpoint

> DiscordEndpointResponse UpdateDiscordEndpoint(ctx, id).UpdateDiscordEndpointRequest(updateDiscordEndpointRequest).Execute()

Update a Discord endpoint

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
	updateDiscordEndpointRequest := *openapiclient.NewUpdateDiscordEndpointRequest() // UpdateDiscordEndpointRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DiscordAPI.UpdateDiscordEndpoint(context.Background(), id).UpdateDiscordEndpointRequest(updateDiscordEndpointRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DiscordAPI.UpdateDiscordEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateDiscordEndpoint`: DiscordEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `DiscordAPI.UpdateDiscordEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateDiscordEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateDiscordEndpointRequest** | [**UpdateDiscordEndpointRequest**](UpdateDiscordEndpointRequest.md) |  | 

### Return type

[**DiscordEndpointResponse**](DiscordEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

