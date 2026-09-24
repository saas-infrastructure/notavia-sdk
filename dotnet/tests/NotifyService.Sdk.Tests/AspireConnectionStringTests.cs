using FluentAssertions;
using NotifyService.Sdk.Aspire;

namespace NotifyService.Sdk.Tests;

public class AspireConnectionStringTests
{
    [Fact]
    public void Parses_valid_connection_string()
    {
        (string endpoint, string apiKey) = AspireNotifyClientExtensions.ParseConnectionString(
            "Endpoint=https://api.notavia.saas-infrastructure.com;ApiKey=ns_test_abc");
        endpoint.Should().Be("https://api.notavia.saas-infrastructure.com");
        apiKey.Should().Be("ns_test_abc");
    }

    [Fact]
    public void Keys_are_case_insensitive()
    {
        (string endpoint, string apiKey) = AspireNotifyClientExtensions.ParseConnectionString(
            "endpoint=https://api.notavia.saas-infrastructure.com;APIKEY=ns_test_abc");
        endpoint.Should().Be("https://api.notavia.saas-infrastructure.com");
        apiKey.Should().Be("ns_test_abc");
    }

    [Theory]
    [InlineData("ApiKey=ns_test_x", "Endpoint")]
    [InlineData("Endpoint=https://x", "ApiKey")]
    [InlineData("Endpoint=https://x;Region=eu-west", "Region")]
    [InlineData("Endpoint=https://x;ApiKey=", "Empty value for key 'ApiKey'")]
    [InlineData("invalid-segment", "Malformed")]
    public void Throws_for_invalid_strings(string cs, string expectedMessageFragment)
    {
        Action act = () => AspireNotifyClientExtensions.ParseConnectionString(cs);
        act.Should().Throw<ArgumentException>().WithMessage($"*{expectedMessageFragment}*");
    }
}
