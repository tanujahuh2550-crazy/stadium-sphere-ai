import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { Hero } from "@/components/marketing/Hero";
import { RolesSection } from "@/components/marketing/RolesSection";
import { StatsBand } from "@/components/marketing/StatsBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StadiumSphere AI — FIFA World Cup 2026 Ops Center" },
      {
        name: "description",
        content:
          "GenAI-powered stadium operations and fan assistance platform for the FIFA World Cup 2026. Connecting fans, volunteers, and staff.",
      },
      { property: "og:title", content: "StadiumSphere AI — FIFA World Cup 2026 Ops Center" },
      {
        property: "og:description",
        content:
          "You bring the passion. We bring the intelligence. Intelligent matchday operations for the world's biggest tournament.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const SEEN_KEY = "stadiumsphere.loaded";

function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SEEN_KEY)) setLoading(false);
  }, []);

  if (loading) {
    return (
      <LoadingScreen
        onDone={() => {
          window.sessionStorage.setItem(SEEN_KEY, "1");
          setLoading(false);
        }}
      />
    );
  }

  return (
    <MarketingLayout>
      <Hero />
      <RolesSection />
      <StatsBand />
    </MarketingLayout>
  );
}
