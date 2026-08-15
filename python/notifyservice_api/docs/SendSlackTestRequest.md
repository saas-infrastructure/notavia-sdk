# SendSlackTestRequest

At least one of `slack_user_id` or `slack_channel_id` must be provided.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**slack_user_id** | **str** | Deliver as a DM to this Slack user id. | [optional] 
**slack_channel_id** | **str** | Post to this Slack channel id. | [optional] 

## Example

```python
from notifyservice_api.models.send_slack_test_request import SendSlackTestRequest

# TODO update the JSON string below
json = "{}"
# create an instance of SendSlackTestRequest from a JSON string
send_slack_test_request_instance = SendSlackTestRequest.from_json(json)
# print the JSON string representation of the object
print(SendSlackTestRequest.to_json())

# convert the object into a dict
send_slack_test_request_dict = send_slack_test_request_instance.to_dict()
# create an instance of SendSlackTestRequest from a dict
send_slack_test_request_from_dict = SendSlackTestRequest.from_dict(send_slack_test_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


