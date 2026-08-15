import { buildHttpContext } from "./http.js";
import type { NotifyClientOptions } from "./options.js";
import { notificationsResource, type NotificationsResource } from "./resources/notifications.js";
import { templatesResource, type TemplatesResource } from "./resources/templates.js";
import { meResource, type MeResource } from "./resources/me.js";
import { suppressionsResource, type SuppressionsResource } from "./resources/suppressions.js";
import { usageResource, type UsageResource } from "./resources/usage.js";
import { WorkflowsClient } from "./workflows/WorkflowsClient.js";
export type { WorkflowsClient };

/**
 * The top-level NotifyService client. Construct with {@link createNotifyClient}.
 */
export interface NotifyClient {
  /** The notifications resource (`/v1/notifications`). */
  notifications: NotificationsResource;
  /** The templates resource (`/v1/templates`). */
  templates: TemplatesResource;
  /** The identity resource (`/v1/me`). */
  me: MeResource;
  /** The workflows resource (`/v1/workflows`). */
  workflows: WorkflowsClient;
  /** The suppressions resource (`/v1/suppressions`). */
  suppressions: SuppressionsResource;
  /** The usage resource (`/v1/usage`). */
  usage: UsageResource;
}

/**
 * Creates a new NotifyService client.
 *
 * @example
 * const notify = createNotifyClient({
 *   apiKey: process.env.NOTIFY_API_KEY!,
 *   baseUrl: "https://api.notavia.saas-infrastructure.com",
 * });
 * await notify.notifications.send({
 *   channel: "email",
 *   recipient: { address: "alice@example.com" },
 *   subject: "Welcome",
 *   htmlBody: "<h1>Hi</h1>",
 * });
 */
export function createNotifyClient(options: NotifyClientOptions): NotifyClient {
  const ctx = buildHttpContext(options);
  return {
    notifications: notificationsResource(ctx),
    templates: templatesResource(ctx),
    me: meResource(ctx),
    workflows: new WorkflowsClient(ctx),
    suppressions: suppressionsResource(ctx),
    usage: usageResource(ctx),
  };
}
