import { html, type TemplateResult } from "lit";
import type { NotifyServiceInbox } from "../notifyservice-inbox.js";
import "../inbox-list.js";

export function renderListVariant(el: NotifyServiceInbox): TemplateResult {
  return html`<inbox-list .items=${el.items} .loadState=${el.loadState}></inbox-list>`;
}
