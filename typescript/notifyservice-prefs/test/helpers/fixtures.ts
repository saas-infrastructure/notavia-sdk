import type { PreferenceCell } from "@notavia/prefs-client";

export const normalCell: PreferenceCell = {
  categoryKey: "marketing",
  categoryName: "Marketing",
  isCritical: false,
  channel: "email",
  optedIn: true,
  source: "endUser",
  updatedAt: "2026-05-27T00:00:00Z",
};

export const criticalCell: PreferenceCell = {
  categoryKey: "security",
  categoryName: "Security",
  isCritical: true,
  channel: "email",
  optedIn: true,
  source: "default",
  updatedAt: "2026-05-27T00:00:00Z",
};

export const normalCellInApp: PreferenceCell = {
  categoryKey: "marketing",
  categoryName: "Marketing",
  isCritical: false,
  channel: "inApp",
  optedIn: false,
  source: "endUser",
  updatedAt: "2026-05-27T00:00:00Z",
};

export const criticalCellInApp: PreferenceCell = {
  categoryKey: "security",
  categoryName: "Security",
  isCritical: true,
  channel: "inApp",
  optedIn: true,
  source: "default",
  updatedAt: "2026-05-27T00:00:00Z",
};
