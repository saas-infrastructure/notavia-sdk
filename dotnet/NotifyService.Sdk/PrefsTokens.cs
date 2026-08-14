using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace NotifyService.Sdk;

/// <summary>
/// Pure helpers for minting and decoding NotifyService preference-centre delegated JWTs.
/// Server-side only — never expose the signing key to the browser.
/// </summary>
public static class PrefsTokens
{
    private static readonly TimeSpan DefaultTtl = TimeSpan.FromSeconds(900);
    private static readonly TimeSpan MinTtl = TimeSpan.FromSeconds(60);
    private static readonly TimeSpan MaxTtl = TimeSpan.FromHours(24);

    /// <summary>Mints a delegated JWT with <c>scope: "prefs"</c>.</summary>
    public static string Mint(PrefsTokenOptions options) =>
        MintCore(options, "prefs");

    /// <summary>Mints a delegated JWT with <c>scope: "inbox prefs"</c> — grants access to both surfaces.</summary>
    public static string MintInboxAndPrefs(PrefsTokenOptions options) =>
        MintCore(options, "inbox prefs");

    /// <summary>Decodes the JWT payload without verifying the signature. For debugging only.</summary>
    public static PrefsTokenPayload Decode(string token)
    {
        ArgumentNullException.ThrowIfNull(token);
        string[] parts = token.Split('.');
        if (parts.Length != 3) throw new ArgumentException("Token must have three dot-separated parts.", nameof(token));
        byte[] payloadBytes = Base64UrlDecode(parts[1]);
        using JsonDocument doc = JsonDocument.Parse(payloadBytes);
        JsonElement root = doc.RootElement;
        return new PrefsTokenPayload(
            root.GetProperty("iss").GetString()!,
            root.GetProperty("sub").GetString()!,
            root.GetProperty("scope").GetString()!,
            root.GetProperty("iat").GetInt64(),
            root.GetProperty("exp").GetInt64());
    }

    private static string MintCore(PrefsTokenOptions options, string scope)
    {
        TimeSpan ttl = TimeSpan.FromSeconds(options.TtlSeconds);
        if (ttl < MinTtl || ttl > MaxTtl)
            throw new ArgumentOutOfRangeException(nameof(options), $"TtlSeconds must be between {(int)MinTtl.TotalSeconds} and {(int)MaxTtl.TotalSeconds}.");
        if (!options.SigningKey.StartsWith("nsi_", StringComparison.Ordinal))
            throw new ArgumentException("SigningKey must start with 'nsi_'.", nameof(options));

        long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        long exp = now + (long)ttl.TotalSeconds;

        string headerJson = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        string payloadJson = JsonSerializer.Serialize(new
        {
            iss = options.OrganizationId.ToString(),
            sub = options.ExternalUserId,
            scope,
            iat = now,
            exp,
        });

        string header = Base64Url(Encoding.UTF8.GetBytes(headerJson));
        string payload = Base64Url(Encoding.UTF8.GetBytes(payloadJson));
        string signingInput = $"{header}.{payload}";

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(options.SigningKey));
        byte[] sig = hmac.ComputeHash(Encoding.UTF8.GetBytes(signingInput));
        return $"{signingInput}.{Base64Url(sig)}";
    }

    private static string Base64Url(byte[] bytes) =>
        Convert.ToBase64String(bytes).Replace('+', '-').Replace('/', '_').TrimEnd('=');

    private static byte[] Base64UrlDecode(string s)
    {
        string padded = s.Replace('-', '+').Replace('_', '/');
        switch (padded.Length % 4)
        {
            case 2: padded += "=="; break;
            case 3: padded += "="; break;
        }
        return Convert.FromBase64String(padded);
    }
}
