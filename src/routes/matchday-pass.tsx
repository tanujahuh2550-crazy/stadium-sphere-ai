import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AIConcierge } from "@/components/dashboard/AIConcierge";
import { HeroPass } from "@/components/matchday/HeroPass";
import { EntryStatus } from "@/components/matchday/EntryStatus";
import { GateRecommendation } from "@/components/matchday/GateRecommendation";
import { TravelPlanner } from "@/components/matchday/TravelPlanner";
import { Essentials } from "@/components/matchday/Essentials";
import { LiveAlerts } from "@/components/matchday/LiveAlerts";
import { Readiness } from "@/components/matchday/Readiness";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export const Route = createFileRoute("/matchday-pass")({
  head: () => ({
    meta: [
      { title: "Matchday Pass · StadiumSphere AI" },
      { name: "description", content: "Your FIFA World Cup 2026 digital matchday pass — entry, gates, travel, and live alerts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MatchdayPassPage,
});

function MatchdayPassPage() {
  const { user, ready } = useRequireAuth();
  if (!ready || !user) return null;

  return (
    <DashboardLayout user={user}>
      <div className="mb-8 animate-fade-up">
        <div className="text-xs uppercase tracking-[0.24em] text-emerald/90">Matchday Pass</div>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          Your entry to the World Cup, in one place.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Secure dynamic ticket, AI gate routing, travel timing, and live alerts — updated in real time as you move.
        </p>
      </div>

      <div className="space-y-6">
        <HeroPass fanName={user.name} fanId={`FIFA-${user.name.split(" ").map((s) => s[0]).join("")}-284917`} />

        <div className="grid gap-6 lg:grid-cols-2">
          <EntryStatus />
          <GateRecommendation />
        </div>

        <TravelPlanner />
        <Essentials />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <LiveAlerts />
          <Readiness percent={90} />
        </div>
      </div>

      <AIConcierge />
    </DashboardLayout>
  );
}
