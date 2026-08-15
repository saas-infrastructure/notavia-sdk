# VerifyTokenResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**external_user_id** | **str** |  | [optional] 
**organization_id** | **str** |  | [optional] 
**environment_id** | **str** |  | [optional] 

## Example

```python
from notifyservice_api.models.verify_token_response import VerifyTokenResponse

# TODO update the JSON string below
json = "{}"
# create an instance of VerifyTokenResponse from a JSON string
verify_token_response_instance = VerifyTokenResponse.from_json(json)
# print the JSON string representation of the object
print(VerifyTokenResponse.to_json())

# convert the object into a dict
verify_token_response_dict = verify_token_response_instance.to_dict()
# create an instance of VerifyTokenResponse from a dict
verify_token_response_from_dict = VerifyTokenResponse.from_dict(verify_token_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


