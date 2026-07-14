import { Check } from "lucide-react";

const DONE = ["Ticket", "Identity", "Route", "Weather"];
const REMINDERS = [
  { icon: "🧢", label: "Cap" },
  { icon: "💧", label: "Water" },
  { icon: "🪪", label: "ID" },
];

export function Readiness({ percent = 90 }: { percent?: number }) {
  return (
    <section className="glass rounded-2xl p-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Matchday Readiness</div>
          <h2 className="mt-1 font-display text-lg">🏆 You're almost set</h2>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-semibold text-emerald">{percent}%</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ready</div>
        </div>
      </header>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald to-cyan-accent shadow-[0_0_18px_oklch(0.78_0.17_158/0.6)] transition-[width] duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DONE.map((d) => (
          <li key={d} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald/15 text-emerald">
              <Check className="h-3 w-3" />
            </span>
            {d}
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl border border-gold/25 bg-gold/5 p-4">
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold">⚠ Don't forget</div>
        <ul className="mt-2 flex flex-wrap gap-2">
          {REMINDERS.map((r) => (
            <li
              key={r.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs"
            >
              <span aria-hidden>{r.icon}</span>
              {r.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
