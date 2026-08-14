# Notavia SDKs

Official client SDKs for [Notavia](https://notavia.saas-infrastructure.com) — a white-label
notification engine. One REST API sends transactional email, in-app inbox notifications, SMS and
chat, branded as your product rather than as Notavia.

**Documentation: [docs.notavia.saas-infrastructure.com](https://docs.notavia.saas-infrastructure.com)**

This repository is a read-only distribution mirror. Development happens in a private repository;
issues and support go through [the documentation site](https://docs.notavia.saas-infrastructure.com).

## Install

| Language | Package | Install |
|---|---|---|
| .NET | `Notavia.Sdk` | `dotnet add package Notavia.Sdk` |
| TypeScript | `@notavia/sdk` | `npm install @notavia/sdk` |
| Python | `notavia` | `pip install notavia` |
| Go | `github.com/saas-infrastructure/notavia-sdk/go` | `go get github.com/saas-infrastructure/notavia-sdk/go` |
| PHP | `notavia/notavia` | `composer require notavia/notavia` |
| Java | `com.saas-infrastructure.notavia:notavia` | **coming soon** — the source is in [`java/`](./java) and usable directly |

Additional .NET packages: `Notavia.Sdk.AspNetCore` (webhook endpoint helper),
`Notavia.Sdk.Aspire`, `Notavia.Inbox.Blazor`, `Notavia.Prefs.Blazor`.

Additional TypeScript packages: `@notavia/inbox` and `@notavia/inbox-client` (in-app inbox),
`@notavia/prefs` and `@notavia/prefs-client` (preference centre).

## Getting started

Authenticate with a bearer API key. Keys are per environment and prefixed `nsk_test_` or
`nsk_live_`; the two environments are fully isolated, and a test key records sends without
delivering or billing them.

```bash
curl https://api.notavia.saas-infrastructure.com/v1/notifications \
  -H "Authorization: Bearer nsk_test_..." \
  -H "Content-Type: application/json" \
  -d '{"recipient":{"address":"alice@example.com","name":"Alice"},"template":"welcome"}'
```

See the [quickstart](https://docs.notavia.saas-infrastructure.com/start/quickstart/) for the same
call in every SDK.

## Notes that save time

- **Sends are asynchronous.** Use [webhooks](https://docs.notavia.saas-infrastructure.com/guides/verifying-webhooks/)
  for delivery outcome, verify every signature before acting on it, and make handlers idempotent on
  the event id — it is stable across retries.
- **Pass an idempotency key on writes** (`Idempotency-Key`, or `idempotencyKey` / `idempotency_key`
  in the SDKs). Repeating a request with the same key within 24 hours returns the original response
  without re-sending.
- **Templates send their latest published version.** Saving a draft changes nothing until you
  publish it.

## API reference

The complete OpenAPI description is in [`spec/`](./spec), and is rendered at
[docs.notavia.saas-infrastructure.com/api](https://docs.notavia.saas-infrastructure.com/api/overview/).

## Licence

MIT. See [LICENSE](./LICENSE).
