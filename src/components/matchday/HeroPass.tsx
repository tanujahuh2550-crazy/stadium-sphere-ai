import { QrTicket } from "./QrTicket";

interface Props {
  fanName: string;
  fanId: string;
}

export function HeroPass({ fanName, fanId }: Props) {
  return (
    <section
      aria-label="Matchday pass"
      className="glass relative overflow-hidden rounded-3xl p-7 md:p-9"
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-accent/15 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-emerald/90">
            <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1">FIFA World Cup 2026</span>
            <span className="text-muted-foreground">Match #47 · Group Stage</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Argentina <span className="text-muted-foreground/70">vs</span> Brazil
          </h1>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3.5 py-1.5 text-xs font-medium text-emerald">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_10px_oklch(0.78_0.17_158)]" />
            Entry Ready
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Fan</dt>
              <dd className="mt-1 font-display text-base">{fanName}</dd>
              <dd className="text-xs text-muted-foreground">ID · {fanId}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Kickoff</dt>
              <dd className="mt-1 font-display text-base">7:30 PM</dd>
              <dd className="text-xs text-muted-foreground">Local time</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Seat</dt>
              <dd className="mt-1 font-display text-base">B14</dd>
              <dd className="text-xs text-muted-foreground">Row 12</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Section</dt>
              <dd className="mt-1 font-display text-base">North Stand</dd>
              <dd className="text-xs text-muted-foreground">Level 2</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-center border-t border-dashed border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <QrTicket fanId={fanId} matchId="M47" />
        </div>
      </div>
    </section>
  );
}
