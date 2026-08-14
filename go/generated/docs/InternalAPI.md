# \InternalAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**DiscoverSso**](InternalAPI.md#DiscoverSso) | **Get** /sso/discover | Discover the SSO configuration for an email address&#39;s domain
[**GetServiceStatus**](InternalAPI.md#GetServiceStatus) | **Get** /status | Public service status
[**GetWorkflowSchema**](InternalAPI.md#GetWorkflowSchema) | **Get** /workflows/schema.json | Fetch the workflow DSL JSON Schema



## DiscoverSso

> DiscoverSso200Response DiscoverSso(ctx).Email(email).Execute()

Discover the SSO configuration for an email address's domain



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
	email := "email_example" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.InternalAPI.DiscoverSso(context.Background()).Email(email).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InternalAPI.DiscoverSso``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `DiscoverSso`: DiscoverSso200Response
	fmt.Fprintf(os.Stdout, "Response from `InternalAPI.DiscoverSso`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiDiscoverSsoRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | **string** |  | 

### Return type

[**DiscoverSso200Response**](DiscoverSso200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetServiceStatus

> ServiceStatusResponse GetServiceStatus(ctx).Execute()

Public service status



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
	resp, r, err := apiClient.InternalAPI.GetServiceStatus(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InternalAPI.GetServiceStatus``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetServiceStatus`: ServiceStatusResponse
	fmt.Fprintf(os.Stdout, "Response from `InternalAPI.GetServiceStatus`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetServiceStatusRequest struct via the builder pattern


### Return type

[**ServiceStatusResponse**](ServiceStatusResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWorkflowSchema

> map[string]interface{} GetWorkflowSchema(ctx).Execute()

Fetch the workflow DSL JSON Schema



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
	resp, r, err := apiClient.InternalAPI.GetWorkflowSchema(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InternalAPI.GetWorkflowSchema``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWorkflowSchema`: map[string]interface{}
	fmt.Fprintf(os.Stdout, "Response from `InternalAPI.GetWorkflowSchema`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetWorkflowSchemaRequest struct via the builder pattern


### Return type

**map[string]interface{}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

