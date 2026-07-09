import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#roles", label: "Who it's for" },
  { href: "#modules", label: "Modules" },
  { href: "#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-navy-deep/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth" search={{ mode: "signin" }}>Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-emerald to-cyan-accent text-navy-deep hover:opacity-90"
          >
            <Link to="/auth" search={{ mode: "signup" }}>Enter Platform</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
