import { LitElement, html, css, type TemplateResult, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  createPrefsClient,
  type PrefsClient,
  type PreferenceCell,
} from "@notavia/prefs-client";
import { themeStyles } from "./theme.js";
import { tableStyles, renderTableVariant } from "./variants/table.js";
import { cardsStyles, renderCardsVariant } from "./variants/cards.js";
import { messages } from "./messages.js";

type Layout = "auto" | "table" | "cards";

@customElement("notifyservice-prefs")
export class NotifyServicePrefs extends LitElement {
  static override styles = [
    themeStyles,
    tableStyles,
    cardsStyles,
    css`:host { display: block; }`,
  ];

  @property({ attribute: "publishable-key" }) publishableKey = "";
  @property() token = "";
  @property({ attribute: "base-url" }) baseUrl = "https://api.notavia.saas-infrastructure.com";
  @property({ reflect: true }) layout: Layout = "auto";

  refreshToken?: () => Promise<string>;
  theme?: Record<string, string>;

  @state() cells: PreferenceCell[] = [];
  @state() loading = true;
  @state() loadError: string | null = null;
  @state() private autoLayout: "table" | "cards" = "table";

  private client?: PrefsClient;
  private resizeObserver?: ResizeObserver;

  override connectedCallback(): void {
    super.connectedCallback();
    this.applyThemeVars();
    if (this.layout === "auto") {
      this.setupResizeObserver();
    }
    void this.bootClient();
  }

  override updated(changed: PropertyValues): void {
    if (changed.has("theme")) {
      this.applyThemeVars();
    }
    if (changed.has("layout")) {
      if (this.layout === "auto") {
        this.setupResizeObserver();
      } else {
        this.teardownResizeObserver();
      }
    }
    if (changed.has("token") || changed.has("publishableKey") || changed.has("baseUrl")) {
      const prevToken = changed.get("token") as string | undefined;
      const prevKey = changed.get("publishableKey") as string | undefined;
      const wasEmpty = (changed.has("token") ? !prevToken : true) &&
                       (changed.has("publishableKey") ? !prevKey : true);
      if (wasEmpty) return;
      void this.rebootClient();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.teardownResizeObserver();
    this.teardownClient();
  }

  override render(): TemplateResult {
    if (this.loading) {
      return html`<div class="prefs-loading">${messages.loading}</div>`;
    }
    if (this.loadError) {
      return html`<div class="prefs-error">${this.loadError}</div>`;
    }

    const effectiveLayout = this.layout === "auto" ? this.autoLayout : this.layout;
    if (effectiveLayout === "table") {
      return renderTableVariant(this);
    }
    return renderCardsVariant(this);
  }

  async handleToggle(cell: PreferenceCell): Promise<void> {
    if (!this.client) return;
    const newOptedIn = !cell.optedIn;
    this.cells = this.cells.map((c) =>
      c.categoryKey === cell.categoryKey && c.channel === cell.channel
        ? { ...c, optedIn: newOptedIn }
        : c,
    );
    try {
      const updated = await this.client.set(cell.categoryKey, cell.channel, newOptedIn);
      this.cells = this.cells.map((c) =>
        c.categoryKey === updated.categoryKey && c.channel === updated.channel ? updated : c,
      );
      this.dispatchEvent(
        new CustomEvent("notify-prefs-changed", {
          detail: { cell: updated },
          bubbles: true,
          composed: true,
        }),
      );
    } catch (err) {
      this.cells = this.cells.map((c) =>
        c.categoryKey === cell.categoryKey && c.channel === cell.channel
          ? { ...c, optedIn: cell.optedIn }
          : c,
      );
      this.dispatchError(err);
    }
  }

  private async bootClient(): Promise<void> {
    if (!this.publishableKey || !this.token) return;
    this.loading = true;
    this.loadError = null;

    const client = createPrefsClient({
      baseUrl: this.baseUrl,
      publishableKey: this.publishableKey,
      token: this.token,
      refreshToken: this.refreshToken,
    });
    this.client = client;

    try {
      this.cells = await client.list();
    } catch (err) {
      this.loadError = messages.loadError;
      this.dispatchError(err);
    } finally {
      this.loading = false;
    }
  }

  private teardownClient(): void {
    this.client = undefined;
  }

  private async rebootClient(): Promise<void> {
    this.teardownClient();
    await this.bootClient();
  }

  private dispatchError(err: unknown): void {
    const error = err instanceof Error ? err : new Error(String(err));
    this.dispatchEvent(
      new CustomEvent("notify-error", {
        detail: { error },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private applyThemeVars(): void {
    if (!this.theme) return;
    for (const [key, value] of Object.entries(this.theme)) {
      this.style.setProperty(key, value);
    }
  }

  private setupResizeObserver(): void {
    if (this.resizeObserver) return;
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = entry.contentRect.width;
      this.autoLayout = width >= 768 ? "table" : "cards";
    });
    this.resizeObserver.observe(this);
  }

  private teardownResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "notifyservice-prefs": NotifyServicePrefs;
  }
}
