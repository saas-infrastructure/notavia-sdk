# notifyservice_api.TeamsApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_teams_endpoint**](TeamsApi.md#create_teams_endpoint) | **POST** /v1/teams-endpoints | Create a Microsoft Teams webhook endpoint
[**delete_teams_endpoint**](TeamsApi.md#delete_teams_endpoint) | **DELETE** /v1/teams-endpoints/{id} | Delete a Teams endpoint
[**get_teams_endpoint**](TeamsApi.md#get_teams_endpoint) | **GET** /v1/teams-endpoints/{id} | Get a Teams endpoint by id
[**list_teams_endpoints**](TeamsApi.md#list_teams_endpoints) | **GET** /v1/teams-endpoints | List Microsoft Teams webhook endpoints
[**send_teams_test_message**](TeamsApi.md#send_teams_test_message) | **POST** /v1/teams-endpoints/{id}/send-test | Send a test Adaptive Card to a Teams endpoint
[**update_teams_endpoint**](TeamsApi.md#update_teams_endpoint) | **PUT** /v1/teams-endpoints/{id} | Update a Teams endpoint


# **create_teams_endpoint**
> TeamsEndpointResponse create_teams_endpoint(create_teams_endpoint_request)

Create a Microsoft Teams webhook endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.create_teams_endpoint_request import CreateTeamsEndpointRequest
from notifyservice_api.models.teams_endpoint_response import TeamsEndpointResponse
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
    api_instance = notifyservice_api.TeamsApi(api_client)
    create_teams_endpoint_request = notifyservice_api.CreateTeamsEndpointRequest() # CreateTeamsEndpointRequest | 

    try:
        # Create a Microsoft Teams webhook endpoint
        api_response = api_instance.create_teams_endpoint(create_teams_endpoint_request)
        print("The response of TeamsApi->create_teams_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TeamsApi->create_teams_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_teams_endpoint_request** | [**CreateTeamsEndpointRequest**](CreateTeamsEndpointRequest.md)|  | 

### Return type

[**TeamsEndpointResponse**](TeamsEndpointResponse.md)

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

# **delete_teams_endpoint**
> delete_teams_endpoint(id)

Delete a Teams endpoint

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
    api_instance = notifyservice_api.TeamsApi(api_client)
    id = 'id_example' # str | 

    try:
        # Delete a Teams endpoint
        api_instance.delete_teams_endpoint(id)
    except Exception as e:
        print("Exception when calling TeamsApi->delete_teams_endpoint: %s\n" % e)
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

# **get_teams_endpoint**
> TeamsEndpointResponse get_teams_endpoint(id)

Get a Teams endpoint by id

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.teams_endpoint_response import TeamsEndpointResponse
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
    api_instance = notifyservice_api.TeamsApi(api_client)
    id = 'id_example' # str | 

    try:
        # Get a Teams endpoint by id
        api_response = api_instance.get_teams_endpoint(id)
        print("The response of TeamsApi->get_teams_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TeamsApi->get_teams_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**TeamsEndpointResponse**](TeamsEndpointResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Teams endpoint. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_teams_endpoints**
> TeamsEndpointListResponse list_teams_endpoints()

List Microsoft Teams webhook endpoints

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.teams_endpoint_list_response import TeamsEndpointListResponse
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
    api_instance = notifyservice_api.TeamsApi(api_client)

    try:
        # List Microsoft Teams webhook endpoints
        api_response = api_instance.list_teams_endpoints()
        print("The response of TeamsApi->list_teams_endpoints:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TeamsApi->list_teams_endpoints: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**TeamsEndpointListResponse**](TeamsEndpointListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Teams endpoints list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **send_teams_test_message**
> SendTestResponse send_teams_test_message(id)

Send a test Adaptive Card to a Teams endpoint

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
    api_instance = notifyservice_api.TeamsApi(api_client)
    id = 'id_example' # str | 

    try:
        # Send a test Adaptive Card to a Teams endpoint
        api_response = api_instance.send_teams_test_message(id)
        print("The response of TeamsApi->send_teams_test_message:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TeamsApi->send_teams_test_message: %s\n" % e)
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

# **update_teams_endpoint**
> TeamsEndpointResponse update_teams_endpoint(id, update_teams_endpoint_request)

Update a Teams endpoint

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.teams_endpoint_response import TeamsEndpointResponse
from notifyservice_api.models.update_teams_endpoint_request import UpdateTeamsEndpointRequest
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
    api_instance = notifyservice_api.TeamsApi(api_client)
    id = 'id_example' # str | 
    update_teams_endpoint_request = notifyservice_api.UpdateTeamsEndpointRequest() # UpdateTeamsEndpointRequest | 

    try:
        # Update a Teams endpoint
        api_response = api_instance.update_teams_endpoint(id, update_teams_endpoint_request)
        print("The response of TeamsApi->update_teams_endpoint:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TeamsApi->update_teams_endpoint: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **update_teams_endpoint_request** | [**UpdateTeamsEndpointRequest**](UpdateTeamsEndpointRequest.md)|  | 

### Return type

[**TeamsEndpointResponse**](TeamsEndpointResponse.md)

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

