# \SuppressionsAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddSuppression**](SuppressionsAPI.md#AddSuppression) | **Post** /v1/suppressions | Manually add an address to the suppression list
[**GetSuppression**](SuppressionsAPI.md#GetSuppression) | **Get** /v1/suppressions/{address} | Get a suppression by address
[**ListSuppressions**](SuppressionsAPI.md#ListSuppressions) | **Get** /v1/suppressions | List suppressed addresses with cursor pagination
[**RemoveSuppression**](SuppressionsAPI.md#RemoveSuppression) | **Delete** /v1/suppressions/{address} | Remove an address from the suppression list



## AddSuppression

> SuppressionResponse AddSuppression(ctx).AddSuppressionRequest(addSuppressionRequest).Execute()

Manually add an address to the suppression list



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
	addSuppressionRequest := *openapiclient.NewAddSuppressionRequest("Address_example") // AddSuppressionRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SuppressionsAPI.AddSuppression(context.Background()).AddSuppressionRequest(addSuppressionRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SuppressionsAPI.AddSuppression``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AddSuppression`: SuppressionResponse
	fmt.Fprintf(os.Stdout, "Response from `SuppressionsAPI.AddSuppression`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAddSuppressionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **addSuppressionRequest** | [**AddSuppressionRequest**](AddSuppressionRequest.md) |  | 

### Return type

[**SuppressionResponse**](SuppressionResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetSuppression

> SuppressionResponse GetSuppression(ctx, address).Execute()

Get a suppression by address



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
	address := "address_example" // string | The email address to look up. URL-encode special characters.

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SuppressionsAPI.GetSuppression(context.Background(), address).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SuppressionsAPI.GetSuppression``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetSuppression`: SuppressionResponse
	fmt.Fprintf(os.Stdout, "Response from `SuppressionsAPI.GetSuppression`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**address** | **string** | The email address to look up. URL-encode special characters. | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetSuppressionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SuppressionResponse**](SuppressionResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListSuppressions

> SuppressionPage ListSuppressions(ctx).Address(address).Reason(reason).Limit(limit).Cursor(cursor).Execute()

List suppressed addresses with cursor pagination



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
	address := "address_example" // string | Filter to entries whose address equals this value. (optional)
	reason := "reason_example" // string | Filter by suppression reason (case-insensitive). Note these filter values are the enum names, distinct from the snake_case values returned in the `reason` response field.  (optional)
	limit := int32(56) // int32 |  (optional) (default to 25)
	cursor := "cursor_example" // string |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SuppressionsAPI.ListSuppressions(context.Background()).Address(address).Reason(reason).Limit(limit).Cursor(cursor).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SuppressionsAPI.ListSuppressions``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListSuppressions`: SuppressionPage
	fmt.Fprintf(os.Stdout, "Response from `SuppressionsAPI.ListSuppressions`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiListSuppressionsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **address** | **string** | Filter to entries whose address equals this value. | 
 **reason** | **string** | Filter by suppression reason (case-insensitive). Note these filter values are the enum names, distinct from the snake_case values returned in the &#x60;reason&#x60; response field.  | 
 **limit** | **int32** |  | [default to 25]
 **cursor** | **string** |  | 

### Return type

[**SuppressionPage**](SuppressionPage.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RemoveSuppression

> RemoveSuppression(ctx, address).Execute()

Remove an address from the suppression list



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
	address := "address_example" // string | The email address to remove. URL-encode special characters.

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SuppressionsAPI.RemoveSuppression(context.Background(), address).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SuppressionsAPI.RemoveSuppression``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**address** | **string** | The email address to remove. URL-encode special characters. | 

### Other Parameters

Other parameters are passed through a pointer to a apiRemoveSuppressionRequest struct via the builder pattern


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

