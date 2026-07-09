import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ROLE_LABEL, type AuthUser } from "@/services/authService";

interface Props {
  user: AuthUser;
  onToggle: () => void;
  onSignOut: () => void;
}

export function DashboardTopNav({ user, onToggle, onSignOut }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-navy-deep/70 px-4 backdrop-blur-xl md:px-8">
      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60"
      >
        <span aria-hidden>☰</span>
      </button>
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="hidden flex-1 md:block">
        <div className="max-w-md rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-muted-foreground">
          <span aria-hidden className="mr-2 text-emerald">⌕</span>Search stadiums, incidents, guests…
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:inline">
          <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald align-middle" />
          Systems nominal
        </span>
        <div className="hidden text-right md:block">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {ROLE_LABEL[user.role]}
          </div>
        </div>
        <div
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald to-cyan-accent font-display text-sm text-navy-deep"
        >
          {user.name.slice(0, 1).toUpperCase()}
        </div>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
