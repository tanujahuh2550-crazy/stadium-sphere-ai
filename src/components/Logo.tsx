import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-cyan-accent glow-emerald">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-deep" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" opacity="0.7" />
        </svg>
      </span>
      <div className="leading-tight">
        <div className="font-display text-[15px] font-semibold tracking-tight">
          Stadium<span className="text-gradient">Sphere</span> AI
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">FIFA 2026 · Ops Center</div>
      </div>
    </Link>
  );
}
