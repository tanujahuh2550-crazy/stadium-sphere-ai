const ROLES = [
  {
    icon: "⚽",
    title: "Fan",
    body: "Personalized matchday guidance — from entry gate to seat, restrooms, food, and safe exit routes — with an AI concierge that speaks your language.",
    accent: "from-emerald/30 to-transparent",
  },
  {
    icon: "🤝",
    title: "Volunteer",
    body: "Live task assignments, crowd hotspots, and multilingual assistance tools that turn goodwill into measurable impact across the venue.",
    accent: "from-cyan-accent/30 to-transparent",
  },
  {
    icon: "🏟",
    title: "Stadium Staff",
    body: "A unified operations lens — crowd intelligence, incident triage, transport coordination, and sustainability metrics — in one command surface.",
    accent: "from-gold/30 to-transparent",
  },
];

export function RolesSection() {
  return (
    <section id="roles" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.24em] text-emerald/90">One platform · Three roles</div>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Built for everyone inside the stadium.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {ROLES.map((r, i) => (
          <article
            key={r.title}
            className="glass group relative animate-fade-up overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div aria-hidden className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br ${r.accent} opacity-60`} />
            <div className="relative">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
                {r.icon}
              </div>
              <div className="font-display text-2xl font-semibold">{r.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <div className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.2em] text-emerald transition-colors group-hover:text-cyan-accent">
                Learn more →
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
