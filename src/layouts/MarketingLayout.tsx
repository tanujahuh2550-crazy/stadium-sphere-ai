import type { ReactNode } from "react";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-hero">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
