# notifyservice_api.NotificationsApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_notification**](NotificationsApi.md#get_notification) | **GET** /v1/notifications/{id} | Get a notification by id
[**list_notifications**](NotificationsApi.md#list_notifications) | **GET** /v1/notifications | List notifications with cursor pagination
[**send_notification**](NotificationsApi.md#send_notification) | **POST** /v1/notifications | Send a notification


# **get_notification**
> NotificationResponse get_notification(id)

Get a notification by id

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.notification_response import NotificationResponse
from notifyservice_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://your-notavia-host
# See configuration.py for a list of all supported configuration parameters.
configuration = notifyservice_api.Configuration(
    host = "https://your-notavia-host"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: apiKey
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.NotificationsApi(api_client)
    id = 'id_example' # str | 

    try:
        # Get a notification by id
        api_response = api_instance.get_notification(id)
        print("The response of NotificationsApi->get_notification:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling NotificationsApi->get_notification: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**NotificationResponse**](NotificationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Notification record. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_notifications**
> NotificationPage list_notifications(status=status, recipient=recipient, created_after=created_after, created_before=created_before, limit=limit, cursor=cursor)

List notifications with cursor pagination

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.notification_page import NotificationPage
from notifyservice_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://your-notavia-host
# See configuration.py for a list of all supported configuration parameters.
configuration = notifyservice_api.Configuration(
    host = "https://your-notavia-host"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: apiKey
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.NotificationsApi(api_client)
    status = 'status_example' # str |  (optional)
    recipient = 'recipient_example' # str |  (optional)
    created_after = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
    created_before = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
    limit = 20 # int |  (optional) (default to 20)
    cursor = 'cursor_example' # str |  (optional)

    try:
        # List notifications with cursor pagination
        api_response = api_instance.list_notifications(status=status, recipient=recipient, created_after=created_after, created_before=created_before, limit=limit, cursor=cursor)
        print("The response of NotificationsApi->list_notifications:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling NotificationsApi->list_notifications: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **str**|  | [optional] 
 **recipient** | **str**|  | [optional] 
 **created_after** | **datetime**|  | [optional] 
 **created_before** | **datetime**|  | [optional] 
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **str**|  | [optional] 

### Return type

[**NotificationPage**](NotificationPage.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Paginated list of notifications. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **send_notification**
> NotificationResponse send_notification(send_notification_request, idempotency_key=idempotency_key)

Send a notification

Persists the notification and dispatches it via the requested channel. Returns `202 Accepted` on the first successful call. Returns `200 OK` when the same `Idempotency-Key` is replayed within 24 hours. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.notification_response import NotificationResponse
from notifyservice_api.models.send_notification_request import SendNotificationRequest
from notifyservice_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://your-notavia-host
# See configuration.py for a list of all supported configuration parameters.
configuration = notifyservice_api.Configuration(
    host = "https://your-notavia-host"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: apiKey
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.NotificationsApi(api_client)
    send_notification_request = notifyservice_api.SendNotificationRequest() # SendNotificationRequest | 
    idempotency_key = 'idempotency_key_example' # str | Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  (optional)

    try:
        # Send a notification
        api_response = api_instance.send_notification(send_notification_request, idempotency_key=idempotency_key)
        print("The response of NotificationsApi->send_notification:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling NotificationsApi->send_notification: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **send_notification_request** | [**SendNotificationRequest**](SendNotificationRequest.md)|  | 
 **idempotency_key** | **str**| Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  | [optional] 

### Return type

[**NotificationResponse**](NotificationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Notification accepted and queued for dispatch. |  -  |
**200** | Idempotent replay — previously accepted notification returned. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

