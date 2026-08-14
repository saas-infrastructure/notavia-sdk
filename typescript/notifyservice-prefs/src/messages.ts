export const messages = {
  loading: "Loading…",
  savePreferences: "Save preferences",
  required: "Required",
  requiredTitle: "Required — cannot be turned off",
  loadError: "Couldn’t load your preferences.",
  saveError: "Couldn’t save your preference. Please try again.",
  categoryColumn: "Category",
  channelEmail: "Email",
  channelInApp: "In-App",
  optedIn: "On",
  optedOut: "Off",
  ariaToggleLabel: (categoryName: string, channel: string, optedIn: boolean) =>
    `${categoryName} — ${channel}: ${optedIn ? "on" : "off"}`,
} as const;
