import { Clock, Train, Bus, ParkingCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Collapsible } from "./Collapsible";

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  meta: string;
  accent?: string;
}

const STATS: Stat[] = [
  { icon: Clock, label: "Leave Hotel In", value: "42 min", meta: "Optimal departure window", accent: "text-emerald" },
  { icon: Train, label: "Metro", value: "12 min", meta: "Line 3 · Every 4 min" },
  { icon: Bus, label: "Shuttle", value: "18 min", meta: "Route S2 · Stop 14" },
  { icon: ParkingCircle, label: "Parking", value: "82%", meta: "Lot P4 · Filling fast", accent: "text-gold" },
];

export function TravelPlanner() {
  return (
    <Collapsible
      eyebrow="Travel Planner"
      title="Your journey to the stadium"
      right={<span className="text-[10px] uppercase tracking-widest text-emerald">● Real-time</span>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:bg-white/[0.04] hover:shadow-[0_16px_40px_-20px_oklch(0.78_0.17_158/0.4)] animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <s.icon className={`h-5 w-5 ${s.accent ?? "text-cyan-accent"}`} />
            <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-display text-2xl font-semibold">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.meta}</div>
          </div>
        ))}
      </div>
    </Collapsible>
  );
}
