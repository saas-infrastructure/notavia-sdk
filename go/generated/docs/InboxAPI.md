# \InboxAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetInboxFeed**](InboxAPI.md#GetInboxFeed) | **Get** /inbox/v1/feed | Get the paginated in-app notification feed for the current user
[**GetInboxItem**](InboxAPI.md#GetInboxItem) | **Get** /inbox/v1/notifications/{id} | Get a single inbox item
[**GetInboxUnreadCount**](InboxAPI.md#GetInboxUnreadCount) | **Get** /inbox/v1/unread-count | Get the unread notification count for the current user
[**MarkAllInboxItemsRead**](InboxAPI.md#MarkAllInboxItemsRead) | **Post** /inbox/v1/notifications/mark-all-read | Mark all inbox items as read (optionally scoped to a cutoff time)
[**MarkInboxItemRead**](InboxAPI.md#MarkInboxItemRead) | **Post** /inbox/v1/notifications/{id}/read | Mark an inbox item as read
[**VerifyInboxToken**](InboxAPI.md#VerifyInboxToken) | **Post** /inbox/v1/tokens/verify | Verify an inbox JWT and return the resolved identity



## GetInboxFeed

> InboxFeedPage GetInboxFeed(ctx).Status(status).Limit(limit).Cursor(cursor).Execute()

Get the paginated in-app notification feed for the current user

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
	status := "status_example" // string |  (optional) (default to "all")
	limit := int32(56) // int32 |  (optional) (default to 20)
	cursor := "cursor_example" // string |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.InboxAPI.GetInboxFeed(context.Background()).Status(status).Limit(limit).Cursor(cursor).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InboxAPI.GetInboxFeed``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetInboxFeed`: InboxFeedPage
	fmt.Fprintf(os.Stdout, "Response from `InboxAPI.GetInboxFeed`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetInboxFeedRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **string** |  | [default to &quot;all&quot;]
 **limit** | **int32** |  | [default to 20]
 **cursor** | **string** |  | 

### Return type

[**InboxFeedPage**](InboxFeedPage.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetInboxItem

> InboxItemResponse GetInboxItem(ctx, id).Execute()

Get a single inbox item

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
	resp, r, err := apiClient.InboxAPI.GetInboxItem(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InboxAPI.GetInboxItem``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetInboxItem`: InboxItemResponse
	fmt.Fprintf(os.Stdout, "Response from `InboxAPI.GetInboxItem`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetInboxItemRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**InboxItemResponse**](InboxItemResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetInboxUnreadCount

> UnreadCountResponse GetInboxUnreadCount(ctx).Execute()

Get the unread notification count for the current user

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
	resp, r, err := apiClient.InboxAPI.GetInboxUnreadCount(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InboxAPI.GetInboxUnreadCount``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetInboxUnreadCount`: UnreadCountResponse
	fmt.Fprintf(os.Stdout, "Response from `InboxAPI.GetInboxUnreadCount`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetInboxUnreadCountRequest struct via the builder pattern


### Return type

[**UnreadCountResponse**](UnreadCountResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## MarkAllInboxItemsRead

> MarkAllReadResponse MarkAllInboxItemsRead(ctx).MarkAllInboxItemsReadRequest(markAllInboxItemsReadRequest).Execute()

Mark all inbox items as read (optionally scoped to a cutoff time)

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
	markAllInboxItemsReadRequest := *openapiclient.NewMarkAllInboxItemsReadRequest() // MarkAllInboxItemsReadRequest |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.InboxAPI.MarkAllInboxItemsRead(context.Background()).MarkAllInboxItemsReadRequest(markAllInboxItemsReadRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InboxAPI.MarkAllInboxItemsRead``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `MarkAllInboxItemsRead`: MarkAllReadResponse
	fmt.Fprintf(os.Stdout, "Response from `InboxAPI.MarkAllInboxItemsRead`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiMarkAllInboxItemsReadRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **markAllInboxItemsReadRequest** | [**MarkAllInboxItemsReadRequest**](MarkAllInboxItemsReadRequest.md) |  | 

### Return type

[**MarkAllReadResponse**](MarkAllReadResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## MarkInboxItemRead

> MarkReadResponse MarkInboxItemRead(ctx, id).Execute()

Mark an inbox item as read

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
	resp, r, err := apiClient.InboxAPI.MarkInboxItemRead(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InboxAPI.MarkInboxItemRead``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `MarkInboxItemRead`: MarkReadResponse
	fmt.Fprintf(os.Stdout, "Response from `InboxAPI.MarkInboxItemRead`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiMarkInboxItemReadRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MarkReadResponse**](MarkReadResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## VerifyInboxToken

> VerifyTokenResponse VerifyInboxToken(ctx).Execute()

Verify an inbox JWT and return the resolved identity

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
	resp, r, err := apiClient.InboxAPI.VerifyInboxToken(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `InboxAPI.VerifyInboxToken``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `VerifyInboxToken`: VerifyTokenResponse
	fmt.Fprintf(os.Stdout, "Response from `InboxAPI.VerifyInboxToken`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiVerifyInboxTokenRequest struct via the builder pattern


### Return type

[**VerifyTokenResponse**](VerifyTokenResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

