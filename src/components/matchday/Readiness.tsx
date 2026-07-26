import { Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/i18n";

const CHECKS: TranslationKey[] = [
  "check.ticket",
  "check.identity",
  "check.gate",
  "check.weather",
  "check.travel",
];

const REMINDERS = [
  { icon: "🧢", label: "Cap" },
  { icon: "💧", label: "Water" },
  { icon: "🪪", label: "ID" },
];

export function Readiness({ percent }: { percent?: number }) {
  const { t } = useTranslation();
  const value = percent ?? 100;

  return (
    <section className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/20 hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.17_158/0.35)]">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {t("pass.readiness")}
          </div>
          <h2 className="mt-1 font-display text-lg">🏆 You're all set</h2>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-semibold text-emerald tabular-nums">
            {value}%
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("pass.ready")}
          </div>
        </div>
      </header>

      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald to-cyan-accent shadow-[0_0_18px_oklch(0.78_0.17_158/0.6)] transition-[width] duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>

      <ul className="mt-5 space-y-2">
        {CHECKS.map((key, i) => (
          <li
            key={key}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/30 hover:bg-white/[0.04] animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald/15 text-emerald">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1">{t(key)}</span>
            <span aria-hidden className="text-emerald">✓</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl border border-gold/25 bg-gold/5 p-4">
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold">
          ⚠ Don't forget
        </div>
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
