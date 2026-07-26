import type { TranslationKey } from "@/i18n";

/** Sidebar navigation config — extend as Phase 2 modules ship. */
export interface NavItem {
  labelKey: TranslationKey;
  icon: string;
  to?: string;
  active?: boolean;
  soon?: boolean;
}

export const DASHBOARD_NAV: NavItem[] = [
  { labelKey: "nav.overview", icon: "◎", to: "/dashboard" },
  { labelKey: "nav.matchdayPass", icon: "◆", to: "/matchday-pass" },
  { labelKey: "nav.aiConcierge", icon: "✦", soon: true },
  { labelKey: "nav.crowd", icon: "◈", soon: true },
  { labelKey: "nav.incident", icon: "▲", soon: true },
  { labelKey: "nav.transport", icon: "→", soon: true },
  { labelKey: "nav.sustainability", icon: "✿", soon: true },
];
