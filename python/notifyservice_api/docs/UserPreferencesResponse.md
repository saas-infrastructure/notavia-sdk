# UserPreferencesResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[UserPreferencesResponseDataInner]**](UserPreferencesResponseDataInner.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.user_preferences_response import UserPreferencesResponse

# TODO update the JSON string below
json = "{}"
# create an instance of UserPreferencesResponse from a JSON string
user_preferences_response_instance = UserPreferencesResponse.from_json(json)
# print the JSON string representation of the object
print(UserPreferencesResponse.to_json())

# convert the object into a dict
user_preferences_response_dict = user_preferences_response_instance.to_dict()
# create an instance of UserPreferencesResponse from a dict
user_preferences_response_from_dict = UserPreferencesResponse.from_dict(user_preferences_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


