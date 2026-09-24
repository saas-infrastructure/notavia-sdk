# notifyservice_api.SuppressionsApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_suppression**](SuppressionsApi.md#add_suppression) | **POST** /v1/suppressions | Manually add an address to the suppression list
[**get_suppression**](SuppressionsApi.md#get_suppression) | **GET** /v1/suppressions/{address} | Get a suppression by address
[**list_suppressions**](SuppressionsApi.md#list_suppressions) | **GET** /v1/suppressions | List suppressed addresses with cursor pagination
[**remove_suppression**](SuppressionsApi.md#remove_suppression) | **DELETE** /v1/suppressions/{address} | Remove an address from the suppression list


# **add_suppression**
> SuppressionResponse add_suppression(add_suppression_request)

Manually add an address to the suppression list

Manually adds an address to the suppression list. If the address is already suppressed, the existing entry is returned with `200` instead of `201`. Requires a full-access API key. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.add_suppression_request import AddSuppressionRequest
from notifyservice_api.models.suppression_response import SuppressionResponse
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
    api_instance = notifyservice_api.SuppressionsApi(api_client)
    add_suppression_request = notifyservice_api.AddSuppressionRequest() # AddSuppressionRequest | 

    try:
        # Manually add an address to the suppression list
        api_response = api_instance.add_suppression(add_suppression_request)
        print("The response of SuppressionsApi->add_suppression:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SuppressionsApi->add_suppression: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **add_suppression_request** | [**AddSuppressionRequest**](AddSuppressionRequest.md)|  | 

### Return type

[**SuppressionResponse**](SuppressionResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | The address was added to the suppression list. |  -  |
**200** | The address was already suppressed; the existing entry is returned. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_suppression**
> SuppressionResponse get_suppression(address)

Get a suppression by address

Requires a full-access API key.

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.suppression_response import SuppressionResponse
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
    api_instance = notifyservice_api.SuppressionsApi(api_client)
    address = 'address_example' # str | The email address to look up. URL-encode special characters.

    try:
        # Get a suppression by address
        api_response = api_instance.get_suppression(address)
        print("The response of SuppressionsApi->get_suppression:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SuppressionsApi->get_suppression: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **address** | **str**| The email address to look up. URL-encode special characters. | 

### Return type

[**SuppressionResponse**](SuppressionResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | The suppression entry for the address. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_suppressions**
> SuppressionPage list_suppressions(address=address, reason=reason, limit=limit, cursor=cursor)

List suppressed addresses with cursor pagination

Returns a cursor-paginated list of suppressed addresses for the authenticated environment. Requires a full-access API key. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.suppression_page import SuppressionPage
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
    api_instance = notifyservice_api.SuppressionsApi(api_client)
    address = 'address_example' # str | Filter to entries whose address equals this value. (optional)
    reason = 'reason_example' # str | Filter by suppression reason (case-insensitive). Note these filter values are the enum names, distinct from the snake_case values returned in the `reason` response field.  (optional)
    limit = 25 # int |  (optional) (default to 25)
    cursor = 'cursor_example' # str |  (optional)

    try:
        # List suppressed addresses with cursor pagination
        api_response = api_instance.list_suppressions(address=address, reason=reason, limit=limit, cursor=cursor)
        print("The response of SuppressionsApi->list_suppressions:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SuppressionsApi->list_suppressions: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **address** | **str**| Filter to entries whose address equals this value. | [optional] 
 **reason** | **str**| Filter by suppression reason (case-insensitive). Note these filter values are the enum names, distinct from the snake_case values returned in the &#x60;reason&#x60; response field.  | [optional] 
 **limit** | **int**|  | [optional] [default to 25]
 **cursor** | **str**|  | [optional] 

### Return type

[**SuppressionPage**](SuppressionPage.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Paginated list of suppressed addresses. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **remove_suppression**
> remove_suppression(address)

Remove an address from the suppression list

Requires a full-access API key.

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
    api_instance = notifyservice_api.SuppressionsApi(api_client)
    address = 'address_example' # str | The email address to remove. URL-encode special characters.

    try:
        # Remove an address from the suppression list
        api_instance.remove_suppression(address)
    except Exception as e:
        print("Exception when calling SuppressionsApi->remove_suppression: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **address** | **str**| The email address to remove. URL-encode special characters. | 

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
**204** | The address was removed from the suppression list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

