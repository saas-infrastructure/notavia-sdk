# BulkSetUserPreferencesRequestPreferencesInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**category_key** | **str** |  | 
**channel** | [**NotificationChannel**](NotificationChannel.md) |  | 
**opted_in** | **bool** |  | 

## Example

```python
from notifyservice_api.models.bulk_set_user_preferences_request_preferences_inner import BulkSetUserPreferencesRequestPreferencesInner

# TODO update the JSON string below
json = "{}"
# create an instance of BulkSetUserPreferencesRequestPreferencesInner from a JSON string
bulk_set_user_preferences_request_preferences_inner_instance = BulkSetUserPreferencesRequestPreferencesInner.from_json(json)
# print the JSON string representation of the object
print(BulkSetUserPreferencesRequestPreferencesInner.to_json())

# convert the object into a dict
bulk_set_user_preferences_request_preferences_inner_dict = bulk_set_user_preferences_request_preferences_inner_instance.to_dict()
# create an instance of BulkSetUserPreferencesRequestPreferencesInner from a dict
bulk_set_user_preferences_request_preferences_inner_from_dict = BulkSetUserPreferencesRequestPreferencesInner.from_dict(bulk_set_user_preferences_request_preferences_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


