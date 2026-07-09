export type Role = "fan" | "volunteer" | "staff";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const KEY = "stadiumsphere.auth";

export const ROLE_LABEL: Record<Role, string> = {
  fan: "Fan",
  volunteer: "Volunteer",
  staff: "Stadium Staff",
};

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: AuthUser) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("stadiumsphere:auth"));
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("stadiumsphere:auth"));
}

export function makeUser(email: string, name: string, role: Role): AuthUser {
  return {
    id: crypto.randomUUID(),
    email,
    name: name || email.split("@")[0],
    role,
  };
}
