import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { getUser, signOut, ROLE_LABEL, type AuthUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard · StadiumSphere AI" },
      { name: "description", content: "Role-based operations dashboard for StadiumSphere AI." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate({ to: "/auth", search: { mode: "signin" } });
      return;
    }
    setLocalUser(u);
    setLoaded(true);
  }, [navigate]);

  if (!loaded || !user) return null;

  return (
    <div className="flex min-h-screen w-full bg-hero">
      <Sidebar collapsed={collapsed} role={user.role} />
      <div className="flex flex-1 flex-col">
        <TopNav
          user={user}
          onToggle={() => setCollapsed((c) => !c)}
          onSignOut={() => {
            signOut();
            navigate({ to: "/" });
          }}
        />
        <main className="flex-1 p-6 md:p-10">
          <WelcomeBanner user={user} />
          <ModulesGrid />
          <SecondaryGrid />
        </main>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Overview", icon: "◎", active: true },
  { label: "AI Concierge", icon: "✦", soon: true },
  { label: "Crowd Intelligence", icon: "◈", soon: true },
  { label: "Incident Reporting", icon: "▲", soon: true },
  { label: "Transportation", icon: "→", soon: true },
  { label: "Sustainability", icon: "✿", soon: true },
];

function Sidebar({ collapsed, role }: { collapsed: boolean; role: AuthUser["role"] }) {
  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 border-r border-white/5 bg-navy-elev/60 backdrop-blur-xl md:flex md:flex-col ${
        collapsed ? "w-[76px]" : "w-[260px]"
      } transition-[width] duration-300`}
    >
      <div className="flex h-16 items-center border-b border-white/5 px-4">
        {collapsed ? (
          <div className="mx-auto h-8 w-8 rounded-lg bg-gradient-to-br from-emerald to-cyan-accent" />
        ) : (
          <Logo />
        )}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((n) => (
          <button
            key={n.label}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              n.active
                ? "bg-white/[0.06] text-foreground"
                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
            }`}
          >
            <span className={`text-base ${n.active ? "text-emerald" : ""}`}>{n.icon}</span>
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

function TopNav({
  user,
  onToggle,
  onSignOut,
}: {
  user: AuthUser;
  onToggle: () => void;
  onSignOut: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-navy-deep/70 px-4 backdrop-blur-xl md:px-8">
      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground"
      >
        ☰
      </button>
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="hidden flex-1 md:block">
        <div className="max-w-md rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-muted-foreground">
          <span className="mr-2 text-emerald">⌕</span>Search stadiums, incidents, guests…
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:inline">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald align-middle" />
          Systems nominal
        </span>
        <div className="hidden text-right md:block">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {ROLE_LABEL[user.role]}
          </div>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald to-cyan-accent font-display text-sm text-navy-deep">
          {user.name.slice(0, 1).toUpperCase()}
        </div>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    </header>
  );
}

function WelcomeBanner({ user }: { user: AuthUser }) {
  return (
    <div className="glass mb-8 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl p-7 md:flex-row md:items-center">
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-emerald/90">
          {ROLE_LABEL[user.role]} · Ops Console
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          Welcome back, {user.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Your workspace is ready. AI modules for concierge, crowd intelligence, and incident response
          will unlock in Phase 2.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild variant="outline" className="border-white/15 bg-white/[0.02]">
          <Link to="/">Back to site</Link>
        </Button>
        <Button className="bg-gradient-to-r from-emerald to-cyan-accent text-navy-deep hover:opacity-90">
          View schedule
        </Button>
      </div>
    </div>
  );
}

function ModulesGrid() {
  const modules = [
    {
      title: "AI Concierge",
      icon: "✦",
      body: "Multilingual fan assistance across wayfinding, food, and safety — powered by Gen AI.",
    },
    {
      title: "Crowd Intelligence",
      icon: "◈",
      body: "Real-time density, flow prediction, and bottleneck alerts across every concourse.",
    },
    {
      title: "Incident Reporting",
      icon: "▲",
      body: "Triage, dispatch, and resolution timelines with automated evidence capture.",
    },
  ];
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {modules.map((m, i) => (
        <div
          key={m.title}
          className="glass group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5 animate-fade-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald/10 blur-3xl" />
          <div className="flex items-start justify-between">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-xl text-emerald">
              {m.icon}
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Coming in Phase 2
            </span>
          </div>
          <div className="mt-6 font-display text-xl font-semibold">{m.title}</div>
          <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-1/4 bg-gradient-to-r from-emerald to-cyan-accent" />
          </div>
        </div>
      ))}
    </section>
  );
}

function SecondaryGrid() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-3">
      <div className="glass rounded-2xl p-6 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Matchday timeline</div>
            <div className="mt-1 font-display text-lg">Upcoming operations window</div>
          </div>
          <span className="text-xs text-emerald">● Live sync</span>
        </div>
        <div className="space-y-3">
          {[
            { t: "T-04:00", l: "Perimeter checks · Gates A–F", s: "Scheduled" },
            { t: "T-02:00", l: "Volunteer briefing · Zone 3", s: "Scheduled" },
            { t: "T-00:45", l: "Gates open · Fan flow monitoring", s: "Auto" },
            { t: "T+00:00", l: "Kickoff · Ops center handover", s: "Auto" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="w-16 font-display text-sm text-emerald">{r.t}</div>
              <div className="flex-1 text-sm">{r.l}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">System status</div>
        <div className="mt-1 font-display text-lg">All services operational</div>
        <ul className="mt-5 space-y-3 text-sm">
          {[
            "Identity & Access",
            "Realtime Telemetry",
            "AI Gateway",
            "Incident Bus",
          ].map((s) => (
            <li key={s} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
              <span className="text-muted-foreground">{s}</span>
              <span className="text-emerald">● Nominal</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
