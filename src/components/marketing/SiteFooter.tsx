import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
        <Logo />
        <div className="text-xs text-muted-foreground">
          © 2026 StadiumSphere AI · An independent operations intelligence concept · Not affiliated with FIFA.
        </div>
        <div className="flex gap-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
