using FluentAssertions;
using NotifyService.Sdk.InboxTokens;
using Xunit;

using InboxTokensHelper = NotifyService.Sdk.InboxTokens.InboxTokens;

namespace NotifyService.Sdk.Tests;

public class InboxTokensTests
{
    private const string TestKey = "nsi_testkeytestkeytestkeytestkeyte";

    [Fact]
    public void Mint_and_Decode_round_trip()
    {
        Guid orgId = Guid.NewGuid();
        string token = InboxTokensHelper.Mint(new InboxTokenOptions
        {
            OrganizationId = orgId,
            ExternalUserId = "u_1",
            SigningKey = TestKey,
        });

        InboxTokenPayload decoded = InboxTokensHelper.Decode(token);
        decoded.Iss.Should().Be(orgId.ToString());
        decoded.Sub.Should().Be("u_1");
        decoded.Scope.Should().Be("inbox");
        decoded.Exp.Should().BeGreaterThan(decoded.Iat);
    }

    [Fact]
    public void Mint_with_ttl_under_60s_throws()
    {
        Action act = () => InboxTokensHelper.Mint(new InboxTokenOptions
        {
            OrganizationId = Guid.NewGuid(),
            ExternalUserId = "u_1",
            SigningKey = TestKey,
            Ttl = TimeSpan.FromSeconds(30),
        });
        act.Should().Throw<ArgumentOutOfRangeException>();
    }

    [Fact]
    public void Mint_with_ttl_over_24h_throws()
    {
        Action act = () => InboxTokensHelper.Mint(new InboxTokenOptions
        {
            OrganizationId = Guid.NewGuid(),
            ExternalUserId = "u_1",
            SigningKey = TestKey,
            Ttl = TimeSpan.FromHours(25),
        });
        act.Should().Throw<ArgumentOutOfRangeException>();
    }

    [Fact]
    public void Mint_with_wrong_signing_key_prefix_throws()
    {
        Action act = () => InboxTokensHelper.Mint(new InboxTokenOptions
        {
            OrganizationId = Guid.NewGuid(),
            ExternalUserId = "u_1",
            SigningKey = "wrong_prefix_xxx",
        });
        act.Should().Throw<ArgumentException>();
    }

    [Fact]
    public void Decode_throws_on_malformed_token()
    {
        Action act = () => InboxTokensHelper.Decode("not.valid");
        act.Should().Throw<ArgumentException>();
    }
}
