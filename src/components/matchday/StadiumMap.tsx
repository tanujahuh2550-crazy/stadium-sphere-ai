import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  gate: string;
  /** Replay key — change it to redraw the route animation. */
  routeKey?: string | number;
}

const ROUTE_PATH = "M 62 150 C 90 108, 130 92, 172 96 S 250 118, 274 78";
const ROUTE_LENGTH = 300;

/** Schematic stadium map — pure SVG, no maps API, ready for future GPS wiring. */
export function StadiumMap({ gate, routeKey = 0 }: Props) {
  const { t } = useTranslation();

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.19_0.04_258)]/70 p-3">
      <svg
        viewBox="0 0 320 190"
        className="block h-auto w-full"
        role="img"
        aria-label={`${t("navm.route")} — ${t("navm.destination")} ${gate}`}
      >
        {/* Concourse ring */}
        <ellipse cx="160" cy="95" rx="140" ry="78" fill="none" stroke="oklch(1 0 0 / 0.10)" strokeWidth="10" />
        <ellipse cx="160" cy="95" rx="140" ry="78" fill="none" stroke="oklch(1 0 0 / 0.16)" strokeWidth="1" />
        {/* Pitch */}
        <rect x="98" y="60" width="124" height="70" rx="8" fill="oklch(0.78 0.17 158 / 0.12)" stroke="oklch(0.78 0.17 158 / 0.35)" />
        <line x1="160" y1="60" x2="160" y2="130" stroke="oklch(0.78 0.17 158 / 0.35)" />
        <circle cx="160" cy="95" r="12" fill="none" stroke="oklch(0.78 0.17 158 / 0.35)" />

        {/* Gate markers */}
        {[
          { x: 62, y: 150, label: "A" },
          { x: 40, y: 60, label: "B" },
          { x: 274, y: 78, label: gate.replace(/\D/g, "") || "C" },
          { x: 250, y: 158, label: "D" },
        ].map((g) => (
          <g key={g.label + g.x}>
            <circle cx={g.x} cy={g.y} r="9" fill="oklch(0.22 0.045 258)" stroke="oklch(1 0 0 / 0.18)" />
            <text
              x={g.x}
              y={g.y + 3.5}
              textAnchor="middle"
              fontSize="9"
              fill="oklch(0.85 0.02 250)"
              fontFamily="Space Grotesk, sans-serif"
            >
              {g.label}
            </text>
          </g>
        ))}

        {/* Animated recommended route */}
        <path
          key={routeKey}
          d={ROUTE_PATH}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={ROUTE_LENGTH}
          className="animate-route-draw"
          style={{ ["--route-len" as string]: ROUTE_LENGTH }}
        />
        <defs>
          <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.17 158)" />
            <stop offset="100%" stopColor="oklch(0.82 0.13 210)" />
          </linearGradient>
        </defs>

        {/* Current location */}
        <circle cx="62" cy="150" r="6" fill="oklch(0.82 0.13 210)" />
        <circle
          cx="62"
          cy="150"
          r="6"
          fill="oklch(0.82 0.13 210 / 0.5)"
          className="animate-ping-soft"
          style={{ transformOrigin: "62px 150px" }}
        />
        {/* Destination */}
        <circle cx="274" cy="78" r="6" fill="oklch(0.78 0.17 158)" />
      </svg>

      <figcaption className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2 w-2 rounded-full bg-cyan-accent" />
          {t("navm.you")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-[2px] w-5 rounded-full bg-gradient-to-r from-emerald to-cyan-accent" />
          {t("navm.route")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2 w-2 rounded-full bg-emerald" />
          {t("navm.destination")} · {gate}
        </span>
      </figcaption>
    </figure>
  );
}
