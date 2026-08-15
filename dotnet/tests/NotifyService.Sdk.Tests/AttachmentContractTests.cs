using System.Text.Json;
using FluentAssertions;
using NotifyService.Sdk.Internal;
using NotifyService.Sdk.Notifications;

namespace NotifyService.Sdk.Tests;

public class AttachmentContractTests
{
    [Fact]
    public void SendNotificationRequest_with_attachment_serializes_snake_case_keys()
    {
        var req = new SendNotificationRequest("email", new Recipient("alice@example.com"))
        {
            Subject = "Invoice",
            HtmlBody = "<p>See attached.</p>",
            Attachments =
            [
                new Attachment("invoice.pdf", "application/pdf", "SGVsbG8gV29ybGQ="),
            ],
        };

        string json = JsonSerializer.Serialize(req, NotifyJsonContext.Relaxed.SendNotificationRequest);

        json.Should().Contain("\"attachments\"");
        json.Should().Contain("\"filename\":\"invoice.pdf\"");
        json.Should().Contain("\"content_type\":\"application/pdf\"");
        json.Should().Contain("\"content_base64\":\"SGVsbG8gV29ybGQ=\"");
    }

    [Fact]
    public void SendNotificationRequest_without_attachments_omits_attachments_field()
    {
        var req = new SendNotificationRequest("email", new Recipient("alice@example.com"))
        {
            Subject = "Hello",
        };

        string json = JsonSerializer.Serialize(req, NotifyJsonContext.Relaxed.SendNotificationRequest);

        json.Should().NotContain("\"attachments\"");
    }

    [Fact]
    public void NotificationResponse_with_attachment_metadata_deserializes_snake_case()
    {
        const string json = """
        {
          "id": "11111111-1111-1111-1111-111111111111",
          "channel": "email",
          "status": "sent",
          "recipient": { "address": "alice@example.com", "name": "Alice" },
          "template_key": null,
          "subject": "Invoice",
          "created_at": "2026-06-15T10:00:00+00:00",
          "sent_at": "2026-06-15T10:00:05+00:00",
          "attempt_count": 1,
          "last_error": null,
          "attachments": [
            { "filename": "invoice.pdf", "content_type": "application/pdf", "size_bytes": 12345, "purged": true }
          ]
        }
        """;

        NotificationResponse? r = JsonSerializer.Deserialize(json, NotifyJsonContext.Default.NotificationResponse);

        r.Should().NotBeNull();
        r!.Attachments.Should().HaveCount(1);
        r.Attachments![0].Filename.Should().Be("invoice.pdf");
        r.Attachments[0].ContentType.Should().Be("application/pdf");
        r.Attachments[0].SizeBytes.Should().Be(12345L);
        r.Attachments[0].Purged.Should().BeTrue();
    }

    [Fact]
    public void NotificationResponse_without_attachments_field_deserializes_cleanly()
    {
        const string json = """
        {
          "id": "22222222-2222-2222-2222-222222222222",
          "channel": "email",
          "status": "queued",
          "recipient": { "address": "bob@example.com", "name": null },
          "template_key": null,
          "subject": "Hi",
          "created_at": "2026-06-15T10:00:00+00:00",
          "sent_at": null,
          "attempt_count": 0,
          "last_error": null
        }
        """;

        NotificationResponse? r = JsonSerializer.Deserialize(json, NotifyJsonContext.Default.NotificationResponse);

        r.Should().NotBeNull();
        r!.Attachments.Should().BeNull();
    }
}
