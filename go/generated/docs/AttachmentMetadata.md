# AttachmentMetadata

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Filename** | Pointer to **string** | Original file name. | [optional] 
**ContentType** | Pointer to **string** | MIME type of the file. | [optional] 
**SizeBytes** | Pointer to **int64** | File size in bytes. | [optional] 
**Purged** | Pointer to **bool** | True when the attachment bytes have been deleted from ephemeral storage after delivery. The metadata fields (filename, content_type, size_bytes) are always retained.  | [optional] 

## Methods

### NewAttachmentMetadata

`func NewAttachmentMetadata() *AttachmentMetadata`

NewAttachmentMetadata instantiates a new AttachmentMetadata object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAttachmentMetadataWithDefaults

`func NewAttachmentMetadataWithDefaults() *AttachmentMetadata`

NewAttachmentMetadataWithDefaults instantiates a new AttachmentMetadata object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetFilename

`func (o *AttachmentMetadata) GetFilename() string`

GetFilename returns the Filename field if non-nil, zero value otherwise.

### GetFilenameOk

`func (o *AttachmentMetadata) GetFilenameOk() (*string, bool)`

GetFilenameOk returns a tuple with the Filename field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFilename

`func (o *AttachmentMetadata) SetFilename(v string)`

SetFilename sets Filename field to given value.

### HasFilename

`func (o *AttachmentMetadata) HasFilename() bool`

HasFilename returns a boolean if a field has been set.

### GetContentType

`func (o *AttachmentMetadata) GetContentType() string`

GetContentType returns the ContentType field if non-nil, zero value otherwise.

### GetContentTypeOk

`func (o *AttachmentMetadata) GetContentTypeOk() (*string, bool)`

GetContentTypeOk returns a tuple with the ContentType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContentType

`func (o *AttachmentMetadata) SetContentType(v string)`

SetContentType sets ContentType field to given value.

### HasContentType

`func (o *AttachmentMetadata) HasContentType() bool`

HasContentType returns a boolean if a field has been set.

### GetSizeBytes

`func (o *AttachmentMetadata) GetSizeBytes() int64`

GetSizeBytes returns the SizeBytes field if non-nil, zero value otherwise.

### GetSizeBytesOk

`func (o *AttachmentMetadata) GetSizeBytesOk() (*int64, bool)`

GetSizeBytesOk returns a tuple with the SizeBytes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSizeBytes

`func (o *AttachmentMetadata) SetSizeBytes(v int64)`

SetSizeBytes sets SizeBytes field to given value.

### HasSizeBytes

`func (o *AttachmentMetadata) HasSizeBytes() bool`

HasSizeBytes returns a boolean if a field has been set.

### GetPurged

`func (o *AttachmentMetadata) GetPurged() bool`

GetPurged returns the Purged field if non-nil, zero value otherwise.

### GetPurgedOk

`func (o *AttachmentMetadata) GetPurgedOk() (*bool, bool)`

GetPurgedOk returns a tuple with the Purged field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPurged

`func (o *AttachmentMetadata) SetPurged(v bool)`

SetPurged sets Purged field to given value.

### HasPurged

`func (o *AttachmentMetadata) HasPurged() bool`

HasPurged returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


