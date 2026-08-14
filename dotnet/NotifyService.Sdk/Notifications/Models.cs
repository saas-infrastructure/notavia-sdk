namespace NotifyService.Sdk.Notifications;

/// <summary>Well-known channel identifiers used when constructing a <see cref="SendNotificationRequest"/>.</summary>
public static class NotificationChannel
{
    /// <summary>Transactional email.</summary>
    public const string Email = "email";

    /// <summary>In-app notification (Inbox feed).</summary>
    public const string InApp = "in_app";

    /// <summary>Outbound webhook.</summary>
    public const string Webhook = "webhook";

    /// <summary>SMS via the configured provider.</summary>
    public const string Sms = "sms";

    /// <summary>Slack DM or channel message.</summary>
    public const string Slack = "slack";

    /// <summary>Microsoft Teams message.</summary>
    public const string Teams = "teams";

    /// <summary>Discord message.</summary>
    public const string Discord = "discord";
}

/// <summary>A file attached to an email notification.</summary>
/// <param name="Filename">File name shown to the recipient, e.g. <c>"statement.pdf"</c>.</param>
/// <param name="ContentType">MIME type, e.g. <c>"application/pdf"</c>.</param>
/// <param name="ContentBase64">Base64-encoded file content.</param>
public sealed record Attachment(string Filename, string ContentType, string ContentBase64);

/// <summary>
/// Body of a <c>POST /v1/notifications</c> request. Either provide
/// (<see cref="Subject"/> + <see cref="HtmlBody"/>) or
/// (<see cref="TemplateKey"/> + <see cref="TemplateData"/>) — not both.
/// </summary>
/// <param name="Channel">Channel name. Currently only <c>"email"</c>.</param>
/// <param name="Recipient">Who the notification is sent to.</param>
public sealed record SendNotificationRequest(
    string Channel,
    Recipient Recipient)
{
    /// <summary>Inline subject line. Mutually exclusive with <see cref="TemplateKey"/>.</summary>
    public string? Subject { get; init; }

    /// <summary>Inline HTML body. Mutually exclusive with <see cref="TemplateKey"/>.</summary>
    public string? HtmlBody { get; init; }

    /// <summary>Optional inline plain-text body.</summary>
    public string? TextBody { get; init; }

    /// <summary>Stable per-environment template key.</summary>
    public string? TemplateKey { get; init; }

    /// <summary>Liquid data passed to the template.</summary>
    public IReadOnlyDictionary<string, object?>? TemplateData { get; init; }

    /// <summary>Optional URL surfaced as a call-to-action button in supported channels.</summary>
    public string? ActionUrl { get; init; }

    /// <summary>
    /// Optional preference-category key (e.g. <c>"marketing"</c>). When supplied the server
    /// evaluates the end-user's preferences and suppresses the notification if they have opted out.
    /// </summary>
    public string? Category { get; init; }

    /// <summary>Optional email attachments (email channel only). Maximum 10 files, 15 MB total.</summary>
    public IReadOnlyList<Attachment>? Attachments { get; init; }

    /// <summary>Optional per-message sender display name (email channel only). The From
    /// address itself is fixed by the environment's sender identity.</summary>
    public string? FromName { get; init; }

    /// <summary>Optional per-message Reply-To address (email channel only).</summary>
    public string? ReplyTo { get; init; }
}

/// <summary>Recipient of a notification.</summary>
/// <param name="Address">Channel address (email, phone in E.164, Slack user/channel id, Teams/Discord endpoint GUID as string).</param>
/// <param name="Name">Optional display name.</param>
/// <param name="ExternalUserId">Optional opaque end-user identifier; resolved to an address server-side.</param>
/// <param name="Phone">E.164 phone number for SMS channel, e.g. <c>"+15005550006"</c>.</param>
/// <param name="SlackUserId">Slack user id (e.g. <c>"U07XYZ123"</c>). Used when <c>channel == "slack"</c>.</param>
/// <param name="SlackChannelId">Slack channel id (e.g. <c>"C07XYZ123"</c>). Used when <c>channel == "slack"</c> and sending to a channel.</param>
/// <param name="Endpoint">
/// The <b>key</b> of a Discord or Teams endpoint (e.g. <c>"billing-alerts"</c>). Preferred over the legacy
/// UUID fields. For Discord/Teams sends, supply either <c>Endpoint</c> (the key) <b>or</b> the legacy
/// <c>DiscordEndpointId</c> / <c>TeamsEndpointId</c> — not both.
/// </param>
/// <param name="TeamsEndpointId">Teams endpoint GUID returned from <c>POST /v1/teams-endpoints</c>. Legacy — prefer <c>Endpoint</c>.</param>
/// <param name="DiscordEndpointId">Discord endpoint GUID returned from <c>POST /v1/discord-endpoints</c>. Legacy — prefer <c>Endpoint</c>.</param>
public sealed record Recipient(
    string? Address,
    string? Name = null,
    string? ExternalUserId = null,
    string? Phone = null,
    string? SlackUserId = null,
    string? SlackChannelId = null,
    string? Endpoint = null,
    Guid? TeamsEndpointId = null,
    Guid? DiscordEndpointId = null);

