# UsageResponse

Current-period live usage and resolved plan limits.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**plan** | **str** | Resolved plan key (e.g. &#x60;free&#x60;, &#x60;oem&#x60;). | 
**period_start** | **datetime** | Inclusive UTC start of the current billing period (first of the month). | 
**period_end** | **datetime** | Exclusive UTC end of the current billing period (first of the next month). | 
**included_sends** | **int** | Monthly included send allowance, or null for unmetered plans. | [optional] 
**used_sends** | **int** | Live (non-test) sends consumed in the current period. | 
**remaining_sends** | **int** | Sends remaining before the cap, or null when there is no cap. | [optional] 
**hard_limit** | **bool** | When true, sends are rejected once the included allowance is exhausted. | 
**by_channel** | **Dict[str, int]** | Live sends consumed in the current period, keyed by lowercase channel name. | 

## Example

```python
from notifyservice_api.models.usage_response import UsageResponse

# TODO update the JSON string below
json = "{}"
# create an instance of UsageResponse from a JSON string
usage_response_instance = UsageResponse.from_json(json)
# print the JSON string representation of the object
print(UsageResponse.to_json())

# convert the object into a dict
usage_response_dict = usage_response_instance.to_dict()
# create an instance of UsageResponse from a dict
usage_response_from_dict = UsageResponse.from_dict(usage_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


