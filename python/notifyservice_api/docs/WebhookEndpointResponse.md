# WebhookEndpointResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**url** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**event_filters** | **List[str]** |  | [optional] 
**description** | **str** |  | [optional] 
**timeout_seconds** | **int** |  | [optional] 
**signing_secret_prefix** | **str** | First 8 characters of the signing secret for recognition only — full secret shown only at creation/rotation. | [optional] 
**created_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.webhook_endpoint_response import WebhookEndpointResponse

# TODO update the JSON string below
json = "{}"
# create an instance of WebhookEndpointResponse from a JSON string
webhook_endpoint_response_instance = WebhookEndpointResponse.from_json(json)
# print the JSON string representation of the object
print(WebhookEndpointResponse.to_json())

# convert the object into a dict
webhook_endpoint_response_dict = webhook_endpoint_response_instance.to_dict()
# create an instance of WebhookEndpointResponse from a dict
webhook_endpoint_response_from_dict = WebhookEndpointResponse.from_dict(webhook_endpoint_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


