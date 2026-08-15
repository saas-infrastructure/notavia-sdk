using System.Text.Json;
using FluentAssertions;
using NotifyService.Sdk;
using NotifyService.Sdk.Internal;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.Templates;

namespace NotifyService.Sdk.Tests;

public class JsonContractTests
{
    [Fact]
    public void SendNotificationRequest_round_trips_snake_case()
    {
        var req = new SendNotificationRequest("email", new Recipient("alice@example.com", "Alice"))
        {
            Subject = "Hello",
            HtmlBody = "<p>Hi</p>",
            TemplateKey = null,
            TemplateData = null,
        };
        string json = JsonSerializer.Serialize(req, NotifyJsonContext.Relaxed.SendNotificationRequest);

        json.Should().Contain("\"channel\":\"email\"");
        json.Should().Contain("\"recipient\":{\"address\":\"alice@example.com\",\"name\":\"Alice\"}");
        json.Should().Contain("\"subject\":\"Hello\"");
        json.Should().Contain("\"html_body\":\"<p>Hi</p>\"");
        json.Should().NotContain("\"template_key\"");   // null fields omitted
    }

    [Fact]
    public void SendNotificationRequest_serializes_sender_identity_fields()
    {
        var req = new SendNotificationRequest("email", new Recipient("a@b.com", "A"))
        {
            Subject = "Hi",
            HtmlBody = "<p>Hi</p>",
            FromName = "Acme Support",
            ReplyTo = "support@acme.com",
        };

        string json = JsonSerializer.Serialize(req, NotifyJsonContext.Relaxed.SendNotificationRequest);

        using JsonDocument body = JsonDocument.Parse(json);
        body.RootElement.GetProperty("from_name").GetString().Should().Be("Acme Support");
        body.RootElement.GetProperty("reply_to").GetString().Should().Be("support@acme.com");
    }

    [Fact]
    public void SendNotificationRequest_without_sender_identity_omits_fields()
    {
        var req = new SendNotificationRequest("email", new Recipient("a@b.com"))
        {
            Subject = "Hi",
            HtmlBody = "<p>Hi</p>",
        };

        string json = JsonSerializer.Serialize(req, NotifyJsonContext.Relaxed.SendNotificationRequest);

        json.Should().NotContain("\"from_name\"");
        json.Should().NotContain("\"reply_to\"");
    }

    [Fact]
    public void NotificationResponse_deserializes_snake_case_payload()
    {
        const string json = """
        {
          "id": "11111111-1111-1111-1111-111111111111",
          "channel": "email",
          "status": "queued",
          "recipient": { "address": "alice@example.com", "name": "Alice" },
          "template_key": null,
          "subject": "Hi",
          "created_at": "2026-05-26T10:00:00+00:00",
          "sent_at": null,
          "attempt_count": 0,
          "last_error": null
        }
        """;
        NotificationResponse? r = JsonSerializer.Deserialize(json, NotifyJsonContext.Default.NotificationResponse);
        r.Should().NotBeNull();
        r!.Id.Should().Be(Guid.Parse("11111111-1111-1111-1111-111111111111"));
        r.Status.Should().Be("queued");
        r.Recipient.Address.Should().Be("alice@example.com");
        r.AttemptCount.Should().Be(0);
    }

    [Fact]
    public void Unknown_properties_in_response_are_silently_ignored()
    {
        const string json = """
        {
          "id": "11111111-1111-1111-1111-111111111111",
          "channel": "email",
          "status": "queued",
          "recipient": { "address": "a@b.com", "name": null },
          "template_key": null,
          "subject": null,
          "created_at": "2026-05-26T10:00:00+00:00",
          "sent_at": null,
          "attempt_count": 0,
          "last_error": null,
          "future_field_we_dont_know": "anything"
        }
        """;
        Action act = () => JsonSerializer.Deserialize(json, NotifyJsonContext.Default.NotificationResponse);
        act.Should().NotThrow();
    }

    [Fact]
    public void TemplateResponse_round_trips()
    {
        var t = new TemplateResponse(
            Guid.NewGuid(), "welcome", "Welcome", "Hi {{name}}", "<p>Hi {{name}}</p>",
            "Hi {{name}}", DateTimeOffset.UtcNow, DateTimeOffset.UtcNow);
        string json = JsonSerializer.Serialize(t, NotifyJsonContext.Default.TemplateResponse);
        TemplateResponse? back = JsonSerializer.Deserialize(json, NotifyJsonContext.Default.TemplateResponse);
        back.Should().BeEquivalentTo(t);
    }
}
