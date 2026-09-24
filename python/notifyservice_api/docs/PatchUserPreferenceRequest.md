# PatchUserPreferenceRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**opted_in** | **bool** |  | 

## Example

```python
from notifyservice_api.models.patch_user_preference_request import PatchUserPreferenceRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PatchUserPreferenceRequest from a JSON string
patch_user_preference_request_instance = PatchUserPreferenceRequest.from_json(json)
# print the JSON string representation of the object
print(PatchUserPreferenceRequest.to_json())

# convert the object into a dict
patch_user_preference_request_dict = patch_user_preference_request_instance.to_dict()
# create an instance of PatchUserPreferenceRequest from a dict
patch_user_preference_request_from_dict = PatchUserPreferenceRequest.from_dict(patch_user_preference_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


