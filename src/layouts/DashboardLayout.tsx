import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav";
import { useAuth } from "@/hooks/useAuth";
import type { AuthUser } from "@/services/authService";

interface Props {
  user: AuthUser;
  children: ReactNode;
}

export function DashboardLayout({ user, children }: Props) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-hero">
      <DashboardSidebar collapsed={collapsed} role={user.role} />
      <div className="flex flex-1 flex-col">
        <DashboardTopNav
          user={user}
          onToggle={() => setCollapsed((c) => !c)}
          onSignOut={() => {
            signOut();
            navigate({ to: "/" });
          }}
        />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
