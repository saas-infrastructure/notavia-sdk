# \PreferencesAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ArchiveCategory**](PreferencesAPI.md#ArchiveCategory) | **Delete** /v1/preferences/categories/{key} | Archive a notification category
[**BulkSetUserPreferences**](PreferencesAPI.md#BulkSetUserPreferences) | **Put** /v1/preferences/users/{externalUserId} | Bulk-upsert preference cells for a user
[**CreateCategory**](PreferencesAPI.md#CreateCategory) | **Post** /v1/preferences/categories | Create a notification category
[**GetUserPreferences**](PreferencesAPI.md#GetUserPreferences) | **Get** /v1/preferences/users/{externalUserId} | Get effective preferences for a user
[**ListCategories**](PreferencesAPI.md#ListCategories) | **Get** /v1/preferences/categories | List notification categories
[**PatchUserPreference**](PreferencesAPI.md#PatchUserPreference) | **Patch** /v1/preferences/users/{externalUserId}/{categoryKey}/{channel} | Set a single preference cell for a user
[**UpdateCategory**](PreferencesAPI.md#UpdateCategory) | **Put** /v1/preferences/categories/{key} | Update a notification category



## ArchiveCategory

> ArchiveCategory(ctx, key).Execute()

Archive a notification category

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
	r, err := apiClient.PreferencesAPI.ArchiveCategory(context.Background(), key).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.ArchiveCategory``: %v\n", err)
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

Other parameters are passed through a pointer to a apiArchiveCategoryRequest struct via the builder pattern


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


## BulkSetUserPreferences

> UserPreferencesResponse BulkSetUserPreferences(ctx, externalUserId).BulkSetUserPreferencesRequest(bulkSetUserPreferencesRequest).Execute()

Bulk-upsert preference cells for a user

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
	externalUserId := "externalUserId_example" // string | 
	bulkSetUserPreferencesRequest := *openapiclient.NewBulkSetUserPreferencesRequest([]openapiclient.BulkSetUserPreferencesRequestPreferencesInner{*openapiclient.NewBulkSetUserPreferencesRequestPreferencesInner("CategoryKey_example", openapiclient.NotificationChannel("email"), false)}) // BulkSetUserPreferencesRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PreferencesAPI.BulkSetUserPreferences(context.Background(), externalUserId).BulkSetUserPreferencesRequest(bulkSetUserPreferencesRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.BulkSetUserPreferences``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `BulkSetUserPreferences`: UserPreferencesResponse
	fmt.Fprintf(os.Stdout, "Response from `PreferencesAPI.BulkSetUserPreferences`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**externalUserId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiBulkSetUserPreferencesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **bulkSetUserPreferencesRequest** | [**BulkSetUserPreferencesRequest**](BulkSetUserPreferencesRequest.md) |  | 

### Return type

[**UserPreferencesResponse**](UserPreferencesResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateCategory

> CategoryResponse CreateCategory(ctx).CreateCategoryRequest(createCategoryRequest).Execute()

Create a notification category

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
	createCategoryRequest := *openapiclient.NewCreateCategoryRequest("Key_example", "Name_example", []openapiclient.NotificationChannel{openapiclient.NotificationChannel("email")}) // CreateCategoryRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PreferencesAPI.CreateCategory(context.Background()).CreateCategoryRequest(createCategoryRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.CreateCategory``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateCategory`: CategoryResponse
	fmt.Fprintf(os.Stdout, "Response from `PreferencesAPI.CreateCategory`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateCategoryRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createCategoryRequest** | [**CreateCategoryRequest**](CreateCategoryRequest.md) |  | 

### Return type

[**CategoryResponse**](CategoryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetUserPreferences

> UserPreferencesResponse GetUserPreferences(ctx, externalUserId).Execute()

Get effective preferences for a user

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
	externalUserId := "externalUserId_example" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PreferencesAPI.GetUserPreferences(context.Background(), externalUserId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.GetUserPreferences``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetUserPreferences`: UserPreferencesResponse
	fmt.Fprintf(os.Stdout, "Response from `PreferencesAPI.GetUserPreferences`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**externalUserId** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetUserPreferencesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**UserPreferencesResponse**](UserPreferencesResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListCategories

> CategoryListResponse ListCategories(ctx).IncludeArchived(includeArchived).Execute()

List notification categories

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
	includeArchived := true // bool |  (optional) (default to false)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PreferencesAPI.ListCategories(context.Background()).IncludeArchived(includeArchived).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.ListCategories``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListCategories`: CategoryListResponse
	fmt.Fprintf(os.Stdout, "Response from `PreferencesAPI.ListCategories`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiListCategoriesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **includeArchived** | **bool** |  | [default to false]

### Return type

[**CategoryListResponse**](CategoryListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## PatchUserPreference

> PatchUserPreference(ctx, externalUserId, categoryKey, channel).PatchUserPreferenceRequest(patchUserPreferenceRequest).Execute()

Set a single preference cell for a user

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
	externalUserId := "externalUserId_example" // string | 
	categoryKey := "categoryKey_example" // string | 
	channel := openapiclient.NotificationChannelKebab("email") // NotificationChannelKebab | 
	patchUserPreferenceRequest := *openapiclient.NewPatchUserPreferenceRequest(false) // PatchUserPreferenceRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PreferencesAPI.PatchUserPreference(context.Background(), externalUserId, categoryKey, channel).PatchUserPreferenceRequest(patchUserPreferenceRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.PatchUserPreference``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**externalUserId** | **string** |  | 
**categoryKey** | **string** |  | 
**channel** | [**NotificationChannelKebab**](.md) |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiPatchUserPreferenceRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



 **patchUserPreferenceRequest** | [**PatchUserPreferenceRequest**](PatchUserPreferenceRequest.md) |  | 

### Return type

 (empty response body)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateCategory

> CategoryResponse UpdateCategory(ctx, key).UpdateCategoryRequest(updateCategoryRequest).Execute()

Update a notification category

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
	updateCategoryRequest := *openapiclient.NewUpdateCategoryRequest("Name_example", []openapiclient.NotificationChannel{openapiclient.NotificationChannel("email")}, false) // UpdateCategoryRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PreferencesAPI.UpdateCategory(context.Background(), key).UpdateCategoryRequest(updateCategoryRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PreferencesAPI.UpdateCategory``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateCategory`: CategoryResponse
	fmt.Fprintf(os.Stdout, "Response from `PreferencesAPI.UpdateCategory`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**key** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateCategoryRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateCategoryRequest** | [**UpdateCategoryRequest**](UpdateCategoryRequest.md) |  | 

### Return type

[**CategoryResponse**](CategoryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

