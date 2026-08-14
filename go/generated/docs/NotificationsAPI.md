# \NotificationsAPI

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetNotification**](NotificationsAPI.md#GetNotification) | **Get** /v1/notifications/{id} | Get a notification by id
[**ListNotifications**](NotificationsAPI.md#ListNotifications) | **Get** /v1/notifications | List notifications with cursor pagination
[**SendNotification**](NotificationsAPI.md#SendNotification) | **Post** /v1/notifications | Send a notification



## GetNotification

> NotificationResponse GetNotification(ctx, id).Execute()

Get a notification by id

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
	resp, r, err := apiClient.NotificationsAPI.GetNotification(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationsAPI.GetNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetNotification`: NotificationResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationsAPI.GetNotification`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetNotificationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**NotificationResponse**](NotificationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListNotifications

> NotificationPage ListNotifications(ctx).Status(status).Recipient(recipient).CreatedAfter(createdAfter).CreatedBefore(createdBefore).Limit(limit).Cursor(cursor).Execute()

List notifications with cursor pagination

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
    "time"
	openapiclient "github.com/saas-infrastructure/notavia-sdk/generated"
)

func main() {
	status := "status_example" // string |  (optional)
	recipient := "recipient_example" // string |  (optional)
	createdAfter := time.Now() // time.Time |  (optional)
	createdBefore := time.Now() // time.Time |  (optional)
	limit := int32(56) // int32 |  (optional) (default to 20)
	cursor := "cursor_example" // string |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationsAPI.ListNotifications(context.Background()).Status(status).Recipient(recipient).CreatedAfter(createdAfter).CreatedBefore(createdBefore).Limit(limit).Cursor(cursor).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationsAPI.ListNotifications``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListNotifications`: NotificationPage
	fmt.Fprintf(os.Stdout, "Response from `NotificationsAPI.ListNotifications`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiListNotificationsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **string** |  | 
 **recipient** | **string** |  | 
 **createdAfter** | **time.Time** |  | 
 **createdBefore** | **time.Time** |  | 
 **limit** | **int32** |  | [default to 20]
 **cursor** | **string** |  | 

### Return type

[**NotificationPage**](NotificationPage.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendNotification

> NotificationResponse SendNotification(ctx).SendNotificationRequest(sendNotificationRequest).IdempotencyKey(idempotencyKey).Execute()

Send a notification



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
	sendNotificationRequest := *openapiclient.NewSendNotificationRequest(openapiclient.NotificationChannel("email"), *openapiclient.NewRecipient()) // SendNotificationRequest | 
	idempotencyKey := "idempotencyKey_example" // string | Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationsAPI.SendNotification(context.Background()).SendNotificationRequest(sendNotificationRequest).IdempotencyKey(idempotencyKey).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationsAPI.SendNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SendNotification`: NotificationResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationsAPI.SendNotification`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSendNotificationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sendNotificationRequest** | [**SendNotificationRequest**](SendNotificationRequest.md) |  | 
 **idempotencyKey** | **string** | Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  | 

### Return type

[**NotificationResponse**](NotificationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

