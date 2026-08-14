# Notavia PHP SDK

Official PHP client for [Notavia](https://docs.notavia.saas-infrastructure.com) — send transactional email and manage templates.

**Features:** ✓ Notifications API  ✓ Templates API  ✓ Inbox API  ✓ Preferences API  ✓ Webhooks  ✓ SMS  ✓ Chat channels (Slack / Teams / Discord)  ✓ Workflows API

## Install

> **Preview release** — `0.1.0-alpha.1` is not yet published to Packagist. Install directly from the repository using a VCS repository entry in your `composer.json`.

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/saas-infrastructure/notavia-sdk"
        }
    ],
    "require": {
        "notifyservice/notifyservice": "0.1.0-alpha.1"
    }
}
```

Then run:

```
composer install
```

Once published to Packagist, the standard one-liner will work:

```
composer require notavia/notavia
```

## Send your first notification

```php
use NotifyService\NotifyClient;
use NotifyService\Api\Model\NotificationChannel;
use NotifyService\Api\Model\Recipient;
use NotifyService\Api\Model\SendNotificationRequest;

$notify = new NotifyClient(
    baseUrl: 'https://api.notavia.saas-infrastructure.com',
    apiKey: 'ns_live_...',
);

$request = (new SendNotificationRequest())
    ->setChannel(NotificationChannel::EMAIL)
    ->setRecipient((new Recipient())->setAddress('alice@example.com')->setName('Alice'))
    ->setSubject('Welcome')
    ->setHtmlBody('<h1>Hi Alice!</h1>');

$response = $notify->notifications->sendNotification($request);
echo $response->getId();
```

## Idempotency

Pass an idempotency key to guarantee at-most-once delivery. Repeat requests with the same key within 24 hours return the original response without re-sending:

```php
$response = $notify->notifications->sendNotification($request, 'signup-' . $userId);
```

## Templates

Create a stored template, then reference it by key at send time:

```php
use NotifyService\Api\Model\CreateTemplateRequest;
use NotifyService\Api\Model\RenderTemplateRequest;

// Create
$notify->templates->createTemplate(
    (new CreateTemplateRequest())
        ->setKey('welcome')
        ->setName('Welcome email')
        ->setSubjectTemplate('Welcome, {{name}}!')
        ->setHtmlBodyTemplate('<h1>Hello, {{name}}.</h1>')
);

// Preview with sample data before sending
$rendered = $notify->templates->renderTemplate(
    'welcome',
    (new RenderTemplateRequest())->setData(['name' => 'Alice'])
);
echo $rendered->getSubject();   // "Welcome, Alice!"
echo $rendered->getHtmlBody();  // "<h1>Hello, Alice.</h1>"

// Send using the stored template
$notify->notifications->sendNotification(
    (new SendNotificationRequest())
        ->setChannel(NotificationChannel::EMAIL)
        ->setRecipient((new Recipient())->setAddress('alice@example.com'))
        ->setTemplateKey('welcome')
        ->setTemplateData(['name' => 'Alice'])
);

// List all templates (cursor-paginated)
$page = $notify->templates->listTemplates(limit: 20);

// Fetch a single template by key
$template = $notify->templates->getTemplate('welcome');

// Delete a template
$notify->templates->deleteTemplate('welcome');
```

## SMS

```php
$notify->notifications->sendNotification(
    (new SendNotificationRequest())
        ->setChannel(NotificationChannel::SMS)
        ->setRecipient((new Recipient())->setExternalUserId('usr_1'))
        ->setTemplateKey('order_shipped_sms')
        ->setTemplateData(['order_id' => 'ord_99'])
);
```

## Chat channels

### Slack

```php
// DM by Slack user id
$notify->notifications->sendNotification(
    (new SendNotificationRequest())
        ->setChannel(NotificationChannel::SLACK)
        ->setRecipient(
            (new Recipient())
                ->setExternalUserId('usr_1')
                ->setSlackUserId('U07XYZ123')
        )
        ->setTemplateKey('invoice_paid_slack')
        ->setTemplateData(['invoice_id' => 'inv_42'])
);

