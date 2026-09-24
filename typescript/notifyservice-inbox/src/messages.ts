export const messages = {
  notifications: "Notifications",
  markAllRead: "Mark all as read",
  loading: "Loading your inbox…",
  empty: "You're all caught up.",
  loadError: "Couldn't load your inbox.",
  ariaUnreadSuffix: (count: number) => `Notifications, ${count} unread`,
  ariaNoUnread: "Notifications, no unread",
  itemUnreadLabel: "unread",
  itemReadLabel: "read",
} as const;
