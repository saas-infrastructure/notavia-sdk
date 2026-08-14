# DiscoverSso200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**has_sso** | **bool** |  | 
**protocol** | **str** |  | [optional] 
**org_name** | **str** |  | [optional] 
**force_sso** | **bool** |  | 

## Example

```python
from notifyservice_api.models.discover_sso200_response import DiscoverSso200Response

# TODO update the JSON string below
json = "{}"
# create an instance of DiscoverSso200Response from a JSON string
discover_sso200_response_instance = DiscoverSso200Response.from_json(json)
# print the JSON string representation of the object
print(DiscoverSso200Response.to_json())

# convert the object into a dict
discover_sso200_response_dict = discover_sso200_response_instance.to_dict()
# create an instance of DiscoverSso200Response from a dict
discover_sso200_response_from_dict = DiscoverSso200Response.from_dict(discover_sso200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


