package notifyservice

import "testing"

func TestNewClientWiresAuthAndResources(t *testing.T) {
	c := NewClient(Options{BaseURL: "https://api.example.com", APIKey: "ns_test_abc"})
	if c.Notifications == nil || c.Templates == nil || c.Usage == nil || c.Workflows == nil {
		t.Fatal("expected grouped tag resources to be set")
	}
	if c.raw.GetConfig().DefaultHeader["Authorization"] != "Bearer ns_test_abc" {
		t.Fatalf("expected bearer auth header, got %q", c.raw.GetConfig().DefaultHeader["Authorization"])
	}
}
