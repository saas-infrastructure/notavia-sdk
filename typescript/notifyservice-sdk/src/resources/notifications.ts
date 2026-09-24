import { fetchJson, type HttpContext } from "../http.js";

/** All channels the SDK supports. */
export type NotificationChannel = "email" | "in_app" | "webhook" | "sms" | "slack" | "teams" | "discord";

/** A file attached to an email notification. */
export interface Attachment {
  /** File name shown to the recipient, e.g. `"statement.pdf"`. */
  filename: string;
  /** MIME type of the file, e.g. `"application/pdf"`. */
  contentType: string;
  /** Base64-encoded file content. */
  contentBase64: string;
}

/** Metadata about a file that was attached to an email notification. Bytes are purged after delivery. */
export interface AttachmentMetadata {
  /** Original file name. */
  filename: string;
  /** MIME type of the file. */
  contentType: string;
  /** File size in bytes. */
  sizeBytes: number;
  /**
   * True when the attachment bytes have been deleted from ephemeral storage after delivery.
   * The metadata fields are always retained.
   */
  purged: boolean;
}

/** Recipient of a notification. */
export interface Recipient {
  address?: string;
  name?: string;
  externalUserId?: string;
  /** E.164 phone number for SMS delivery (e.g. `"+15005550006"`). */
  phone?: string;
  /**
   * The **key** of a Discord or Teams endpoint (e.g. `"billing-alerts"`).
   * Preferred over the legacy UUID fields (`teamsEndpointId` / `discordEndpointId`).
   * For Discord/Teams sends, supply either `endpoint` (the key) **or** the legacy GUID field — not both.
   */
  endpoint?: string;
  /** Slack user id (e.g. `"U07XYZ123"`). Used when `channel === "slack"`. */
  slackUserId?: string;
  /** Slack channel id (e.g. `"C07XYZ123"`). Used when `channel === "slack"` and sending to a channel. */
  slackChannelId?: string;
  /** Teams endpoint GUID returned from `POST /v1/teams-endpoints`. Used when `channel === "teams"`. Legacy — prefer `endpoint`. */
  teamsEndpointId?: string;
  /** Discord endpoint GUID returned from `POST /v1/discord-endpoints`. Used when `channel === "discord"`. Legacy — prefer `endpoint`. */
  discordEndpointId?: string;
}

/** Body of `POST /v1/notifications`. */
export interface SendNotificationRequest {
  channel: NotificationChannel;
  recipient: Recipient;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  templateKey?: string;
  templateData?: Record<string, unknown>;
  actionUrl?: string;
  /** Preference-centre category key (e.g. `"marketing"`). When omitted the server defaults to `"transactional"`. */
  category?: string;
  /** Optional email attachments (email channel only). Maximum 10 files, 15 MB total. */
  attachments?: Attachment[];
}

/** Per-call options for {@link NotificationsResource.send}. */
export interface SendOptions {
  /**
   * Idempotency key — if a notification has already been sent with this key
   * for this environment, the server returns the original instead of sending again.
   */
  idempotencyKey?: string;
}

/** Outcome of {@link NotificationsResource.send}. */
export interface SendNotificationResult {
  notification: NotificationResponse;
  /** True if the server returned a previously-sent notification due to idempotency. */
  wasReplayed: boolean;
}

/** Server-side representation of a notification. */
export interface NotificationResponse {
  id: string;
  channel: "email";
  status: "queued" | "sending" | "sent" | "failed";
  recipient: Recipient;
  templateKey: string | null;
  subject: string | null;
  createdAt: string;
  sentAt: string | null;
  attemptCount: number;
  lastError: string | null;
  /** Metadata for files attached to this email notification. Omitted when no attachments were sent. */
  attachments?: AttachmentMetadata[];
}

/** Query parameters for {@link NotificationsResource.list}. */
export interface ListNotificationsOptions {
  status?: NotificationResponse["status"];
  recipient?: string;
  createdAfter?: string;
  createdBefore?: string;
  /** Page size. Defaults to 20. */
  limit?: number;
  /** Cursor from a previous page's `nextCursor`. */
  cursor?: string;
}

/** One page of notifications. */
export interface NotificationPage {
  data: NotificationResponse[];
  nextCursor: string | null;
}

/** The `/v1/notifications` resource. */
export interface NotificationsResource {
  /**
   * Send a notification. Returns the resulting notification with
   * `status = "queued"`. Supply `options.idempotencyKey` to make retries safe.
   */
  send(request: SendNotificationRequest, options?: SendOptions): Promise<SendNotificationResult>;
  /** Fetch a notification by id. */
  get(id: string): Promise<NotificationResponse>;
  /** List notifications in the current environment, newest first, paged by cursor. */
  list(options?: ListNotificationsOptions): Promise<NotificationPage>;
}

/**
 * Normalises a {@link Recipient} for the given channel so that `address` carries
 * the channel-specific identifier and the chat-specific fields are stripped
 * before the body is serialised and sent to the server.
 */
export function flattenRecipient(channel: NotificationChannel, recipient: Recipient): Recipient {
  if (channel === "slack") {
    const id = recipient.slackUserId ?? recipient.slackChannelId;
    return { ...recipient, address: id, slackUserId: undefined, slackChannelId: undefined };
  }
  if (channel === "teams") {
    return { ...recipient, address: recipient.endpoint ?? recipient.teamsEndpointId, endpoint: undefined, teamsEndpointId: undefined };
  }
  if (channel === "discord") {
    return { ...recipient, address: recipient.endpoint ?? recipient.discordEndpointId, endpoint: undefined, discordEndpointId: undefined };
  }
  if (channel === "sms") {
    return { ...recipient, address: recipient.address ?? recipient.phone, phone: undefined };
  }
  return recipient;
}

export function notificationsResource(ctx: HttpContext): NotificationsResource {
  return {
    async send(request, options) {
      const extraHeaders = options?.idempotencyKey
        ? { "Idempotency-Key": options.idempotencyKey }
        : undefined;
      const flattenedRequest = { ...request, recipient: flattenRecipient(request.channel, request.recipient) };
      const { status, data } = await fetchJson<NotificationResponse>(ctx, {
        method: "POST",
        path: "/v1/notifications",
        body: flattenedRequest,
        extraHeaders,
      });
      return { notification: data, wasReplayed: status === 200 };
    },

    async get(id) {
      const { data } = await fetchJson<NotificationResponse>(ctx, {
        method: "GET",
        path: `/v1/notifications/${encodeURIComponent(id)}`,
      });
      return data;
    },

    async list(options) {
      const qs = buildQuery(options);
      const { data } = await fetchJson<NotificationPage>(ctx, {
        method: "GET",
        path: "/v1/notifications" + qs,
      });
      return data;
    },
  };
}

function buildQuery(o: ListNotificationsOptions | undefined): string {
  if (!o) return "";
  const params = new URLSearchParams();
  if (o.status) params.set("status", o.status);
  if (o.recipient) params.set("recipient", o.recipient);
  if (o.createdAfter) params.set("created_after", o.createdAfter);
  if (o.createdBefore) params.set("created_before", o.createdBefore);
  if (o.limit !== undefined) params.set("limit", String(o.limit));
  if (o.cursor) params.set("cursor", o.cursor);
  const s = params.toString();
  return s ? "?" + s : "";
}
