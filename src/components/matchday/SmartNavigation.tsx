import { useState } from "react";
import { Sparkles, Footprints, Users, Navigation2, DoorOpen } from "lucide-react";
import { Collapsible } from "./Collapsible";
import { StadiumMap } from "./StadiumMap";
import { NavigationPreviewModal } from "./NavigationPreviewModal";
import { useCountUp } from "@/hooks/useCountUp";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";

type CrowdLevel = "low" | "moderate" | "high";

const CROWD: Record<CrowdLevel, { dot: string; key: TranslationKey; text: string }> = {
  low: { dot: "🟢", key: "navm.low", text: "text-emerald" },
  moderate: { dot: "🟡", key: "navm.moderate", text: "text-gold" },
  high: { dot: "🔴", key: "navm.high", text: "text-destructive" },
};

interface Route {
  gate: string;
  minutes: number;
  crowd: CrowdLevel;
}

const PRIMARY: Route = { gate: "Gate C", minutes: 7, crowd: "low" };
const ALTERNATIVE: Route = { gate: "Gate D", minutes: 11, crowd: "moderate" };

export function SmartNavigation() {
  const { t } = useTranslation();
  const [active, setActive] = useState<Route>(PRIMARY);
  const [alternative, setAlternative] = useState<Route>(ALTERNATIVE);
  const [previewOpen, setPreviewOpen] = useState(false);

  const minutes = useCountUp(active.minutes, 800);
  const crowd = CROWD[active.crowd];
  const altCrowd = CROWD[alternative.crowd];

  const swap = () => {
    setActive(alternative);
    setAlternative(active);
  };

  return (
    <Collapsible
      eyebrow={t("navm.eyebrow")}
      title={t("navm.title")}
      right={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 px-2.5 py-1 text-[11px] text-cyan-accent">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> {t("navm.aiSuggested")}
        </span>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="rounded-xl border border-emerald/20 bg-gradient-to-br from-emerald/10 to-cyan-accent/5 p-5 card-hover">
            <div className="text-[10px] uppercase tracking-[0.22em] text-emerald/90">
              {t("navm.recommendedGate")}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <DoorOpen className="h-6 w-6 text-emerald" aria-hidden />
              <span className="font-display text-3xl font-semibold">{active.gate}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 transition-colors hover:bg-white/[0.08]">
                <Footprints className="h-4 w-4 text-emerald" aria-hidden />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("navm.walking")}
                  </div>
                  <div className="font-display tabular-nums">
                    {minutes} {t("navm.minutes")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 transition-colors hover:bg-white/[0.08]">
                <Users className="h-4 w-4 text-emerald" aria-hidden />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("navm.crowd")}
                  </div>
                  <div className={cn("font-display", crowd.text)}>
                    <span aria-hidden>{crowd.dot}</span> {t(crowd.key)}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald to-cyan-accent px-4 py-2.5 text-sm font-medium text-navy-deep shadow-[0_10px_30px_-12px_oklch(0.78_0.17_158/0.8)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              <Navigation2 className="h-4 w-4" aria-hidden />
              {t("navm.startNavigation")}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm card-hover">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("navm.alternative")}
              </div>
              <div className="mt-0.5 font-display">
                {alternative.gate} · {alternative.minutes} {t("navm.minutes")} ·{" "}
                <span className={altCrowd.text}>
                  <span aria-hidden>{altCrowd.dot}</span> {t(altCrowd.key)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={swap}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-cyan-accent transition-colors hover:border-emerald/40 hover:text-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              {t("navm.switch")} →
            </button>
          </div>
        </div>

        <StadiumMap gate={active.gate} routeKey={active.gate} />
      </div>

      <NavigationPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        gate={active.gate}
        minutes={active.minutes}
      />
    </Collapsible>
  );
}
