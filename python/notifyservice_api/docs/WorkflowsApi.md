# notifyservice_api.WorkflowsApi

All URIs are relative to *https://your-notavia-host*

Method | HTTP request | Description
------------- | ------------- | -------------
[**activate_workflow_version**](WorkflowsApi.md#activate_workflow_version) | **POST** /v1/workflows/{key}/versions/{n}/activate | Activate a draft version (or dry-run validate it)
[**cancel_workflow_run**](WorkflowsApi.md#cancel_workflow_run) | **POST** /v1/workflows/runs/{runId}/cancel | Cancel an in-progress run
[**create_workflow**](WorkflowsApi.md#create_workflow) | **POST** /v1/workflows | Create a new workflow
[**create_workflow_version**](WorkflowsApi.md#create_workflow_version) | **POST** /v1/workflows/{key}/versions | Create a new draft version
[**disable_workflow**](WorkflowsApi.md#disable_workflow) | **DELETE** /v1/workflows/{key} | Disable a workflow
[**get_workflow**](WorkflowsApi.md#get_workflow) | **GET** /v1/workflows/{key} | Get a workflow by key
[**get_workflow_run**](WorkflowsApi.md#get_workflow_run) | **GET** /v1/workflows/runs/{runId} | Get a run with the full step timeline
[**get_workflow_version**](WorkflowsApi.md#get_workflow_version) | **GET** /v1/workflows/{key}/versions/{n} | Get a specific workflow version
[**list_workflow_runs**](WorkflowsApi.md#list_workflow_runs) | **GET** /v1/workflows/{key}/runs | List runs for a workflow with cursor pagination
[**list_workflow_versions**](WorkflowsApi.md#list_workflow_versions) | **GET** /v1/workflows/{key}/versions | List all versions of a workflow
[**list_workflows**](WorkflowsApi.md#list_workflows) | **GET** /v1/workflows | List all workflows in the environment
[**post_run_event**](WorkflowsApi.md#post_run_event) | **POST** /v1/workflows/runs/{runId}/events | Post an event to a specific run
[**post_workflow_key_event**](WorkflowsApi.md#post_workflow_key_event) | **POST** /v1/workflows/{key}/events | Post an event to all waiting runs of a workflow
[**promote_workflow**](WorkflowsApi.md#promote_workflow) | **POST** /v1/workflows/{key}/promote | Promote a workflow&#39;s active version from Test to Live
[**trigger_workflow**](WorkflowsApi.md#trigger_workflow) | **POST** /v1/workflows/{key}/trigger | Trigger a workflow run


# **activate_workflow_version**
> ActivateWorkflowVersionResponse activate_workflow_version(key, n, dry_run=dry_run)

Activate a draft version (or dry-run validate it)

Runs the full semantic validator against the version body. If `dry_run=true` the result is returned without persisting the status change — useful for the dashboard \"Validate\" button. Without `dry_run`, a valid version is promoted to `Active` and the previous active version (if any) is deactivated. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.activate_workflow_version_response import ActivateWorkflowVersionResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    n = 56 # int | 
    dry_run = False # bool | If true, validate without changing persistent state. (optional) (default to False)

    try:
        # Activate a draft version (or dry-run validate it)
        api_response = api_instance.activate_workflow_version(key, n, dry_run=dry_run)
        print("The response of WorkflowsApi->activate_workflow_version:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->activate_workflow_version: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **n** | **int**|  | 
 **dry_run** | **bool**| If true, validate without changing persistent state. | [optional] [default to False]

### Return type

[**ActivateWorkflowVersionResponse**](ActivateWorkflowVersionResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Validation result (always returned; &#x60;valid&#x60; indicates whether activation succeeded). |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **cancel_workflow_run**
> CancelWorkflowRun200Response cancel_workflow_run(run_id)

Cancel an in-progress run

Transitions the run to `Cancelling` (or immediately `Cancelled` if already in a terminal-adjacent state). Any scheduled `wait_for_event` timeout jobs are cancelled. Running Hangfire step jobs detect the cancellation flag and terminate cleanly. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.cancel_workflow_run200_response import CancelWorkflowRun200Response
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    run_id = 'run_id_example' # str | 

    try:
        # Cancel an in-progress run
        api_response = api_instance.cancel_workflow_run(run_id)
        print("The response of WorkflowsApi->cancel_workflow_run:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->cancel_workflow_run: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **run_id** | **str**|  | 

### Return type

[**CancelWorkflowRun200Response**](CancelWorkflowRun200Response.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Cancellation requested; current status returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_workflow**
> Workflow create_workflow(create_workflow_request)

Create a new workflow

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.create_workflow_request import CreateWorkflowRequest
from notifyservice_api.models.workflow import Workflow
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    create_workflow_request = notifyservice_api.CreateWorkflowRequest() # CreateWorkflowRequest | 

    try:
        # Create a new workflow
        api_response = api_instance.create_workflow(create_workflow_request)
        print("The response of WorkflowsApi->create_workflow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->create_workflow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_workflow_request** | [**CreateWorkflowRequest**](CreateWorkflowRequest.md)|  | 

### Return type

[**Workflow**](Workflow.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Workflow created. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_workflow_version**
> WorkflowVersion create_workflow_version(key, create_workflow_version_request)

Create a new draft version

Parses the supplied JSON body against the workflow DSL. Returns the new version number. The version is left in `Draft` status; call `activate` to promote it. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.create_workflow_version_request import CreateWorkflowVersionRequest
from notifyservice_api.models.workflow_version import WorkflowVersion
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    create_workflow_version_request = notifyservice_api.CreateWorkflowVersionRequest() # CreateWorkflowVersionRequest | 

    try:
        # Create a new draft version
        api_response = api_instance.create_workflow_version(key, create_workflow_version_request)
        print("The response of WorkflowsApi->create_workflow_version:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->create_workflow_version: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **create_workflow_version_request** | [**CreateWorkflowVersionRequest**](CreateWorkflowVersionRequest.md)|  | 

### Return type

[**WorkflowVersion**](WorkflowVersion.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Draft version created. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **disable_workflow**
> disable_workflow(key)

Disable a workflow

Sets the workflow status to `Disabled`. Running runs continue to completion; new triggers are rejected with `404`. 

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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.

    try:
        # Disable a workflow
        api_instance.disable_workflow(key)
    except Exception as e:
        print("Exception when calling WorkflowsApi->disable_workflow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

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
**204** | Workflow disabled. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_workflow**
> WorkflowDetailResponse get_workflow(key)

Get a workflow by key

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.workflow_detail_response import WorkflowDetailResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.

    try:
        # Get a workflow by key
        api_response = api_instance.get_workflow(key)
        print("The response of WorkflowsApi->get_workflow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->get_workflow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Return type

[**WorkflowDetailResponse**](WorkflowDetailResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Workflow detail returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_workflow_run**
> WorkflowRunResponse get_workflow_run(run_id)

Get a run with the full step timeline

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.workflow_run_response import WorkflowRunResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    run_id = 'run_id_example' # str | 

    try:
        # Get a run with the full step timeline
        api_response = api_instance.get_workflow_run(run_id)
        print("The response of WorkflowsApi->get_workflow_run:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->get_workflow_run: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **run_id** | **str**|  | 

### Return type

[**WorkflowRunResponse**](WorkflowRunResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Run detail with step timeline returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_workflow_version**
> WorkflowVersionDetail get_workflow_version(key, n)

Get a specific workflow version

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.workflow_version_detail import WorkflowVersionDetail
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    n = 56 # int | 

    try:
        # Get a specific workflow version
        api_response = api_instance.get_workflow_version(key, n)
        print("The response of WorkflowsApi->get_workflow_version:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->get_workflow_version: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **n** | **int**|  | 

### Return type

[**WorkflowVersionDetail**](WorkflowVersionDetail.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Version detail returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_workflow_runs**
> ListWorkflowRunsResponse list_workflow_runs(key, status=status, external_user_id=external_user_id, page_token=page_token)

List runs for a workflow with cursor pagination

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.list_workflow_runs_response import ListWorkflowRunsResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    status = 'status_example' # str |  (optional)
    external_user_id = 'external_user_id_example' # str | Filter runs whose trigger data contains this `external_user_id`. (optional)
    page_token = 'page_token_example' # str | Opaque cursor returned by a previous list response. (optional)

    try:
        # List runs for a workflow with cursor pagination
        api_response = api_instance.list_workflow_runs(key, status=status, external_user_id=external_user_id, page_token=page_token)
        print("The response of WorkflowsApi->list_workflow_runs:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->list_workflow_runs: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **status** | **str**|  | [optional] 
 **external_user_id** | **str**| Filter runs whose trigger data contains this &#x60;external_user_id&#x60;. | [optional] 
 **page_token** | **str**| Opaque cursor returned by a previous list response. | [optional] 

### Return type

[**ListWorkflowRunsResponse**](ListWorkflowRunsResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Paginated run list returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_workflow_versions**
> ListWorkflowVersions200Response list_workflow_versions(key)

List all versions of a workflow

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.list_workflow_versions200_response import ListWorkflowVersions200Response
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.

    try:
        # List all versions of a workflow
        api_response = api_instance.list_workflow_versions(key)
        print("The response of WorkflowsApi->list_workflow_versions:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->list_workflow_versions: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 

### Return type

[**ListWorkflowVersions200Response**](ListWorkflowVersions200Response.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Version list returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_workflows**
> ListWorkflows200Response list_workflows()

List all workflows in the environment

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.list_workflows200_response import ListWorkflows200Response
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)

    try:
        # List all workflows in the environment
        api_response = api_instance.list_workflows()
        print("The response of WorkflowsApi->list_workflows:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->list_workflows: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**ListWorkflows200Response**](ListWorkflows200Response.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Workflow list returned. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_run_event**
> PostWorkflowEventResponse post_run_event(run_id, post_workflow_event_request)

Post an event to a specific run

Delivers `event_name` to a single run. Wakes the run if it is currently paused on a `wait_for_event` step whose `event` and `match` filter matches the posted data. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.post_workflow_event_request import PostWorkflowEventRequest
from notifyservice_api.models.post_workflow_event_response import PostWorkflowEventResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    run_id = 'run_id_example' # str | 
    post_workflow_event_request = notifyservice_api.PostWorkflowEventRequest() # PostWorkflowEventRequest | 

    try:
        # Post an event to a specific run
        api_response = api_instance.post_run_event(run_id, post_workflow_event_request)
        print("The response of WorkflowsApi->post_run_event:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->post_run_event: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **run_id** | **str**|  | 
 **post_workflow_event_request** | [**PostWorkflowEventRequest**](PostWorkflowEventRequest.md)|  | 

### Return type

[**PostWorkflowEventResponse**](PostWorkflowEventResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Event delivered; awoken run count returned. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_workflow_key_event**
> PostWorkflowEventResponse post_workflow_key_event(key, post_workflow_event_request)

Post an event to all waiting runs of a workflow

Delivers `event_name` to every run of this workflow currently in `Waiting` status (paused on a `wait_for_event` step whose `event` and `match` filter matches). Returns the number of runs awoken. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.post_workflow_event_request import PostWorkflowEventRequest
from notifyservice_api.models.post_workflow_event_response import PostWorkflowEventResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    post_workflow_event_request = notifyservice_api.PostWorkflowEventRequest() # PostWorkflowEventRequest | 

    try:
        # Post an event to all waiting runs of a workflow
        api_response = api_instance.post_workflow_key_event(key, post_workflow_event_request)
        print("The response of WorkflowsApi->post_workflow_key_event:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->post_workflow_key_event: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **post_workflow_event_request** | [**PostWorkflowEventRequest**](PostWorkflowEventRequest.md)|  | 

### Return type

[**PostWorkflowEventResponse**](PostWorkflowEventResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Event delivered; awoken run count returned. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **promote_workflow**
> PromotionResult promote_workflow(key, promote_workflow_request=promote_workflow_request)

Promote a workflow's active version from Test to Live

Promotes the currently active Test version of the workflow into Live as a new version and activates it; the previous Live version is retained for rollback. Referenced templates that are missing or out of date in Live can be promoted in the same atomic operation via `include_templates`. With `dry_run` the diff and cascade candidates are returned without writing. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.promote_workflow_request import PromoteWorkflowRequest
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    promote_workflow_request = notifyservice_api.PromoteWorkflowRequest() # PromoteWorkflowRequest |  (optional)

    try:
        # Promote a workflow's active version from Test to Live
        api_response = api_instance.promote_workflow(key, promote_workflow_request=promote_workflow_request)
        print("The response of WorkflowsApi->promote_workflow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->promote_workflow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **promote_workflow_request** | [**PromoteWorkflowRequest**](PromoteWorkflowRequest.md)|  | [optional] 

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
**409** | Conflict (e.g. duplicate key, idempotency collision). |  -  |
**422** | The promoted version failed semantic validation against the Live environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **trigger_workflow**
> WorkflowTriggerResponse trigger_workflow(key, workflow_trigger_request, idempotency_key=idempotency_key)

Trigger a workflow run

Creates a new `WorkflowRun` and enqueues the first step for execution. Idempotent when an `Idempotency-Key` header is supplied — re-sending the same key within 24 hours returns the original run without re-triggering. 

### Example

* Bearer Authentication (apiKey):

```python
import notifyservice_api
from notifyservice_api.models.workflow_trigger_request import WorkflowTriggerRequest
from notifyservice_api.models.workflow_trigger_response import WorkflowTriggerResponse
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
    api_instance = notifyservice_api.WorkflowsApi(api_client)
    key = 'key_example' # str | Workflow key — lowercase alphanumeric + underscore, max 100 chars.
    workflow_trigger_request = {"trigger_data":{"invoice_id":"inv_42","amount_cents":9900,"user":{"external_user_id":"usr_1","email":"alice@example.com","phone":"+15005550006","name":"Alice"}}} # WorkflowTriggerRequest | 
    idempotency_key = 'idempotency_key_example' # str | Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  (optional)

    try:
        # Trigger a workflow run
        api_response = api_instance.trigger_workflow(key, workflow_trigger_request, idempotency_key=idempotency_key)
        print("The response of WorkflowsApi->trigger_workflow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorkflowsApi->trigger_workflow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **str**| Workflow key — lowercase alphanumeric + underscore, max 100 chars. | 
 **workflow_trigger_request** | [**WorkflowTriggerRequest**](WorkflowTriggerRequest.md)|  | 
 **idempotency_key** | **str**| Client-generated key (UUID recommended). Repeat requests with the same key within 24 hours return the original response without re-sending.  | [optional] 

### Return type

[**WorkflowTriggerResponse**](WorkflowTriggerResponse.md)

### Authorization

[apiKey](../README.md#apiKey)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Run created and first step enqueued. |  -  |
**200** | Idempotent replay — existing run returned. |  -  |
**400** | Validation or request error. |  -  |
**401** | Missing or invalid credentials. |  -  |
**403** | Credentials do not have the required scope. |  -  |
**404** | Resource not found. |  -  |
**422** | Trigger data failed &#x60;trigger_data_schema&#x60; validation. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

