export interface WorkflowTriggerRequest {
  triggerData: unknown;
}

export interface WorkflowTriggerResponse {
  runId: string;
  status: string;
}

export interface WorkflowStepRunSummary {
  stepId: string;
  kind: string;
  status: string;
  outcome?: string;
  notificationId?: string;
  startedAt: string;
  completedAt?: string;
}

export interface WorkflowRunResponse {
  id: string;
  workflowKey: string;
  version: number;
  status: string;
  currentStepId?: string;
  steps: WorkflowStepRunSummary[];
}

export interface WaitForCompletionOptions {
  timeoutMs?: number;
  intervalMs?: number;
}
