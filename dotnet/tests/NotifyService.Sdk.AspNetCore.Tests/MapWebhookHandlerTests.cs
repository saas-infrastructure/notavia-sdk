using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NotifyService.Sdk;
using NotifyService.Sdk.AspNetCore;

namespace NotifyService.Sdk.AspNetCore.Tests;

public class MapWebhookHandlerTests
{
    private const string TestSecret = "whsec_dGVzdHNlY3JldHRlc3RzZWNyZXR0ZXN0c2U=";

    private static string BuildSignatureHeader(string body, string secret, long? overrideTimestamp = null)
    {
        long timestamp = overrideTimestamp ?? DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        string raw = secret.StartsWith("whsec_", StringComparison.Ordinal)
            ? secret["whsec_".Length..]
            : secret;

        string padded = raw.Replace('-', '+').Replace('_', '/');
        padded = (padded.Length % 4) switch
        {
            2 => padded + "==",
            3 => padded + "=",
            _ => padded,
        };
        byte[] secretBytes = Convert.FromBase64String(padded);

        string signingInput = $"{timestamp}.{body}";
        using var hmac = new HMACSHA256(secretBytes);
        byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signingInput));
        string hexHash = Convert.ToHexString(hash).ToLowerInvariant();

        return $"t={timestamp},v1={hexHash}";
    }

    private static HttpClient BuildClient(WebhookHandlerOptions options)
    {
        var builder = WebApplication.CreateBuilder();
        builder.WebHost.UseTestServer();

        WebApplication app = builder.Build();
        app.MapWebhookHandler("/webhooks/notify", options);

        app.Start();

        return app.GetTestClient();
    }

    private static HttpRequestMessage BuildRequest(string body, string signatureHeader)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, "/webhooks/notify")
        {
            Content = new StringContent(body, Encoding.UTF8, "application/json"),
        };
        request.Headers.Add("NotifyService-Signature", signatureHeader);
        return request;
    }

    [Fact]
    public async Task Valid_payload_returns_200_and_invokes_OnEvent_and_specific_callback()
    {
        bool onEventFired = false;
        bool onSentFired = false;

        string body = """{"id":"evt_1","type":"notification.sent","created_at":"2026-01-01T00:00:00Z","data":{}}""";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
            OnEvent = (evt, _) => { onEventFired = true; return Task.CompletedTask; },
            OnNotificationSent = (evt, _) => { onSentFired = true; return Task.CompletedTask; },
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        onEventFired.Should().BeTrue();
        onSentFired.Should().BeTrue();
    }

    [Fact]
    public async Task Provider_critical_invokes_the_typed_callback_and_carries_the_outage_payload()
    {
        string? provider = null;
        long failedMessages = 0;
        string? eventId = null;

        string body = """{"id":"evt_alert_1","type":"provider.critical","created_at":"2026-07-14T05:41:34Z","data":{"provider":"Resend","environment":"Live","messages":42,"failed_messages":42,"failure_rate":100,"firing_since":"2026-07-14T05:41:34Z"}}""";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
            OnProviderCritical = (evt, _) =>
            {
                eventId = evt.Id;
                provider = evt.Data.GetProperty("provider").GetString();
                failedMessages = evt.Data.GetProperty("failed_messages").GetInt64();
                return Task.CompletedTask;
            },
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        provider.Should().Be("Resend");
        failedMessages.Should().Be(42);
        eventId.Should().Be("evt_alert_1", "the id is stable across a retry so a pager can dedupe on it");
    }

    [Fact]
    public async Task Provider_recovered_invokes_the_typed_callback()
    {
        bool recovered = false;

        string body = """{"id":"evt_alert_2","type":"provider.recovered","created_at":"2026-07-14T06:05:12Z","data":{"provider":"Resend","environment":"Live","recovered_at":"2026-07-14T06:05:12Z"}}""";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
            OnProviderRecovered = (evt, _) => { recovered = true; return Task.CompletedTask; },
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        recovered.Should().BeTrue();
    }

    [Fact]
    public async Task An_unknown_event_type_is_still_verified_and_is_not_an_error()
    {
        bool onEventFired = false;

        string body = """{"id":"evt_9","type":"something.we.have.not.shipped.yet","created_at":"2026-01-01T00:00:00Z","data":{}}""";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
            OnEvent = (evt, _) => { onEventFired = true; return Task.CompletedTask; },
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.OK,
            "a new event type must never break an existing handler");
        onEventFired.Should().BeTrue();
    }

    [Fact]
    public async Task Tampered_body_returns_401()
    {
        string originalBody = """{"id":"evt_1","type":"notification.sent","created_at":"2026-01-01T00:00:00Z","data":{}}""";
        string sig = BuildSignatureHeader(originalBody, TestSecret);
        string tamperedBody = """{"id":"evt_1","type":"notification.failed","created_at":"2026-01-01T00:00:00Z","data":{}}""";

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(tamperedBody, sig));

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Missing_signature_header_returns_401()
    {
        string body = """{"id":"evt_1","type":"notification.sent","created_at":"2026-01-01T00:00:00Z","data":{}}""";

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
        });

        var request = new HttpRequestMessage(HttpMethod.Post, "/webhooks/notify")
        {
            Content = new StringContent(body, Encoding.UTF8, "application/json"),
        };

        HttpResponseMessage response = await client.SendAsync(request);

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Malformed_json_with_valid_signature_returns_400()
    {
        string body = "not-json-at-all";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Event_type_routing_fires_correct_specific_callback()
    {
        bool deliveredFired = false;
        bool failedFired = false;
        bool sentFired = false;

        string body = """{"id":"evt_2","type":"notification.delivered","created_at":"2026-01-01T00:00:00Z","data":{}}""";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
            OnNotificationSent = (_, _) => { sentFired = true; return Task.CompletedTask; },
            OnNotificationDelivered = (_, _) => { deliveredFired = true; return Task.CompletedTask; },
            OnNotificationFailed = (_, _) => { failedFired = true; return Task.CompletedTask; },
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        deliveredFired.Should().BeTrue();
        sentFired.Should().BeFalse();
        failedFired.Should().BeFalse();
    }

    [Fact]
    public async Task Unknown_event_type_returns_200_without_specific_callback()
    {
        bool onEventFired = false;

        string body = """{"id":"evt_3","type":"notification.unknown_future_type","created_at":"2026-01-01T00:00:00Z","data":{}}""";
        string sig = BuildSignatureHeader(body, TestSecret);

        HttpClient client = BuildClient(new WebhookHandlerOptions
        {
            SigningSecret = TestSecret,
            OnEvent = (_, _) => { onEventFired = true; return Task.CompletedTask; },
        });

        HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        onEventFired.Should().BeTrue();
    }

    [Fact]
    public async Task All_five_event_types_route_to_correct_callbacks()
    {
        var fired = new HashSet<string>();

        async Task MakeRequest(string type)
        {
            string body = $$$"""{"id":"evt_x","type":"{{{type}}}","created_at":"2026-01-01T00:00:00Z","data":{}}""";
            string sig = BuildSignatureHeader(body, TestSecret);

            HttpClient client = BuildClient(new WebhookHandlerOptions
            {
                SigningSecret = TestSecret,
                OnNotificationSent = (evt, _) => { fired.Add(evt.Type); return Task.CompletedTask; },
                OnNotificationDelivered = (evt, _) => { fired.Add(evt.Type); return Task.CompletedTask; },
                OnNotificationFailed = (evt, _) => { fired.Add(evt.Type); return Task.CompletedTask; },
                OnNotificationRead = (evt, _) => { fired.Add(evt.Type); return Task.CompletedTask; },
                OnNotificationSuppressed = (evt, _) => { fired.Add(evt.Type); return Task.CompletedTask; },
            });

            HttpResponseMessage response = await client.SendAsync(BuildRequest(body, sig));
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        await MakeRequest("notification.sent");
        await MakeRequest("notification.delivered");
        await MakeRequest("notification.failed");
        await MakeRequest("notification.read");
        await MakeRequest("notification.suppressed");

        fired.Should().BeEquivalentTo(new[]
        {
            "notification.sent",
            "notification.delivered",
            "notification.failed",
            "notification.read",
            "notification.suppressed",
        });
    }
}
