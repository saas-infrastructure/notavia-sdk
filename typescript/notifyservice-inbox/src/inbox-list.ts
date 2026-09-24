import { LitElement, css, html, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { InboxItem } from "@notavia/inbox-client";
import { themeStyles } from "./theme.js";
import { messages } from "./messages.js";
import { moveFocus } from "./a11y.js";

@customElement("inbox-list")
export class InboxListElement extends LitElement {
  static override styles = [
    themeStyles,
    css`
      :host { display: block; }
      ul { list-style: none; margin: 0; padding: 0; }
      li {
        display: flex; gap: 0.75rem; align-items: flex-start;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--notify-color-border);
        cursor: pointer;
        background: var(--notify-color-bg);
      }
      li:last-child { border-bottom: 0; }
      li:focus { outline: 2px solid var(--notify-color-primary); outline-offset: -2px; }
      .dot {
        width: 0.5rem; height: 0.5rem; border-radius: 50%;
        margin-top: 0.4rem;
        background: var(--notify-color-unread-dot);
        flex-shrink: 0; visibility: hidden;
      }
      li[data-unread="true"] .dot { visibility: visible; }
      .content { flex: 1; min-width: 0; }
      .subject { font-weight: 600; }
      .snippet {
        font-size: 0.875rem; opacity: 0.75;
        overflow: hidden; text-overflow: ellipsis;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
      }
      time { font-size: 0.75rem; opacity: 0.6; display: block; margin-top: 0.25rem; }
      .empty { padding: 2rem 1rem; text-align: center; opacity: 0.7; }
    `,
  ];

  @property({ attribute: false }) items: InboxItem[] = [];
  @property({ attribute: false }) loadState: "loading" | "loaded" | "error" = "loaded";

  override render(): TemplateResult {
    if (this.loadState === "loading") {
      return html`<div class="empty" role="status">${messages.loading}</div>`;
    }
    if (this.items.length === 0) {
      if (this.loadState === "error") {
        return html`<div class="empty" role="status">${messages.loadError}</div>`;
      }
      return html`<div class="empty" role="status">${messages.empty}</div>`;
    }
    return html`
      <ul role="menu" @keydown=${this.onKey}>
        ${this.items.map((item) => html`
          <li role="menuitem" tabindex="0"
              data-id=${item.id} data-unread=${item.readAt == null ? "true" : "false"}
              @click=${() => this.dispatchItemClick(item)}
              @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.dispatchItemClick(item)}>
            <span class="dot" aria-hidden="true"></span>
            <div class="content">
              <div class="subject">${item.subject}</div>
              <div class="snippet">${truncate(item.textBody ?? "", 120)}</div>
              <time>${formatRelative(item.createdAt)}</time>
            </div>
            <span class="sr-only">${item.readAt == null ? messages.itemUnreadLabel : messages.itemReadLabel}</span>
          </li>
        `)}
      </ul>
    `;
  }

  private onKey(e: KeyboardEvent): void {
    const list = e.currentTarget as HTMLElement;
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); moveFocus(list, "next"); break;
      case "ArrowUp":   e.preventDefault(); moveFocus(list, "prev"); break;
      case "Home":      e.preventDefault(); moveFocus(list, "first"); break;
      case "End":       e.preventDefault(); moveFocus(list, "last"); break;
    }
  }

  private dispatchItemClick(item: InboxItem): void {
    this.dispatchEvent(new CustomEvent("item-click", {
      detail: { id: item.id, actionUrl: item.actionUrl, item },
      bubbles: true, composed: true,
    }));
  }
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

declare global { interface HTMLElementTagNameMap { "inbox-list": InboxListElement } }
