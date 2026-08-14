# \SMSAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**DeleteSmsSettings**](SMSAPI.md#DeleteSmsSettings) | **Delete** /v1/environments/{envId}/sms-settings | Delete SMS provider settings for an environment
[**GetSmsSettings**](SMSAPI.md#GetSmsSettings) | **Get** /v1/environments/{envId}/sms-settings | Get SMS provider settings for an environment
[**UpdateSmsSettings**](SMSAPI.md#UpdateSmsSettings) | **Put** /v1/environments/{envId}/sms-settings | Create or update SMS provider settings for an environment



## DeleteSmsSettings

> DeleteSmsSettings(ctx, envId).Execute()

Delete SMS provider settings for an environment

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
	r, err := apiClient.SMSAPI.DeleteSmsSettings(context.Background(), envId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SMSAPI.DeleteSmsSettings``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**envId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteSmsSettingsRequest struct via the builder pattern


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


## GetSmsSettings

> SmsSettingsResponse GetSmsSettings(ctx, envId).Execute()

Get SMS provider settings for an environment

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
	resp, r, err := apiClient.SMSAPI.GetSmsSettings(context.Background(), envId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SMSAPI.GetSmsSettings``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetSmsSettings`: SmsSettingsResponse
	fmt.Fprintf(os.Stdout, "Response from `SMSAPI.GetSmsSettings`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**envId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetSmsSettingsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SmsSettingsResponse**](SmsSettingsResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateSmsSettings

> SmsSettingsResponse UpdateSmsSettings(ctx, envId).UpdateSmsSettingsRequest(updateSmsSettingsRequest).Execute()

Create or update SMS provider settings for an environment

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
	updateSmsSettingsRequest := *openapiclient.NewUpdateSmsSettingsRequest("Kind_example") // UpdateSmsSettingsRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SMSAPI.UpdateSmsSettings(context.Background(), envId).UpdateSmsSettingsRequest(updateSmsSettingsRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SMSAPI.UpdateSmsSettings``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateSmsSettings`: SmsSettingsResponse
	fmt.Fprintf(os.Stdout, "Response from `SMSAPI.UpdateSmsSettings`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**envId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateSmsSettingsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateSmsSettingsRequest** | [**UpdateSmsSettingsRequest**](UpdateSmsSettingsRequest.md) |  | 

### Return type

[**SmsSettingsResponse**](SmsSettingsResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

