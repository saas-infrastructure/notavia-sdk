import { createNotifyClient, NotifyApiError } from "../dist/index.js";

const baseUrl = process.env.NOTIFY_BASE_URL;
const apiKey = process.env.NOTIFY_API_KEY;
if (!baseUrl || !apiKey) {
  console.error("e2e-runner: NOTIFY_BASE_URL and NOTIFY_API_KEY must be set");
  process.exit(2);
}

const notify = createNotifyClient({ baseUrl, apiKey, retries: { enabled: false }, timeoutMs: 10_000 });

try {
  const { notification } = await notify.notifications.send({
    channel: "email",
    recipient: { address: "alice@example.com", name: "Alice" },
    subject: "TS SDK E2E",
    htmlBody: "<p>via TS SDK over real HTTP</p>",
  });

  let latest = notification;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline && (latest.status === "queued" || latest.status === "sending")) {
    await new Promise((r) => setTimeout(r, 300));
    latest = await notify.notifications.get(latest.id);
  }

  console.log(JSON.stringify({ id: latest.id, status: latest.status }));
  process.exit(latest.status === "sent" ? 0 : 1);
} catch (e) {
  if (e instanceof NotifyApiError) {
    console.error(JSON.stringify({ error: e.error, status_code: e.statusCode, request_id: e.requestId }));
  } else {
    console.error(e && (e.stack ?? e.message ?? String(e)));
  }
  process.exit(1);
}
