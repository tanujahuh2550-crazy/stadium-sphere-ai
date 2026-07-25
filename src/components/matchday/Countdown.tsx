import { useEffect, useState } from "react";

/** Target kickoff: next occurrence of 19:30 local time (visual only). */
function nextKickoff() {
  const now = new Date();
  const t = new Date();
  t.setHours(19, 30, 0, 0);
  if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 1);
  return t;
}

interface Unit {
  label: string;
  value: string;
}

export function Countdown() {
  const [target] = useState(() => nextKickoff());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  const units: Unit[] = [
    { label: "Hours", value: String(h).padStart(2, "0") },
    { label: "Minutes", value: String(m).padStart(2, "0") },
    { label: "Seconds", value: String(s).padStart(2, "0") },
  ];

  return (
    <div
      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2"
      role="timer"
      aria-label="Countdown to kickoff"
    >
      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Kickoff in
      </span>
      <div className="flex items-center gap-1.5">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1.5">
            <div className="flex flex-col items-center rounded-lg bg-gradient-to-b from-emerald/15 to-cyan-accent/10 px-2.5 py-1 min-w-[42px]">
              <span className="font-display text-lg font-semibold leading-none tabular-nums">
                {u.value}
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-widest text-muted-foreground">
                {u.label.slice(0, 3)}
              </span>
            </div>
            {i < units.length - 1 && (
              <span aria-hidden className="font-display text-emerald/70">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
