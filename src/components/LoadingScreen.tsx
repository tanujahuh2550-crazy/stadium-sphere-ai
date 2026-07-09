import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
  duration?: number;
}

export function LoadingScreen({ onDone, duration = 3200 }: Props) {
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setGoal(true);
        setTimeout(onDone, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onDone]);

  const particles = Array.from({ length: 28 });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-deep">
      {/* Floating stadium light particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 53) % 100;
          const delay = (i % 10) * 0.4;
          const size = 2 + (i % 4);
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white/70 animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                animationDelay: `${delay}s`,
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px rgba(255,255,255,0.7)",
              }}
            />
          );
        })}
      </div>

      {/* Trophy */}
      <div className="relative mb-10 animate-fade-up">
        <svg viewBox="0 0 120 140" className="h-28 w-28 drop-shadow-[0_0_30px_rgba(230,190,90,0.5)]">
          <defs>
            <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#F7D881" />
              <stop offset="0.5" stopColor="#D9A441" />
              <stop offset="1" stopColor="#8A5A1A" />
            </linearGradient>
          </defs>
          <path d="M30 20 h60 v20 a30 30 0 0 1 -60 0 z" fill="url(#gold)" />
          <path d="M30 30 q-15 0 -15 15 q0 15 15 18" fill="none" stroke="url(#gold)" strokeWidth="4" />
          <path d="M90 30 q15 0 15 15 q0 15 -15 18" fill="none" stroke="url(#gold)" strokeWidth="4" />
          <path d="M45 60 q15 15 30 0 l-4 22 h-22 z" fill="url(#gold)" />
          <rect x="46" y="84" width="28" height="6" rx="2" fill="url(#gold)" />
          <rect x="38" y="92" width="44" height="10" rx="3" fill="url(#gold)" />
          <rect x="30" y="104" width="60" height="14" rx="4" fill="url(#gold)" />
          <circle cx="60" cy="35" r="4" fill="#fff" opacity="0.35" />
        </svg>
      </div>

      {/* Doodle players */}
      <div className="pointer-events-none absolute bottom-24 left-8 opacity-30">
        <PlayerDoodle />
      </div>
      <div className="pointer-events-none absolute bottom-24 right-8 opacity-30 scale-x-[-1]">
        <PlayerDoodle />
      </div>

      {/* Field with rolling football → goalpost */}
      <div className="relative mt-2 w-[min(560px,86vw)]">
        <div className="mb-3 flex items-baseline justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span>Match loading</span>
          <span className="tabular-nums text-foreground/80">{Math.round(progress * 100)}%</span>
        </div>

        <div className="relative h-24">
          {/* Field line */}
          <div className="absolute bottom-3 left-0 right-16 h-px bg-gradient-to-r from-transparent via-emerald/60 to-emerald/80" />

          {/* Goalpost on the right */}
          <div className="absolute bottom-3 right-0 h-16 w-14">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-white/90 rounded-full" />
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-white/90 rounded-full" />
            <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-white/70 rounded-full" />
            {/* Net */}
            <div
              className="absolute top-[3px] bottom-0 left-[3px] right-[3px] opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />
            {goal && (
              <div className="absolute inset-0 animate-goal-pop rounded-md bg-emerald/25" />
            )}
          </div>

          {/* Ball */}
          <div
            className="absolute bottom-2 transition-none"
            style={{
              left: `calc(${progress * 100}% * 0.82)`,
              transform: `rotate(${progress * 1440}deg)`,
            }}
          >
            <svg viewBox="0 0 32 32" className="h-7 w-7 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <circle cx="16" cy="16" r="14" fill="#fff" />
              <path
                d="M16 6 l5 4 -2 6 -6 0 -2 -6 z M16 26 l-4 -3 M16 26 l4 -3 M6 14 l4 3 M26 14 l-4 3"
                fill="none"
                stroke="#0b1220"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <polygon points="16,7 20.5,10.3 18.8,15.5 13.2,15.5 11.5,10.3" fill="#0b1220" />
            </svg>
          </div>
        </div>
      </div>

      {/* GOAL flash */}
      {goal && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-goal-pop text-center">
            <div className="font-display text-6xl font-bold tracking-tight text-gradient">GOAL!</div>
            <div className="mt-2 text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Entering the Ops Center
            </div>
          </div>
        </div>
      )}

      {/* Brand */}
      <div className="mt-10 text-center">
        <div className="font-display text-lg font-semibold">
          Stadium<span className="text-gradient">Sphere</span> AI
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          You bring the passion · We bring the intelligence
        </div>
      </div>
    </div>
  );
}

function PlayerDoodle() {
  return (
    <svg viewBox="0 0 80 100" className="h-24 w-16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <circle cx="40" cy="16" r="8" />
      <path d="M40 24 L40 55" />
      <path d="M40 32 L22 42 M40 32 L58 40" />
      <path d="M40 55 L28 82 M40 55 L52 72 L60 88" />
      <circle cx="63" cy="92" r="4" fill="white" opacity="0.6" />
    </svg>
  );
}
