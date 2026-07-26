import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Send,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  MapPin,
  Utensils,
  DoorOpen,
  Info,
  Bus,
  Bath,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/i18n";

type QuickAction = {
  icon: React.ComponentType<{ className?: string }>;
  key: TranslationKey;
};

const QUICK_ACTIONS: QuickAction[] = [
  { icon: MapPin, key: "chip.seat" },
  { icon: Bath, key: "chip.washroom" },
  { icon: Utensils, key: "chip.food" },
  { icon: DoorOpen, key: "chip.gate" },
  { icon: Info, key: "chip.match" },
  { icon: Bus, key: "chip.travel" },
];

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  at: number;
}

/** Minimal typings for the browser Web Speech API (not in lib.dom). */
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as
    | (new () => SpeechRecognitionLike)
    | null;
}

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
      </div>
    </div>
  );
}

function AIBadge({ isLight, size = "md" }: { isLight: boolean; size?: "sm" | "md" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center rounded-xl border",
        size === "md" ? "h-9 w-9" : "h-7 w-7",
        isLight
          ? "border-black/10 bg-gradient-to-br from-emerald/20 to-cyan-accent/20"
          : "border-white/10 bg-gradient-to-br from-emerald/25 to-cyan-accent/25",
      )}
    >
      <span className={cn("font-display font-semibold text-emerald", size === "md" ? "text-[13px]" : "text-[10px]")}>
        AI
      </span>
      {size === "md" && (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald shadow-[0_0_8px_oklch(0.78_0.17_158)]" />
      )}
    </div>
  );
}