// Post to a Slack channel instead of a DM
$recipient = (new Recipient())->setExternalUserId('usr_1')->setSlackChannelId('C07XYZ123');
```

### Microsoft Teams

Teams requires an endpoint registered first via `POST /v1/teams-endpoints`. Use the returned GUID:

```php
$notify->notifications->sendNotification(
    (new SendNotificationRequest())
        ->setChannel(NotificationChannel::TEAMS)
        ->setRecipient(
            (new Recipient())
                ->setExternalUserId('team_alerts')
                ->setTeamsEndpointId('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
        )
        ->setTemplateKey('incident_alert_teams')
);
```

### Discord

Discord requires an endpoint registered first via `POST /v1/discord-endpoints`. Use the returned GUID:

```php
$notify->notifications->sendNotification(
    (new SendNotificationRequest())
        ->setChannel(NotificationChannel::DISCORD)
        ->setRecipient(
            (new Recipient())
                ->setExternalUserId('team_alerts')
                ->setDiscordEndpointId('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
        )
        ->setTemplateKey('incident_alert_discord')
);
```

## Webhook signature verification

Verify incoming webhook payloads server-side using the signing secret (prefixed `whsec_`):

```php
use NotifyService\Webhooks;

$isValid = Webhooks::verifySignature(
    rawBody: file_get_contents('php://input'),
    signatureHeader: $_SERVER['HTTP_X_NOTIFY_SIGNATURE'],
    signingSecret: 'whsec_...',
);

if (!$isValid) {
    http_response_code(401);
    exit('Invalid webhook signature');
}
```

The default timestamp tolerance is 5 minutes. Override it with the optional fourth argument:

```php
$isValid = Webhooks::verifySignature($rawBody, $signatureHeader, 'whsec_...', toleranceSeconds: 60);
```

## Delegated tokens (inbox and preferences)

Mint short-lived JWTs so your frontend can access the inbox or preferences widgets directly without exposing your API key. Always mint server-side — never expose the signing key:

```php
use NotifyService\Tokens;

// Inbox-only token (default 15-minute TTL)
$inboxToken = Tokens::mintInbox(
    organizationId: 'org_123',
    externalUserId: 'usr_456',
    signingKey: 'nsi_...',   // must start with nsi_
    ttlSeconds: 900,          // min 60, max 86400
);

// Preferences-only token
$prefsToken = Tokens::mintPrefs('org_123', 'usr_456', 'nsi_...');

// Combined inbox + preferences token
$combinedToken = Tokens::mintInboxAndPrefs('org_123', 'usr_456', 'nsi_...');
```

Decode a token to inspect its claims:

```php
$payload = Tokens::decode($token);
echo $payload->iss;    // organization id
echo $payload->sub;    // external user id
echo $payload->scope;  // "inbox", "prefs", or "inbox prefs"
echo $payload->exp;    // Unix timestamp
```

## Error handling

All API errors throw `NotifyService\Api\ApiException` on non-2xx responses. Use `getCode()` for the HTTP status and `getResponseBody()` for the raw JSON body, which contains `code`, `message`, and (optionally) `param` fields:

```php
use NotifyService\Api\ApiException;

try {
    $response = $notify->notifications->sendNotification($request);
} catch (ApiException $e) {
    if ($e->getCode() === 400) {
        $error = json_decode($e->getResponseBody(), true);
        echo "{$error['code']}: {$error['message']} (param: {$error['param']})";
    } elseif ($e->getCode() === 429) {
        // Rate-limited — the SDK already retried up to 3 times
        throw $e;
    } else {
        throw $e;
    }
}
```

## Retries

`NotifyClient` retries up to 3 times on `429 Too Many Requests` and `5xx` responses, with exponential back-off and `Retry-After` header support. Adjust the retry count at construction time:

```php
$notify = new NotifyClient('https://api.notavia.saas-infrastructure.com', 'ns_live_...', maxRetries: 5);
```

Disable retries entirely:

```php
$notify = new NotifyClient('https://api.notavia.saas-infrastructure.com', 'ns_live_...', maxRetries: 0);
```

## Requirements

- PHP 8.1+
- Dependencies: `guzzlehttp/guzzle`

## License

MIT.
