# Notavia Java SDK

Official Java client for [Notavia](https://saas-infrastructure.com/products/notify) — send transactional email and manage templates.

**Features:** ✓ Notifications API  ✓ Templates API  ✓ Inbox API  ✓ Preferences API  ✓ Webhooks  ✓ SMS  ✓ Chat channels (Slack / Teams / Discord)  ✓ Workflows API

## Install

> **Preview release** — `0.1.0-preview.1` is not yet published to Maven Central. Add the dependency directly from the repository until the first stable release.

```xml
<dependency>
  <groupId>com.saas-infrastructure.notavia</groupId>
  <artifactId>notavia</artifactId>
  <version>0.1.0-preview.1</version>
</dependency>
```

## Send your first notification

```java
import com.notifyservice.NotifyClient;
import com.notifyservice.api.model.NotificationChannel;
import com.notifyservice.api.model.Recipient;
import com.notifyservice.api.model.SendNotificationRequest;

var notify = new NotifyClient("https://api.notavia.saas-infrastructure.com", "ns_live_...");

var req = new SendNotificationRequest()
    .channel(NotificationChannel.EMAIL)
    .recipient(new Recipient().address("alice@example.com").name("Alice"))
    .subject("Welcome")
    .htmlBody("<h1>Hi Alice!</h1>");

var res = notify.notifications.sendNotification(req, null);
System.out.println(res.getId());
```

## Idempotency

Pass an idempotency key as the second argument to guarantee at-most-once delivery. Repeat requests with the same key within 24 hours return the original response without re-sending:

```java
var res = notify.notifications.sendNotification(req, "signup-" + userId);
```

## Templates

Create a stored template, then reference it by key at send time:

```java
import com.notifyservice.api.model.CreateTemplateRequest;
import com.notifyservice.api.model.RenderTemplateRequest;

// Create
notify.templates.createTemplate(
    new CreateTemplateRequest()
        .key("welcome")
        .name("Welcome email")
        .subjectTemplate("Welcome, {{name}}!")
        .htmlBodyTemplate("<h1>Hello, {{name}}.</h1>")
);

// Preview with sample data before sending
var rendered = notify.templates.renderTemplate(
    "welcome",
    new RenderTemplateRequest().putDataItem("name", "Alice")
);
System.out.println(rendered.getSubject());   // "Welcome, Alice!"
System.out.println(rendered.getHtmlBody());  // "<h1>Hello, Alice.</h1>"

// Send using the stored template
notify.notifications.sendNotification(
    new SendNotificationRequest()
        .channel(NotificationChannel.EMAIL)
        .recipient(new Recipient().address("alice@example.com"))
        .templateKey("welcome")
        .putTemplateDataItem("name", "Alice"),
    null
);

// List all templates (cursor-paginated)
var page = notify.templates.listTemplates(20, null);

// Fetch a single template by key
var template = notify.templates.getTemplate("welcome");

// Delete a template
notify.templates.deleteTemplate("welcome");
```

## SMS

```java
notify.notifications.sendNotification(
    new SendNotificationRequest()
        .channel(NotificationChannel.SMS)
        .recipient(new Recipient().externalUserId("usr_1"))
        .templateKey("order_shipped_sms")
        .putTemplateDataItem("order_id", "ord_99"),
    null
);
```

## Chat channels

### Slack

```java
// DM by Slack user id
notify.notifications.sendNotification(
    new SendNotificationRequest()
        .channel(NotificationChannel.SLACK)
        .recipient(new Recipient().externalUserId("usr_1").slackUserId("U07XYZ123"))
        .templateKey("invoice_paid_slack")
        .putTemplateDataItem("invoice_id", "inv_42"),
    null
);

// Post to a Slack channel instead of a DM
var channelRecipient = new Recipient().externalUserId("usr_1").slackChannelId("C07XYZ123");
```

### Microsoft Teams

Teams requires an endpoint registered first via `POST /v1/teams-endpoints`. Use the returned GUID:

```java
notify.notifications.sendNotification(
    new SendNotificationRequest()
        .channel(NotificationChannel.TEAMS)
        .recipient(new Recipient()
            .externalUserId("team_alerts")
            .teamsEndpointId("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"))
        .templateKey("incident_alert_teams"),
    null
);
```

### Discord

Discord requires an endpoint registered first via `POST /v1/discord-endpoints`. Use the returned GUID:

```java
notify.notifications.sendNotification(
    new SendNotificationRequest()
        .channel(NotificationChannel.DISCORD)
        .recipient(new Recipient()
            .externalUserId("team_alerts")
            .discordEndpointId("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"))
        .templateKey("incident_alert_discord"),
    null
);
```

## Webhook signature verification

Verify incoming webhook payloads server-side using the signing secret (prefixed `whsec_`):

```java
import com.notifyservice.Webhooks;

boolean isValid = Webhooks.verifySignature(
    rawBody,
    request.getHeader("NotifyService-Signature"),
    "whsec_..."
);
if (!isValid) {
    response.sendError(401, "Invalid webhook signature");
    return;
}
```

The default timestamp tolerance is 5 minutes. Override it with the optional fourth parameter:

```java
boolean isValid = Webhooks.verifySignature(rawBody, signatureHeader, "whsec_...", 60L);
```

## Delegated tokens (inbox and preferences)

Mint short-lived JWTs so your frontend can access the inbox or preferences widgets directly without exposing your API key. Always mint server-side — never expose the signing key:

```java
import com.notifyservice.Tokens;

// Inbox-only token (default 15-minute TTL)
String inboxToken = Tokens.mintInbox("org_123", "usr_456", "nsi_...");

// Inbox-only token with custom TTL (min 60, max 86400 seconds)
String inboxToken = Tokens.mintInbox("org_123", "usr_456", "nsi_...", 900L);

// Preferences-only token
String prefsToken = Tokens.mintPrefs("org_123", "usr_456", "nsi_...");

// Combined inbox + preferences token
String combinedToken = Tokens.mintInboxAndPrefs("org_123", "usr_456", "nsi_...");
```

Decode a token to inspect its claims:

```java
import com.notifyservice.TokenPayload;

TokenPayload payload = Tokens.decode(token);
System.out.println(payload.iss);    // organization id
System.out.println(payload.sub);    // external user id
System.out.println(payload.scope);  // "inbox", "prefs", or "inbox prefs"
System.out.println(payload.exp);    // Unix timestamp
```

## Error handling

All API errors throw `com.notifyservice.api.ApiException` on non-2xx responses. Use `getCode()` for the HTTP status and `getResponseBody()` for the raw JSON body, which contains `code`, `message`, and (optionally) `param` fields:

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notifyservice.api.ApiException;

try {
    var res = notify.notifications.sendNotification(req, null);
} catch (ApiException e) {
    if (e.getCode() == 400) {
        var error = new ObjectMapper().readTree(e.getResponseBody());
        System.out.printf("%s: %s (param: %s)%n",
            error.path("code").asText(),
            error.path("message").asText(),
            error.path("param").asText());
    } else if (e.getCode() == 429) {
        // Rate-limited — the SDK already retried up to 3 times
        throw e;
    } else {
        throw e;
    }
}
```

## Retries

`NotifyClient` retries up to 3 times on `429 Too Many Requests` and `5xx` responses, with exponential back-off and `Retry-After` header support. Adjust the retry count at construction time:

```java
var notify = new NotifyClient("https://api.notavia.saas-infrastructure.com", "ns_live_...", 5);
```

Disable retries entirely:

```java
var notify = new NotifyClient("https://api.notavia.saas-infrastructure.com", "ns_live_...", 0);
```

## Requirements

- Java 11+
- Dependencies: `jackson-databind`, `jackson-datatype-jsr310`, `jackson-databind-nullable`, `jakarta.annotation-api`
- HTTP transport: JDK built-in `java.net.http.HttpClient` (no OkHttp)

## License

MIT.
