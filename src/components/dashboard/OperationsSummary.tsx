const TIMELINE = [
  { t: "T-04:00", l: "Perimeter checks · Gates A–F", s: "Scheduled" },
  { t: "T-02:00", l: "Volunteer briefing · Zone 3", s: "Scheduled" },
  { t: "T-00:45", l: "Gates open · Fan flow monitoring", s: "Auto" },
  { t: "T+00:00", l: "Kickoff · Ops center handover", s: "Auto" },
];

const SERVICES = ["Identity & Access", "Realtime Telemetry", "AI Gateway", "Incident Bus"];

export function OperationsSummary() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-3">
      <div className="glass rounded-2xl p-6 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Matchday timeline</div>
            <h3 className="mt-1 font-display text-lg">Upcoming operations window</h3>
          </div>
          <span className="text-xs text-emerald">● Live sync</span>
        </div>
        <ul className="space-y-3">
          {TIMELINE.map((r) => (
            <li key={r.t} className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="w-16 font-display text-sm text-emerald">{r.t}</div>
              <div className="flex-1 text-sm">{r.l}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.s}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass rounded-2xl p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">System status</div>
        <h3 className="mt-1 font-display text-lg">All services operational</h3>
        <ul className="mt-5 space-y-3 text-sm">
          {SERVICES.map((s) => (
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
