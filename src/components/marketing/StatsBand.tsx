const STATS = [
  { k: "48", l: "Matches" },
  { k: "16", l: "Host Cities" },
  { k: "3.5M+", l: "Expected Fans" },
  { k: "24/7", l: "AI Operations" },
];

export function StatsBand() {
  return (
    <section id="about" className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-14 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <div className="font-display text-4xl font-semibold text-gradient">{s.k}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
