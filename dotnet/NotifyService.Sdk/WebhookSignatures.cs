using System.Security.Cryptography;
using System.Text;

namespace NotifyService.Sdk;

/// <summary>
/// Verifies Svix-style webhook signatures produced by NotifyService.
/// Server-side only — never expose the signing secret to the browser.
/// </summary>
public static class WebhookSignatures
{
    private static readonly TimeSpan DefaultTolerance = TimeSpan.FromSeconds(300);

    /// <summary>
    /// Verifies a <c>webhook-signature</c> header against <paramref name="rawBody"/>.
    /// </summary>
    /// <param name="rawBody">The raw UTF-8 request body as received.</param>
    /// <param name="signatureHeader">Value of the <c>webhook-signature</c> header, e.g. <c>t=1700000000,v1=abc123…</c>.</param>
    /// <param name="signingSecret">Endpoint signing secret, optionally prefixed with <c>whsec_</c>.</param>
    /// <param name="tolerance">Maximum age of the timestamp. Defaults to 300 seconds.</param>
    /// <returns><c>true</c> if the signature is valid and the timestamp is within tolerance; otherwise <c>false</c>.</returns>
    public static bool Verify(
        string rawBody,
        string signatureHeader,
        string signingSecret,
        TimeSpan? tolerance = null)
    {
        if (rawBody is null || signatureHeader is null || signingSecret is null)
            return false;

        TimeSpan effectiveTolerance = tolerance ?? DefaultTolerance;

        if (!TryParseHeader(signatureHeader, out long timestamp, out string? v1Hex))
            return false;

        byte[]? secretBytes = DecodeSecret(signingSecret);
        if (secretBytes is null)
            return false;

        long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        if (Math.Abs(now - timestamp) > (long)effectiveTolerance.TotalSeconds)
            return false;

        byte[] expected = ComputeHmac(secretBytes, timestamp, rawBody);
        byte[]? actual = TryParseHex(v1Hex!);
        if (actual is null || actual.Length != expected.Length)
            return false;

        return CryptographicOperations.FixedTimeEquals(expected, actual);
    }

    private static bool TryParseHeader(string header, out long timestamp, out string? v1Hex)
    {
        timestamp = 0;
        v1Hex = null;

        foreach (string part in header.Split(','))
        {
            int eq = part.IndexOf('=');
            if (eq < 0) continue;

            string key = part[..eq].Trim();
            string value = part[(eq + 1)..].Trim();

            if (key == "t" && long.TryParse(value, out long ts))
                timestamp = ts;
            else if (key == "v1" && v1Hex is null)
                v1Hex = value;
        }

        return timestamp != 0 && v1Hex is not null;
    }

    private static byte[]? DecodeSecret(string signingSecret)
    {
        string raw = signingSecret.StartsWith("whsec_", StringComparison.Ordinal)
            ? signingSecret["whsec_".Length..]
            : signingSecret;

        try
        {
            string padded = raw.Replace('-', '+').Replace('_', '/');
            switch (padded.Length % 4)
            {
                case 2: padded += "=="; break;
                case 3: padded += "="; break;
            }
            return Convert.FromBase64String(padded);
        }
        catch
        {
            return null;
        }
    }

    private static byte[] ComputeHmac(byte[] secret, long timestamp, string rawBody)
    {
        string signingInput = $"{timestamp}.{rawBody}";
        using var hmac = new HMACSHA256(secret);
        return hmac.ComputeHash(Encoding.UTF8.GetBytes(signingInput));
    }

    private static byte[]? TryParseHex(string hex)
    {
        if (hex.Length % 2 != 0) return null;
        try
        {
            byte[] bytes = new byte[hex.Length / 2];
            for (int i = 0; i < bytes.Length; i++)
                bytes[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
            return bytes;
        }
        catch
        {
            return null;
        }
    }
}
