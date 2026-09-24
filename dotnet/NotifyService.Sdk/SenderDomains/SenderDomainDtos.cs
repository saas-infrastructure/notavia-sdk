namespace NotifyService.Sdk.SenderDomains;

/// <summary>A DNS record to publish for a sending domain.</summary>
/// <param name="Host">Fully-qualified record name, e.g. <c>_notify-verification.acme.com</c>.</param>
/// <param name="Type">Record type: <c>TXT</c> or <c>CNAME</c>.</param>
/// <param name="Value">Record value to publish verbatim.</param>
public sealed record SenderDomainDnsRecord(string Host, string Type, string Value);

/// <summary>One email-authentication check run against a sending domain.</summary>
/// <param name="Kind">What was checked: <c>Ownership</c>, <c>Dkim</c>, <c>Spf</c>, or <c>Dmarc</c>.</param>
/// <param name="Status">Outcome: <c>Pass</c>, <c>Warn</c>, <c>Fail</c>, or <c>Skipped</c>. Only Ownership and Dkim gate live sending; Spf and Dmarc are advisory.</param>
/// <param name="Detail">Human-readable explanation of the outcome.</param>
/// <param name="Recommended">The record to publish to turn a Warn or Fail into a Pass, or null when nothing is recommended.</param>
public sealed record SenderDomainAuthCheck(
    string Kind,
    string Status,
    string Detail,
    SenderDomainDnsRecord? Recommended);

/// <summary>A sending domain as returned by <c>/v1/sender-domains</c>.</summary>
/// <param name="Id">Server-assigned sending-domain id.</param>
/// <param name="OrganizationId">The organization that owns the domain — always the organization behind your API key.</param>
/// <param name="Domain">The domain, lowercased.</param>
/// <param name="Status">Verification status: <c>pending</c>, <c>verified</c>, or <c>failed</c>. Only <c>verified</c> unlocks sending From this domain.</param>
/// <param name="DnsRecords">The records to publish: an ownership TXT, plus DKIM CNAMEs when the environment uses managed sending.</param>
/// <param name="AuthChecks">Live SPF/DKIM/DMARC/ownership check results, refreshed on every verification pass.</param>
/// <param name="VerifiedAt">When the domain first verified, or null if it has not.</param>
/// <param name="LastCheckedAt">When a verification pass last ran, or null if none has.</param>
/// <param name="CheckCount">How many verification passes have run.</param>
/// <param name="LastCheckError">Why the last pass failed, or null.</param>
/// <param name="CreatedAt">When the domain was registered.</param>
public sealed record SenderDomainResponse(
    Guid Id,
    Guid OrganizationId,
    string Domain,
    string Status,
    IReadOnlyList<SenderDomainDnsRecord> DnsRecords,
    IReadOnlyList<SenderDomainAuthCheck> AuthChecks,
    DateTimeOffset? VerifiedAt,
    DateTimeOffset? LastCheckedAt,
    int CheckCount,
    string? LastCheckError,
    DateTimeOffset CreatedAt);

/// <summary>Body of a <c>POST /v1/sender-domains</c> request.</summary>
/// <param name="Domain">The domain to register, e.g. <c>acme.com</c>. The organization and environment come from your API key.</param>
public sealed record AddSenderDomainRequest(string Domain);
