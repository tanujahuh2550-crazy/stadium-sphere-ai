import { useEffect } from "react";
import { X, Navigation2, Footprints, DoorOpen } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { StadiumMap } from "./StadiumMap";

interface Props {
  open: boolean;
  onClose: () => void;
  gate: string;
  minutes: number;
}

/** UI-only navigation preview — no GPS, no maps API. */
export function NavigationPreviewModal({ open, onClose, gate, minutes }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <button
        type="button"
        aria-label={t("navm.close")}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[oklch(0.1_0.03_258)]/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("navm.previewTitle")}
        className="glass-strong animate-concierge-in relative w-full max-w-lg rounded-3xl p-6 shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)]"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-emerald/90">
              {t("navm.eyebrow")}
            </div>
            <h2 className="mt-1 font-display text-xl">{t("navm.previewTitle")}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("navm.close")}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="mt-5">
          <StadiumMap gate={gate} routeKey={`modal-${gate}`} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2.5">
            <DoorOpen className="h-4 w-4 text-emerald" aria-hidden />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {t("navm.destination")}
              </div>
              <div className="font-display">{gate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2.5">
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
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {t("navm.previewBody")}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald to-cyan-accent px-4 py-2.5 text-sm font-medium text-navy-deep transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
        >
          <Navigation2 className="h-4 w-4" aria-hidden />
          {t("navm.close")}
        </button>
      </div>
    </div>
  );
}
