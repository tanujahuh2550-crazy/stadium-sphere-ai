import { useEffect, useRef, useState } from "react";
import { Mic, Send, X, Sun, Moon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = { id: string; from: "ai" | "user"; text: string };

const HOVER_ACTIONS = [
  { icon: "🧭", label: "Find my Gate" },
  { icon: "🍔", label: "Nearby Food" },
  { icon: "🚻", label: "Nearest Washroom" },
  { icon: "🌍", label: "Translate" },
];

const QUICK_SUGGESTIONS = [
  "🧭 Find Gate C",
  "🍔 Food Nearby",
  "🚻 Washroom",
  "🚍 Transport",
  "♿ Accessibility",
  "🌍 Translate",
];

const LANGUAGES = ["EN", "ES", "FR", "AR", "PT"];

const WELCOME: ChatMessage = {
  id: "welcome",
  from: "ai",
  text: "👋 Welcome to StadiumSphere AI. How can I make your matchday smoother today?",
};

function MascotBall({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      {/* Hat */}
      <div className="absolute left-1/2 -top-3 z-10 -translate-x-1/2">
        <div className="relative h-4 w-8 rounded-t-full bg-gradient-to-b from-[oklch(0.9_0.14_85)] to-[oklch(0.72_0.14_80)] shadow-[0_2px_6px_-1px_oklch(0_0_0/0.5)]">
          <div className="absolute -bottom-1 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[oklch(0.65_0.13_80)]" />
        </div>
      </div>
      {/* Ball */}
      <div className="relative h-14 w-14 rounded-full bg-white shadow-[inset_-6px_-8px_16px_oklch(0_0_0/0.15),0_10px_30px_-8px_oklch(0_0_0/0.5)]">
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-[oklch(0.2_0.04_258)] rotate-12" />
        <div className="absolute left-2 top-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] -rotate-12" />
        <div className="absolute right-2 top-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] rotate-12" />
        <div className="absolute bottom-2 left-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] rotate-45" />
        <div className="absolute bottom-2 right-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] -rotate-45" />
        {/* Face */}
        <div className="absolute left-1/2 top-[38%] flex -translate-x-1/2 gap-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-[oklch(0.2_0.04_258)]" />
          <span className="block h-1.5 w-1.5 rounded-full bg-[oklch(0.2_0.04_258)]" />
        </div>
        <div className="absolute left-1/2 top-[58%] h-1.5 w-3 -translate-x-1/2 rounded-b-full border-b-2 border-[oklch(0.2_0.04_258)]" />
      </div>
    </div>
  );
}

export function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: `${Date.now()}`, from: "user", text }]);
    setInput("");
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-label="StadiumSphere AI concierge"
          className={cn(
            "pointer-events-auto glass-strong flex h-[540px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border animate-fade-up",
            dark ? "" : "bg-white/95 text-[oklch(0.2_0.04_258)]",
          )}
          style={{ animationDuration: "260ms" }}
        >
          {/* Header */}
          <header className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <MascotBall className="scale-[0.55] origin-left" />
              </div>
              <div className="-ml-4">
                <p className="font-display text-sm font-semibold leading-tight">🤖 StadiumSphere AI</p>
                <p className="text-[11px] leading-tight text-muted-foreground">Your AI Matchday Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px]">
                <Globe className="h-3 w-3 text-emerald" aria-hidden />
                <select
                  aria-label="Language"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="cursor-pointer bg-transparent outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l} className="bg-[oklch(0.2_0.04_258)]">
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle theme"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close concierge"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex animate-fade-up",
                  m.from === "user" ? "justify-end" : "justify-start",
                )}
                style={{ animationDuration: "220ms" }}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.from === "user"
                      ? "bg-gradient-to-br from-emerald to-cyan-accent text-[oklch(0.16_0.04_258)]"
                      : dark
                        ? "bg-white/5 border border-white/10"
                        : "bg-[oklch(0.16_0.04_258)]/5 border border-black/5",
                  )}
                >
                  {m.text}
                  {m.id === "welcome" && (
                    <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-emerald align-middle" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {QUICK_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setInput(s.replace(/^\S+\s/, ""))}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs transition hover:border-emerald/40 hover:bg-emerald/10"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your matchday…"
              aria-label="Message"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-emerald/40"
            />
            <button
              type="button"
              aria-label="Voice input"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald to-cyan-accent text-[oklch(0.16_0.04_258)] shadow-[0_8px_24px_-8px_oklch(0.78_0.17_158/0.6)] transition hover:brightness-110"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Hover chips */}
      {!open && (
        <div
          className={cn(
            "pointer-events-none flex flex-col items-end gap-2 transition-all duration-300",
            hover ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {HOVER_ACTIONS.map((a, i) => (
            <div
              key={a.label}
              className="glass pointer-events-auto flex items-center gap-2 rounded-full px-3 py-1.5 text-xs shadow-md"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span aria-hidden>{a.icon}</span>
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Mascot button */}
      {!open && (
        <button
          type="button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          onClick={() => setOpen(true)}
          aria-label="Open StadiumSphere AI concierge"
          className="pointer-events-auto group relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.28_0.05_258)] to-[oklch(0.2_0.04_258)] shadow-[0_20px_50px_-10px_oklch(0_0_0/0.6)] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-emerald/20 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="animate-breathe">
            <MascotBall />
          </span>
        </button>
      )}
    </div>
  );
}
