// Package notifyservice is the official Go SDK for the NotifyService REST API.
package notifyservice

import (
	"net/http"
	"strings"
	"time"

	"github.com/saas-infrastructure/notavia-sdk/go/generated"
)

// Options configures a Client.
type Options struct {
	BaseURL    string
	APIKey     string
	HTTPClient *http.Client
	MaxRetries int
}

// Client is the top-level NotifyService client grouping the generated tag APIs.
type Client struct {
	raw *generated.APIClient

	Notifications *generated.NotificationsAPIService
	Templates     *generated.TemplatesAPIService
	Usage         *generated.UsageAPIService
	Preferences   *generated.PreferencesAPIService
	Workflows     *generated.WorkflowsAPIService
	Webhooks      *generated.WebhooksAPIService
	Inbox         *generated.InboxAPIService
	SMS           *generated.SMSAPIService
	Slack         *generated.SlackAPIService
	Teams         *generated.TeamsAPIService
	Discord       *generated.DiscordAPIService
}

// NewClient builds a Client with bearer auth and a 429-aware retrying transport.
func NewClient(opts Options) *Client {
	cfg := generated.NewConfiguration()
	cfg.Servers = generated.ServerConfigurations{{URL: strings.TrimRight(opts.BaseURL, "/")}}
	cfg.DefaultHeader["Authorization"] = "Bearer " + opts.APIKey

	base := opts.HTTPClient
	if base == nil {
		base = &http.Client{Timeout: 30 * time.Second}
	}
	retries := opts.MaxRetries
	if retries == 0 {
		retries = 3
	}
	if retries < 0 {
		retries = 0
	}
	base.Transport = &retryTransport{next: transportOrDefault(base.Transport), max: retries}
	cfg.HTTPClient = base

	raw := generated.NewAPIClient(cfg)
	return &Client{
		raw:           raw,
		Notifications: raw.NotificationsAPI,
		Templates:     raw.TemplatesAPI,
		Usage:         raw.UsageAPI,
		Preferences:   raw.PreferencesAPI,
		Workflows:     raw.WorkflowsAPI,
		Webhooks:      raw.WebhooksAPI,
		Inbox:         raw.InboxAPI,
		SMS:           raw.SMSAPI,
		Slack:         raw.SlackAPI,
		Teams:         raw.TeamsAPI,
		Discord:       raw.DiscordAPI,
	}
}

func transportOrDefault(rt http.RoundTripper) http.RoundTripper {
	if rt != nil {
		return rt
	}
	return http.DefaultTransport
}

type retryTransport struct {
	next http.RoundTripper
	max  int
}

func (r *retryTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	var resp *http.Response
	var err error
	for attempt := 0; ; attempt++ {
		if req.Body != nil && req.GetBody != nil {
			body, gerr := req.GetBody()
			if gerr != nil {
				return nil, gerr
			}
			req.Body = body
		}
		resp, err = r.next.RoundTrip(req)
		if err != nil || resp == nil {
			return resp, err
		}
		if resp.StatusCode != http.StatusTooManyRequests && resp.StatusCode < 500 {
			return resp, nil
		}
		if attempt >= r.max {
			return resp, nil
		}
		wait := retryAfter(resp, attempt)
		resp.Body.Close()
		time.Sleep(wait)
	}
}

func retryAfter(resp *http.Response, attempt int) time.Duration {
	if v := resp.Header.Get("Retry-After"); v != "" {
		if secs, err := time.ParseDuration(v + "s"); err == nil {
			return secs
		}
	}
	return time.Duration(1<<attempt) * 500 * time.Millisecond
}
