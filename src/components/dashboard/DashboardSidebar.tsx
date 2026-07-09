import { Logo } from "@/components/Logo";
import { ROLE_LABEL, type Role } from "@/services/authService";
import { DASHBOARD_NAV } from "./navConfig";

interface Props {
  collapsed: boolean;
  role: Role;
}

export function DashboardSidebar({ collapsed, role }: Props) {
  return (
    <aside
      aria-label="Primary navigation"
      className={`sticky top-0 hidden h-dvh shrink-0 border-r border-white/5 bg-navy-elev/60 backdrop-blur-xl transition-[width] duration-300 md:flex md:flex-col ${
        collapsed ? "w-[76px]" : "w-[260px]"
      }`}
    >
      <div className="flex h-16 items-center border-b border-white/5 px-4">
        {collapsed ? (
          <div aria-hidden className="mx-auto h-8 w-8 rounded-lg bg-gradient-to-br from-emerald to-cyan-accent" />
        ) : (
          <Logo />
        )}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {DASHBOARD_NAV.map((n) => (
          <button
            key={n.label}
            aria-current={n.active ? "page" : undefined}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 ${
              n.active
                ? "bg-white/[0.06] text-foreground"
                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
            }`}
          >
            <span aria-hidden className={`text-base ${n.active ? "text-emerald" : ""}`}>{n.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1">{n.label}</span>
                {n.soon && (
                  <span className="rounded-full border border-white/10 px-1.5 py-[1px] text-[9px] uppercase tracking-widest text-muted-foreground">
                    Soon
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>
      {!collapsed && (
        <div className="m-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          <div className="mb-1 uppercase tracking-widest text-emerald/90">Access tier</div>
          <div className="font-display text-sm text-foreground">{ROLE_LABEL[role]}</div>
          <div className="mt-1">Phase 1 · Foundation build</div>
        </div>
      )}
    </aside>
  );
}
