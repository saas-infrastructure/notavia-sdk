# notifyservice_api.SlackApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**complete_slack_o_auth**](SlackApi.md#complete_slack_o_auth) | **GET** /oauth/slack/callback | Slack OAuth 2.0 callback — completes the installation
[**delete_slack_installation**](SlackApi.md#delete_slack_installation) | **DELETE** /v1/slack/installations/{id} | Delete (revoke) a Slack installation
[**get_slack_installation**](SlackApi.md#get_slack_installation) | **GET** /v1/slack/installations/{id} | Get a Slack installation by id
[**list_slack_installations**](SlackApi.md#list_slack_installations) | **GET** /v1/slack/installations | List Slack workspace installations for this environment
[**send_slack_test_message**](SlackApi.md#send_slack_test_message) | **POST** /v1/slack/installations/{id}/send-test | Send a test message via a Slack installation
[**start_slack_o_auth**](SlackApi.md#start_slack_o_auth) | **GET** /oauth/slack/install | Start the Slack OAuth 2.0 installation flow
[**update_slack_installation**](SlackApi.md#update_slack_installation) | **PUT** /v1/slack/installations/{id} | Update settings on a Slack installation


# **complete_slack_o_auth**
> complete_slack_o_auth(code, state)

Slack OAuth 2.0 callback — completes the installation

Slack redirects back here after user approval. On success redirects to `/dashboard/settings/slack?installed=1&team=<team_name>`. On failure redirects to `/dashboard/settings/slack?error=<code>`. 

### Example

* Api Key Authentication (cookieAuth):

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

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.SlackApi(api_client)
    code = 'code_example' # str | 
    state = 'state_example' # str | 

    try:
        # Slack OAuth 2.0 callback — completes the installation
        api_instance.complete_slack_o_auth(code, state)
    except Exception as e:
        print("Exception when calling SlackApi->complete_slack_o_auth: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | **str**|  | 
 **state** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Redirects to the dashboard Slack settings page. |  -  |
**401** | Missing or invalid credentials. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_slack_installation**
> delete_slack_installation(id)

Delete (revoke) a Slack installation

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
    api_instance = notifyservice_api.SlackApi(api_client)
    id = 'id_example' # str | 

    try:
        # Delete (revoke) a Slack installation
        api_instance.delete_slack_installation(id)
    except Exception as e:
        print("Exception when calling SlackApi->delete_slack_installation: %s\n" % e)
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

# **get_slack_installation**
> SlackInstallationResponse get_slack_installation(id)

Get a Slack installation by id

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.slack_installation_response import SlackInstallationResponse
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
    api_instance = notifyservice_api.SlackApi(api_client)
    id = 'id_example' # str | 

    try:
        # Get a Slack installation by id
        api_response = api_instance.get_slack_installation(id)
        print("The response of SlackApi->get_slack_installation:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SlackApi->get_slack_installation: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

[**SlackInstallationResponse**](SlackInstallationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Installation record. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_slack_installations**
> SlackInstallationListResponse list_slack_installations()

List Slack workspace installations for this environment

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.slack_installation_list_response import SlackInstallationListResponse
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
    api_instance = notifyservice_api.SlackApi(api_client)

    try:
        # List Slack workspace installations for this environment
        api_response = api_instance.list_slack_installations()
        print("The response of SlackApi->list_slack_installations:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SlackApi->list_slack_installations: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**SlackInstallationListResponse**](SlackInstallationListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Installations list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **send_slack_test_message**
> SendTestResponse send_slack_test_message(id, send_slack_test_request)

Send a test message via a Slack installation

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.send_slack_test_request import SendSlackTestRequest
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
    api_instance = notifyservice_api.SlackApi(api_client)
    id = 'id_example' # str | 
    send_slack_test_request = notifyservice_api.SendSlackTestRequest() # SendSlackTestRequest | 

    try:
        # Send a test message via a Slack installation
        api_response = api_instance.send_slack_test_message(id, send_slack_test_request)
        print("The response of SlackApi->send_slack_test_message:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SlackApi->send_slack_test_message: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **send_slack_test_request** | [**SendSlackTestRequest**](SendSlackTestRequest.md)|  | 

### Return type

[**SendTestResponse**](SendTestResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Test notification accepted. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **start_slack_o_auth**
> start_slack_o_auth(env_id)

Start the Slack OAuth 2.0 installation flow

Requires an active dashboard session (cookie auth). Redirects the browser to Slack's authorization URL with a JWE-encrypted state token. 

### Example

* Api Key Authentication (cookieAuth):

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

# Configure API key authorization: cookieAuth
configuration.api_key['cookieAuth'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['cookieAuth'] = 'Bearer'

# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.SlackApi(api_client)
    env_id = 'env_id_example' # str | 

    try:
        # Start the Slack OAuth 2.0 installation flow
        api_instance.start_slack_o_auth(env_id)
    except Exception as e:
        print("Exception when calling SlackApi->start_slack_o_auth: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **env_id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Redirects to Slack&#39;s authorization page. |  -  |
**401** | Missing or invalid credentials. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_slack_installation**
> SlackInstallationResponse update_slack_installation(id, update_slack_installation_request)

Update settings on a Slack installation

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.slack_installation_response import SlackInstallationResponse
from notifyservice_api.models.update_slack_installation_request import UpdateSlackInstallationRequest
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
    api_instance = notifyservice_api.SlackApi(api_client)
    id = 'id_example' # str | 
    update_slack_installation_request = notifyservice_api.UpdateSlackInstallationRequest() # UpdateSlackInstallationRequest | 

    try:
        # Update settings on a Slack installation
        api_response = api_instance.update_slack_installation(id, update_slack_installation_request)
        print("The response of SlackApi->update_slack_installation:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SlackApi->update_slack_installation: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **update_slack_installation_request** | [**UpdateSlackInstallationRequest**](UpdateSlackInstallationRequest.md)|  | 

### Return type

[**SlackInstallationResponse**](SlackInstallationResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated installation. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

