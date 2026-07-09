import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const PREVIEW_METRICS = [
  { l: "Attendance", v: "82,431" },
  { l: "Gates open", v: "24 / 24" },
  { l: "Incidents", v: "0 critical" },
  { l: "Wait time", v: "3m 12s" },
  { l: "Sentiment", v: "+94%" },
  { l: "AI queries", v: "1,204/min" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" />
            FIFA World Cup 2026 · Operations Intelligence
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            The command center for <span className="text-gradient">every matchday.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            StadiumSphere AI unifies fans, volunteers, and stadium staff into a single intelligent
            ecosystem — anticipating crowd flow, streamlining response, and elevating the fan
            experience from gate to final whistle.
          </p>
          <div className="mt-3 font-display text-sm uppercase tracking-[0.28em] text-emerald/90">
            You bring the passion · We bring the intelligence
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="glow-emerald h-12 bg-gradient-to-r from-emerald to-cyan-accent px-7 text-navy-deep hover:opacity-90"
            >
              <Link to="/auth" search={{ mode: "signup" }}>Enter StadiumSphere AI →</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/15 bg-white/[0.02] px-6 hover:bg-white/[0.06]">
              <a href="#roles">Explore roles</a>
            </Button>
          </div>
        </div>

        <div aria-hidden className="pointer-events-none absolute -right-24 top-24 hidden w-[520px] rotate-3 lg:block">
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Live · Stadium 4 · Group Stage</span>
              <span className="text-emerald">● Nominal</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PREVIEW_METRICS.map((k) => (
                <div key={k.l} className="rounded-lg bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                  <div className="mt-1 font-display text-lg">{k.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-24 rounded-lg bg-gradient-to-r from-emerald/25 via-cyan-accent/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
