import { Droplet, UtensilsCrossed, ShoppingBag, GlassWater, Accessibility } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  icon: LucideIcon;
  label: string;
  detail: string;
}

const ITEMS: Item[] = [
  { icon: Droplet, label: "Nearest Washroom", detail: "Concourse B · 40m" },
  { icon: UtensilsCrossed, label: "Nearby Food", detail: "4 stalls under 3 min" },
  { icon: ShoppingBag, label: "Merchandise", detail: "Official store · Level 1" },
  { icon: GlassWater, label: "Water Refill", detail: "Free · 6 stations nearby" },
  { icon: Accessibility, label: "Accessibility", detail: "Ramp access at Gate C" },
];

export function Essentials() {
  return (
    <section className="glass rounded-2xl p-6">
      <header className="mb-5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Matchday Essentials</div>
        <h2 className="mt-1 font-display text-lg">Quick actions inside the stadium</h2>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {ITEMS.map((it) => (
          <button
            key={it.label}
            className="group flex flex-col items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/30 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald/10 text-emerald transition-transform group-hover:scale-110">
              <it.icon className="h-4.5 w-4.5" />
            </span>
            <div className="font-display text-sm">{it.label}</div>
            <div className="text-xs text-muted-foreground">{it.detail}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
