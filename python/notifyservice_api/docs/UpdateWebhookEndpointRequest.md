# UpdateWebhookEndpointRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**url** | **str** |  | [optional] 
**event_filters** | **List[str]** |  | [optional] 
**description** | **str** |  | [optional] 
**timeout_seconds** | **int** |  | [optional] 
**status** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.update_webhook_endpoint_request import UpdateWebhookEndpointRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateWebhookEndpointRequest from a JSON string
update_webhook_endpoint_request_instance = UpdateWebhookEndpointRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateWebhookEndpointRequest.to_json())

# convert the object into a dict
update_webhook_endpoint_request_dict = update_webhook_endpoint_request_instance.to_dict()
# create an instance of UpdateWebhookEndpointRequest from a dict
update_webhook_endpoint_request_from_dict = UpdateWebhookEndpointRequest.from_dict(update_webhook_endpoint_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


