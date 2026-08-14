# notifyservice_api.InternalApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**discover_sso**](InternalApi.md#discover_sso) | **GET** /sso/discover | Discover the SSO configuration for an email address&#39;s domain
[**get_service_status**](InternalApi.md#get_service_status) | **GET** /status | Public service status
[**get_workflow_schema**](InternalApi.md#get_workflow_schema) | **GET** /workflows/schema.json | Fetch the workflow DSL JSON Schema


# **discover_sso**
> DiscoverSso200Response discover_sso(email)

Discover the SSO configuration for an email address's domain

Given a work email, returns whether the email's domain has an active enterprise SSO configuration and, if so, which protocol and whether force-SSO is enabled. Used by the dashboard login page to offer a \"Continue with SSO\" button and to hide the password field when force-SSO is on. Anonymous access; returns `{ \"hasSso\": false }` for unknown domains so it does not double as an account-existence oracle. 

### Example


```python
import notifyservice_api
from notifyservice_api.models.discover_sso200_response import DiscoverSso200Response
from notifyservice_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://your-notavia-host
# See configuration.py for a list of all supported configuration parameters.
configuration = notifyservice_api.Configuration(
    host = "https://your-notavia-host"
)


# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InternalApi(api_client)
    email = 'email_example' # str | 

    try:
        # Discover the SSO configuration for an email address's domain
        api_response = api_instance.discover_sso(email)
        print("The response of InternalApi->discover_sso:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InternalApi->discover_sso: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | **str**|  | 

### Return type

[**DiscoverSso200Response**](DiscoverSso200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Discovery result. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_service_status**
> ServiceStatusResponse get_service_status()

Public service status

Returns the current operational status of the service, per-component statuses, any active incidents, and incidents resolved within the last 14 days. Anonymous access; no API key required. CORS-enabled for any origin (`InboxEmbeddable` policy). 

### Example


```python
import notifyservice_api
from notifyservice_api.models.service_status_response import ServiceStatusResponse
from notifyservice_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://your-notavia-host
# See configuration.py for a list of all supported configuration parameters.
configuration = notifyservice_api.Configuration(
    host = "https://your-notavia-host"
)


# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InternalApi(api_client)

    try:
        # Public service status
        api_response = api_instance.get_service_status()
        print("The response of InternalApi->get_service_status:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InternalApi->get_service_status: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**ServiceStatusResponse**](ServiceStatusResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Current service status. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_workflow_schema**
> object get_workflow_schema()

Fetch the workflow DSL JSON Schema

Returns the embedded `workflow.schema.json` resource. Used by the dashboard Monaco editor to provide structural validation and auto-complete. Anonymous access; cached aggressively (`Cache-Control: public, max-age=3600`). A `X-Schema-Sha256` response header carries the SHA-256 of the content for cache invalidation. 

### Example


```python
import notifyservice_api
from notifyservice_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://your-notavia-host
# See configuration.py for a list of all supported configuration parameters.
configuration = notifyservice_api.Configuration(
    host = "https://your-notavia-host"
)


# Enter a context with an instance of the API client
with notifyservice_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = notifyservice_api.InternalApi(api_client)

    try:
        # Fetch the workflow DSL JSON Schema
        api_response = api_instance.get_workflow_schema()
        print("The response of InternalApi->get_workflow_schema:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling InternalApi->get_workflow_schema: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | JSON Schema document returned. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

