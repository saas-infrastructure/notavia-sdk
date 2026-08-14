using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace NotifyService.Sdk.InboxTokens;

/// <summary>
/// Pure helpers for minting and decoding NotifyService inbox delegated JWTs.
/// Server-side only — never expose the signing key to the browser.
/// </summary>
public static class InboxTokens
{
    private static readonly TimeSpan DefaultTtl = TimeSpan.FromMinutes(15);
    private static readonly TimeSpan MinTtl = TimeSpan.FromSeconds(60);
    private static readonly TimeSpan MaxTtl = TimeSpan.FromHours(24);

    /// <summary>Mints a delegated JWT.</summary>
    public static string Mint(InboxTokenOptions options)
    {
        TimeSpan ttl = options.Ttl ?? DefaultTtl;
        if (ttl < MinTtl || ttl > MaxTtl)
            throw new ArgumentOutOfRangeException(nameof(options), $"Ttl must be between {MinTtl} and {MaxTtl}.");
        if (!options.SigningKey.StartsWith("nsi_", StringComparison.Ordinal))
            throw new ArgumentException("SigningKey must start with 'nsi_'.", nameof(options));

        long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        long exp = now + (long)ttl.TotalSeconds;

        string headerJson = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        string payloadJson = JsonSerializer.Serialize(new
        {
            iss = options.OrganizationId.ToString(),
            sub = options.ExternalUserId,
            scope = "inbox",
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

    /// <summary>Decodes the JWT payload without verifying the signature. For debugging only.</summary>
    public static InboxTokenPayload Decode(string token)
    {
        ArgumentNullException.ThrowIfNull(token);
        string[] parts = token.Split('.');
        if (parts.Length != 3) throw new ArgumentException("Token must have three dot-separated parts.", nameof(token));
        byte[] payloadBytes = Base64UrlDecode(parts[1]);
        using JsonDocument doc = JsonDocument.Parse(payloadBytes);
        JsonElement root = doc.RootElement;
        return new InboxTokenPayload(
            root.GetProperty("iss").GetString()!,
            root.GetProperty("sub").GetString()!,
            root.GetProperty("scope").GetString()!,
            root.GetProperty("iat").GetInt64(),
            root.GetProperty("exp").GetInt64());
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
