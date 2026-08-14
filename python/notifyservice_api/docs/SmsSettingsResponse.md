# SmsSettingsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**kind** | **str** |  | [optional] 
**from_number** | **str** |  | [optional] 
**from_sender_id** | **str** |  | [optional] 
**credentials_validated** | **bool** |  | [optional] 
**credentials_validated_at** | **datetime** |  | [optional] 

## Example

```python
from notifyservice_api.models.sms_settings_response import SmsSettingsResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SmsSettingsResponse from a JSON string
sms_settings_response_instance = SmsSettingsResponse.from_json(json)
# print the JSON string representation of the object
print(SmsSettingsResponse.to_json())

# convert the object into a dict
sms_settings_response_dict = sms_settings_response_instance.to_dict()
# create an instance of SmsSettingsResponse from a dict
sms_settings_response_from_dict = SmsSettingsResponse.from_dict(sms_settings_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


