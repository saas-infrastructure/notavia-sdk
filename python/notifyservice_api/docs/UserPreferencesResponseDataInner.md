# UserPreferencesResponseDataInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**category_key** | **str** |  | [optional] 
**channel** | [**NotificationChannel**](NotificationChannel.md) |  | [optional] 
**opted_in** | **bool** |  | [optional] 

## Example

```python
from notifyservice_api.models.user_preferences_response_data_inner import UserPreferencesResponseDataInner

# TODO update the JSON string below
json = "{}"
# create an instance of UserPreferencesResponseDataInner from a JSON string
user_preferences_response_data_inner_instance = UserPreferencesResponseDataInner.from_json(json)
# print the JSON string representation of the object
print(UserPreferencesResponseDataInner.to_json())

# convert the object into a dict
user_preferences_response_data_inner_dict = user_preferences_response_data_inner_instance.to_dict()
# create an instance of UserPreferencesResponseDataInner from a dict
user_preferences_response_data_inner_from_dict = UserPreferencesResponseDataInner.from_dict(user_preferences_response_data_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


