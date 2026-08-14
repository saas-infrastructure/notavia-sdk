using NotifyService.Sdk.Identity;
using NotifyService.Sdk.Notifications;
using NotifyService.Sdk.SenderDomains;
using NotifyService.Sdk.Suppressions;
using NotifyService.Sdk.Templates;
using NotifyService.Sdk.Usage;
using NotifyService.Sdk.Workflows;

namespace NotifyService.Sdk;

/// <summary>Default implementation of <see cref="INotifyClient"/>.</summary>
public sealed class NotifyClient : INotifyClient
{
    /// <summary>Creates a new <see cref="NotifyClient"/>. Resolved from DI in normal use.</summary>
    /// <param name="notifications">The notifications resource.</param>
    /// <param name="templates">The templates resource.</param>
    /// <param name="me">The identity resource.</param>
    /// <param name="workflows">The workflows resource.</param>
    /// <param name="suppressions">The suppressions resource.</param>
    /// <param name="usage">The usage resource.</param>
    /// <param name="senderDomains">The sender-domains resource.</param>
    public NotifyClient(
        INotificationsResource notifications,
        ITemplatesResource templates,
        IMeResource me,
        NotifyServiceWorkflowsClient workflows,
        ISuppressionsResource suppressions,
        IUsageResource usage,
        ISenderDomainsResource senderDomains)
    {
        Notifications = notifications;
        Templates = templates;
        Me = me;
        Workflows = workflows;
        Suppressions = suppressions;
        Usage = usage;
        SenderDomains = senderDomains;
    }

    /// <inheritdoc />
    public INotificationsResource Notifications { get; }

    /// <inheritdoc />
    public ITemplatesResource Templates { get; }

    /// <inheritdoc />
    public IMeResource Me { get; }

    /// <inheritdoc />
    public NotifyServiceWorkflowsClient Workflows { get; }

    /// <inheritdoc />
    public ISuppressionsResource Suppressions { get; }

    /// <inheritdoc />
    public IUsageResource Usage { get; }

    /// <inheritdoc />
    public ISenderDomainsResource SenderDomains { get; }
}
