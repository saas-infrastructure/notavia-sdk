import { html, css, type TemplateResult } from "lit";
import type { NotifyServiceInbox } from "../notifyservice-inbox.js";
import { messages } from "../messages.js";
import "../inbox-list.js";

export const panelStyles = css`
  .panel {
    background: var(--notify-color-bg);
    border: 1px solid var(--notify-color-border);
    border-radius: var(--notify-radius);
    overflow: hidden;
  }
  .panel header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--notify-color-border);
    font-weight: 600;
  }
  .panel header button {
    background: transparent; border: 0; color: var(--notify-color-primary);
    cursor: pointer; padding: 0.25rem 0.5rem; font-size: 0.875rem;
  }
  .panel header button[disabled] { opacity: 0.4; cursor: default; }
`;

export function renderPanelVariant(el: NotifyServiceInbox): TemplateResult {
  return html`
    <div class="panel">
      <header>
        <span>${messages.notifications}</span>
        <button type="button" ?disabled=${el.unreadCount === 0} @click=${() => el.markAllRead()}>
          ${messages.markAllRead}
        </button>
      </header>
      <inbox-list .items=${el.items} @item-click=${(e: CustomEvent) => el.handleItemClick(e)}></inbox-list>
    </div>
  `;
}
