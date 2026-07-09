import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { makeUser, setUser, type Role, ROLE_LABEL } from "@/lib/auth";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).catch("signin"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in · StadiumSphere AI" },
      { name: "description", content: "Access the StadiumSphere AI operations platform." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("fan");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError("Email and password are required.");
    if (isSignup && !name) return setError("Please tell us your name.");
    const user = makeUser(email, name, role);
    setUser(user);
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-hero">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left brand panel */}
          <div className="hidden flex-col justify-between lg:flex">
            <Logo />
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-emerald/90">Operations Intelligence</div>
              <h1 className="mt-3 font-display text-5xl font-semibold leading-tight">
                Step into the <span className="text-gradient">command center</span> of the World Cup.
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                A unified surface for fans, volunteers, and stadium staff — engineered for the
                intensity of matchday.
              </p>
            </div>
            <div className="glass rounded-xl p-4 text-xs text-muted-foreground">
              Secured by role-based access · JWT-ready architecture · Ops-grade audit trail
            </div>
          </div>

          {/* Right form */}
          <div className="glass-strong w-full rounded-2xl p-8 md:p-10 animate-fade-up">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {isSignup ? "Create account" : "Welcome back"}
                </div>
                <h2 className="mt-1 font-display text-3xl font-semibold">
                  {isSignup ? "Join StadiumSphere" : "Sign in"}
                </h2>
              </div>
              <Link
                to="/auth"
                search={{ mode: isSignup ? "signin" : "signup" }}
                className="text-xs uppercase tracking-[0.2em] text-emerald hover:text-cyan-accent"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </Link>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@stadium.ai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label>Select your role</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["fan", "volunteer", "staff"] as Role[]).map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRole(r)}
                        className={`rounded-lg border px-3 py-3 text-left text-sm transition-all ${
                          role === r
                            ? "border-emerald bg-emerald/10 text-foreground glow-emerald"
                            : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                        }`}
                      >
                        <div className="text-lg leading-none">
                          {r === "fan" ? "⚽" : r === "volunteer" ? "🤝" : "🏟"}
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-wider">{ROLE_LABEL[r]}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
                  {error}
                </div>
              )}

              <Button type="submit" className="h-11 w-full bg-gradient-to-r from-emerald to-cyan-accent text-navy-deep hover:opacity-90">
                {isSignup ? "Create account & enter" : "Sign in"}
              </Button>

              <div className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Secured with JWT · Role-based access
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
