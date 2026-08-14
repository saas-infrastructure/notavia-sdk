# notifyservice_api.WebhooksApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_webhook_endpoint**](WebhooksApi.md#create_webhook_endpoint) | **POST** /v1/webhook-endpoints | Create a webhook endpoint
[**delete_webhook_endpoint**](WebhooksApi.md#delete_webhook_endpoint) | **DELETE** /v1/webhook-endpoints/{id} | Delete (soft-disable) a webhook endpoint
[**get_webhook_delivery**](WebhooksApi.md#get_webhook_delivery) | **GET** /v1/webhook-endpoints/{id}/deliveries/{deliveryId} | Get a single webhook delivery
[**get_webhook_endpoint**](WebhooksApi.md#get_webhook_endpoint) | **GET** /v1/webhook-endpoints/{id} | Get a webhook endpoint
[**list_webhook_deliveries**](WebhooksApi.md#list_webhook_deliveries) | **GET** /v1/webhook-endpoints/{id}/deliveries | List deliveries for a webhook endpoint
[**list_webhook_endpoints**](WebhooksApi.md#list_webhook_endpoints) | **GET** /v1/webhook-endpoints | List webhook endpoints
[**retry_webhook_delivery**](WebhooksApi.md#retry_webhook_delivery) | **POST** /v1/webhook-endpoints/{id}/deliveries/{deliveryId}/retry | Re-queue a webhook delivery for immediate retry
[**rotate_webhook_endpoint_secret**](WebhooksApi.md#rotate_webhook_endpoint_secret) | **POST** /v1/webhook-endpoints/{id}/rotate-secret | Rotate the signing secret for a webhook endpoint
[**send_webhook_test_event**](WebhooksApi.md#send_webhook_test_event) | **POST** /v1/webhook-endpoints/{id}/send-test | Send a test event to a webhook endpoint
[**update_webhook_endpoint**](WebhooksApi.md#update_webhook_endpoint) | **PUT** /v1/webhook-endpoints/{id} | Update a webhook endpoint


# **create_webhook_endpoint**
> WebhookEndpointResponse create_webhook_endpoint(create_webhook_endpoint_request)

Create a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.create_webhook_endpoint_request import CreateWebhookEndpointRequest
from notifyservice_api.models.webhook_endpoint_response import WebhookEndpointResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    create_webhook_endpoint_request = notifyservice_api.CreateWebhookEndpointRequest() # CreateWebhookEndpointRequest | 

    try:
        # Create a webhook endpoint
        api_response = api_instance.create_webhook_endpoint(create_webhook_endpoint_request)
        print("The response of WebhooksApi->create_webhook_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->create_webhook_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_webhook_endpoint_request** | [**CreateWebhookEndpointRequest**](CreateWebhookEndpointRequest.md)|  | 

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Endpoint created. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_webhook_endpoint**
> delete_webhook_endpoint(id)

Delete (soft-disable) a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 

    try:
        # Delete (soft-disable) a webhook endpoint
        api_instance.delete_webhook_endpoint(id)
    except Exception as e:
        print("Exception when calling WebhooksApi->delete_webhook_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Deleted. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_webhook_delivery**
> WebhookDeliveryResponse get_webhook_delivery(id, delivery_id)

Get a single webhook delivery

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_delivery_response import WebhookDeliveryResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 
    delivery_id = 'delivery_id_example' # str | 

    try:
        # Get a single webhook delivery
        api_response = api_instance.get_webhook_delivery(id, delivery_id)
        print("The response of WebhooksApi->get_webhook_delivery:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->get_webhook_delivery: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **delivery_id** | **str**|  | 

### Return type

[**WebhookDeliveryResponse**](WebhookDeliveryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Delivery record. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_webhook_endpoint**
> WebhookEndpointResponse get_webhook_endpoint(id)

Get a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_endpoint_response import WebhookEndpointResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 

    try:
        # Get a webhook endpoint
        api_response = api_instance.get_webhook_endpoint(id)
        print("The response of WebhooksApi->get_webhook_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->get_webhook_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook endpoint. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_webhook_deliveries**
> WebhookDeliveryListResponse list_webhook_deliveries(id, cursor=cursor)

List deliveries for a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_delivery_list_response import WebhookDeliveryListResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 
    cursor = 'cursor_example' # str |  (optional)

    try:
        # List deliveries for a webhook endpoint
        api_response = api_instance.list_webhook_deliveries(id, cursor=cursor)
        print("The response of WebhooksApi->list_webhook_deliveries:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->list_webhook_deliveries: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **cursor** | **str**|  | [optional] 

### Return type

[**WebhookDeliveryListResponse**](WebhookDeliveryListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Delivery list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_webhook_endpoints**
> WebhookEndpointListResponse list_webhook_endpoints()

List webhook endpoints

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_endpoint_list_response import WebhookEndpointListResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)

    try:
        # List webhook endpoints
        api_response = api_instance.list_webhook_endpoints()
        print("The response of WebhooksApi->list_webhook_endpoints:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->list_webhook_endpoints: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**WebhookEndpointListResponse**](WebhookEndpointListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook endpoints list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **retry_webhook_delivery**
> WebhookDeliveryResponse retry_webhook_delivery(id, delivery_id)

Re-queue a webhook delivery for immediate retry

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_delivery_response import WebhookDeliveryResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 
    delivery_id = 'delivery_id_example' # str | 

    try:
        # Re-queue a webhook delivery for immediate retry
        api_response = api_instance.retry_webhook_delivery(id, delivery_id)
        print("The response of WebhooksApi->retry_webhook_delivery:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->retry_webhook_delivery: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **delivery_id** | **str**|  | 

### Return type

[**WebhookDeliveryResponse**](WebhookDeliveryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Delivery re-queued. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rotate_webhook_endpoint_secret**
> WebhookEndpointResponse rotate_webhook_endpoint_secret(id)

Rotate the signing secret for a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_endpoint_response import WebhookEndpointResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 

    try:
        # Rotate the signing secret for a webhook endpoint
        api_response = api_instance.rotate_webhook_endpoint_secret(id)
        print("The response of WebhooksApi->rotate_webhook_endpoint_secret:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->rotate_webhook_endpoint_secret: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated endpoint with new signing secret prefix. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **send_webhook_test_event**
> WebhookDeliveryResponse send_webhook_test_event(id)

Send a test event to a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.webhook_delivery_response import WebhookDeliveryResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 

    try:
        # Send a test event to a webhook endpoint
        api_response = api_instance.send_webhook_test_event(id)
        print("The response of WebhooksApi->send_webhook_test_event:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->send_webhook_test_event: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**WebhookDeliveryResponse**](WebhookDeliveryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Test delivery queued. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_webhook_endpoint**
> WebhookEndpointResponse update_webhook_endpoint(id, update_webhook_endpoint_request)

Update a webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.update_webhook_endpoint_request import UpdateWebhookEndpointRequest
from notifyservice_api.models.webhook_endpoint_response import WebhookEndpointResponse
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
    api_instance = notifyservice_api.WebhooksApi(api_client)
    id = 'id_example' # str | 
    update_webhook_endpoint_request = notifyservice_api.UpdateWebhookEndpointRequest() # UpdateWebhookEndpointRequest | 

    try:
        # Update a webhook endpoint
        api_response = api_instance.update_webhook_endpoint(id, update_webhook_endpoint_request)
        print("The response of WebhooksApi->update_webhook_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WebhooksApi->update_webhook_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **update_webhook_endpoint_request** | [**UpdateWebhookEndpointRequest**](UpdateWebhookEndpointRequest.md)|  | 

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated endpoint. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

