# @notavia/sdk

Official TypeScript SDK for [Notavia](https://docs.notavia.saas-infrastructure.com) — send transactional email and manage templates.

**Features:** ✓ Notifications API  ✓ Templates API  ✓ Inbox API  ✓ Preferences API  ✓ Webhooks  ✓ SMS  ✓ Chat channels (Slack / Teams / Discord)  ✓ Workflows API

## Install

```
npm install @notavia/sdk@next
```

## Use

```ts
import { createNotifyClient } from "@notavia/sdk";

const notify = createNotifyClient({
  apiKey: process.env.NOTIFY_API_KEY!,
  baseUrl: "https://api.notavia.saas-infrastructure.com",
});

const { notification } = await notify.notifications.send({
  channel: "email",
  recipient: { address: "alice@example.com", name: "Alice" },
  subject: "Welcome",
  htmlBody: "<h1>Hello!</h1>",
});
console.log(notification.id);
```

## Idempotency

```ts
const result = await notify.notifications.send(request, {
  idempotencyKey: `user-signup-${userId}`,
});
if (result.wasReplayed) { /* server returned a previously-sent notification */ }
```

## Templates

```ts
await notify.templates.create({
  key: "welcome",
  name: "Welcome email",
  subjectTemplate: "Welcome, {{name}}!",
  htmlBodyTemplate: "<h1>Hello, {{name}}.</h1>",
});

await notify.notifications.send({
  channel: "email",
  recipient: { address: "alice@example.com" },
  templateKey: "welcome",
  templateData: { name: "Alice" },
});
```

## SMS

```ts
await notify.notifications.send({
  channel: "sms",
  recipient: { externalUserId: "usr_1", phone: "+15005550006" },
  templateKey: "order_shipped_sms",
  templateData: { order_id: "ord_99" },
});
```

## Chat channels

### Slack send (DM by user id)

```ts
await notify.notifications.send({
  channel: "slack",
  recipient: { externalUserId: "usr_1", slackUserId: "U07XYZ123" },
  templateKey: "invoice_paid_slack",
  templateData: { invoice_id: "inv_42" },
});
```

To send to a public Slack channel instead of a user DM, use `slackChannelId`:

```ts
recipient: { externalUserId: "usr_1", slackChannelId: "C07XYZ123" }
```

### Teams + Discord

`recipient.teamsEndpointId` (GUID returned from `POST /v1/teams-endpoints`) or
`recipient.discordEndpointId` (GUID returned from `POST /v1/discord-endpoints`):

```ts
await notify.notifications.send({
  channel: "teams",
  recipient: { externalUserId: "usr_1", teamsEndpointId: "00000000-0000-0000-0000-000000000001" },
  templateKey: "welcome_teams",
});

await notify.notifications.send({
  channel: "discord",
  recipient: { externalUserId: "usr_1", discordEndpointId: "00000000-0000-0000-0000-000000000002" },
  templateKey: "welcome_discord",
});
```

## Workflows

Trigger a workflow run, wait for it to finish, and cancel it if needed:

```ts
const { runId } = await notify.workflows.trigger(
  "invoice_paid",
  { triggerData: { invoiceId: "inv_42", amount: 199 } },
  { idempotencyKey: `invoice-paid-${invoiceId}` },
);

const run = await notify.workflows.waitForCompletion(runId, {
  timeoutMs: 60_000,
});
console.log(run.status); // "Completed" | "Failed" | "Cancelled"
console.log(run.steps);  // WorkflowStepRunSummary[]
```

Cancel a run that is no longer needed:

```ts
await notify.workflows.cancelRun(runId);
```

Post an event to a specific run (wakes a `wait_for_event` step if the match filter passes):

```ts
await notify.workflows.postRunEvent(runId, "payment_confirmed", { invoice_id: "inv_42" });
```

Post an event to all waiting runs of a workflow:

```ts
await notify.workflows.postWorkflowEvent("invoice_paid", "payment_confirmed", { invoice_id: "inv_42" });
```

Inspect a run directly:

```ts
const run = await notify.workflows.getRun(runId);
```

## Errors

```ts
import { NotifyApiError } from "@notavia/sdk";

try {
  await notify.notifications.send(request);
} catch (e) {
  if (e instanceof NotifyApiError && e.statusCode === 400) {
    console.error(`${e.error.code}: ${e.error.message} (param ${e.error.param})`);
  } else throw e;
}
```

## Retries

By default the SDK retries up to 3 times beyond the first request on transient failures (5xx, 408, 429), with exponential backoff and `Retry-After` support. Disable:

```ts
const notify = createNotifyClient({ apiKey, retries: { enabled: false } });
```

## Custom fetch

Pass your own `fetch` for testing or instrumentation:

```ts
const notify = createNotifyClient({ apiKey, fetch: myFetch });
```

## Compatibility

- Node 20+.
- ESM and CJS builds; TypeScript types included.
- Zero runtime dependencies.

## License

MIT.
