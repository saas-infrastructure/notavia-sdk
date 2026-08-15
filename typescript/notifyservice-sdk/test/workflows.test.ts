import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

const BASE = "https://api.example.com";
const KEY = "ns_test_x";

function makeClient(fetch: typeof globalThis.fetch) {
  return createNotifyClient({ apiKey: KEY, baseUrl: BASE, fetch, retries: { enabled: false } });
}

describe("workflows.trigger", () => {
  it("sends POST to /v1/workflows/:key/trigger with snake-cased body and bearer auth", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 202,
      body: { run_id: "run_abc", status: "Pending" },
    });
    const notify = makeClient(f);

    const result = await notify.workflows.trigger("invoice_paid", { triggerData: { amount: 99 } });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${BASE}/v1/workflows/invoice_paid/trigger`);
    expect(calls[0].headers["authorization"]).toBe(`Bearer ${KEY}`);
    const body = JSON.parse(calls[0].body!);
    expect(body.trigger_data).toEqual({ amount: 99 });
    expect(result.runId).toBe("run_abc");
    expect(result.status).toBe("Pending");
  });

  it("attaches Idempotency-Key header when idempotencyKey is provided", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 202,
      body: { run_id: "run_idem", status: "Pending" },
    });
    const notify = makeClient(f);

    await notify.workflows.trigger("wf_key", { triggerData: {} }, { idempotencyKey: "abc-123" });

    expect(calls[0].headers["idempotency-key"]).toBe("abc-123");
  });

  it("omits Idempotency-Key when no idempotencyKey is given", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 202,
      body: { run_id: "run_x", status: "Pending" },
    });
    const notify = makeClient(f);

    await notify.workflows.trigger("wf_key", { triggerData: {} });

    expect(calls[0].headers["idempotency-key"]).toBeUndefined();
  });
});

describe("workflows.waitForCompletion", () => {
  it("polls until the run reaches a terminal status", async () => {
    const { fetch: f, calls } = mockFetch(
      { status: 200, body: { id: "run_1", workflow_key: "wf", version: 1, status: "Running", steps: [] } },
      { status: 200, body: { id: "run_1", workflow_key: "wf", version: 1, status: "Running", steps: [] } },
      { status: 200, body: { id: "run_1", workflow_key: "wf", version: 1, status: "Completed", steps: [] } },
    );
    const notify = makeClient(f);

    const result = await notify.workflows.waitForCompletion("run_1", { intervalMs: 10 });

    expect(result.status).toBe("Completed");
    expect(result.workflowKey).toBe("wf");
    expect(calls).toHaveLength(3);
  });

  it("throws when the timeout elapses before a terminal status", async () => {
    const responses = Array.from({ length: 10 }, () => ({
      status: 200,
      body: { id: "run_2", workflow_key: "wf", version: 1, status: "Running", steps: [] },
    }));
    const { fetch: f } = mockFetch(...responses);
    const notify = makeClient(f);

    await expect(
      notify.workflows.waitForCompletion("run_2", { timeoutMs: 1, intervalMs: 500 }),
    ).rejects.toThrow(/did not reach a terminal status/);
  });
});

describe("workflows.cancelRun", () => {
  it("sends POST to /v1/workflows/runs/:runId/cancel", async () => {
    const { fetch: f, calls } = mockFetch({ status: 204 });
    const notify = makeClient(f);

    await notify.workflows.cancelRun("run_xyz");

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${BASE}/v1/workflows/runs/run_xyz/cancel`);
  });
});

describe("workflows.postRunEvent", () => {
  it("sends POST to /v1/workflows/runs/:runId/events with event body", async () => {
    const { fetch: f, calls } = mockFetch({ status: 204 });
    const notify = makeClient(f);

    await notify.workflows.postRunEvent("run_xyz", "payment_confirmed", { invoice_id: "inv_1" });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${BASE}/v1/workflows/runs/run_xyz/events`);
    const body = JSON.parse(calls[0].body!);
    expect(body.event).toBe("payment_confirmed");
    expect(body.data).toEqual({ invoice_id: "inv_1" });
  });
});

describe("workflows.postWorkflowEvent", () => {
  it("sends POST to /v1/workflows/:key/events with event body", async () => {
    const { fetch: f, calls } = mockFetch({ status: 204 });
    const notify = makeClient(f);

    await notify.workflows.postWorkflowEvent("invoice_paid", "payment_confirmed", { amount: 50 });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${BASE}/v1/workflows/invoice_paid/events`);
    const body = JSON.parse(calls[0].body!);
    expect(body.event).toBe("payment_confirmed");
    expect(body.data).toEqual({ amount: 50 });
  });
});

describe("workflows.getRun", () => {
  it("parses snake-cased response into camelCased WorkflowRunResponse", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 200,
      body: {
        id: "run_1",
        workflow_key: "invoice_paid",
        version: 2,
        status: "Completed",
        current_step_id: "step_send",
        steps: [
          {
            step_id: "step_send",
            kind: "send",
            status: "Completed",
            outcome: "sent",
            notification_id: "notif_1",
            started_at: "2026-05-28T10:00:00Z",
            completed_at: "2026-05-28T10:00:01Z",
          },
        ],
      },
    });
    const notify = makeClient(f);

    const run = await notify.workflows.getRun("run_1");

    expect(calls[0].method).toBe("GET");
    expect(calls[0].url).toBe(`${BASE}/v1/workflows/runs/run_1`);
    expect(run.id).toBe("run_1");
    expect(run.workflowKey).toBe("invoice_paid");
    expect(run.version).toBe(2);
    expect(run.status).toBe("Completed");
    expect(run.currentStepId).toBe("step_send");
    expect(run.steps[0].stepId).toBe("step_send");
    expect(run.steps[0].notificationId).toBe("notif_1");
    expect(run.steps[0].startedAt).toBe("2026-05-28T10:00:00Z");
    expect(run.steps[0].completedAt).toBe("2026-05-28T10:00:01Z");
  });
});
