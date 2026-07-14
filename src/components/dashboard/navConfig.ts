/** Sidebar navigation config — extend as Phase 2 modules ship. */
export interface NavItem {
  label: string;
  icon: string;
  to?: string;
  active?: boolean;
  soon?: boolean;
}

export const DASHBOARD_NAV: NavItem[] = [
  { label: "Overview", icon: "◎", to: "/dashboard" },
  { label: "Matchday Pass", icon: "◆", to: "/matchday-pass" },
  { label: "AI Concierge", icon: "✦", soon: true },
  { label: "Crowd Intelligence", icon: "◈", soon: true },
  { label: "Incident Reporting", icon: "▲", soon: true },
  { label: "Transportation", icon: "→", soon: true },
  { label: "Sustainability", icon: "✿", soon: true },
];
