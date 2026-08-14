# UpdateSlackInstallationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**auto_join_public_channels** | **bool** |  | 

## Example

```python
from notifyservice_api.models.update_slack_installation_request import UpdateSlackInstallationRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateSlackInstallationRequest from a JSON string
update_slack_installation_request_instance = UpdateSlackInstallationRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateSlackInstallationRequest.to_json())

# convert the object into a dict
update_slack_installation_request_dict = update_slack_installation_request_instance.to_dict()
# create an instance of UpdateSlackInstallationRequest from a dict
update_slack_installation_request_from_dict = UpdateSlackInstallationRequest.from_dict(update_slack_installation_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


