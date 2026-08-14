# BulkSetUserPreferencesRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**preferences** | [**List[BulkSetUserPreferencesRequestPreferencesInner]**](BulkSetUserPreferencesRequestPreferencesInner.md) |  | 

## Example

```python
from notifyservice_api.models.bulk_set_user_preferences_request import BulkSetUserPreferencesRequest

# TODO update the JSON string below
json = "{}"
# create an instance of BulkSetUserPreferencesRequest from a JSON string
bulk_set_user_preferences_request_instance = BulkSetUserPreferencesRequest.from_json(json)
# print the JSON string representation of the object
print(BulkSetUserPreferencesRequest.to_json())

# convert the object into a dict
bulk_set_user_preferences_request_dict = bulk_set_user_preferences_request_instance.to_dict()
# create an instance of BulkSetUserPreferencesRequest from a dict
bulk_set_user_preferences_request_from_dict = BulkSetUserPreferencesRequest.from_dict(bulk_set_user_preferences_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


