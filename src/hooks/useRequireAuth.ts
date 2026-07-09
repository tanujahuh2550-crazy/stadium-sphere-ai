import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

/** Redirects to /auth when the visitor is not signed in. */
export function useRequireAuth() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) {
      navigate({ to: "/auth", search: { mode: "signin" } });
    }
  }, [ready, user, navigate]);

  return { user, ready };
}
