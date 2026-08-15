# notifyservice_api.SMSApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**delete_sms_settings**](SMSApi.md#delete_sms_settings) | **DELETE** /v1/environments/{envId}/sms-settings | Delete SMS provider settings for an environment
[**get_sms_settings**](SMSApi.md#get_sms_settings) | **GET** /v1/environments/{envId}/sms-settings | Get SMS provider settings for an environment
[**update_sms_settings**](SMSApi.md#update_sms_settings) | **PUT** /v1/environments/{envId}/sms-settings | Create or update SMS provider settings for an environment


# **delete_sms_settings**
> delete_sms_settings(env_id)

Delete SMS provider settings for an environment

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
    api_instance = notifyservice_api.SMSApi(api_client)
    env_id = 'env_id_example' # str | 

    try:
        # Delete SMS provider settings for an environment
        api_instance.delete_sms_settings(env_id)
    except Exception as e:
        print("Exception when calling SMSApi->delete_sms_settings: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **env_id** | **str**|  | 

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

# **get_sms_settings**
> SmsSettingsResponse get_sms_settings(env_id)

Get SMS provider settings for an environment

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.sms_settings_response import SmsSettingsResponse
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
    api_instance = notifyservice_api.SMSApi(api_client)
    env_id = 'env_id_example' # str | 

    try:
        # Get SMS provider settings for an environment
        api_response = api_instance.get_sms_settings(env_id)
        print("The response of SMSApi->get_sms_settings:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SMSApi->get_sms_settings: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **env_id** | **str**|  | 

### Return type

[**SmsSettingsResponse**](SmsSettingsResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | SMS settings. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_sms_settings**
> SmsSettingsResponse update_sms_settings(env_id, update_sms_settings_request)

Create or update SMS provider settings for an environment

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.sms_settings_response import SmsSettingsResponse
from notifyservice_api.models.update_sms_settings_request import UpdateSmsSettingsRequest
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
    api_instance = notifyservice_api.SMSApi(api_client)
    env_id = 'env_id_example' # str | 
    update_sms_settings_request = notifyservice_api.UpdateSmsSettingsRequest() # UpdateSmsSettingsRequest | 

    try:
        # Create or update SMS provider settings for an environment
        api_response = api_instance.update_sms_settings(env_id, update_sms_settings_request)
        print("The response of SMSApi->update_sms_settings:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SMSApi->update_sms_settings: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **env_id** | **str**|  | 
 **update_sms_settings_request** | [**UpdateSmsSettingsRequest**](UpdateSmsSettingsRequest.md)|  | 

### Return type

[**SmsSettingsResponse**](SmsSettingsResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated SMS settings. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

