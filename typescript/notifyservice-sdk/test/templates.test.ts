import { describe, it, expect } from "vitest";
import { createNotifyClient } from "../src/client.js";
import { mockFetch } from "./helpers/mockFetch.js";

const TEMPLATE_RESPONSE = {
  id: "22222222-2222-2222-2222-222222222222",
  key: "welcome",
  name: "Welcome",
  subject_template: "Hi {{name}}",
  html_body_template: "<p>Hi {{name}}</p>",
  text_body_template: null,
  created_at: "2026-05-26T10:00:00+00:00",
  updated_at: "2026-05-26T10:00:00+00:00",
};

describe("templates resource", () => {
  it("create POSTs snake-cased body and parses response", async () => {
    const { fetch: f, calls } = mockFetch({ status: 201, body: TEMPLATE_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    const t = await notify.templates.create({
      key: "welcome",
      name: "Welcome",
      subjectTemplate: "Hi {{name}}",
      htmlBodyTemplate: "<p>Hi {{name}}</p>",
    });

    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/templates");
    const body = JSON.parse(calls[0].body!);
    expect(body.subject_template).toBe("Hi {{name}}");
    expect(body.html_body_template).toBe("<p>Hi {{name}}</p>");
    expect(t.subjectTemplate).toBe("Hi {{name}}");
    expect(t.htmlBodyTemplate).toBe("<p>Hi {{name}}</p>");
    expect(t.textBodyTemplate).toBeNull();
  });

  it("get URL-encodes the key", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: TEMPLATE_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    await notify.templates.get("with space/slash");
    expect(calls[0].url).toBe("https://api.example.com/v1/templates/with%20space%2Fslash");
  });

  it("list builds the right query string", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: { data: [TEMPLATE_RESPONSE], next_cursor: null } });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    await notify.templates.list({ limit: 5, cursor: "c1" });
    const url = new URL(calls[0].url);
    expect(url.searchParams.get("limit")).toBe("5");
    expect(url.searchParams.get("cursor")).toBe("c1");
  });

  it("update PATCHes only provided fields", async () => {
    const { fetch: f, calls } = mockFetch({ status: 200, body: TEMPLATE_RESPONSE });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    await notify.templates.update("welcome", { name: "New name" });
    expect(calls[0].method).toBe("PATCH");
    expect(calls[0].url).toBe("https://api.example.com/v1/templates/welcome");
    const body = JSON.parse(calls[0].body!);
    expect(body).toEqual({ name: "New name" });
  });

  it("delete returns void on 204", async () => {
    const { fetch: f, calls } = mockFetch({ status: 204, body: "" });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    await notify.templates.delete("welcome");
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url).toBe("https://api.example.com/v1/templates/welcome");
  });

  it("render POSTs data and returns rendered content", async () => {
    const { fetch: f, calls } = mockFetch({
      status: 200,
      body: { subject: "Hi Alice", html_body: "<p>Hi Alice</p>", text_body: null },
    });
    const notify = createNotifyClient({ apiKey: "x", baseUrl: "https://api.example.com", fetch: f });

    const r = await notify.templates.render("welcome", { name: "Alice" });
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/templates/welcome/render");
    expect(r.subject).toBe("Hi Alice");
    expect(r.htmlBody).toBe("<p>Hi Alice</p>");
  });
});
