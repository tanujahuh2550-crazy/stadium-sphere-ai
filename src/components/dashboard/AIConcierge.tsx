import { useEffect, useRef, useState } from "react";
import { Mic, Send, X, Sun, Moon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_SUGGESTIONS = [
  { icon: "🧭", label: "Find my Gate" },
  { icon: "🍔", label: "Nearby Food" },
  { icon: "🚻", label: "Nearest Washroom" },
  { icon: "🚍", label: "Transport" },
  { icon: "♿", label: "Accessibility" },
  { icon: "🌍", label: "Translate" },
];

const LANGUAGES = ["EN", "ES", "FR", "AR", "PT"];

function MascotBall({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <div className="absolute left-1/2 -top-3 z-10 -translate-x-1/2">
        <div className="relative h-4 w-8 rounded-t-full bg-gradient-to-b from-[oklch(0.9_0.14_85)] to-[oklch(0.72_0.14_80)] shadow-[0_2px_6px_-1px_oklch(0_0_0/0.5)]">
          <div className="absolute -bottom-1 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[oklch(0.65_0.13_80)]" />
        </div>
      </div>
      <div className="relative h-14 w-14 rounded-full bg-white shadow-[inset_-6px_-8px_16px_oklch(0_0_0/0.15),0_10px_30px_-8px_oklch(0_0_0/0.5)]">
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-[oklch(0.2_0.04_258)] rotate-12" />
        <div className="absolute left-2 top-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] -rotate-12" />
        <div className="absolute right-2 top-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] rotate-12" />
        <div className="absolute bottom-2 left-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] rotate-45" />
        <div className="absolute bottom-2 right-3 h-2 w-2 rounded-sm bg-[oklch(0.2_0.04_258)] -rotate-45" />
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
  const [closing, setClosing] = useState(false);
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 200);
  };

  const handleChip = (label: string) => {
    setInput(label);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isLight = !dark;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {open && (
        <div
          role="dialog"
          aria-label="StadiumSphere AI concierge"
          aria-modal="false"
          className={cn(
            "pointer-events-auto origin-bottom-right overflow-hidden rounded-3xl border shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)] backdrop-blur-2xl",
            "flex w-[min(92vw,400px)] flex-col",
            isLight
              ? "border-black/5 bg-white/85 text-[oklch(0.2_0.04_258)]"
              : "border-white/10 bg-[oklch(0.18_0.04_258)]/80 text-foreground",
            closing ? "animate-concierge-out" : "animate-concierge-in",
          )}
        >
          {/* Header */}
          <header
            className={cn(
              "flex items-center justify-between gap-2 border-b px-4 py-3",
              isLight ? "border-black/5" : "border-white/10",
            )}
          >
            <div className="flex items-center gap-3">
              <MascotBall className="scale-[0.5] origin-left" />
              <div className="-ml-3">
                <p className="font-display text-sm font-semibold leading-tight">
                  🤖 StadiumSphere AI
                </p>
                <p
                  className={cn(
                    "text-[11px] leading-tight",
                    isLight ? "text-[oklch(0.4_0.03_258)]" : "text-muted-foreground",
                  )}
                >
                  Your AI Matchday Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full border px-2 py-1 text-[11px]",
                  isLight ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5",
                )}
              >
                <Globe className="h-3 w-3 text-emerald" aria-hidden />
                <select
                  aria-label="Language"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="cursor-pointer bg-transparent outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l} className="bg-[oklch(0.2_0.04_258)] text-white">
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle theme"
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border transition",
                  isLight
                    ? "border-black/10 bg-black/5 hover:bg-black/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                )}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close concierge"
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border transition",
                  isLight
                    ? "border-black/10 bg-black/5 hover:bg-black/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* Greeting */}
          <div className="px-4 py-5">
            <div
              className={cn(
                "rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                isLight
                  ? "border-black/5 bg-black/[0.03]"
                  : "border-white/10 bg-white/5",
              )}
            >
              <p className="font-medium">👋 Welcome to StadiumSphere AI.</p>
              <p
                className={cn(
                  "mt-0.5",
                  isLight ? "text-[oklch(0.4_0.03_258)]" : "text-muted-foreground",
                )}
              >
                How can I make your matchday smoother today?
              </p>
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => handleChip(s.label)}
                  className={cn(
                    "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 hover:-translate-y-0.5",
                    isLight
                      ? "border-black/10 bg-black/[0.03] hover:border-emerald/40 hover:bg-emerald/10"
                      : "border-white/10 bg-white/5 hover:border-emerald/40 hover:bg-emerald/10",
                  )}
                >
                  <span aria-hidden className="transition-transform group-hover:scale-110">
                    {s.icon}
                  </span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInput("");
            }}
            className={cn(
              "flex items-center gap-2 border-t px-3 py-3",
              isLight ? "border-black/5" : "border-white/10",
            )}
          >
            <div
              className={cn(
                "relative flex flex-1 items-center rounded-full border px-4",
                isLight ? "border-black/10 bg-black/[0.03]" : "border-white/10 bg-white/5",
              )}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your matchday..."
                aria-label="Message"
                className={cn(
                  "peer h-9 flex-1 bg-transparent text-sm outline-none",
                  isLight
                    ? "placeholder:text-[oklch(0.5_0.03_258)]"
                    : "placeholder:text-muted-foreground",
                )}
              />
              {input.length === 0 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-4 h-4 w-[2px] animate-typing-cursor bg-emerald peer-focus:opacity-100"
                  style={{ opacity: 0 }}
                />
              )}
            </div>
            <button
              type="button"
              aria-label="Voice input"
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full border transition hover:scale-105",
                isLight
                  ? "border-black/10 bg-black/5 hover:bg-black/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10",
              )}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald to-cyan-accent text-[oklch(0.16_0.04_258)] shadow-[0_8px_24px_-8px_oklch(0.78_0.17_158/0.6)] transition hover:scale-105 hover:brightness-110"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mascot button */}
      <button
        type="button"
        onClick={() => (open ? handleClose() : setOpen(true))}
        aria-label={open ? "Close StadiumSphere AI concierge" : "Open StadiumSphere AI concierge"}
        aria-expanded={open}
        className="pointer-events-auto group relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.28_0.05_258)] to-[oklch(0.2_0.04_258)] shadow-[0_20px_50px_-10px_oklch(0_0_0/0.6)] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-emerald/20 opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="animate-breathe">
          <MascotBall />
        </span>
      </button>
    </div>
  );
}
