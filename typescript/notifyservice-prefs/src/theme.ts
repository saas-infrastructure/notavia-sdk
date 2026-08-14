import { css } from "lit";

export const themeStyles = css`
  :host {
    --notify-color-primary: #6366f1;
    --notify-color-text: #111827;
    --notify-color-text-muted: #6b7280;
    --notify-color-bg: #ffffff;
    --notify-color-border: #e5e7eb;
    --notify-color-disabled: #d1d5db;
    --notify-font-family: inherit;
    --notify-radius: 0.5rem;
    display: block;
    color: var(--notify-color-text);
    font-family: var(--notify-font-family);
    box-sizing: border-box;
  }
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0);
    white-space: nowrap; border: 0;
  }
  .prefs-loading {
    padding: 1.5rem;
    color: var(--notify-color-text-muted);
    text-align: center;
  }
  .prefs-error {
    padding: 1.5rem;
    color: #dc2626;
    text-align: center;
  }
`;
