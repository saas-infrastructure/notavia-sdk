namespace NotifyService.Sdk.Identity;

/// <summary>Response from <c>GET /v1/me</c> — describes the tenant context the current API key authenticates.</summary>
/// <param name="OrganizationId">Organization id.</param>
/// <param name="EnvironmentId">Environment id.</param>
/// <param name="EnvironmentKind">"test" or "live".</param>
/// <param name="KeyId">API key id (not the secret).</param>
/// <param name="KeyScope">"full_access" or "send_only".</param>
/// <param name="KeyType">"secret" or "publishable". Phase 1 always returns "secret".</param>
public sealed record MeResponse(
    Guid OrganizationId,
    Guid EnvironmentId,
    string EnvironmentKind,
    Guid KeyId,
    string KeyScope,
    string KeyType);
