import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ROLE_LABEL, type AuthUser } from "@/services/authService";

export function WelcomeBanner({ user }: { user: AuthUser }) {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="glass mb-8 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl p-7 md:flex-row md:items-center"
    >
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-emerald/90">
          {ROLE_LABEL[user.role]} · Ops Console
        </div>
        <h1 id="welcome-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          Welcome back, {user.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Your workspace is ready. AI modules for concierge, crowd intelligence, and incident response
          will unlock in Phase 2.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild variant="outline" className="border-white/15 bg-white/[0.02]">
          <Link to="/">Back to site</Link>
        </Button>
        <Button className="bg-gradient-to-r from-emerald to-cyan-accent text-navy-deep hover:opacity-90">
          View schedule
        </Button>
      </div>
    </section>
  );
}