function formatTime(at: number) {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function AIConcierge() {
  const { t, language, transitionKey } = useTranslation();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dark, setDark] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [speaker, setSpeaker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const isLight = !dark;
  const hasChat = messages.length > 0;
  // Reserved for the future Gemini integration — no fake responses today.
  const awaitingReply = false;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || listening) return;
    setMessages((m) => [
      ...m,
      { id: `${Date.now()}-${m.length}`, role: "user", text, at: Date.now() },
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setVoiceError(t("cc.notSupported"));
      return;
    }
    setVoiceError(null);
    const recognition = new Recognition();
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
      inputRef.current?.focus();
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  useEffect(() => () => recognitionRef.current?.stop(), []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 260);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, awaitingReply]);

  const canSend = input.trim().length > 0 && !listening;

  return (
    <div className="pointer-events-none fixed bottom-6 end-6 z-50 flex flex-col items-end gap-4">
      {open && (
        <div
          role="dialog"
          aria-label={t("cc.title")}
          aria-modal="false"
          className={cn(
            "pointer-events-auto origin-bottom-right overflow-hidden rounded-3xl border shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)] backdrop-blur-2xl",
            "flex w-[min(92vw,400px)] flex-col",
            isLight
              ? "border-black/5 bg-white/85 text-[oklch(0.2_0.04_258)]"
              : "border-white/10 bg-[oklch(0.18_0.04_258)]/85 text-foreground",
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
            <div className="flex min-w-0 items-center gap-3">
              <AIBadge isLight={isLight} />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold leading-tight">
                  {t("cc.title")}
                </p>
                <p
                  className={cn(
                    "truncate text-[11px] leading-tight",
                    isLight ? "text-[oklch(0.4_0.03_258)]" : "text-muted-foreground",
                  )}
                >
                  {t("cc.subtitle")}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {hasChat && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label={t("cc.newConversation")}
                  title={t("cc.newConversation")}
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full border transition focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
                    isLight
                      ? "border-black/10 bg-black/5 hover:bg-black/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10",
                  )}
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSpeaker((s) => !s)}
                aria-pressed={speaker}
                aria-label={speaker ? t("cc.voiceOn") : t("cc.voiceOff")}
                title={speaker ? t("cc.voiceOn") : t("cc.voiceOff")}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border transition focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
                  speaker
                    ? "border-emerald/40 bg-emerald/15 text-emerald"
                    : isLight
                      ? "border-black/10 bg-black/5 hover:bg-black/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10",
                )}
              >
                {speaker ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setDark((d) => !d)}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={isLight}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border transition focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
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
                aria-label={t("cc.close")}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border transition focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
                  isLight
                    ? "border-black/10 bg-black/5 hover:bg-black/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className={cn("border-b px-4 py-2", isLight ? "border-black/5" : "border-white/10")}>
            <LanguageSelector variant="full" light={isLight} className="w-fit" />
          </div>

          <div key={transitionKey} className="animate-lang-fade flex min-h-0 flex-1 flex-col">
            {!hasChat ? (
              <>
                {/* Welcome */}
                <div className="px-4 py-5">
                  <div
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                      isLight ? "border-black/5 bg-black/[0.03]" : "border-white/10 bg-white/5",
                    )}
                  >
                    <p className="font-medium">{t("cc.greetingHi")}</p>
                    <p className="mt-1 font-semibold text-emerald">{t("cc.greetingIntro")}</p>
                    <p
                      className={cn(
                        "mt-1",
                        isLight ? "text-[oklch(0.4_0.03_258)]" : "text-muted-foreground",
                      )}
                    >
                      {t("cc.greetingBody")}
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="px-4 pb-3">
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_ACTIONS.map(({ icon: Icon, key }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleChip(t(key))}
                        className={cn(
                          "group flex items-center gap-2 rounded-full border px-3 py-2 text-start text-xs transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
                          isLight
                            ? "border-black/10 bg-black/[0.03] hover:border-emerald/40 hover:bg-emerald/10"
                            : "border-white/10 bg-white/5 hover:border-emerald/40 hover:bg-emerald/10",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-emerald transition-transform group-hover:scale-110" />
                        <span className="truncate">{t(key)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                className="flex max-h-[46vh] min-h-[180px] flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
              >
                {messages.map((m) =>
                  m.role === "user" ? (
                    <div key={m.id} className="animate-bubble-in flex justify-end">
                      <div className="max-w-[80%]">
                        <div className="rounded-2xl rounded-ee-md bg-emerald px-3.5 py-2 text-sm text-navy-deep shadow-[0_10px_30px_-14px_oklch(0.78_0.17_158/0.9)]">
                          {m.text}
                        </div>
                        <div
                          className={cn(
                            "mt-1 text-end text-[10px]",
                            isLight ? "text-[oklch(0.5_0.03_258)]" : "text-muted-foreground",
                          )}
                        >
                          {t("cc.you")} · {formatTime(m.at)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={m.id} className="animate-bubble-in flex items-end gap-2">
                      <AIBadge isLight={isLight} size="sm" />
                      <div className="max-w-[80%]">
                        <div
                          className={cn(
                            "rounded-2xl rounded-es-md border px-3.5 py-2 text-sm backdrop-blur-xl",
                            isLight
                              ? "border-black/5 bg-black/[0.04]"
                              : "border-white/10 bg-white/5",
                          )}
                        >
                          {m.text}
                        </div>
                        <div
                          className={cn(
                            "mt-1 text-[10px]",
                            isLight ? "text-[oklch(0.5_0.03_258)]" : "text-muted-foreground",
                          )}
                        >
                          {t("cc.ai")} · {formatTime(m.at)}
                        </div>
                      </div>
                    </div>
                  ),
                )}

                {awaitingReply && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <AIBadge isLight={isLight} size="sm" />
                    <span>{t("cc.typing")}</span>
                    <span className="flex gap-1" aria-hidden>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-emerald"
                          style={{ animationDelay: `${i * 140}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Voice state */}
          {(listening || voiceError) && (
            <div
              className={cn(
                "flex items-center gap-2 px-4 pb-1 text-[11px] transition-all",
                listening ? "text-emerald" : "text-destructive",
              )}
              role="status"
            >
              {listening ? (
                <>
                  <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" />
                  {t("cc.listening")}
                </>
              ) : (
                voiceError
              )}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
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
                placeholder={t("cc.placeholder")}
                aria-label={t("cc.placeholder")}
                className={cn(
                  "peer h-9 w-full flex-1 bg-transparent text-sm outline-none",
                  isLight
                    ? "placeholder:text-[oklch(0.5_0.03_258)]"
                    : "placeholder:text-muted-foreground",
                )}
              />
              {input.length === 0 && !listening && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute start-4 h-4 w-[2px] animate-typing-cursor bg-emerald"
                />
              )}
            </div>
            <button
              type="button"
              onClick={toggleListening}
              aria-pressed={listening}
              aria-label={t("cc.mic")}
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
                listening
                  ? "animate-mic-pulse border-destructive/50 bg-destructive/20 text-destructive"
                  : isLight
                    ? "border-black/10 bg-black/5 hover:bg-black/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
              )}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={!canSend}
              aria-label={t("cc.send")}
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald to-cyan-accent text-[oklch(0.16_0.04_258)] shadow-[0_8px_24px_-8px_oklch(0.78_0.17_158/0.6)] transition focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none",
                canSend ? "hover:scale-105 hover:brightness-110" : "cursor-not-allowed opacity-50",
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mascot with hover tooltip */}
      <div className="pointer-events-auto group relative">
        {!open && (
          <div
            role="tooltip"
            className={cn(
              "absolute bottom-full end-0 mb-3 whitespace-nowrap rounded-xl border border-white/10 bg-[oklch(0.18_0.04_258)]/90 px-3 py-2 text-end shadow-[0_10px_30px_-10px_oklch(0_0_0/0.6)] backdrop-blur-md",
              "pointer-events-none opacity-0 translate-y-1 transition-all duration-200",
              "group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0",
            )}
          >
            <p className="text-xs font-medium text-foreground">{t("cc.subtitle")}</p>
            <p className="text-[10px] text-emerald">{t("cc.ai")}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => (open ? handleClose() : setOpen(true))}
          aria-label={t("cc.title")}
          aria-expanded={open}
          className="relative grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-[oklch(0.28_0.05_258)] to-[oklch(0.2_0.04_258)] shadow-[0_20px_50px_-10px_oklch(0_0_0/0.6)] outline-none transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald"
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
    </div>
  );
}
