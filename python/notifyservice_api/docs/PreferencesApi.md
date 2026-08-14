# notifyservice_api.PreferencesApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**archive_category**](PreferencesApi.md#archive_category) | **DELETE** /v1/preferences/categories/{key} | Archive a notification category
[**bulk_set_user_preferences**](PreferencesApi.md#bulk_set_user_preferences) | **PUT** /v1/preferences/users/{externalUserId} | Bulk-upsert preference cells for a user
[**create_category**](PreferencesApi.md#create_category) | **POST** /v1/preferences/categories | Create a notification category
[**get_user_preferences**](PreferencesApi.md#get_user_preferences) | **GET** /v1/preferences/users/{externalUserId} | Get effective preferences for a user
[**list_categories**](PreferencesApi.md#list_categories) | **GET** /v1/preferences/categories | List notification categories
[**patch_user_preference**](PreferencesApi.md#patch_user_preference) | **PATCH** /v1/preferences/users/{externalUserId}/{categoryKey}/{channel} | Set a single preference cell for a user
[**update_category**](PreferencesApi.md#update_category) | **PUT** /v1/preferences/categories/{key} | Update a notification category


# **archive_category**
> archive_category(key)

Archive a notification category

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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    key = 'key_example' # str | 

    try:
        # Archive a notification category
        api_instance.archive_category(key)
    except Exception as e:
        print("Exception when calling PreferencesApi->archive_category: %s\n" % e)
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
**204** | Archived. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **bulk_set_user_preferences**
> UserPreferencesResponse bulk_set_user_preferences(external_user_id, bulk_set_user_preferences_request)

Bulk-upsert preference cells for a user

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.bulk_set_user_preferences_request import BulkSetUserPreferencesRequest
from notifyservice_api.models.user_preferences_response import UserPreferencesResponse
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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    external_user_id = 'external_user_id_example' # str | 
    bulk_set_user_preferences_request = notifyservice_api.BulkSetUserPreferencesRequest() # BulkSetUserPreferencesRequest | 

    try:
        # Bulk-upsert preference cells for a user
        api_response = api_instance.bulk_set_user_preferences(external_user_id, bulk_set_user_preferences_request)
        print("The response of PreferencesApi->bulk_set_user_preferences:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PreferencesApi->bulk_set_user_preferences: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **external_user_id** | **str**|  | 
 **bulk_set_user_preferences_request** | [**BulkSetUserPreferencesRequest**](BulkSetUserPreferencesRequest.md)|  | 

### Return type

[**UserPreferencesResponse**](UserPreferencesResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated preferences. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_category**
> CategoryResponse create_category(create_category_request)

Create a notification category

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.category_response import CategoryResponse
from notifyservice_api.models.create_category_request import CreateCategoryRequest
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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    create_category_request = notifyservice_api.CreateCategoryRequest() # CreateCategoryRequest | 

    try:
        # Create a notification category
        api_response = api_instance.create_category(create_category_request)
        print("The response of PreferencesApi->create_category:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PreferencesApi->create_category: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_category_request** | [**CreateCategoryRequest**](CreateCategoryRequest.md)|  | 

### Return type

[**CategoryResponse**](CategoryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Category created. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_user_preferences**
> UserPreferencesResponse get_user_preferences(external_user_id)

Get effective preferences for a user

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.user_preferences_response import UserPreferencesResponse
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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    external_user_id = 'external_user_id_example' # str | 

    try:
        # Get effective preferences for a user
        api_response = api_instance.get_user_preferences(external_user_id)
        print("The response of PreferencesApi->get_user_preferences:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PreferencesApi->get_user_preferences: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **external_user_id** | **str**|  | 

### Return type

[**UserPreferencesResponse**](UserPreferencesResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Effective preferences. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_categories**
> CategoryListResponse list_categories(include_archived=include_archived)

List notification categories

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.category_list_response import CategoryListResponse
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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    include_archived = False # bool |  (optional) (default to False)

    try:
        # List notification categories
        api_response = api_instance.list_categories(include_archived=include_archived)
        print("The response of PreferencesApi->list_categories:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PreferencesApi->list_categories: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **include_archived** | **bool**|  | [optional] [default to False]

### Return type

[**CategoryListResponse**](CategoryListResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Categories list. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patch_user_preference**
> patch_user_preference(external_user_id, category_key, channel, patch_user_preference_request)

Set a single preference cell for a user

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.notification_channel_kebab import NotificationChannelKebab
from notifyservice_api.models.patch_user_preference_request import PatchUserPreferenceRequest
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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    external_user_id = 'external_user_id_example' # str | 
    category_key = 'category_key_example' # str | 
    channel = notifyservice_api.NotificationChannelKebab() # NotificationChannelKebab | 
    patch_user_preference_request = notifyservice_api.PatchUserPreferenceRequest() # PatchUserPreferenceRequest | 

    try:
        # Set a single preference cell for a user
        api_instance.patch_user_preference(external_user_id, category_key, channel, patch_user_preference_request)
    except Exception as e:
        print("Exception when calling PreferencesApi->patch_user_preference: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **external_user_id** | **str**|  | 
 **category_key** | **str**|  | 
 **channel** | [**NotificationChannelKebab**](.md)|  | 
 **patch_user_preference_request** | [**PatchUserPreferenceRequest**](PatchUserPreferenceRequest.md)|  | 

### Return type

void (empty response body)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated preference cell. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_category**
> CategoryResponse update_category(key, update_category_request)

Update a notification category

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.category_response import CategoryResponse
from notifyservice_api.models.update_category_request import UpdateCategoryRequest
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
    api_instance = notifyservice_api.PreferencesApi(api_client)
    key = 'key_example' # str | 
    update_category_request = notifyservice_api.UpdateCategoryRequest() # UpdateCategoryRequest | 

    try:
        # Update a notification category
        api_response = api_instance.update_category(key, update_category_request)
        print("The response of PreferencesApi->update_category:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PreferencesApi->update_category: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**|  | 
 **update_category_request** | [**UpdateCategoryRequest**](UpdateCategoryRequest.md)|  | 

### Return type

[**CategoryResponse**](CategoryResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Updated category. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

