/** A webhook event envelope delivered to your endpoint. */
export interface NotifyWebhookEvent<T = unknown> {
  /** Event type, e.g. `"notification.delivered"`. */
  type: string;
  /** ISO-8601 timestamp of when the event was created. */
  createdAt: string;
  /** The event payload — shape depends on `type`. */
  data: T;
}

/** Options for {@link verifyWebhookSignature}. */
export interface VerifyWebhookOptions {
  /**
   * Raw request body string (UTF-8, not parsed).
   * Must be the original body bytes — do not parse then re-stringify.
   */
  rawBody: string;
  /**
   * Value of the `Notify-Signature` header sent with the webhook request.
   * Format: `t=<unix>,v1=<hex>[,v1=<hex>...]`
   */
  signatureHeader: string;
  /**
   * Webhook signing secret from the NotifyService dashboard.
   * Prefixed with `whsec_` followed by a base64url-encoded key.
   */
  secret: string;
  /**
   * Maximum allowed clock drift in seconds. Default 300 (5 minutes).
   * Pass 0 to disable the timestamp check (not recommended in production).
   */
  toleranceSeconds?: number;
}
