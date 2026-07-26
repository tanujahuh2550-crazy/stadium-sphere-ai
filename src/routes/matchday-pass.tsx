import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AIConcierge } from "@/components/dashboard/AIConcierge";
import { HeroPass } from "@/components/matchday/HeroPass";
import { EntryStatus } from "@/components/matchday/EntryStatus";
import { SmartNavigation } from "@/components/matchday/SmartNavigation";
import { TravelPlanner } from "@/components/matchday/TravelPlanner";
import { Essentials } from "@/components/matchday/Essentials";
import { LiveAlerts } from "@/components/matchday/LiveAlerts";
import { Readiness } from "@/components/matchday/Readiness";
import { MatchdayPassSkeleton } from "@/components/matchday/Skeleton";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t, transitionKey } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (!ready || !user) return null;

  return (
    <DashboardLayout user={user}>
      <div key={transitionKey} className="mb-8 animate-lang-fade">
        <div className="text-xs uppercase tracking-[0.24em] text-emerald/90">{t("pass.eyebrow")}</div>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          {t("pass.title")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {t("pass.subtitle")}
        </p>
      </div>

      {!loaded ? (
        <MatchdayPassSkeleton />
      ) : (
        <div className="space-y-6 animate-fade-up">
          <HeroPass
            fanName={user.name}
            fanId={`FIFA-${user.name.split(" ").map((s) => s[0]).join("")}-284917`}
          />

          <EntryStatus />

          <SmartNavigation />

          <TravelPlanner />
          <Essentials />

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <LiveAlerts />
            <Readiness percent={100} />
          </div>
        </div>
      )}

      <AIConcierge />
    </DashboardLayout>
  );
}
