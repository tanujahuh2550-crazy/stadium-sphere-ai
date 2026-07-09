import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { LoadingScreen } from "@/components/LoadingScreen";

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
    <div className="min-h-screen bg-hero">
      <Header />
      <Hero />
      <RolesSection />
      <StatsBand />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-navy-deep/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#roles" className="hover:text-foreground transition-colors">Who it's for</a>
          <a href="#modules" className="hover:text-foreground transition-colors">Modules</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth" search={{ mode: "signin" }}>Sign in</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-emerald to-cyan-accent text-navy-deep hover:opacity-90">
            <Link to="/auth" search={{ mode: "signup" }}>Enter Platform</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            FIFA World Cup 2026 · Operations Intelligence
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            The command center for <span className="text-gradient">every matchday.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            StadiumSphere AI unifies fans, volunteers, and stadium staff into a single intelligent
            ecosystem — anticipating crowd flow, streamlining response, and elevating the fan
            experience from gate to final whistle.
          </p>
          <div className="mt-3 font-display text-sm uppercase tracking-[0.28em] text-emerald/90">
            You bring the passion · We bring the intelligence
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 bg-gradient-to-r from-emerald to-cyan-accent px-7 text-navy-deep hover:opacity-90 glow-emerald">
              <Link to="/auth" search={{ mode: "signup" }}>Enter StadiumSphere AI →</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/15 bg-white/[0.02] px-6 hover:bg-white/[0.06]">
              <a href="#roles">Explore roles</a>
            </Button>
          </div>
        </div>

        {/* Decorative preview card */}
        <div className="pointer-events-none absolute -right-24 top-24 hidden w-[520px] rotate-3 lg:block">
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Live · Stadium 4 · Group Stage</span>
              <span className="text-emerald">● Nominal</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Attendance", v: "82,431" },
                { l: "Gates open", v: "24 / 24" },
                { l: "Incidents", v: "0 critical" },
                { l: "Wait time", v: "3m 12s" },
                { l: "Sentiment", v: "+94%" },
                { l: "AI queries", v: "1,204/min" },
              ].map((k) => (
                <div key={k.l} className="rounded-lg bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                  <div className="mt-1 font-display text-lg">{k.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-24 rounded-lg bg-gradient-to-r from-emerald/25 via-cyan-accent/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  const roles = [
    {
      icon: "⚽",
      title: "Fan",
      body: "Personalized matchday guidance — from entry gate to seat, restrooms, food, and safe exit routes — with an AI concierge that speaks your language.",
      accent: "from-emerald/30 to-transparent",
    },
    {
      icon: "🤝",
      title: "Volunteer",
      body: "Live task assignments, crowd hotspots, and multilingual assistance tools that turn goodwill into measurable impact across the venue.",
      accent: "from-cyan-accent/30 to-transparent",
    },
    {
      icon: "🏟",
      title: "Stadium Staff",
      body: "A unified operations lens — crowd intelligence, incident triage, transport coordination, and sustainability metrics — in one command surface.",
      accent: "from-gold/30 to-transparent",
    },
  ];
  return (
    <section id="roles" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.24em] text-emerald/90">One platform · Three roles</div>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Built for everyone inside the stadium.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {roles.map((r, i) => (
          <div
            key={r.title}
            className="glass group relative overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br ${r.accent} opacity-60`} />
            <div className="relative">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
                {r.icon}
              </div>
              <div className="font-display text-2xl font-semibold">{r.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <div className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.2em] text-emerald group-hover:text-cyan-accent transition-colors">
                Learn more →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { k: "48", l: "Matches" },
    { k: "16", l: "Host Cities" },
    { k: "3.5M+", l: "Expected Fans" },
    { k: "24/7", l: "AI Operations" },
  ];
  return (
    <section id="about" className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <div className="font-display text-4xl font-semibold text-gradient">{s.k}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
        <Logo />
        <div className="text-xs text-muted-foreground">
          © 2026 StadiumSphere AI · An independent operations intelligence concept · Not affiliated with FIFA.
        </div>
        <div className="flex gap-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
