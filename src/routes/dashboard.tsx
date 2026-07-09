import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { ModulesGrid } from "@/components/dashboard/ModulesGrid";
import { OperationsSummary } from "@/components/dashboard/OperationsSummary";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard · StadiumSphere AI" },
      { name: "description", content: "Role-based operations dashboard for StadiumSphere AI." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, ready } = useRequireAuth();
  if (!ready || !user) return null;

  return (
    <DashboardLayout user={user}>
      <WelcomeBanner user={user} />
      <ModulesGrid />
      <OperationsSummary />
    </DashboardLayout>
  );
}
