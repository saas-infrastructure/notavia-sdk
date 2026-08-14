import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";
import type { PromotionResult } from "../src/resources/promotion.js";

const BASE = "https://api.example.com";
const KEY = "ns_test_x";

function makeClient(fetch: typeof globalThis.fetch) {
  return createNotifyClient({ apiKey: KEY, baseUrl: BASE, fetch, retries: { enabled: false } });
}

const TEMPLATE_PROMOTION_RESULT = {
  applied: true,
  status: "new",
  template_diff: {
    key: "welcome",
    status: "new",
    name: "added",
    bodies: [
      {
        channel: "email",
        subject: "added",
        text: "added",
        html: "added",
        structured: "unchanged",
      },
    ],
  },
  workflow_diff: null,
  target_version: null,
};

const WORKFLOW_PROMOTION_RESULT = {
  applied: false,
  status: "changed",
  template_diff: null,
  workflow_diff: {
    key: "onboarding",
    status: "changed",
    name: "unchanged",
    description: "modified",
    body: "modified",
    source_version: 3,
    target_current_version: 2,
    referenced_templates: [
      {
        key: "welcome",
        status: "changed",
        name: "unchanged",
        bodies: [],
      },
    ],
  },
  target_version: null,
};

describe("templates.promote", () => {
  it("sends POST to /v1/templates/:key/promote with snake-cased dry_run body", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: TEMPLATE_PROMOTION_RESULT });
    const notify = makeClient(f);

    const result = await notify.templates.promote("welcome", { dryRun: true });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${BASE}/v1/templates/welcome/promote`);
    expect(calls[0].headers["authorization"]).toBe(`Bearer ${KEY}`);
    const body = JSON.parse(calls[0].body!);
    expect(body.dry_run).toBe(true);
  });

  it("returns a camelCased PromotionResult", async () => {
    const { fetch: f } = mockFetch({ status: 200, body: TEMPLATE_PROMOTION_RESULT });
    const notify = makeClient(f);

    const result: PromotionResult = await notify.templates.promote("welcome");

    expect(result.applied).toBe(true);
    expect(result.status).toBe("new");
    expect(result.templateDiff).toBeDefined();
    expect(result.templateDiff!.key).toBe("welcome");
    expect(result.templateDiff!.status).toBe("new");
    expect(result.templateDiff!.name).toBe("added");
    expect(result.templateDiff!.bodies[0].channel).toBe("email");
    expect(result.templateDiff!.bodies[0].subject).toBe("added");
    expect(result.workflowDiff).toBeNull();
    expect(result.targetVersion).toBeNull();
  });

  it("URL-encodes the key", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: TEMPLATE_PROMOTION_RESULT });
    const notify = makeClient(f);

    await notify.templates.promote("my template/v2");

    expect(calls[0].url).toBe(`${BASE}/v1/templates/my%20template%2Fv2/promote`);
  });

  it("sends dry_run: undefined (omitted) when no options given", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: TEMPLATE_PROMOTION_RESULT });
    const notify = makeClient(f);

    await notify.templates.promote("welcome");

    const body = JSON.parse(calls[0].body!);
    expect(body.dry_run).toBeUndefined();
  });
});

describe("workflows.promote", () => {
  it("sends POST to /v1/workflows/:key/promote with snake-cased body", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: WORKFLOW_PROMOTION_RESULT });
    const notify = makeClient(f);

    await notify.workflows.promote("onboarding", {
      dryRun: true,
      includeTemplates: ["welcome", "reminder"],
    });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe(`${BASE}/v1/workflows/onboarding/promote`);
    expect(calls[0].headers["authorization"]).toBe(`Bearer ${KEY}`);
    const body = JSON.parse(calls[0].body!);
    expect(body.dry_run).toBe(true);
    expect(body.include_templates).toEqual(["welcome", "reminder"]);
  });

  it("returns a camelCased PromotionResult with workflowDiff", async () => {
    const { fetch: f } = mockFetch({ status: 200, body: WORKFLOW_PROMOTION_RESULT });
    const notify = makeClient(f);

    const result: PromotionResult = await notify.workflows.promote("onboarding");

    expect(result.applied).toBe(false);
    expect(result.status).toBe("changed");
    expect(result.workflowDiff).toBeDefined();
    expect(result.workflowDiff!.key).toBe("onboarding");
    expect(result.workflowDiff!.status).toBe("changed");
    expect(result.workflowDiff!.description).toBe("modified");
    expect(result.workflowDiff!.body).toBe("modified");
    expect(result.workflowDiff!.sourceVersion).toBe(3);
    expect(result.workflowDiff!.targetCurrentVersion).toBe(2);
    expect(result.workflowDiff!.referencedTemplates[0].key).toBe("welcome");
    expect(result.templateDiff).toBeNull();
  });

  it("URL-encodes the workflow key", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: WORKFLOW_PROMOTION_RESULT });
    const notify = makeClient(f);

    await notify.workflows.promote("my workflow/v2");

    expect(calls[0].url).toBe(`${BASE}/v1/workflows/my%20workflow%2Fv2/promote`);
  });

  it("sends include_templates: undefined when not provided", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: WORKFLOW_PROMOTION_RESULT });
    const notify = makeClient(f);

    await notify.workflows.promote("onboarding", { dryRun: false });

    const body = JSON.parse(calls[0].body!);
    expect(body.include_templates).toBeUndefined();
  });
});
