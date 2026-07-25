import { useEffect, useMemo, useState } from "react";

/** Deterministic pseudo-random QR-like grid — pure visual, no scanning. */
function useQrGrid(seed: string, size = 25) {
  return useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const cells: boolean[] = [];
    for (let i = 0; i < size * size; i++) {
      h ^= h << 13;
      h ^= h >>> 17;
      h ^= h << 5;
      cells.push((h & 1) === 1);
    }
    // Finder patterns (top-left, top-right, bottom-left)
    const setBlock = (r: number, c: number) => {
      for (let dr = 0; dr < 7; dr++) {
        for (let dc = 0; dc < 7; dc++) {
          const on =
            dr === 0 || dr === 6 || dc === 0 || dc === 6 ||
            (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
          cells[(r + dr) * size + (c + dc)] = on;
        }
      }
      // clear ring
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          if (dr === -1 || dr === 7 || dc === -1 || dc === 7) {
            const rr = r + dr;
            const cc = c + dc;
            if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
              cells[rr * size + cc] = false;
            }
          }
        }
      }
    };
    setBlock(0, 0);
    setBlock(0, size - 7);
    setBlock(size - 7, 0);
    return cells;
  }, [seed, size]);
}

interface Props {
  fanId: string;
  matchId: string;
}

export function QrTicket({ fanId, matchId }: Props) {
  const [tick, setTick] = useState(0);
  const [countdown, setCountdown] = useState(12);

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setTick((t) => t + 1);
          return 12;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const size = 25;
  const seed = `${fanId}-${matchId}-${tick}`;
  const grid = useQrGrid(seed, size);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald/30 via-cyan-accent/20 to-transparent blur-2xl"
        />
        <div className="relative rounded-2xl bg-white p-4 shadow-[0_20px_60px_-20px_oklch(0.78_0.17_158/0.5)]">
          <svg
            key={tick}
            viewBox={`0 0 ${size} ${size}`}
            width={196}
            height={196}
            className="block animate-fade-up"
            shapeRendering="crispEdges"
            aria-label="Dynamic entry QR code"
            role="img"
          >
            <rect width={size} height={size} fill="#ffffff" />
            {grid.map((on, i) =>
              on ? (
                <rect
                  key={i}
                  x={i % size}
                  y={Math.floor(i / size)}
                  width={1}
                  height={1}
                  fill="#0b1226"
                />
              ) : null,
            )}
          </svg>
        </div>
      </div>
      <div className="mt-4 w-full max-w-[220px]">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" />
            Refreshing QR
          </span>
          <span className="font-display text-sm text-foreground tabular-nums">
            {countdown}s
          </span>
        </div>
        <div
          className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={countdown}
          aria-valuemin={0}
          aria-valuemax={12}
          aria-label="QR refresh countdown"
        >
          <div
            key={tick}
            className="h-full origin-left rounded-full bg-gradient-to-r from-emerald to-cyan-accent shadow-[0_0_10px_oklch(0.78_0.17_158/0.6)]"
            style={{
              animation: "qr-refresh 12s linear forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}
