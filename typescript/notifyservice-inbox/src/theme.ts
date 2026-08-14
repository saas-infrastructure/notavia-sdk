import { css } from "lit";

export const themeStyles = css`
  :host {
    --notify-color-primary: #6366f1;
    --notify-color-text: #111827;
    --notify-color-bg: #ffffff;
    --notify-color-border: #e5e7eb;
    --notify-color-unread-dot: var(--notify-color-primary);
    --notify-font-family: inherit;
    --notify-radius: 0.5rem;
    --notify-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    --notify-z-dropdown: 50;
    color: var(--notify-color-text);
    font-family: var(--notify-font-family);
  }
  :host([theme="dark"]) {
    --notify-color-text: #f3f4f6;
    --notify-color-bg: #111827;
    --notify-color-border: #1f2937;
    --notify-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0);
    white-space: nowrap; border: 0;
  }
`;
