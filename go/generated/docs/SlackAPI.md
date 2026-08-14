# \SlackAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CompleteSlackOAuth**](SlackAPI.md#CompleteSlackOAuth) | **Get** /oauth/slack/callback | Slack OAuth 2.0 callback — completes the installation
[**DeleteSlackInstallation**](SlackAPI.md#DeleteSlackInstallation) | **Delete** /v1/slack/installations/{id} | Delete (revoke) a Slack installation
[**GetSlackInstallation**](SlackAPI.md#GetSlackInstallation) | **Get** /v1/slack/installations/{id} | Get a Slack installation by id
[**ListSlackInstallations**](SlackAPI.md#ListSlackInstallations) | **Get** /v1/slack/installations | List Slack workspace installations for this environment
[**SendSlackTestMessage**](SlackAPI.md#SendSlackTestMessage) | **Post** /v1/slack/installations/{id}/send-test | Send a test message via a Slack installation
[**StartSlackOAuth**](SlackAPI.md#StartSlackOAuth) | **Get** /oauth/slack/install | Start the Slack OAuth 2.0 installation flow
[**UpdateSlackInstallation**](SlackAPI.md#UpdateSlackInstallation) | **Put** /v1/slack/installations/{id} | Update settings on a Slack installation



## CompleteSlackOAuth

> CompleteSlackOAuth(ctx).Code(code).State(state).Execute()

Slack OAuth 2.0 callback — completes the installation



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
	code := "code_example" // string | 
	state := "state_example" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SlackAPI.CompleteSlackOAuth(context.Background()).Code(code).State(state).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.CompleteSlackOAuth``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCompleteSlackOAuthRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | **string** |  | 
 **state** | **string** |  | 

### Return type

 (empty response body)

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteSlackInstallation

> DeleteSlackInstallation(ctx, id).Execute()

Delete (revoke) a Slack installation

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
	r, err := apiClient.SlackAPI.DeleteSlackInstallation(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.DeleteSlackInstallation``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteSlackInstallationRequest struct via the builder pattern


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


## GetSlackInstallation

> SlackInstallationResponse GetSlackInstallation(ctx, id).Execute()

Get a Slack installation by id

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
	resp, r, err := apiClient.SlackAPI.GetSlackInstallation(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.GetSlackInstallation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetSlackInstallation`: SlackInstallationResponse
	fmt.Fprintf(os.Stdout, "Response from `SlackAPI.GetSlackInstallation`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetSlackInstallationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SlackInstallationResponse**](SlackInstallationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListSlackInstallations

> SlackInstallationListResponse ListSlackInstallations(ctx).Execute()

List Slack workspace installations for this environment

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
	resp, r, err := apiClient.SlackAPI.ListSlackInstallations(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.ListSlackInstallations``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListSlackInstallations`: SlackInstallationListResponse
	fmt.Fprintf(os.Stdout, "Response from `SlackAPI.ListSlackInstallations`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiListSlackInstallationsRequest struct via the builder pattern


### Return type

[**SlackInstallationListResponse**](SlackInstallationListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendSlackTestMessage

> SendTestResponse SendSlackTestMessage(ctx, id).SendSlackTestRequest(sendSlackTestRequest).Execute()

Send a test message via a Slack installation

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
	sendSlackTestRequest := *openapiclient.NewSendSlackTestRequest() // SendSlackTestRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SlackAPI.SendSlackTestMessage(context.Background(), id).SendSlackTestRequest(sendSlackTestRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.SendSlackTestMessage``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SendSlackTestMessage`: SendTestResponse
	fmt.Fprintf(os.Stdout, "Response from `SlackAPI.SendSlackTestMessage`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiSendSlackTestMessageRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **sendSlackTestRequest** | [**SendSlackTestRequest**](SendSlackTestRequest.md) |  | 

### Return type

[**SendTestResponse**](SendTestResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## StartSlackOAuth

> StartSlackOAuth(ctx).EnvId(envId).Execute()

Start the Slack OAuth 2.0 installation flow



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
	envId := "38400000-8cf0-11bd-b23e-10b96e4ef00d" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SlackAPI.StartSlackOAuth(context.Background()).EnvId(envId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.StartSlackOAuth``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiStartSlackOAuthRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **envId** | **string** |  | 

### Return type

 (empty response body)

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateSlackInstallation

> SlackInstallationResponse UpdateSlackInstallation(ctx, id).UpdateSlackInstallationRequest(updateSlackInstallationRequest).Execute()

Update settings on a Slack installation

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
	updateSlackInstallationRequest := *openapiclient.NewUpdateSlackInstallationRequest(false) // UpdateSlackInstallationRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SlackAPI.UpdateSlackInstallation(context.Background(), id).UpdateSlackInstallationRequest(updateSlackInstallationRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SlackAPI.UpdateSlackInstallation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateSlackInstallation`: SlackInstallationResponse
	fmt.Fprintf(os.Stdout, "Response from `SlackAPI.UpdateSlackInstallation`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateSlackInstallationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateSlackInstallationRequest** | [**UpdateSlackInstallationRequest**](UpdateSlackInstallationRequest.md) |  | 

### Return type

[**SlackInstallationResponse**](SlackInstallationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

