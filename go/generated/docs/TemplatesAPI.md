# \TemplatesAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTemplate**](TemplatesAPI.md#CreateTemplate) | **Post** /v1/templates | Create a template
[**DeleteTemplate**](TemplatesAPI.md#DeleteTemplate) | **Delete** /v1/templates/{key} | Delete a template
[**DeleteTemplateChannelBody**](TemplatesAPI.md#DeleteTemplateChannelBody) | **Delete** /v1/templates/{id}/bodies/{channel} | Delete a channel body from a template
[**GetTemplate**](TemplatesAPI.md#GetTemplate) | **Get** /v1/templates/{key} | Get a template by key
[**ListTemplates**](TemplatesAPI.md#ListTemplates) | **Get** /v1/templates | List templates with cursor pagination
[**PromoteTemplate**](TemplatesAPI.md#PromoteTemplate) | **Post** /v1/templates/{key}/promote | Promote a template from Test to Live
[**PutTemplateChannelBody**](TemplatesAPI.md#PutTemplateChannelBody) | **Put** /v1/templates/{id}/bodies/{channel} | Create or replace a channel body for a template
[**RenderTemplate**](TemplatesAPI.md#RenderTemplate) | **Post** /v1/templates/{key}/render | Render a template with sample data (does not send)
[**UpdateTemplate**](TemplatesAPI.md#UpdateTemplate) | **Patch** /v1/templates/{key} | Update fields on an existing template



## CreateTemplate

> TemplateResponse CreateTemplate(ctx).CreateTemplateRequest(createTemplateRequest).Execute()

Create a template

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
	createTemplateRequest := *openapiclient.NewCreateTemplateRequest("Key_example", "Name_example", "SubjectTemplate_example", "HtmlBodyTemplate_example") // CreateTemplateRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.CreateTemplate(context.Background()).CreateTemplateRequest(createTemplateRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.CreateTemplate``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateTemplate`: TemplateResponse
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.CreateTemplate`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateTemplateRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createTemplateRequest** | [**CreateTemplateRequest**](CreateTemplateRequest.md) |  | 

### Return type

[**TemplateResponse**](TemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteTemplate

> DeleteTemplate(ctx, key).Execute()

Delete a template

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
	key := "key_example" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TemplatesAPI.DeleteTemplate(context.Background(), key).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.DeleteTemplate``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTemplateRequest struct via the builder pattern


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


## DeleteTemplateChannelBody

> DeleteTemplateChannelBody(ctx, id, channel).Execute()

Delete a channel body from a template

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
	channel := openapiclient.NotificationChannelKebab("email") // NotificationChannelKebab | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TemplatesAPI.DeleteTemplateChannelBody(context.Background(), id, channel).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.DeleteTemplateChannelBody``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 
**channel** | [**NotificationChannelKebab**](.md) |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTemplateChannelBodyRequest struct via the builder pattern


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


## GetTemplate

> TemplateResponse GetTemplate(ctx, key).Execute()

Get a template by key

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
	key := "key_example" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.GetTemplate(context.Background(), key).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.GetTemplate``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTemplate`: TemplateResponse
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.GetTemplate`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTemplateRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**TemplateResponse**](TemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListTemplates

> TemplatePage ListTemplates(ctx).Limit(limit).Cursor(cursor).Execute()

List templates with cursor pagination

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
	limit := int32(56) // int32 |  (optional) (default to 20)
	cursor := "cursor_example" // string |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.ListTemplates(context.Background()).Limit(limit).Cursor(cursor).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.ListTemplates``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListTemplates`: TemplatePage
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.ListTemplates`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiListTemplatesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int32** |  | [default to 20]
 **cursor** | **string** |  | 

### Return type

[**TemplatePage**](TemplatePage.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PromoteTemplate

> PromotionResult PromoteTemplate(ctx, key).PromoteTemplateRequest(promoteTemplateRequest).Execute()

Promote a template from Test to Live



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
	key := "key_example" // string | 
	promoteTemplateRequest := *openapiclient.NewPromoteTemplateRequest() // PromoteTemplateRequest |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.PromoteTemplate(context.Background(), key).PromoteTemplateRequest(promoteTemplateRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.PromoteTemplate``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `PromoteTemplate`: PromotionResult
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.PromoteTemplate`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiPromoteTemplateRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **promoteTemplateRequest** | [**PromoteTemplateRequest**](PromoteTemplateRequest.md) |  | 

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


## PutTemplateChannelBody

> TemplateChannelBodyResponse PutTemplateChannelBody(ctx, id, channel).PutTemplateBodyRequest(putTemplateBodyRequest).Execute()

Create or replace a channel body for a template



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
	channel := openapiclient.NotificationChannelKebab("email") // NotificationChannelKebab | 
	putTemplateBodyRequest := *openapiclient.NewPutTemplateBodyRequest() // PutTemplateBodyRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.PutTemplateChannelBody(context.Background(), id, channel).PutTemplateBodyRequest(putTemplateBodyRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.PutTemplateChannelBody``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `PutTemplateChannelBody`: TemplateChannelBodyResponse
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.PutTemplateChannelBody`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 
**channel** | [**NotificationChannelKebab**](.md) |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiPutTemplateChannelBodyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **putTemplateBodyRequest** | [**PutTemplateBodyRequest**](PutTemplateBodyRequest.md) |  | 

### Return type

[**TemplateChannelBodyResponse**](TemplateChannelBodyResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RenderTemplate

> RenderTemplateResponse RenderTemplate(ctx, key).RenderTemplateRequest(renderTemplateRequest).Execute()

Render a template with sample data (does not send)

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
	key := "key_example" // string | 
	renderTemplateRequest := *openapiclient.NewRenderTemplateRequest() // RenderTemplateRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.RenderTemplate(context.Background(), key).RenderTemplateRequest(renderTemplateRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.RenderTemplate``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `RenderTemplate`: RenderTemplateResponse
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.RenderTemplate`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiRenderTemplateRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **renderTemplateRequest** | [**RenderTemplateRequest**](RenderTemplateRequest.md) |  | 

### Return type

[**RenderTemplateResponse**](RenderTemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateTemplate

> TemplateResponse UpdateTemplate(ctx, key).UpdateTemplateRequest(updateTemplateRequest).Execute()

Update fields on an existing template

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
	key := "key_example" // string | 
	updateTemplateRequest := *openapiclient.NewUpdateTemplateRequest() // UpdateTemplateRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TemplatesAPI.UpdateTemplate(context.Background(), key).UpdateTemplateRequest(updateTemplateRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TemplatesAPI.UpdateTemplate``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateTemplate`: TemplateResponse
	fmt.Fprintf(os.Stdout, "Response from `TemplatesAPI.UpdateTemplate`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateTemplateRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateTemplateRequest** | [**UpdateTemplateRequest**](UpdateTemplateRequest.md) |  | 

### Return type

[**TemplateResponse**](TemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

