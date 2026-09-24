# WebhookEndpointListResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[WebhookEndpointResponse]**](WebhookEndpointResponse.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.webhook_endpoint_list_response import WebhookEndpointListResponse

# TODO update the JSON string below
json = "{}"
# create an instance of WebhookEndpointListResponse from a JSON string
webhook_endpoint_list_response_instance = WebhookEndpointListResponse.from_json(json)
# print the JSON string representation of the object
print(WebhookEndpointListResponse.to_json())

# convert the object into a dict
webhook_endpoint_list_response_dict = webhook_endpoint_list_response_instance.to_dict()
# create an instance of WebhookEndpointListResponse from a dict
webhook_endpoint_list_response_from_dict = WebhookEndpointListResponse.from_dict(webhook_endpoint_list_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


