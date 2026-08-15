package notifyservice

import (
	"context"
	"os"
	"testing"

	"github.com/saas-infrastructure/notavia-sdk/go/generated"
)

func hostClient(t *testing.T) *Client {
	t.Helper()
	baseURL := os.Getenv("NOTIFY_BASE_URL")
	apiKey := os.Getenv("NOTIFY_API_KEY")
	if baseURL == "" || apiKey == "" {
		t.Skip("NOTIFY_BASE_URL and NOTIFY_API_KEY must be set to run integration tests")
	}
	return NewClient(Options{BaseURL: baseURL, APIKey: apiKey})
}

func TestSendThenList_Integration(t *testing.T) {
	c := hostClient(t)
	ctx := context.Background()

	recipient := generated.NewRecipient()
	recipient.SetAddress("alice@example.com")

	req := generated.NewSendNotificationRequest(generated.NOTIFICATIONCHANNEL_EMAIL, *recipient)
	req.SetSubject("Integration test")
	req.SetHtmlBody("<p>hello</p>")

	sent, _, err := c.Notifications.SendNotification(ctx).SendNotificationRequest(*req).Execute()
	if err != nil {
		t.Fatalf("SendNotification error: %v", err)
	}
	if sent.Id == nil {
		t.Fatal("expected notification id in response")
	}
	createdID := *sent.Id

	page, _, err := c.Notifications.ListNotifications(ctx).Limit(int32(5)).Execute()
	if err != nil {
		t.Fatalf("ListNotifications error: %v", err)
	}

	found := false
	for _, n := range page.Data {
		if n.Id != nil && *n.Id == createdID {
			found = true
			break
		}
	}
	if !found {
		t.Fatalf("expected notification %s to appear in list page, got %d items", createdID, len(page.Data))
	}
}
