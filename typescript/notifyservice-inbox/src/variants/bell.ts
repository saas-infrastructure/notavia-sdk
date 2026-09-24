import { html, css, type TemplateResult } from "lit";
import type { NotifyServiceInbox } from "../notifyservice-inbox.js";
import { bellIcon } from "../icons.js";
import { messages } from "../messages.js";
import "../inbox-list.js";

export const bellStyles = css`
  .bell-wrap { position: relative; display: inline-block; }
  button.bell {
    background: transparent; border: 0; padding: 0.5rem;
    color: var(--notify-color-text); cursor: pointer; position: relative;
  }
  button.bell:focus { outline: 2px solid var(--notify-color-primary); outline-offset: 2px; border-radius: var(--notify-radius); }
  .badge {
    position: absolute; top: 0; right: 0;
    min-width: 1.125rem; height: 1.125rem; padding: 0 0.25rem;
    border-radius: 999px;
    background: var(--notify-color-primary); color: white;
    font-size: 0.75rem; line-height: 1.125rem; text-align: center;
  }
  .popover {
    position: absolute; left: 0; top: 0;
    width: 22rem; max-height: 28rem; overflow: auto;
    background: var(--notify-color-bg);
    border: 1px solid var(--notify-color-border);
    border-radius: var(--notify-radius);
    box-shadow: var(--notify-shadow);
    z-index: var(--notify-z-dropdown);
  }
  .popover header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--notify-color-border);
    font-weight: 600;
  }
  .popover header button {
    background: transparent; border: 0; color: var(--notify-color-primary);
    cursor: pointer; padding: 0.25rem 0.5rem; font-size: 0.875rem;
  }
  .popover header button[disabled] { opacity: 0.4; cursor: default; }
`;

export function renderBellVariant(el: NotifyServiceInbox): TemplateResult {
  const ariaLabel = el.unreadCount > 0
    ? messages.ariaUnreadSuffix(el.unreadCount)
    : messages.ariaNoUnread;
  return html`
    <div class="bell-wrap">
      <button class="bell" type="button"
              aria-haspopup="menu"
              aria-expanded=${el.open ? "true" : "false"}
              aria-label=${ariaLabel}
              @click=${() => el.toggleOpen()}>
        ${bellIcon}
        ${el.unreadCount > 0
          ? html`<span class="badge" aria-hidden="true">${el.unreadCount}</span>`
          : null}
      </button>
      ${el.open ? html`
        <div class="popover" role="menu" @keydown=${(e: KeyboardEvent) => e.key === "Escape" && el.closeAndRestoreFocus()}>
          <header>
            <span>${messages.notifications}</span>
            <button type="button" ?disabled=${el.unreadCount === 0 || el.markingAllRead} @click=${() => el.markAllRead()}>
              ${messages.markAllRead}
            </button>
          </header>
          <inbox-list .items=${el.items} .loadState=${el.loadState} @item-click=${(e: CustomEvent) => el.handleItemClick(e)}></inbox-list>
        </div>
      ` : null}
    </div>
  `;
}
