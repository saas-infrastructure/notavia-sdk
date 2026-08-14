using NotifyService.Sdk.Identity;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.SenderDomains;
using NotifyService.Sdk.Suppressions;
using NotifyService.Sdk.Templates;
using NotifyService.Sdk.Usage;
using NotifyService.Sdk.Workflows;

namespace NotifyService.Sdk;

/// <summary>
/// The top-level NotifyService client. Resolve from DI:
/// <c>builder.Services.AddNotifyClient(builder.Configuration);</c>
/// then inject <see cref="INotifyClient"/> wherever you need it.
/// </summary>
public interface INotifyClient
{
    /// <summary>The notifications resource (<c>/v1/notifications</c>).</summary>
    INotificationsResource Notifications { get; }

    /// <summary>The templates resource (<c>/v1/templates</c>).</summary>
    ITemplatesResource Templates { get; }

    /// <summary>The identity / me resource (<c>/v1/me</c>).</summary>
    IMeResource Me { get; }

    /// <summary>The workflows resource (<c>/v1/workflows</c>).</summary>
    NotifyServiceWorkflowsClient Workflows { get; }

    /// <summary>The suppressions resource (<c>/v1/suppressions</c>).</summary>
    ISuppressionsResource Suppressions { get; }

    /// <summary>The usage resource (<c>/v1/usage</c>).</summary>
    IUsageResource Usage { get; }

    /// <summary>The sender-domains resource (<c>/v1/sender-domains</c>).</summary>
    ISenderDomainsResource SenderDomains { get; }
}