/// <summary>Per-call options for <c>SendAsync</c>.</summary>
public sealed record SendOptions
{
    /// <summary>
    /// Idempotency key — if a notification has already been sent with this key
    /// for this environment, the server returns the original instead of sending again.
    /// </summary>
    public string? IdempotencyKey { get; init; }
}

/// <summary>Outcome of <c>SendAsync</c>.</summary>
/// <param name="Notification">The notification as the server returned it.</param>
/// <param name="WasReplayed">True if the server returned a previously-sent notification due to idempotency.</param>
public sealed record SendNotificationResult(NotificationResponse Notification, bool WasReplayed);

/// <summary>Metadata about a file that was attached to an email notification.</summary>
/// <param name="Filename">Original file name.</param>
/// <param name="ContentType">MIME type of the file.</param>
/// <param name="SizeBytes">File size in bytes.</param>
/// <param name="Purged">
/// True when the attachment bytes have been deleted from ephemeral storage after delivery.
/// The metadata (filename, content type, size) is always retained.
/// </param>
public sealed record AttachmentMetadata(string Filename, string ContentType, long SizeBytes, bool Purged);

/// <summary>The server-side representation of a notification.</summary>
/// <param name="Id">Server-assigned id.</param>
/// <param name="Channel">Channel ("email" in Phase 1).</param>
/// <param name="Status">"queued" | "sending" | "sent" | "failed".</param>
/// <param name="Recipient">The intended recipient.</param>
/// <param name="TemplateKey">Template key if the send used a template, otherwise null.</param>
/// <param name="Subject">Subject as resolved at send time.</param>
/// <param name="CreatedAt">When the notification was accepted.</param>
/// <param name="SentAt">When delivery to the provider succeeded, or null if still pending.</param>
/// <param name="AttemptCount">Number of provider send attempts so far.</param>
/// <param name="LastError">Last provider error message, or null.</param>
public sealed record NotificationResponse(
    Guid Id,
    string Channel,
    string Status,
    Recipient Recipient,
    string? TemplateKey,
    string? Subject,
    DateTimeOffset CreatedAt,
    DateTimeOffset? SentAt,
    int AttemptCount,
    string? LastError)
{
    /// <summary>Metadata for files attached to this email notification. Empty when no attachments were sent.</summary>
    public IReadOnlyList<AttachmentMetadata>? Attachments { get; init; }
}

/// <summary>Query parameters for <c>ListAsync</c>.</summary>
public sealed record ListNotificationsOptions
{
    /// <summary>Filter by status: "queued", "sending", "sent", "failed".</summary>
    public string? Status { get; init; }

    /// <summary>Filter by recipient address (exact match).</summary>
    public string? Recipient { get; init; }

    /// <summary>Inclusive lower bound on creation time.</summary>
    public DateTimeOffset? CreatedAfter { get; init; }

    /// <summary>Inclusive upper bound on creation time.</summary>
    public DateTimeOffset? CreatedBefore { get; init; }

    /// <summary>Page size. Defaults to 20.</summary>
    public int Limit { get; init; } = 20;

    /// <summary>Cursor returned by a previous page's <see cref="NotificationPage.NextCursor"/>.</summary>
    public string? Cursor { get; init; }
}

/// <summary>One page of notifications.</summary>
/// <param name="Data">The notifications in this page, newest first.</param>
/// <param name="NextCursor">Cursor to fetch the next page, or null if this is the last page.</param>
public sealed record NotificationPage(IReadOnlyList<NotificationResponse> Data, string? NextCursor);

/// <summary>
/// Normalises a <see cref="Recipient"/> for the given channel so that <c>Address</c> carries
/// the channel-specific identifier and the chat-specific fields are stripped before serialization.
/// </summary>
internal static class RecipientFlattener
{
    internal static Recipient FlattenForChannel(string channel, Recipient r) => channel switch
    {
        NotificationChannel.Slack => r with
        {
            Address = r.SlackUserId ?? r.SlackChannelId,
            SlackUserId = null,
            SlackChannelId = null,
        },
        NotificationChannel.Teams => r with
        {
            Address = r.Endpoint ?? r.TeamsEndpointId?.ToString(),
            Endpoint = null,
            TeamsEndpointId = null,
        },
        NotificationChannel.Discord => r with
        {
            Address = r.Endpoint ?? r.DiscordEndpointId?.ToString(),
            Endpoint = null,
            DiscordEndpointId = null,
        },
        NotificationChannel.Sms => r with
        {
            Address = r.Address ?? r.Phone,
            Phone = null,
        },
        _ => r,
    };
}
