import { html, css, type TemplateResult } from "lit";
import type { NotifyServicePrefs } from "../element.js";
import { messages } from "../messages.js";
import { lockIcon } from "../icons.js";

export const cardsStyles = css`
  .prefs-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .prefs-card {
    background: var(--notify-color-bg);
    border: 1px solid var(--notify-color-border);
    border-radius: var(--notify-radius);
    overflow: hidden;
  }
  .prefs-card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1rem 0.5rem;
  }
  .prefs-card-title {
    font-weight: 600;
    font-size: 0.9375rem;
  }
  .critical-badge {
    display: inline-flex;
    align-items: center;
    color: var(--notify-color-text-muted);
    flex-shrink: 0;
  }
  .prefs-card-rows {
    display: flex;
    flex-direction: column;
  }
  .prefs-card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 1rem;
    border-top: 1px solid var(--notify-color-border);
  }
  .channel-label {
    font-size: 0.875rem;
    color: var(--notify-color-text-muted);
  }
  .toggle-wrap {
    display: inline-flex;
    align-items: center;
  }
  .toggle {
    position: relative;
    display: inline-block;
    width: 2.5rem;
    height: 1.375rem;
    cursor: pointer;
    border-radius: 999px;
    background: var(--notify-color-disabled);
    border: none;
    padding: 0;
    transition: background 0.15s ease;
    flex-shrink: 0;
  }
  .toggle::after {
    content: "";
    position: absolute;
    top: 0.1875rem;
    left: 0.1875rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: white;
    transition: transform 0.15s ease;
  }
  .toggle[aria-checked="true"] {
    background: var(--notify-color-primary);
  }
  .toggle[aria-checked="true"]::after {
    transform: translateX(1.125rem);
  }
  .toggle.is-disabled,
  .toggle[aria-disabled="true"] {
    background: var(--notify-color-disabled);
    cursor: not-allowed;
    opacity: 0.7;
  }
  .toggle:focus {
    outline: 2px solid var(--notify-color-primary);
    outline-offset: 2px;
  }
`;

function channelLabel(channel: string): string {
  if (channel === "email") return messages.channelEmail;
  if (channel === "inApp") return messages.channelInApp;
  return channel;
}

export function renderCardsVariant(el: NotifyServicePrefs): TemplateResult {
  const cells = el.cells;
  const categoryKeys = [...new Set(cells.map((c) => c.categoryKey))];

  return html`
    <div class="prefs-cards">
      ${categoryKeys.map((catKey) => {
        const rowCells = cells.filter((c) => c.categoryKey === catKey);
        const firstCell = rowCells[0];
        if (!firstCell) return null;
        const isCritical = firstCell.isCritical;
        return html`
          <div class="prefs-card">
            <div class="prefs-card-header">
              <span class="prefs-card-title">${firstCell.categoryName}</span>
              ${isCritical
                ? html`<span class="critical-badge" title="${messages.requiredTitle}">${lockIcon}</span>`
                : null}
            </div>
            <div class="prefs-card-rows">
              ${rowCells.map((cell) => {
                const label = channelLabel(cell.channel);
                const ariaLabel = messages.ariaToggleLabel(cell.categoryName, label, cell.optedIn);
                if (isCritical) {
                  return html`
                    <div class="prefs-card-row">
                      <span class="channel-label">${label}</span>
                      <div class="toggle-wrap">
                        <button
                          role="switch"
                          class="toggle is-disabled"
                          aria-checked="true"
                          aria-disabled="true"
                          tabindex="-1"
                          title="${messages.requiredTitle}"
                          aria-label="${ariaLabel}"
                        ></button>
                      </div>
                    </div>
                  `;
                }
                return html`
                  <div class="prefs-card-row">
                    <span class="channel-label">${label}</span>
                    <div class="toggle-wrap">
                      <button
                        role="switch"
                        class="toggle"
                        aria-checked="${cell.optedIn ? "true" : "false"}"
                        aria-label="${ariaLabel}"
                        @click="${() => el.handleToggle(cell)}"
                      ></button>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        `;
      })}
    </div>
  `;
}
