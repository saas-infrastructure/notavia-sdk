namespace NotifyService.Sdk.InboxTokens;

/// <summary>Options for minting a delegated JWT for the in-app inbox.</summary>
public sealed class InboxTokenOptions
{
    /// <summary>Organization id that owns the signing key. Becomes the JWT <c>iss</c> claim.</summary>
    public required Guid OrganizationId { get; init; }

    /// <summary>Opaque end-user identifier. Becomes the JWT <c>sub</c> claim.</summary>
    public required string ExternalUserId { get; init; }

    /// <summary>Raw inbox signing key (the <c>nsi_…</c> value, never the hash).</summary>
    public required string SigningKey { get; init; }

    /// <summary>Token lifetime. Defaults to 15 minutes. Min 60 s, max 24 h.</summary>
    public TimeSpan? Ttl { get; init; }
}

/// <summary>Decoded payload of an inbox JWT.</summary>
public sealed record InboxTokenPayload(string Iss, string Sub, string Scope, long Iat, long Exp);
