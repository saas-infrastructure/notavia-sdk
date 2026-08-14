import { describe, it, expect } from "vitest";
import { createNotifyClient, NotifyApiError } from "../../src/index.js";

const baseUrl = process.env.NOTIFY_TEST_BASE_URL;
const apiKey = process.env.NOTIFY_TEST_API_KEY;
const RUN = Boolean(baseUrl && apiKey);

describe.skipIf(!RUN)("SDK against running host (integration)", () => {
  it("sends a notification and lists it back", async () => {
    const notify = createNotifyClient({ baseUrl: baseUrl!, apiKey: apiKey!, retries: { enabled: false } });

    const { notification } = await notify.notifications.send({
      channel: "email",
      recipient: { address: "alice@example.com", name: "Alice" },
      subject: "Integration",
      htmlBody: "<p>via SDK</p>",
    });
    expect(notification.status).toBe("queued");

    const page = await notify.notifications.list({ limit: 5 });
    const found = page.data.find((n) => n.id === notification.id);
    expect(found).toBeDefined();
  });

  it("creates and renders a template", async () => {
    const notify = createNotifyClient({ baseUrl: baseUrl!, apiKey: apiKey!, retries: { enabled: false } });
    const key = "int-" + Math.random().toString(36).slice(2, 10);
    await notify.templates.create({
      key,
      name: "Integration",
      subjectTemplate: "Hi {{name}}",
      htmlBodyTemplate: "<p>Hi {{name}}</p>",
    });
    const r = await notify.templates.render(key, { name: "Alice" });
    expect(r.subject).toBe("Hi Alice");
  });

  it("throws NotifyApiError on a bogus api key", async () => {
    const notify = createNotifyClient({ baseUrl: baseUrl!, apiKey: "ns_test_definitely_invalid", retries: { enabled: false } });
    await expect(notify.me.get()).rejects.toBeInstanceOf(NotifyApiError);
  });
});
