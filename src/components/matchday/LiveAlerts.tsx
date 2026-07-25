import { AlertTriangle, ArrowRight, CloudRain, ShieldAlert, TrainFront, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Collapsible } from "./Collapsible";

interface Alert {
  icon: LucideIcon;
  title: string;
  detail: string;
  time: string;
  priority: "high" | "med" | "low";
}

const PRIORITY: Record<Alert["priority"], { dot: string; ring: string }> = {
  high: { dot: "bg-destructive", ring: "ring-destructive/30" },
  med: { dot: "bg-gold", ring: "ring-gold/30" },
  low: { dot: "bg-emerald", ring: "ring-emerald/30" },
};

const ALERTS: Alert[] = [
  { icon: Users, title: "Gate A crowded", detail: "Density above 78% — expect 6 min delay", time: "Just now", priority: "med" },
  { icon: ArrowRight, title: "Use Gate C instead", detail: "AI reroute · 3 min faster", time: "1 min ago", priority: "low" },
  { icon: CloudRain, title: "Rain expected in 25 min", detail: "Light showers · Concourse cover open", time: "4 min ago", priority: "med" },
  { icon: ShieldAlert, title: "Security check delay", detail: "Gate F · +8 min screening time", time: "9 min ago", priority: "high" },
  { icon: TrainFront, title: "Train platform changed", detail: "Line 3 shifted to Platform 5", time: "14 min ago", priority: "low" },
];

export function LiveAlerts() {
  return (
    <Collapsible
      eyebrow="Live Matchday Alerts"
      title="Around you, right now"
      right={
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald">
          <AlertTriangle className="h-3 w-3" /> Streaming
        </span>
      }
    >
      <ol className="relative space-y-1 pl-6">
        <div aria-hidden className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald/40 via-white/10 to-transparent" />
        {ALERTS.map((a, i) => {
          const p = PRIORITY[a.priority];
          return (
            <li key={a.title} className="relative py-2.5 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <span
                aria-hidden
                className={`absolute -left-[19px] top-4 grid h-4 w-4 place-items-center rounded-full ring-4 ${p.ring} ${p.dot}`}
              />
              <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/20 hover:bg-white/[0.05]">
                <a.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-display text-sm">{a.title}</div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.time}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{a.detail}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Collapsible>
  );
}
