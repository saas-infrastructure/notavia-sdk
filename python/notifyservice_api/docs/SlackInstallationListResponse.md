# SlackInstallationListResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[SlackInstallationResponse]**](SlackInstallationResponse.md) |  | [optional] 

## Example

```python
from notifyservice_api.models.slack_installation_list_response import SlackInstallationListResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SlackInstallationListResponse from a JSON string
slack_installation_list_response_instance = SlackInstallationListResponse.from_json(json)
# print the JSON string representation of the object
print(SlackInstallationListResponse.to_json())

# convert the object into a dict
slack_installation_list_response_dict = slack_installation_list_response_instance.to_dict()
# create an instance of SlackInstallationListResponse from a dict
slack_installation_list_response_from_dict = SlackInstallationListResponse.from_dict(slack_installation_list_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


