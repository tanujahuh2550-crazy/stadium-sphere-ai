/**
 * Auth service — sole owner of the auth persistence layer.
 * Swap the implementation here (JWT, OAuth, Lovable Cloud) without
 * touching components or hooks.
 */
export type Role = "fan" | "volunteer" | "staff";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const STORAGE_KEY = "stadiumsphere.auth";
const EVENT = "stadiumsphere:auth";

export const ROLE_LABEL: Record<Role, string> = {
  fan: "Fan",
  volunteer: "Volunteer",
  staff: "Stadium Staff",
};

function isBrowser() {
  return typeof window !== "undefined";
}

export const authService = {
  event: EVENT,

  getUser(): AuthUser | null {
    if (!isBrowser()) return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  },

  setUser(user: AuthUser) {
    if (!isBrowser()) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(EVENT));
  },

  signOut() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT));
  },

  makeUser(email: string, name: string, role: Role): AuthUser {
    return {
      id: crypto.randomUUID(),
      email,
      name: name || email.split("@")[0],
      role,
    };
  },
};
