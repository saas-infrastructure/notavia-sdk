import { html, css, type TemplateResult } from "lit";
import type { NotifyServicePrefs } from "../element.js";
import { messages } from "../messages.js";
import { lockIcon } from "../icons.js";

export const tableStyles = css`
  .prefs-table-wrap {
    width: 100%;
    overflow-x: auto;
  }
  table.prefs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9375rem;
    background: var(--notify-color-bg);
    border: 1px solid var(--notify-color-border);
    border-radius: var(--notify-radius);
    overflow: hidden;
  }
  table.prefs-table th,
  table.prefs-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--notify-color-border);
  }
  table.prefs-table tr:last-child td {
    border-bottom: none;
  }
  table.prefs-table th {
    font-weight: 600;
    color: var(--notify-color-text-muted);
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: var(--notify-color-bg);
  }
  table.prefs-table td.category-cell {
    font-weight: 500;
  }
  .category-name-wrap {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
  .critical-badge {
    display: inline-flex;
    align-items: center;
    color: var(--notify-color-text-muted);
    flex-shrink: 0;
  }
  .toggle-cell {
    text-align: center;
  }
  .toggle-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

export function renderTableVariant(el: NotifyServicePrefs): TemplateResult {
  const cells = el.cells;

  const categoryKeys = [...new Set(cells.map((c) => c.categoryKey))];
  const channels = [...new Set(cells.map((c) => c.channel))];

  return html`
    <div class="prefs-table-wrap">
      <table class="prefs-table" role="table">
        <thead>
          <tr>
            <th scope="col">${messages.categoryColumn}</th>
            ${channels.map((ch) => html`<th scope="col" class="toggle-cell">${channelLabel(ch)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${categoryKeys.map((catKey) => {
            const rowCells = cells.filter((c) => c.categoryKey === catKey);
            const firstCell = rowCells[0];
            if (!firstCell) return null;
            const isCritical = firstCell.isCritical;
            return html`
              <tr>
                <td class="category-cell">
                  <div class="category-name-wrap">
                    <span>${firstCell.categoryName}</span>
                    ${isCritical
                      ? html`<span class="critical-badge" title="${messages.requiredTitle}">${lockIcon}</span>`
                      : null}
                  </div>
                </td>
                ${channels.map((ch) => {
                  const cell = rowCells.find((c) => c.channel === ch);
                  if (!cell) return html`<td class="toggle-cell"></td>`;
                  const ariaLabel = messages.ariaToggleLabel(cell.categoryName, channelLabel(ch), cell.optedIn);
                  if (isCritical) {
                    return html`
                      <td class="toggle-cell">
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
                      </td>
                    `;
                  }
                  return html`
                    <td class="toggle-cell">
                      <div class="toggle-wrap">
                        <button
                          role="switch"
                          class="toggle"
                          aria-checked="${cell.optedIn ? "true" : "false"}"
                          aria-label="${ariaLabel}"
                          @click="${() => el.handleToggle(cell)}"
                        ></button>
                      </div>
                    </td>
                  `;
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    </div>
  `;
}
