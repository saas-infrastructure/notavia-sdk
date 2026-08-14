# notifyservice_api.TemplatesApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_template**](TemplatesApi.md#create_template) | **POST** /v1/templates | Create a template
[**delete_template**](TemplatesApi.md#delete_template) | **DELETE** /v1/templates/{key} | Delete a template
[**delete_template_channel_body**](TemplatesApi.md#delete_template_channel_body) | **DELETE** /v1/templates/{id}/bodies/{channel} | Delete a channel body from a template
[**get_template**](TemplatesApi.md#get_template) | **GET** /v1/templates/{key} | Get a template by key
[**list_templates**](TemplatesApi.md#list_templates) | **GET** /v1/templates | List templates with cursor pagination
[**promote_template**](TemplatesApi.md#promote_template) | **POST** /v1/templates/{key}/promote | Promote a template from Test to Live
[**put_template_channel_body**](TemplatesApi.md#put_template_channel_body) | **PUT** /v1/templates/{id}/bodies/{channel} | Create or replace a channel body for a template
[**render_template**](TemplatesApi.md#render_template) | **POST** /v1/templates/{key}/render | Render a template with sample data (does not send)
[**update_template**](TemplatesApi.md#update_template) | **PATCH** /v1/templates/{key} | Update fields on an existing template


# **create_template**
> TemplateResponse create_template(create_template_request)

Create a template

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.create_template_request import CreateTemplateRequest
from notifyservice_api.models.template_response import TemplateResponse
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    create_template_request = notifyservice_api.CreateTemplateRequest() # CreateTemplateRequest | 

    try:
        # Create a template
        api_response = api_instance.create_template(create_template_request)
        print("The response of TemplatesApi->create_template:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->create_template: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_template_request** | [**CreateTemplateRequest**](CreateTemplateRequest.md)|  | 

### Return type

[**TemplateResponse**](TemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Template created. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_template**
> delete_template(key)

Delete a template

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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    key = 'key_example' # str | 

    try:
        # Delete a template
        api_instance.delete_template(key)
    except Exception as e:
        print("Exception when calling TemplatesApi->delete_template: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**|  | 

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

# **delete_template_channel_body**
> delete_template_channel_body(id, channel)

Delete a channel body from a template

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.notification_channel_kebab import NotificationChannelKebab
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    id = 'id_example' # str | 
    channel = notifyservice_api.NotificationChannelKebab() # NotificationChannelKebab | 

    try:
        # Delete a channel body from a template
        api_instance.delete_template_channel_body(id, channel)
    except Exception as e:
        print("Exception when calling TemplatesApi->delete_template_channel_body: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **channel** | [**NotificationChannelKebab**](.md)|  | 

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
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_template**
> TemplateResponse get_template(key)

Get a template by key

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.template_response import TemplateResponse
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    key = 'key_example' # str | 

    try:
        # Get a template by key
        api_response = api_instance.get_template(key)
        print("The response of TemplatesApi->get_template:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->get_template: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**|  | 

### Return type

[**TemplateResponse**](TemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Template record. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_templates**
> TemplatePage list_templates(limit=limit, cursor=cursor)

List templates with cursor pagination

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.template_page import TemplatePage
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    limit = 20 # int |  (optional) (default to 20)
    cursor = 'cursor_example' # str |  (optional)

    try:
        # List templates with cursor pagination
        api_response = api_instance.list_templates(limit=limit, cursor=cursor)
        print("The response of TemplatesApi->list_templates:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->list_templates: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**|  | [optional] [default to 20]
 **cursor** | **str**|  | [optional] 

### Return type

[**TemplatePage**](TemplatePage.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Paginated list of templates. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **promote_template**
> PromotionResult promote_template(key, promote_template_request=promote_template_request)

Promote a template from Test to Live

Copies the template — and all of its channel bodies — from the Test environment into Live, matched by `key`: created when the key does not yet exist in Live, otherwise overwritten. With `dry_run` the diff is returned without writing. A promotion whose result is `identical` is a no-op. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.promote_template_request import PromoteTemplateRequest
from notifyservice_api.models.promotion_result import PromotionResult
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    key = 'key_example' # str | 
    promote_template_request = notifyservice_api.PromoteTemplateRequest() # PromoteTemplateRequest |  (optional)

    try:
        # Promote a template from Test to Live
        api_response = api_instance.promote_template(key, promote_template_request=promote_template_request)
        print("The response of TemplatesApi->promote_template:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->promote_template: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**|  | 
 **promote_template_request** | [**PromoteTemplateRequest**](PromoteTemplateRequest.md)|  | [optional] 

### Return type

[**PromotionResult**](PromotionResult.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Promotion result. The diff is returned for both dry runs and applied promotions. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **put_template_channel_body**
> TemplateChannelBodyResponse put_template_channel_body(id, channel, put_template_body_request)

Create or replace a channel body for a template

Upserts the body for the given channel. `channel` must be one of: `email`, `in_app`, `sms`, `slack`, `teams`, `discord`. Returns `200 OK` when updating an existing body; `201 Created` when creating one for the first time. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.notification_channel_kebab import NotificationChannelKebab
from notifyservice_api.models.put_template_body_request import PutTemplateBodyRequest
from notifyservice_api.models.template_channel_body_response import TemplateChannelBodyResponse
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    id = 'id_example' # str | 
    channel = notifyservice_api.NotificationChannelKebab() # NotificationChannelKebab | 
    put_template_body_request = notifyservice_api.PutTemplateBodyRequest() # PutTemplateBodyRequest | 

    try:
        # Create or replace a channel body for a template
        api_response = api_instance.put_template_channel_body(id, channel, put_template_body_request)
        print("The response of TemplatesApi->put_template_channel_body:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->put_template_channel_body: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **channel** | [**NotificationChannelKebab**](.md)|  | 
 **put_template_body_request** | [**PutTemplateBodyRequest**](PutTemplateBodyRequest.md)|  | 

### Return type

[**TemplateChannelBodyResponse**](TemplateChannelBodyResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Body updated. |  -  |
**201** | Body created. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **render_template**
> RenderTemplateResponse render_template(key, render_template_request)

Render a template with sample data (does not send)

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.render_template_request import RenderTemplateRequest
from notifyservice_api.models.render_template_response import RenderTemplateResponse
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    key = 'key_example' # str | 
    render_template_request = notifyservice_api.RenderTemplateRequest() # RenderTemplateRequest | 

    try:
        # Render a template with sample data (does not send)
        api_response = api_instance.render_template(key, render_template_request)
        print("The response of TemplatesApi->render_template:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->render_template: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**|  | 
 **render_template_request** | [**RenderTemplateRequest**](RenderTemplateRequest.md)|  | 

### Return type

[**RenderTemplateResponse**](RenderTemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Rendered output. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_template**
> TemplateResponse update_template(key, update_template_request)

Update fields on an existing template

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.template_response import TemplateResponse
from notifyservice_api.models.update_template_request import UpdateTemplateRequest
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
    api_instance = notifyservice_api.TemplatesApi(api_client)
    key = 'key_example' # str | 
    update_template_request = notifyservice_api.UpdateTemplateRequest() # UpdateTemplateRequest | 

    try:
        # Update fields on an existing template
        api_response = api_instance.update_template(key, update_template_request)
        print("The response of TemplatesApi->update_template:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TemplatesApi->update_template: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**|  | 
 **update_template_request** | [**UpdateTemplateRequest**](UpdateTemplateRequest.md)|  | 

### Return type

[**TemplateResponse**](TemplateResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated template. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

