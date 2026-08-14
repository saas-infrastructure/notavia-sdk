# UpdateSmsSettingsRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **str** |  | 
**from_number** | **str** |  | [optional] 
**from_sender_id** | **str** |  | [optional] 
**twilio_account_sid** | **str** |  | [optional] 
**twilio_auth_token** | **str** |  | [optional] 
**vonage_api_key** | **str** |  | [optional] 
**vonage_api_secret** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.update_sms_settings_request import UpdateSmsSettingsRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateSmsSettingsRequest from a JSON string
update_sms_settings_request_instance = UpdateSmsSettingsRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateSmsSettingsRequest.to_json())

# convert the object into a dict
update_sms_settings_request_dict = update_sms_settings_request_instance.to_dict()
# create an instance of UpdateSmsSettingsRequest from a dict
update_sms_settings_request_from_dict = UpdateSmsSettingsRequest.from_dict(update_sms_settings_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


