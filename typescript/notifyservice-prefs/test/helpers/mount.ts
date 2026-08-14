import type { PreferenceCell } from "@notavia/prefs-client";
import type { NotifyServicePrefs } from "../../src/element.js";
import { installMockClient, makeMockClient } from "./mock-client.js";

export async function mountPrefs(
  cells: PreferenceCell[] = [],
  attrs: Partial<Record<string, string>> = {},
): Promise<NotifyServicePrefs> {
  installMockClient(() => makeMockClient(cells));
  const el = document.createElement("notifyservice-prefs") as NotifyServicePrefs;
  el.publishableKey = "pk_test";
  el.token = "header.payload.sig";
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return el;
}
