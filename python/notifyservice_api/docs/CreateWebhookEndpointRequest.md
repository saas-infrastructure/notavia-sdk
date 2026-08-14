# CreateWebhookEndpointRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**url** | **str** |  | 
**event_filters** | **List[str]** | List of event types to deliver (empty means all events). | [optional] 
**description** | **str** |  | [optional] 
**timeout_seconds** | **int** |  | [optional] 

## Example

```python
from notifyservice_api.models.create_webhook_endpoint_request import CreateWebhookEndpointRequest

# TODO update the JSON string below
json = "{}"
# create an instance of CreateWebhookEndpointRequest from a JSON string
create_webhook_endpoint_request_instance = CreateWebhookEndpointRequest.from_json(json)
# print the JSON string representation of the object
print(CreateWebhookEndpointRequest.to_json())

# convert the object into a dict
create_webhook_endpoint_request_dict = create_webhook_endpoint_request_instance.to_dict()
# create an instance of CreateWebhookEndpointRequest from a dict
create_webhook_endpoint_request_from_dict = CreateWebhookEndpointRequest.from_dict(create_webhook_endpoint_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


