# notifyservice_api.InboxApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_inbox_feed**](InboxApi.md#get_inbox_feed) | **GET** /inbox/v1/feed | Get the paginated in-app notification feed for the current user
[**get_inbox_item**](InboxApi.md#get_inbox_item) | **GET** /inbox/v1/notifications/{id} | Get a single inbox item
[**get_inbox_unread_count**](InboxApi.md#get_inbox_unread_count) | **GET** /inbox/v1/unread-count | Get the unread notification count for the current user
[**mark_all_inbox_items_read**](InboxApi.md#mark_all_inbox_items_read) | **POST** /inbox/v1/notifications/mark-all-read | Mark all inbox items as read (optionally scoped to a cutoff time)
[**mark_inbox_item_read**](InboxApi.md#mark_inbox_item_read) | **POST** /inbox/v1/notifications/{id}/read | Mark an inbox item as read
[**verify_inbox_token**](InboxApi.md#verify_inbox_token) | **POST** /inbox/v1/tokens/verify | Verify an inbox JWT and return the resolved identity


# **get_inbox_feed**
> InboxFeedPage get_inbox_feed(status=status, limit=limit, cursor=cursor)

Get the paginated in-app notification feed for the current user

### Example

* Bearer Authentication (inboxJwt):

```python
import notifyservice_api
from notifyservice_api.models.inbox_feed_page import InboxFeedPage
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

# Configure Bearer authorization: inboxJwt
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InboxApi(api_client)
    status = all # str |  (optional) (default to all)
    limit = 20 # int |  (optional) (default to 20)
    cursor = 'cursor_example' # str |  (optional)

    try:
        # Get the paginated in-app notification feed for the current user
        api_response = api_instance.get_inbox_feed(status=status, limit=limit, cursor=cursor)
        print("The response of InboxApi->get_inbox_feed:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InboxApi->get_inbox_feed: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **str**|  | [optional] [default to all]
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **str**|  | [optional] 

### Return type

[**InboxFeedPage**](InboxFeedPage.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Inbox feed page. |  -  |
**401** | Missing or invalid credentials. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_inbox_item**
> InboxItemResponse get_inbox_item(id)

Get a single inbox item

### Example

* Bearer Authentication (inboxJwt):

```python
import notifyservice_api
from notifyservice_api.models.inbox_item_response import InboxItemResponse
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

# Configure Bearer authorization: inboxJwt
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InboxApi(api_client)
    id = 'id_example' # str | 

    try:
        # Get a single inbox item
        api_response = api_instance.get_inbox_item(id)
        print("The response of InboxApi->get_inbox_item:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InboxApi->get_inbox_item: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**InboxItemResponse**](InboxItemResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Inbox item. |  -  |
**401** | Missing or invalid credentials. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_inbox_unread_count**
> UnreadCountResponse get_inbox_unread_count()

Get the unread notification count for the current user

### Example

* Bearer Authentication (inboxJwt):

```python
import notifyservice_api
from notifyservice_api.models.unread_count_response import UnreadCountResponse
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

# Configure Bearer authorization: inboxJwt
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InboxApi(api_client)

    try:
        # Get the unread notification count for the current user
        api_response = api_instance.get_inbox_unread_count()
        print("The response of InboxApi->get_inbox_unread_count:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InboxApi->get_inbox_unread_count: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**UnreadCountResponse**](UnreadCountResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Unread count. |  -  |
**401** | Missing or invalid credentials. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **mark_all_inbox_items_read**
> MarkAllReadResponse mark_all_inbox_items_read(mark_all_inbox_items_read_request=mark_all_inbox_items_read_request)

Mark all inbox items as read (optionally scoped to a cutoff time)

### Example

* Bearer Authentication (inboxJwt):

```python
import notifyservice_api
from notifyservice_api.models.mark_all_inbox_items_read_request import MarkAllInboxItemsReadRequest
from notifyservice_api.models.mark_all_read_response import MarkAllReadResponse
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

# Configure Bearer authorization: inboxJwt
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InboxApi(api_client)
    mark_all_inbox_items_read_request = notifyservice_api.MarkAllInboxItemsReadRequest() # MarkAllInboxItemsReadRequest |  (optional)

    try:
        # Mark all inbox items as read (optionally scoped to a cutoff time)
        api_response = api_instance.mark_all_inbox_items_read(mark_all_inbox_items_read_request=mark_all_inbox_items_read_request)
        print("The response of InboxApi->mark_all_inbox_items_read:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InboxApi->mark_all_inbox_items_read: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mark_all_inbox_items_read_request** | [**MarkAllInboxItemsReadRequest**](MarkAllInboxItemsReadRequest.md)|  | [optional] 

### Return type

[**MarkAllReadResponse**](MarkAllReadResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Bulk-mark result. |  -  |
**401** | Missing or invalid credentials. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **mark_inbox_item_read**
> MarkReadResponse mark_inbox_item_read(id)

Mark an inbox item as read

### Example

* Bearer Authentication (inboxJwt):

```python
import notifyservice_api
from notifyservice_api.models.mark_read_response import MarkReadResponse
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

# Configure Bearer authorization: inboxJwt
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InboxApi(api_client)
    id = 'id_example' # str | 

    try:
        # Mark an inbox item as read
        api_response = api_instance.mark_inbox_item_read(id)
        print("The response of InboxApi->mark_inbox_item_read:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InboxApi->mark_inbox_item_read: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**MarkReadResponse**](MarkReadResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Item marked read. |  -  |
**401** | Missing or invalid credentials. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **verify_inbox_token**
> VerifyTokenResponse verify_inbox_token()

Verify an inbox JWT and return the resolved identity

### Example

* Bearer Authentication (inboxJwt):

```python
import notifyservice_api
from notifyservice_api.models.verify_token_response import VerifyTokenResponse
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

# Configure Bearer authorization: inboxJwt
configuration = notifyservice_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InboxApi(api_client)

    try:
        # Verify an inbox JWT and return the resolved identity
        api_response = api_instance.verify_inbox_token()
        print("The response of InboxApi->verify_inbox_token:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InboxApi->verify_inbox_token: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**VerifyTokenResponse**](VerifyTokenResponse.md)

### Authorization

[inboxJwt](../README.md#inboxJwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Verified identity. |  -  |
**401** | Missing or invalid credentials. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

