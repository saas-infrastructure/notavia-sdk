# notifyservice_api.DiscordApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_discord_endpoint**](DiscordApi.md#create_discord_endpoint) | **POST** /v1/discord-endpoints | Create a Discord webhook endpoint
[**delete_discord_endpoint**](DiscordApi.md#delete_discord_endpoint) | **DELETE** /v1/discord-endpoints/{id} | Delete a Discord endpoint
[**get_discord_endpoint**](DiscordApi.md#get_discord_endpoint) | **GET** /v1/discord-endpoints/{id} | Get a Discord endpoint by id
[**list_discord_endpoints**](DiscordApi.md#list_discord_endpoints) | **GET** /v1/discord-endpoints | List Discord webhook endpoints
[**send_discord_test_message**](DiscordApi.md#send_discord_test_message) | **POST** /v1/discord-endpoints/{id}/send-test | Send a test message to a Discord endpoint
[**update_discord_endpoint**](DiscordApi.md#update_discord_endpoint) | **PUT** /v1/discord-endpoints/{id} | Update a Discord endpoint


# **create_discord_endpoint**
> DiscordEndpointResponse create_discord_endpoint(create_discord_endpoint_request)

Create a Discord webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.create_discord_endpoint_request import CreateDiscordEndpointRequest
from notifyservice_api.models.discord_endpoint_response import DiscordEndpointResponse
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
    api_instance = notifyservice_api.DiscordApi(api_client)
    create_discord_endpoint_request = notifyservice_api.CreateDiscordEndpointRequest() # CreateDiscordEndpointRequest | 

    try:
        # Create a Discord webhook endpoint
        api_response = api_instance.create_discord_endpoint(create_discord_endpoint_request)
        print("The response of DiscordApi->create_discord_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DiscordApi->create_discord_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_discord_endpoint_request** | [**CreateDiscordEndpointRequest**](CreateDiscordEndpointRequest.md)|  | 

### Return type

[**DiscordEndpointResponse**](DiscordEndpointResponse.md)

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_discord_endpoint**
> delete_discord_endpoint(id)

Delete a Discord endpoint

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
    api_instance = notifyservice_api.DiscordApi(api_client)
    id = 'id_example' # str | 

    try:
        # Delete a Discord endpoint
        api_instance.delete_discord_endpoint(id)
    except Exception as e:
        print("Exception when calling DiscordApi->delete_discord_endpoint: %s\n" % e)
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

# **get_discord_endpoint**
> DiscordEndpointResponse get_discord_endpoint(id)

Get a Discord endpoint by id

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.discord_endpoint_response import DiscordEndpointResponse
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
    api_instance = notifyservice_api.DiscordApi(api_client)
    id = 'id_example' # str | 

    try:
        # Get a Discord endpoint by id
        api_response = api_instance.get_discord_endpoint(id)
        print("The response of DiscordApi->get_discord_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DiscordApi->get_discord_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**DiscordEndpointResponse**](DiscordEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Discord endpoint. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_discord_endpoints**
> DiscordEndpointListResponse list_discord_endpoints()

List Discord webhook endpoints

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.discord_endpoint_list_response import DiscordEndpointListResponse
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
    api_instance = notifyservice_api.DiscordApi(api_client)

    try:
        # List Discord webhook endpoints
        api_response = api_instance.list_discord_endpoints()
        print("The response of DiscordApi->list_discord_endpoints:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DiscordApi->list_discord_endpoints: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**DiscordEndpointListResponse**](DiscordEndpointListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Discord endpoints list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **send_discord_test_message**
> SendTestResponse send_discord_test_message(id)

Send a test message to a Discord endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.send_test_response import SendTestResponse
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
    api_instance = notifyservice_api.DiscordApi(api_client)
    id = 'id_example' # str | 

    try:
        # Send a test message to a Discord endpoint
        api_response = api_instance.send_discord_test_message(id)
        print("The response of DiscordApi->send_discord_test_message:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DiscordApi->send_discord_test_message: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**SendTestResponse**](SendTestResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Test notification accepted. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_discord_endpoint**
> DiscordEndpointResponse update_discord_endpoint(id, update_discord_endpoint_request)

Update a Discord endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.discord_endpoint_response import DiscordEndpointResponse
from notifyservice_api.models.update_discord_endpoint_request import UpdateDiscordEndpointRequest
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
    api_instance = notifyservice_api.DiscordApi(api_client)
    id = 'id_example' # str | 
    update_discord_endpoint_request = notifyservice_api.UpdateDiscordEndpointRequest() # UpdateDiscordEndpointRequest | 

    try:
        # Update a Discord endpoint
        api_response = api_instance.update_discord_endpoint(id, update_discord_endpoint_request)
        print("The response of DiscordApi->update_discord_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DiscordApi->update_discord_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **update_discord_endpoint_request** | [**UpdateDiscordEndpointRequest**](UpdateDiscordEndpointRequest.md)|  | 

### Return type

[**DiscordEndpointResponse**](DiscordEndpointResponse.md)

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

