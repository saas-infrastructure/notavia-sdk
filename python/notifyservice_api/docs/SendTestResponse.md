# SendTestResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**notification_id** | **str** |  | 

## Example

```python
from notifyservice_api.models.send_test_response import SendTestResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SendTestResponse from a JSON string
send_test_response_instance = SendTestResponse.from_json(json)
# print the JSON string representation of the object
print(SendTestResponse.to_json())

# convert the object into a dict
send_test_response_dict = send_test_response_instance.to_dict()
# create an instance of SendTestResponse from a dict
send_test_response_from_dict = SendTestResponse.from_dict(send_test_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


