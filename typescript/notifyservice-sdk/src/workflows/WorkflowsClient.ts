import { fetchJson, type HttpContext } from "../http.js";
import type { PromotionResult } from "../resources/promotion.js";
import type {
  WaitForCompletionOptions,
  WorkflowRunResponse,
  WorkflowStepRunSummary,
  WorkflowTriggerRequest,
  WorkflowTriggerResponse,
} from "./types.js";

const TERMINAL_STATUSES = ["Completed", "Failed", "Cancelled"];

/** Client for the `/v1/workflows` REST surface. */
export class WorkflowsClient {
  constructor(private readonly ctx: HttpContext) {}

  /**
   * Triggers a workflow run by key.
   *
   * @param key - The workflow key.
   * @param request - Trigger payload; `triggerData` is forwarded as `trigger_data` in the request body.
   * @param options - Optional `idempotencyKey` — server deduplicates runs with the same key.
   * @returns The new (or previously-created) run id and initial status.
   */
  async trigger(
    key: string,
    request: WorkflowTriggerRequest,
    options?: { idempotencyKey?: string },
  ): Promise<WorkflowTriggerResponse> {
    const extraHeaders: Record<string, string> = {};
    if (options?.idempotencyKey) extraHeaders["Idempotency-Key"] = options.idempotencyKey;
    const { data } = await fetchJson<{ runId: string; status: string }>(this.ctx, {
      method: "POST",
      path: `/v1/workflows/${encodeURIComponent(key)}/trigger`,
      body: { triggerData: request.triggerData },
      extraHeaders: Object.keys(extraHeaders).length > 0 ? extraHeaders : undefined,
    });
    return { runId: data.runId, status: data.status };
  }

  /**
   * Fetches the current state of a workflow run, including its full step timeline.
   *
   * @param runId - The run id returned by {@link trigger}.
   */
  async getRun(runId: string): Promise<WorkflowRunResponse> {
    const { data } = await fetchJson<RawRunResponse>(this.ctx, {
      method: "GET",
      path: `/v1/workflows/runs/${encodeURIComponent(runId)}`,
    });
    return toRunResponse(data);
  }

  /**
   * Polls a workflow run until it reaches a terminal status (`Completed`, `Failed`, or `Cancelled`),
   * or until the timeout elapses. Uses exponential backoff between polls (initial 500 ms, cap 5 s).
   *
   * @param runId - The run id to poll.
   * @param options - Optional `timeoutMs` (default 300 000) and `intervalMs` (default 500) overrides.
   * @throws {Error} When the run does not complete within `timeoutMs`.
   */
  async waitForCompletion(
    runId: string,
    options?: WaitForCompletionOptions,
  ): Promise<WorkflowRunResponse> {
    const deadline = Date.now() + (options?.timeoutMs ?? 5 * 60_000);
    let interval = options?.intervalMs ?? 500;
    while (true) {
      const run = await this.getRun(runId);
      if (TERMINAL_STATUSES.includes(run.status)) return run;
      if (Date.now() >= deadline) throw new Error(`Workflow run ${runId} did not reach a terminal status within the timeout.`);
      await delay(interval);
      interval = Math.min(Math.trunc(interval * 1.5), 5_000);
    }
  }

  /**
   * Requests cancellation of a running workflow run. Idempotent — safe to call on an already-terminal run.
   *
   * @param runId - The run id to cancel.
   */
  async cancelRun(runId: string): Promise<void> {
    await fetchJson<void>(this.ctx, {
      method: "POST",
      path: `/v1/workflows/runs/${encodeURIComponent(runId)}/cancel`,
    });
  }

  /**
   * Posts an event directly to a specific run. Wakes any `wait_for_event` step whose match filter passes.
   *
   * @param runId - Target run id.
   * @param event - Event name.
   * @param data - Optional event payload forwarded to the match expression.
   */
  async postRunEvent(runId: string, event: string, data?: unknown): Promise<void> {
    await fetchJson<void>(this.ctx, {
      method: "POST",
      path: `/v1/workflows/runs/${encodeURIComponent(runId)}/events`,
      body: { event, data },
    });
  }

  /**
   * Posts an event to all waiting runs of a workflow whose `wait_for_event` match filter passes.
   *
   * @param key - The workflow key.
   * @param event - Event name.
   * @param data - Optional event payload forwarded to match expressions.
   */
  async postWorkflowEvent(key: string, event: string, data?: unknown): Promise<void> {
    await fetchJson<void>(this.ctx, {
      method: "POST",
      path: `/v1/workflows/${encodeURIComponent(key)}/events`,
      body: { event, data },
    });
  }

  /**
   * Promotes a Test-environment workflow to the Live environment.
   *
   * @param key - The stable workflow key to promote.
   * @param options - Optional promotion options:
   *   - `dryRun` — when `true`, the server returns the diff without writing any changes.
   *   - `includeTemplates` — list of template keys to co-promote alongside the workflow.
   * @returns A {@link PromotionResult} describing what was (or would be) changed.
   */
  async promote(
    key: string,
    options?: { dryRun?: boolean; includeTemplates?: string[] },
  ): Promise<PromotionResult> {
    const { data } = await fetchJson<PromotionResult>(this.ctx, {
      method: "POST",
      path: `/v1/workflows/${encodeURIComponent(key)}/promote`,
      body: { dryRun: options?.dryRun, includeTemplates: options?.includeTemplates },
    });
    return data;
  }
}

interface RawStepSummary {
  stepId: string;
  kind: string;
  status: string;
  outcome?: string;
  notificationId?: string;
  startedAt: string;
  completedAt?: string;
}

interface RawRunResponse {
  id: string;
  workflowKey: string;
  version: number;
  status: string;
  currentStepId?: string;
  steps: RawStepSummary[];
}

function toRunResponse(raw: RawRunResponse): WorkflowRunResponse {
  return {
    id: raw.id,
    workflowKey: raw.workflowKey,
    version: raw.version,
    status: raw.status,
    currentStepId: raw.currentStepId,
    steps: (raw.steps ?? []).map(toStepSummary),
  };
}

function toStepSummary(raw: RawStepSummary): WorkflowStepRunSummary {
  return {
    stepId: raw.stepId,
    kind: raw.kind,
    status: raw.status,
    outcome: raw.outcome,
    notificationId: raw.notificationId,
    startedAt: raw.startedAt,
    completedAt: raw.completedAt,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
