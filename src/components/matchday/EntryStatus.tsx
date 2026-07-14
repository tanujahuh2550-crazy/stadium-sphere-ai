import { Check, ShieldCheck } from "lucide-react";

const CHECKS = [
  { label: "Identity Verified", detail: "Biometric match confirmed" },
  { label: "Ticket Valid", detail: "Signed & synced to gate system" },
  { label: "Security Check Ready", detail: "Fast-track lane assigned" },
];

export function EntryStatus() {
  return (
    <section className="glass rounded-2xl p-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">AI Entry Status</div>
          <h2 className="mt-1 font-display text-lg">Ready for Entry</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 text-[11px] text-emerald">
          <ShieldCheck className="h-3.5 w-3.5" /> Cleared
        </span>
      </header>

      <ul className="mt-5 space-y-2.5">
        {CHECKS.map((c) => (
          <li key={c.label} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3.5 py-3">
            <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-emerald/15 text-emerald">
              <Check className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1">
              <div className="text-sm">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.detail}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Access Level</div>
          <div className="mt-0.5 font-display text-sm">General Admission</div>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-emerald">● Live</span>
      </div>
    </section>
  );
}
