/** Whether a promoted resource is new, changed relative to its live counterpart, or identical. */
export type PromotionStatus = "new" | "changed" | "identical";

/** The kind of change detected on a single field during promotion diff. */
export type FieldChangeKind = "added" | "removed" | "modified" | "unchanged";

/** Per-channel body diff for a template body during promotion. */
export interface TemplateBodyChange {
  /** Channel identifier (e.g. `"email"`). */
  channel: string;
  /** Change kind for the subject field. */
  subject: FieldChangeKind;
  /** Change kind for the plain-text body field. */
  text: FieldChangeKind;
  /** Change kind for the HTML body field. */
  html: FieldChangeKind;
  /** Change kind for the structured body field. */
  structured: FieldChangeKind;
}

/** Diff details for a single template included in a promotion. */
export interface TemplatePromotionDiff {
  /** Stable key of the template. */
  key: string;
  /** Whether the template is new, changed, or identical relative to the live environment. */
  status: PromotionStatus;
  /** Change kind for the template name. */
  name: FieldChangeKind;
  /** Per-channel body diffs. */
  bodies: TemplateBodyChange[];
}

/** Diff details for a workflow included in a promotion. */
export interface WorkflowPromotionDiff {
  /** Stable key of the workflow. */
  key: string;
  /** Whether the workflow is new, changed, or identical relative to the live environment. */
  status: PromotionStatus;
  /** Change kind for the workflow name. */
  name: FieldChangeKind;
  /** Change kind for the workflow description. */
  description: FieldChangeKind;
  /** Change kind for the workflow body (step definitions). */
  body: FieldChangeKind;
  /** Version number of the Test-environment source being promoted. */
  sourceVersion?: number | null;
  /** Current version number in the Live environment before this promotion. */
  targetCurrentVersion?: number | null;
  /** Diffs for templates referenced by this workflow. */
  referencedTemplates: TemplatePromotionDiff[];
}

/**
 * Result returned by `POST /v1/templates/{key}/promote` and
 * `POST /v1/workflows/{key}/promote`.
 */
export interface PromotionResult {
  /**
   * `true` when the promotion was actually written to the Live environment.
   * `false` when `dryRun` was requested or when the status is `"identical"`.
   */
  applied: boolean;
  /** Overall promotion status for the resource. */
  status: PromotionStatus;
  /** Template diff, populated when promoting a template. */
  templateDiff?: TemplatePromotionDiff | null;
  /** Workflow diff, populated when promoting a workflow. */
  workflowDiff?: WorkflowPromotionDiff | null;
  /** The Live-environment version number after a successful promotion. */
  targetVersion?: number | null;
}
