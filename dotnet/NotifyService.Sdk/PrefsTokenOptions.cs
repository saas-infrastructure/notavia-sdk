namespace NotifyService.Sdk;

/// <summary>Options for minting a delegated JWT for the preference centre.</summary>
public sealed class PrefsTokenOptions
{
    /// <summary>Organization id that owns the signing key. Becomes the JWT <c>iss</c> claim.</summary>
    public required Guid OrganizationId { get; init; }

    /// <summary>Opaque end-user identifier. Becomes the JWT <c>sub</c> claim.</summary>
    public required string ExternalUserId { get; init; }

    /// <summary>Raw inbox signing key (the <c>nsi_…</c> value, never the hash).</summary>
    public required string SigningKey { get; init; }

    /// <summary>Token lifetime in seconds. Defaults to 900 (15 minutes).</summary>
    public int TtlSeconds { get; init; } = 900;
}

/// <summary>Decoded payload of a prefs JWT.</summary>
public sealed record PrefsTokenPayload(string Iss, string Sub, string Scope, long Iat, long Exp);
