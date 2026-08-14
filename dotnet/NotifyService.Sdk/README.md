# Notavia .NET SDK

Official .NET client for [Notavia](https://docs.notavia.saas-infrastructure.com) — send transactional email and manage templates.

**Features:** ✓ Notifications API  ✓ Templates API  ✓ Inbox API  ✓ Preferences API  ✓ Webhooks  ✓ SMS  ✓ Chat channels (Slack / Teams / Discord)  ✓ Workflows API

## Install

```
dotnet add package Notavia.Sdk --prerelease
```

## Register

```csharp
// Program.cs
using NotifyService.Sdk;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddNotifyClient(builder.Configuration);
```

```json
// appsettings.json
{
  "NotifyService": {
    "BaseUrl": "https://api.notavia.saas-infrastructure.com",
    "ApiKey": "ns_live_..."
  }
}
```

## Send your first notification

```csharp
using NotifyService.Sdk;
using NotifyService.Sdk.Notifications;

public class WelcomeService(INotifyClient notify)
{
    public async Task Welcome(string email, string name)
    {
        await notify.Notifications.SendAsync(new SendNotificationRequest(
            Channel: "email",
            Recipient: new Recipient(email, name))
        {
            Subject = $"Welcome, {name}!",
            HtmlBody = "<h1>Hello!</h1>"
        });
    }
}
```

## Idempotency

```csharp
var result = await notify.Notifications.SendAsync(request,
    new SendOptions { IdempotencyKey = userActionId });

if (result.WasReplayed)
{
    // server returned a previously-sent notification
}
```

## Templates

```csharp
await notify.Templates.CreateAsync(new CreateTemplateRequest(
    Key: "welcome",
    Name: "Welcome email",
    SubjectTemplate: "Welcome, {{name}}!",
    HtmlBodyTemplate: "<h1>Hello, {{name}}.</h1>"));

await notify.Notifications.SendAsync(new SendNotificationRequest(
    Channel: "email",
    Recipient: new Recipient(email))
{
    TemplateKey = "welcome",
    TemplateData = new Dictionary<string, object?> { ["name"] = "Alice" }
});
```

## SMS

```csharp
await notify.Notifications.SendAsync(new SendNotificationRequest(
    Channel: NotificationChannel.Sms,
    Recipient: new Recipient(Address: null, ExternalUserId: "usr_1", Phone: "+15005550006"))
{
    TemplateKey = "order_shipped_sms",
    TemplateData = new Dictionary<string, object?> { ["order_id"] = "ord_99" },
});
```

## Chat channels

### Slack

```csharp
// DM by Slack user id
await notify.Notifications.SendAsync(new SendNotificationRequest(
    Channel: NotificationChannel.Slack,
    Recipient: new Recipient(Address: null, ExternalUserId: "usr_1", SlackUserId: "U07XYZ123"))
{
    TemplateKey = "invoice_paid_slack",
    TemplateData = new Dictionary<string, object?> { ["invoice_id"] = "inv_42" },
});

// Message a Slack channel
await notify.Notifications.SendAsync(new SendNotificationRequest(
    Channel: NotificationChannel.Slack,
    Recipient: new Recipient(Address: null, ExternalUserId: "team_alerts", SlackChannelId: "C07XYZ456"))
{
    TemplateKey = "deploy_complete_slack",
});
```

### Microsoft Teams

Teams requires an endpoint registered first via `POST /v1/teams-endpoints`. Use the returned GUID:

```csharp
await notify.Notifications.SendAsync(new SendNotificationRequest(
    Channel: NotificationChannel.Teams,
    Recipient: new Recipient(Address: null, ExternalUserId: "team_alerts",
        TeamsEndpointId: Guid.Parse("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")))
{
    TemplateKey = "incident_alert_teams",
});
```

### Discord

Discord requires an endpoint registered first via `POST /v1/discord-endpoints`. Use the returned GUID:

```csharp
await notify.Notifications.SendAsync(new SendNotificationRequest(
    Channel: NotificationChannel.Discord,
    Recipient: new Recipient(Address: null, ExternalUserId: "team_alerts",
        DiscordEndpointId: Guid.Parse("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")))
{
    TemplateKey = "incident_alert_discord",
});
```

## Errors

```csharp
try
{
    await notify.Notifications.SendAsync(request);
}
catch (NotifyApiException ex) when (ex.StatusCode == 400)
{
    Console.WriteLine($"Bad request: {ex.Error.Code} ({ex.Error.Param})");
}
catch (NotifyApiException ex) when (ex.StatusCode == 429)
{
    // rate-limited — the SDK already retried `Retries.MaxAttempts` times
}
```

## .NET Aspire

Install the companion package:

```
dotnet add package Notavia.Sdk.Aspire --prerelease
```

then:

```csharp
// In your consumer project:
builder.AddNotifyClient();   // reads ConnectionStrings:notifyservice
```

Connection-string format: `Endpoint=https://api.notavia.saas-infrastructure.com;ApiKey=ns_...`

## Workflows

Trigger a workflow run, wait for it to finish, and react to its outcome:

```csharp
using NotifyService.Sdk.Workflows;

// Trigger
WorkflowTriggerResponse trigger = await notify.Workflows.TriggerAsync(
    "invoice_paid",
    new WorkflowTriggerRequest(new { invoice_id = "inv_42", amount = 9900 }),
    idempotencyKey: $"invoice-{invoiceId}");

// Wait for completion (polls automatically, throws TimeoutException after 5 min by default)
WorkflowRunResponse run = await notify.Workflows.WaitForCompletionAsync(trigger.RunId);

Console.WriteLine(run.Status); // "Completed" | "Failed" | "Cancelled"
```

Cancel a run that is still in progress:

```csharp
await notify.Workflows.CancelRunAsync(trigger.RunId);
```

Post an event to a specific run (wakes a `wait_for_event` step):

```csharp
await notify.Workflows.PostRunEventAsync(
    trigger.RunId,
    "payment_confirmed",
    new { transaction_id = "txn_99" });
```

Post an event to all waiting runs of a workflow key:

```csharp
await notify.Workflows.PostWorkflowEventAsync(
    "invoice_paid",
    "invoice_voided");
```

## Telemetry

The SDK exposes a `System.Diagnostics.ActivitySource` named `NotifyService.Sdk`. Enable distributed tracing with:

```csharp
builder.Services.AddOpenTelemetry().WithTracing(t => t.AddSource("NotifyService.Sdk"));
```

Activity tags: `http.method`, `http.status_code`, `url.path`, `notifyservice.request_id`.

## License

MIT.
