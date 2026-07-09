import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authService, type AuthUser, type Role } from "@/services/authService";

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, name: string, role: Role) => AuthUser;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setUser(authService.getUser());
    sync();
    setReady(true);
    window.addEventListener(authService.event, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(authService.event, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      signIn(email, name, role) {
        const u = authService.makeUser(email, name, role);
        authService.setUser(u);
        return u;
      },
      signOut() {
        authService.signOut();
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
