import { Sparkles, Footprints, Users } from "lucide-react";
import { Collapsible } from "./Collapsible";

export function GateRecommendation() {
  return (
    <Collapsible
      eyebrow="Gate Recommendation"
      title="Best route to your seat"
      right={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 px-2.5 py-1 text-[11px] text-cyan-accent">
          <Sparkles className="h-3.5 w-3.5" /> AI suggested
        </span>
      }
    >
      <div className="rounded-xl border border-emerald/20 bg-gradient-to-br from-emerald/10 to-cyan-accent/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/40">
        <div className="text-[10px] uppercase tracking-[0.22em] text-emerald/90">Recommended Gate</div>
        <div className="mt-1 font-display text-3xl font-semibold">Gate C</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 transition-colors hover:bg-white/[0.08]">
            <Footprints className="h-4 w-4 text-emerald" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Walking</div>
              <div className="font-display">7 min</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 transition-colors hover:bg-white/[0.08]">
            <Users className="h-4 w-4 text-emerald" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Crowd</div>
              <div className="font-display">🟢 Low</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/30 hover:bg-white/[0.04]">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Alternative</div>
          <div className="mt-0.5 font-display">Gate D · 11 min · 🟡 Medium</div>
        </div>
        <button className="text-xs text-cyan-accent transition-colors hover:text-emerald">Switch →</button>
      </div>
    </Collapsible>
  );
}
