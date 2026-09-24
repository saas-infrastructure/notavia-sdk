using FluentAssertions;
using NotifyService.Sdk;
using Xunit;

namespace NotifyService.Sdk.Tests;

public class PrefsTokensTests
{
    private const string TestKey = "nsi_testkeytestkeytestkeytestkeyte";

    [Fact]
    public void Mint_and_Decode_round_trip_scope_is_prefs()
    {
        Guid orgId = Guid.NewGuid();
        string token = PrefsTokens.Mint(new PrefsTokenOptions
        {
            OrganizationId = orgId,
            ExternalUserId = "u_prefs",
            SigningKey = TestKey,
        });

        PrefsTokenPayload decoded = PrefsTokens.Decode(token);
        decoded.Iss.Should().Be(orgId.ToString());
        decoded.Sub.Should().Be("u_prefs");
        decoded.Scope.Should().Be("prefs");
        decoded.Exp.Should().BeGreaterThan(decoded.Iat);
    }

    [Fact]
    public void MintInboxAndPrefs_scope_contains_inbox_and_prefs()
    {
        Guid orgId = Guid.NewGuid();
        string token = PrefsTokens.MintInboxAndPrefs(new PrefsTokenOptions
        {
            OrganizationId = orgId,
            ExternalUserId = "u_both",
            SigningKey = TestKey,
        });

        PrefsTokenPayload decoded = PrefsTokens.Decode(token);
        decoded.Iss.Should().Be(orgId.ToString());
        decoded.Sub.Should().Be("u_both");
        string[] scopes = decoded.Scope.Split(' ');
        scopes.Should().Contain("inbox");
        scopes.Should().Contain("prefs");
    }

    [Fact]
    public void Decode_parses_all_claims_correctly()
    {
        Guid orgId = Guid.NewGuid();
        string token = PrefsTokens.Mint(new PrefsTokenOptions
        {
            OrganizationId = orgId,
            ExternalUserId = "u_decode",
            SigningKey = TestKey,
            TtlSeconds = 300,
        });

        PrefsTokenPayload decoded = PrefsTokens.Decode(token);
        decoded.Iss.Should().Be(orgId.ToString());
        decoded.Sub.Should().Be("u_decode");
        decoded.Scope.Should().Be("prefs");
        decoded.Exp.Should().Be(decoded.Iat + 300);
    }

    [Fact]
    public void Mint_with_ttl_under_60s_throws()
    {
        Action act = () => PrefsTokens.Mint(new PrefsTokenOptions
        {
            OrganizationId = Guid.NewGuid(),
            ExternalUserId = "u_1",
            SigningKey = TestKey,
            TtlSeconds = 30,
        });
        act.Should().Throw<ArgumentOutOfRangeException>();
    }

    [Fact]
    public void Mint_with_ttl_over_24h_throws()
    {
        Action act = () => PrefsTokens.Mint(new PrefsTokenOptions
        {
            OrganizationId = Guid.NewGuid(),
            ExternalUserId = "u_1",
            SigningKey = TestKey,
            TtlSeconds = 90_000,
        });
        act.Should().Throw<ArgumentOutOfRangeException>();
    }

    [Fact]
    public void Mint_with_wrong_signing_key_prefix_throws()
    {
        Action act = () => PrefsTokens.Mint(new PrefsTokenOptions
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
        Action act = () => PrefsTokens.Decode("not.valid");
        act.Should().Throw<ArgumentException>();
    }
}
