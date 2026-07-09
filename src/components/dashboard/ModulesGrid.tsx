const MODULES = [
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

export function ModulesGrid() {
  return (
    <section id="modules" aria-label="AI modules" className="grid gap-5 md:grid-cols-3">
      {MODULES.map((m, i) => (
        <article
          key={m.title}
          className="glass group relative animate-fade-up overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald/10 blur-3xl" />
          <div className="flex items-start justify-between">
            <div aria-hidden className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-xl text-emerald">
              {m.icon}
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Coming in Phase 2
            </span>
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold">{m.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
          <div aria-hidden className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-1/4 bg-gradient-to-r from-emerald to-cyan-accent" />
          </div>
        </article>
      ))}
    </section>
  );
}
