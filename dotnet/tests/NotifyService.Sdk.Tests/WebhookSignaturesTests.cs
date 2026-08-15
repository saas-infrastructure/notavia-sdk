using System.Security.Cryptography;
using System.Text;
using FluentAssertions;
using NotifyService.Sdk;
using Xunit;

namespace NotifyService.Sdk.Tests;

public class WebhookSignaturesTests
{
    private const string TestSecret = "whsec_dGVzdHNlY3JldHRlc3RzZWNyZXR0ZXN0c2U=";

    private static string BuildHeader(string body, string secret, long? overrideTimestamp = null)
    {
        long timestamp = overrideTimestamp ?? DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        string raw = secret.StartsWith("whsec_", StringComparison.Ordinal)
            ? secret["whsec_".Length..]
            : secret;

        string padded = raw.Replace('-', '+').Replace('_', '/');
        switch (padded.Length % 4)
        {
            case 2: padded += "=="; break;
            case 3: padded += "="; break;
        }
        byte[] secretBytes = Convert.FromBase64String(padded);

        string signingInput = $"{timestamp}.{body}";
        using var hmac = new HMACSHA256(secretBytes);
        byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signingInput));
        string hexHash = Convert.ToHexString(hash).ToLowerInvariant();

        return $"t={timestamp},v1={hexHash}";
    }

    [Fact]
    public void Valid_signature_returns_true()
    {
        string body = """{"type":"notification.sent","data":{}}""";
        string header = BuildHeader(body, TestSecret);

        bool result = WebhookSignatures.Verify(body, header, TestSecret);

        result.Should().BeTrue();
    }

    [Fact]
    public void Tampered_body_returns_false()
    {
        string originalBody = """{"type":"notification.sent","data":{}}""";
        string header = BuildHeader(originalBody, TestSecret);
        string tamperedBody = """{"type":"notification.failed","data":{}}""";

        bool result = WebhookSignatures.Verify(tamperedBody, header, TestSecret);

        result.Should().BeFalse();
    }

    [Fact]
    public void Wrong_secret_returns_false()
    {
        string body = """{"type":"notification.sent","data":{}}""";
        string header = BuildHeader(body, TestSecret);
        string wrongSecret = "whsec_d3JvbmdzZWNyZXR3cm9uZ3NlY3JldHdybw==";

        bool result = WebhookSignatures.Verify(body, header, wrongSecret);

        result.Should().BeFalse();
    }

    [Fact]
    public void Timestamp_outside_tolerance_returns_false()
    {
        string body = """{"type":"notification.sent","data":{}}""";
        long ancientTimestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds() - 600;
        string header = BuildHeader(body, TestSecret, overrideTimestamp: ancientTimestamp);

        bool result = WebhookSignatures.Verify(body, header, TestSecret, tolerance: TimeSpan.FromSeconds(300));

        result.Should().BeFalse();
    }

    [Fact]
    public void Malformed_header_returns_false()
    {
        string body = """{"type":"notification.sent","data":{}}""";

        bool result = WebhookSignatures.Verify(body, "not-a-valid-header", TestSecret);

        result.Should().BeFalse();
    }
}
