# Notavia Go SDK

Official Go client for [Notavia](https://docs.notavia.saas-infrastructure.com) — send transactional email and manage templates.

**Features:** ✓ Notifications API  ✓ Templates API  ✓ Inbox API  ✓ Preferences API  ✓ Webhooks  ✓ SMS  ✓ Chat channels (Slack / Teams / Discord)  ✓ Workflows API

## Install

```
go get github.com/saas-infrastructure/notavia-sdk/go
```

## Send your first notification

```go
package main

import (
	"context"
	"fmt"

	notifyservice "github.com/saas-infrastructure/notavia-sdk/go"
	"github.com/saas-infrastructure/notavia-sdk/go/generated"
)

func main() {
	client := notifyservice.NewClient(notifyservice.Options{
		BaseURL: "https://api.notavia.saas-infrastructure.com",
		APIKey:  "ns_live_...",
	})

	recipient := generated.NewRecipient()
	recipient.SetAddress("alice@example.com")
	recipient.SetName("Alice")

	req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_EMAIL, *recipient)
	req.SetSubject("Welcome!")
	req.SetHtmlBody("<h1>Hello!</h1>")

	resp, _, err := client.Notifications.SendNotification(context.Background()).
		SendNotificationRequest(*req).
		Execute()
	if err != nil {
		panic(err)
	}
	fmt.Println(*resp.Id)
}
```

## Idempotency

Pass an `Idempotency-Key` header to deduplicate sends within 24 hours. The server returns `200 OK` on replays instead of `202 Accepted`.

```go
req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_EMAIL, *recipient)
req.SetSubject("Order shipped")
req.SetHtmlBody("<p>Your order is on its way.</p>")

resp, httpResp, err := client.Notifications.SendNotification(ctx).
	SendNotificationRequest(*req).
	IdempotencyKey("order-shipped-" + orderID).
	Execute()

wasReplayed := httpResp != nil && httpResp.StatusCode == 200
```

## Templates

```go
// Create a template
createReq := generated.NewCreateTemplateRequest("welcome", "Welcome email")
createReq.SetSubjectTemplate("Welcome, {{name}}!")
createReq.SetHtmlBodyTemplate("<h1>Hello, {{name}}.</h1>")
client.Templates.CreateTemplate(ctx).CreateTemplateRequest(*createReq).Execute()

// Send using the template
recipient := generated.NewRecipient()
recipient.SetAddress("alice@example.com")

req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_EMAIL, *recipient)
req.SetTemplateKey("welcome")
req.SetTemplateData(map[string]interface{}{"name": "Alice"})

client.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()
```

## SMS

```go
recipient := generated.NewRecipient()
recipient.SetAddress("+15005550006")

req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_SMS, *recipient)
req.SetTemplateKey("order_shipped_sms")
req.SetTemplateData(map[string]interface{}{"order_id": "ord_99"})

client.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()
```

## Chat channels

### Slack

```go
// DM by Slack user id
recipient := generated.NewRecipient()
recipient.SetSlackUserId("U07XYZ123")

req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_SLACK, *recipient)
req.SetTemplateKey("invoice_paid_slack")
req.SetTemplateData(map[string]interface{}{"invoice_id": "inv_42"})

client.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()

// Post to a Slack channel instead
channelRecipient := generated.NewRecipient()
channelRecipient.SetSlackChannelId("C07XYZ456")
```

### Microsoft Teams

Teams requires an endpoint registered via `POST /v1/teams-endpoints`. Use the returned GUID:

```go
recipient := generated.NewRecipient()
recipient.SetTeamsEndpointId("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")

req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_TEAMS, *recipient)
req.SetTemplateKey("incident_alert_teams")

client.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()
```

### Discord

Discord requires an endpoint registered via `POST /v1/discord-endpoints`. Use the returned GUID:

```go
recipient := generated.NewRecipient()
recipient.SetDiscordEndpointId("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")

req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_DISCORD, *recipient)
req.SetTemplateKey("incident_alert_discord")

client.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()
```

## Webhook verification

Verify incoming webhook payloads server-side using the `webhooks` package:

```go
import "github.com/saas-infrastructure/notavia-sdk/go/webhooks"

ok := webhooks.Verify(
	string(rawBody),
	r.Header.Get("Notify-Signature"),
	"whsec_yourSigningSecret",
)
if !ok {
	http.Error(w, "invalid signature", http.StatusUnauthorized)
	return
}
```

Override the default 5-minute timestamp tolerance:

```go
import "time"

ok := webhooks.Verify(body, sig, secret, webhooks.WithTolerance(60*time.Second))
```

## Inbox and preference tokens

Mint short-lived delegated JWTs for embedded inbox or preference-center components using the `tokens` package (server-side only — never expose the signing key):

```go
import "github.com/saas-infrastructure/notavia-sdk/go/tokens"

// Inbox-only token (default 15-minute TTL)
inboxToken, err := tokens.MintInbox(tokens.Options{
	OrganizationID: "org_...",
	ExternalUserID: "usr_123",
	SigningKey:      "nsi_...",
})

// Preferences-only token (default 15-minute TTL)
prefsToken, err := tokens.MintPrefs(tokens.Options{
	OrganizationID: "org_...",
	ExternalUserID: "usr_123",
	SigningKey:      "nsi_...",
})

// Combined inbox + preferences token
combinedToken, err := tokens.MintInboxAndPrefs(tokens.Options{
	OrganizationID: "org_...",
	ExternalUserID: "usr_123",
	SigningKey:      "nsi_...",
})
```

## Retries

`NewClient` wraps the HTTP transport with a 429-aware retry transport. By default it retries up to 3 times on `429 Too Many Requests` and `5xx` responses, with exponential back-off and `Retry-After` header support.

Override the retry count or supply your own `http.Client`:

```go
import "net/http"

client := notifyservice.NewClient(notifyservice.Options{
	BaseURL:    "https://api.notavia.saas-infrastructure.com",
	APIKey:     "ns_live_...",
	MaxRetries: 5,
	HTTPClient: &http.Client{Timeout: 60 * time.Second},
})
```

`MaxRetries` defaults to 3 when unset (zero value). A negative value disables retries, resulting in exactly one request attempt. Retries apply to `429 Too Many Requests` and `5xx` responses and honour the `Retry-After` response header.

## Error handling

All API errors are returned as `*generated.GenericOpenAPIError`. Cast the model to `generated.ErrorEnvelope` to access the structured `{code, message, param}` body:

```go
import (
	"errors"
	"github.com/saas-infrastructure/notavia-sdk/go/generated"
)

resp, _, err := client.Notifications.SendNotification(ctx).
	SendNotificationRequest(*req).
	Execute()
if err != nil {
	var apiErr *generated.GenericOpenAPIError
	if errors.As(err, &apiErr) {
		if env, ok := apiErr.Model().(generated.ErrorEnvelope); ok {
			fmt.Printf("code=%s message=%s param=%s\n",
				env.Error.Code, env.Error.Message, env.Error.GetParam())
		}
	}
}
```

## License

MIT.
