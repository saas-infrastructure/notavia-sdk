import { LitElement, html, css, type TemplateResult, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  createInboxClient,
  type ConnectionState,
  type InboxClient,
  type InboxItem,
} from "@notavia/inbox-client";
import { themeStyles } from "./theme.js";
import { renderListVariant } from "./variants/list.js";
import { renderBellVariant, bellStyles } from "./variants/bell.js";
import { renderPanelVariant, panelStyles } from "./variants/panel.js";

type Variant = "bell" | "panel" | "list";

@customElement("notifyservice-inbox")
export class NotifyServiceInbox extends LitElement {
  static override styles = [themeStyles, bellStyles, panelStyles, css`:host { display: inline-block; }`];

  @property({ attribute: "publishable-key" }) publishableKey = "";
  @property() token = "";
  @property({ attribute: "base-url" }) baseUrl = "https://api.notavia.saas-infrastructure.com";
  @property({ reflect: true }) variant: Variant = "bell";
  @property({ reflect: true }) theme: "light" | "dark" = "light";
  @property({ type: Boolean, reflect: true }) open = false;

  refreshToken?: () => Promise<string>;

  @state() items: InboxItem[] = [];
  @state() unreadCount = 0;
  @state() connectionState: ConnectionState = "idle";

  private client?: InboxClient;
  private subs: Array<() => void> = [];
  private bellEl: HTMLElement | null = null;
  private documentClickHandler: ((e: MouseEvent) => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.bootClient();
  }

  override updated(changed: PropertyValues): void {
    if (changed.has("token") || changed.has("publishableKey") || changed.has("baseUrl")) {
      const oldToken = changed.get("token") as string | undefined;
      const oldKey = changed.get("publishableKey") as string | undefined;
      const prevTokenEmpty = changed.has("token") ? !oldToken : true;
      const prevKeyEmpty = changed.has("publishableKey") ? !oldKey : true;
      if (prevTokenEmpty && prevKeyEmpty) return;
      void this.rebootClient();
    }
    if (changed.has("open")) {
      this.bindOrUnbindOutsideClick();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    void this.tearDownClient();
    if (this.documentClickHandler) {
      document.removeEventListener("mousedown", this.documentClickHandler);
      this.documentClickHandler = null;
    }
  }

  override render(): TemplateResult {
    switch (this.variant) {
      case "bell":  return renderBellVariant(this);
      case "panel": return renderPanelVariant(this);
      case "list":  return renderListVariant(this.items);
    }
  }

  toggleOpen(): void { this.open = !this.open; }

  closeAndRestoreFocus(): void {
    this.open = false;
    const bell = this.renderRoot.querySelector<HTMLElement>("button.bell");
    bell?.focus();
  }

  handleItemClick(e: CustomEvent): void {
    this.dispatchEvent(new CustomEvent("notify-item-click", {
      detail: e.detail,
      bubbles: true, composed: true,
    }));
    void this.client?.markRead(e.detail.id).catch(() => {});
  }

  async markAllRead(): Promise<void> {
    if (!this.client) return;
    try {
      const res = await this.client.markAllRead();
      this.dispatchEvent(new CustomEvent("notify-marked-all-read", {
        detail: { markedCount: res.markedCount },
        bubbles: true, composed: true,
      }));
    } catch (err) {
      this.dispatchError(err);
    }
  }

  private async bootClient(): Promise<void> {
    if (!this.publishableKey || !this.token) return;
    const client = createInboxClient({
      baseUrl: this.baseUrl,
      publishableKey: this.publishableKey,
      token: this.token,
      refreshToken: this.refreshToken,
    });
    this.client = client;

    this.subs.push(client.on("notification.arrived", (item) => {
      this.items = [item, ...this.items.filter((i) => i.id !== item.id)];
      this.unreadCount = this.unreadCount + (item.readAt == null ? 1 : 0);
    }));
    this.subs.push(client.on("notification.read", (e) => {
      this.items = this.items.map((i) => i.id === e.id ? { ...i, readAt: e.readAt || i.readAt } : i);
      this.unreadCount = e.unreadCount;
      this.dispatchEvent(new CustomEvent("notify-marked-read", {
        detail: { id: e.id }, bubbles: true, composed: true,
      }));
    }));
    this.subs.push(client.on("unread-count.changed", (count) => {
      this.unreadCount = count;
      this.dispatchEvent(new CustomEvent("notify-unread-count-changed", {
        detail: { count }, bubbles: true, composed: true,
      }));
    }));
    this.subs.push(client.on("state.changed", (s) => {
      this.connectionState = s;
      if (s === "connected") {
        this.dispatchEvent(new CustomEvent("notify-connected", { bubbles: true, composed: true }));
      } else if (s === "disconnected") {
        this.dispatchEvent(new CustomEvent("notify-disconnected", {
          detail: { reason: "transport" }, bubbles: true, composed: true,
        }));
      }
    }));
    this.subs.push(client.on("error", (e) => this.dispatchError(e)));

    try {
      await client.connect();
      const page = await client.feed({ limit: 20 });
      this.items = page.data;
      this.unreadCount = page.unreadCount;
    } catch (err) {
      this.dispatchError(err);
    }
  }

  private async tearDownClient(): Promise<void> {
    for (const u of this.subs) u();
    this.subs = [];
    try { await this.client?.dispose(); } catch { /* swallow */ }
    this.client = undefined;
  }

  private async rebootClient(): Promise<void> {
    await this.tearDownClient();
    await this.bootClient();
  }

  private dispatchError(err: unknown): void {
    const error = err instanceof Error ? err : new Error(String(err));
    this.dispatchEvent(new CustomEvent("notify-error", {
      detail: { error }, bubbles: true, composed: true,
    }));
  }

  private bindOrUnbindOutsideClick(): void {
    if (this.open && !this.documentClickHandler) {
      this.documentClickHandler = (e: MouseEvent) => {
        if (!e.composedPath().includes(this)) this.open = false;
      };
      document.addEventListener("mousedown", this.documentClickHandler);
    } else if (!this.open && this.documentClickHandler) {
      document.removeEventListener("mousedown", this.documentClickHandler);
      this.documentClickHandler = null;
    }
  }
}

declare global { interface HTMLElementTagNameMap { "notifyservice-inbox": NotifyServiceInbox } }
