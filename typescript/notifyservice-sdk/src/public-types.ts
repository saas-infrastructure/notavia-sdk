export type { NotifyClient } from "./client.js";
export { createNotifyClient } from "./client.js";
export type { NotifyClientOptions, RetryOptions } from "./options.js";
export { NotifyApiError } from "./errors.js";
export type { ErrorBody, ErrorEnvelope } from "./errors.js";
export type {
  NotificationChannel,
  Attachment,
  AttachmentMetadata,
  Recipient,
  SendNotificationRequest,
  SendOptions,
  SendNotificationResult,
  NotificationResponse,
  ListNotificationsOptions,
  NotificationPage,
  NotificationsResource,
} from "./resources/notifications.js";
export { flattenRecipient } from "./resources/notifications.js";
export type {
  CreateTemplateRequest,
  UpdateTemplateRequest,
  TemplateResponse,
  ListTemplatesOptions,
  TemplatePage,
  RenderResult,
  TemplatesResource,
} from "./resources/templates.js";
export type { MeResponse, MeResource } from "./resources/me.js";
export type {
  SuppressionResponse,
  ListSuppressionsOptions,
  SuppressionPage,
  SuppressionsResource,
} from "./resources/suppressions.js";
export type { UsageResponse, UsageResource } from "./resources/usage.js";
export type {
  PromotionStatus,
  FieldChangeKind,
  TemplateBodyChange,
  TemplatePromotionDiff,
  WorkflowPromotionDiff,
  PromotionResult,
} from "./resources/promotion.js";
export { WorkflowsClient } from "./workflows/WorkflowsClient.js";
export type {
  WorkflowTriggerRequest,
  WorkflowTriggerResponse,
  WorkflowStepRunSummary,
  WorkflowRunResponse,
  WaitForCompletionOptions,
} from "./workflows/types.js";
