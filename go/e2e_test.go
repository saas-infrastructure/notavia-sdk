package notifyservice

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/saas-infrastructure/notavia-sdk/go/generated"
)

func ptr[T any](v T) *T { return &v }

func TestSendPipeline_E2E(t *testing.T) {
	c := hostClient(t)
	ctx := context.Background()

	recipient := generated.NewRecipient()
	recipient.SetAddress("alice@example.com")

	req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_EMAIL, *recipient)
	req.SetSubject("E2E pipeline test")
	req.SetHtmlBody("<p>e2e</p>")

	sent, _, err := c.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()
	if err != nil {
		t.Fatalf("SendNotification error: %v", err)
	}
	if sent.Id == nil {
		t.Fatal("expected notification id in response")
	}
	id := *sent.Id

	deadline := time.Now().Add(30 * time.Second)
	terminalStatuses := map[string]bool{
		"sent": true, "failed": true, "suppressed": true,
		"delivered": true, "bounced": true, "complained": true,
	}

	var finalStatus string
	for time.Now().Before(deadline) {
		resp, _, err := c.Notifications.GetNotification(ctx, id).Execute()
		if err != nil {
			t.Fatalf("GetNotification error: %v", err)
		}
		if resp.Status != nil {
			status := string(*resp.Status)
			if terminalStatuses[status] {
				finalStatus = status
				break
			}
		}
		time.Sleep(500 * time.Millisecond)
	}

	if finalStatus == "" {
		t.Fatalf("notification %s did not reach a terminal status within 30s", id)
	}
	if !strings.EqualFold(finalStatus, "sent") {
		t.Fatalf("expected final status 'sent', got %q", finalStatus)
	}
}
