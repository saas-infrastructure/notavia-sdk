import { html, type TemplateResult } from "lit";
import "../inbox-list.js";
import type { InboxItem } from "@notavia/inbox-client";

export function renderListVariant(items: InboxItem[]): TemplateResult {
  return html`<inbox-list .items=${items}></inbox-list>`;
}
