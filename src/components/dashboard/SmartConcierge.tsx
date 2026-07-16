import { useEffect, useRef, useState, useCallback } from "react";
import { Send, X, ChevronDown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
}

interface QuickTip {
  icon: string;
  label: string;
  query: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_TIPS: QuickTip[] = [
  { icon: "🚪", label: "Gates",         query: "Where is my gate?"                       },
  { icon: "🚌", label: "Transport",     query: "How do I get here by public transport?"  },
  { icon: "🍔", label: "Food Courts",   query: "Where are the food courts?"              },
  { icon: "🏟️", label: "Facilities",   query: "What facilities are available?"          },
  { icon: "🚨", label: "Emergency",     query: "Where are the emergency exits?"          },
  { icon: "♿", label: "Accessibility", query: "What accessibility support is available?" },
  { icon: "📅", label: "Matchday Info", query: "What time does the match start?"         },
];

// ─── Mock AI response engine ──────────────────────────────────────────────────

function getMockResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("gate") || q.includes("entry") || q.includes("entrance")) {
    return "🚪 **Gate Information**\n\nYour ticket QR code shows your designated gate. Main entry points:\n\n• **Gate A–D** — North Stand (Blocks 1–20)\n• **Gate E–H** — East Stand (Blocks 21–40)\n• **Gate J–M** — South Stand (Blocks 41–60)\n• **Gate N–P** — West Stand / VIP / Corporate\n\nGates open **90 minutes** before kick-off. Scan your digital pass at any reader for fast-lane entry. 🏟️";
  }

  if (
    q.includes("transport") ||
    q.includes("bus") ||
    q.includes("train") ||
    q.includes("metro") ||
    q.includes("parking") ||
    q.includes("get here")
  ) {
    return "🚌 **Transport Options**\n\n**By Rail:** Direct service to *Stadium Central* station — 5-minute walk to the ground.\n\n**By Bus:** Routes 14, 27, and 88 stop at *Stadium Way*. Extra services run on matchdays.\n\n**By Car:** Car parks P1–P5 open 3 hours before kick-off. Pre-book at stadiumsphere.ai/parking.\n\n**Rideshare:** Designated drop-off at *North Gate Plaza*.\n\n💡 We recommend arriving at least 60 minutes early on matchday.";
  }

  if (
    q.includes("food") ||
    q.includes("eat") ||
    q.includes("drink") ||
    q.includes("cafe") ||
    q.includes("restaurant") ||
    q.includes("snack") ||
    q.includes("court")
  ) {
    return "🍔 **Food & Beverage Courts**\n\nFood courts are located on every concourse level:\n\n• **Level 1** — Fast food, hot dogs, nachos, soft drinks\n• **Level 2** — Asian fusion, wraps, premium coffee\n• **Level 3 (Premium)** — Restaurant-style dining, cocktail bar\n• **VIP Lounge** — À la carte menu & champagne service\n\n🍺 Bar service runs until 10 minutes after final whistle. Contactless payment accepted everywhere. Allergen menus available at all stands.";
  }

  if (
    q.includes("facilit") ||
    q.includes("toilet") ||
    q.includes("washroom") ||
    q.includes("restroom") ||
    q.includes("atm") ||
    q.includes("locker") ||
    q.includes("wifi") ||
    q.includes("baby") ||
    q.includes("medical")
  ) {
    return "🏟️ **Stadium Facilities**\n\n• **Restrooms** — Located every 50 m on all concourses (blue signage)\n• **Baby Changing** — Dedicated rooms at Gates B, F, and N\n• **Medical Centre** — First aid at all four corners; paramedics on standby\n• **ATMs** — Available at Gate A lobby and South Plaza\n• **Free Wi-Fi** — Network: *StadiumSphere_Guest*, no password\n• **Luggage Storage** — Gate A ground level, £3/item\n• **Lost Property** — Security office, Gate C\n\nNeed something specific? Just ask me! 😊";
  }

  if (
    q.includes("emergency") ||
    q.includes("exit") ||
    q.includes("evacuation") ||
    q.includes("fire") ||
    q.includes("safety") ||
    q.includes("escape")
  ) {
    return "🚨 **Emergency Exits & Safety**\n\nAll emergency exits are clearly marked with **green illuminated signs**.\n\n• Follow green exit signs — never use lifts during an emergency\n• Nearest exits from your seat: check the back of your ticket\n• Assembly points are **outside** each main gate (A, E, J, N)\n• Stewards in **yellow jackets** will direct you\n\n📞 **Emergency:** Call **999** or alert any steward immediately.\n📞 **Stadium Security Hotline:** 0800 123 4567\n\nYour safety is our top priority. Please familiarise yourself with your nearest exit on arrival.";
  }

  if (
    q.includes("accessibil") ||
    q.includes("wheelchair") ||
    q.includes("disabled") ||
    q.includes("hearing") ||
    q.includes("visually") ||
    q.includes("deaf") ||
    q.includes("blind")
  ) {
    return "♿ **Accessibility Services**\n\n• **Wheelchair spaces** — Available in all stands; book in advance via our app\n• **Accessible entrances** — Gates B, F, J, and N have level access & lifts\n• **Hearing loops** — Installed throughout hospitality areas & concourse\n• **Audio description** — Available via StadiumSphere app (headphones required)\n• **Dedicated stewards** — Available at all accessible gates\n• **Accessible restrooms** — Signed throughout; radar key locks available from stewards\n• **Guide dogs** — Welcome; water bowls available at Gate B\n\n📞 Pre-event support: access@stadiumsphere.ai | 0800 ACCESS1";
  }

  if (
    q.includes("match") ||
    q.includes("kick") ||
    q.includes("time") ||
    q.includes("schedule") ||
    q.includes("fixture") ||
    q.includes("lineup") ||
    q.includes("team") ||
    q.includes("today")
  ) {
    return "📅 **Matchday Information**\n\n**Today's Fixture:**\n🏆 Premier League — Gameweek 32\n\n⚽ **Home FC** vs **Away United**\n🕖 Kick-off: **19:30 BST**\n📍 StadiumSphere Arena, Block 14\n\n**Schedule:**\n• Gates open: **18:00**\n• Pre-match entertainment: **18:45**\n• Kick-off: **19:30**\n• Half-time: ~**20:15** (15 min interval)\n• Full-time: ~**21:30**\n\n📱 Download the StadiumSphere app for live stats, instant replays, and exclusive behind-the-scenes content!";
  }

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("good")) {
    return "👋 **Hello! Welcome to StadiumSphere AI.**\n\nI'm your intelligent matchday concierge. I can help you with:\n\n🚪 Gate directions & entry\n🚌 Transport & parking\n🍔 Food courts & dining\n🏟️ Stadium facilities\n🚨 Emergency exits & safety\n♿ Accessibility services\n📅 Matchday schedule & info\n\nWhat can I help you with today?";
  }

  if (q.includes("thank") || q.includes("great") || q.includes("awesome") || q.includes("perfect")) {
    return "🙌 You're very welcome! Enjoy the match today — it's going to be a great one! If you need anything else, I'm right here. ⚽✨";
  }

  return "🤖 I'm not sure I caught that — here's what I can help with:\n\n🚪 **Gates** — Entry points & directions\n🚌 **Transport** — Travel options & parking\n🍔 **Food** — Court locations & menus\n🏟️ **Facilities** — Amenities & services\n🚨 **Emergency** — Exits & safety info\n♿ **Accessibility** — Support services\n📅 **Matchday** — Schedule & fixtures\n\nTry one of the quick-access buttons below or type your question!";
}

// ─── Football Mascot SVG ──────────────────────────────────────────────────────

function FootballMascot({ size = 52 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <circle cx="26" cy="28" r="20" fill="white" />
      <ellipse cx="26" cy="49" rx="14" ry="3" fill="oklch(0 0 0 / 0.18)" />
      <polygon points="26,12 30,18 24,20 20,15 22,10" fill="oklch(0.15 0.04 258)" />
      <polygon points="38,20 42,26 37,30 33,26 35,20" fill="oklch(0.15 0.04 258)" />
      <polygon points="14,20 18,26 13,30 9,26 11,20" fill="oklch(0.15 0.04 258)" />
      <polygon points="32,36 35,42 28,43 23,40 25,34" fill="oklch(0.15 0.04 258)" />
      <polygon points="20,36 22,42 16,42 13,37 16,32" fill="oklch(0.15 0.04 258)" />
      <ellipse cx="20" cy="18" rx="5" ry="3.5" fill="white" opacity="0.45" transform="rotate(-20 20 18)" />
      <circle cx="21" cy="27" r="2.2" fill="oklch(0.15 0.04 258)" />
      <circle cx="31" cy="27" r="2.2" fill="oklch(0.15 0.04 258)" />
      <circle cx="22" cy="26" r="0.8" fill="white" />
      <circle cx="32" cy="26" r="0.8" fill="white" />
      <path d="M20 33 Q26 37 32 33" stroke="oklch(0.15 0.04 258)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M46 22 Q50 16 47 10" stroke="oklch(0.78 0.17 158)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="47" cy="10" r="2.5" fill="oklch(0.78 0.17 158)" />
    </svg>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "linear-gradient(135deg, oklch(0.28 0.05 258), oklch(0.22 0.045 258))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: "1px solid oklch(1 0 0 / 0.1)",
        }}
      >
        <FootballMascot size={20} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "oklch(1 0 0 / 0.06)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          borderRadius: "18px 18px 18px 4px",
          padding: "10px 16px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "oklch(0.78 0.17 158)",
              animation: "sc-dot-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Chat message bubble ──────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split("\n").map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 8,
        animation: "sc-msg-in 0.28s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg, oklch(0.28 0.05 258), oklch(0.22 0.045 258))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1px solid oklch(1 0 0 / 0.1)",
          }}
        >
          <FootballMascot size={20} />
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          fontSize: 13.5,
          lineHeight: 1.6,
          background: isUser
            ? "linear-gradient(135deg, oklch(0.78 0.17 158), oklch(0.82 0.13 210))"
            : "oklch(1 0 0 / 0.06)",
          color: isUser ? "oklch(0.14 0.04 258)" : "oklch(0.97 0.005 250)",
          border: isUser ? "none" : "1px solid oklch(1 0 0 / 0.1)",
          boxShadow: isUser
            ? "0 4px 20px -6px oklch(0.78 0.17 158 / 0.5)"
            : "0 2px 12px -4px oklch(0 0 0 / 0.3)",
        }}
      >
        {renderText(msg.text)}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SmartConcierge() {
  const [open, setOpen]         = useState(false);
  const [closing, setClosing]   = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [pulse, setPulse]       = useState(false);

  const inputRef     = useRef<HTMLInputElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const closingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 6000);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = useCallback(() => {
    setClosing(true);
    closingTimer.current = setTimeout(() => { setOpen(false); setClosing(false); }, 220);
  }, []);

  const handleOpen = useCallback(() => {
    if (closingTimer.current) clearTimeout(closingTimer.current);
    setOpen(true);
    setClosing(false);
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;
      const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: trimmed, ts: Date.now() };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setTyping(true);
      const delay = 700 + Math.random() * 700;
      setTimeout(() => {
        const botMsg: Message = { id: crypto.randomUUID(), role: "assistant", text: getMockResponse(trimmed), ts: Date.now() };
        setMessages((m) => [...m, botMsg]);
        setTyping(false);
      }, delay);
    },
    [typing],
  );

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };
  const handleChip   = (query: string) => sendMessage(query);
  const handleClear  = () => setMessages([]);

  const answerCount = messages.filter((m) => m.role === "assistant").length;

  return (
    <>
      <style>{`
        @keyframes sc-msg-in {
          from { opacity:0; transform:translateY(10px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes sc-dot-bounce {
          0%,80%,100% { transform:translateY(0); opacity:0.4; }
          40% { transform:translateY(-6px); opacity:1; }
        }
        @keyframes sc-drawer-in {
          from { opacity:0; transform:scale(0.88) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes sc-drawer-out {
          from { opacity:1; transform:scale(1) translateY(0); }
          to   { opacity:0; transform:scale(0.92) translateY(10px); }
        }
        @keyframes sc-fab-pulse {
          0%  { box-shadow:0 0 0 0    oklch(0.78 0.17 158 / 0.7); }
          70% { box-shadow:0 0 0 18px oklch(0.78 0.17 158 / 0); }
          100%{ box-shadow:0 0 0 0    oklch(0.78 0.17 158 / 0); }
        }
        @keyframes sc-badge-pop {
          0%  { transform:scale(0.5); opacity:0; }
          60% { transform:scale(1.2); opacity:1; }
          100%{ transform:scale(1);   opacity:1; }
        }
        .sc-chip:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: oklch(0.78 0.17 158 / 0.4) !important;
          background: oklch(0.78 0.17 158 / 0.08) !important;
          box-shadow: 0 4px 16px -4px oklch(0.78 0.17 158 / 0.3);
        }
        .sc-fab-pulse { animation: sc-fab-pulse 1s ease-out both; }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
          pointerEvents: "none",
        }}
      >
        {/* ══ Chat Drawer ══ */}
        {open && (
          <div
            role="dialog"
            aria-label="StadiumSphere Smart Concierge"
            aria-modal="false"
            style={{
              pointerEvents: "auto",
              width: "min(92vw, 400px)",
              maxHeight: "min(80vh, 620px)",
              display: "flex",
              flexDirection: "column",
              borderRadius: 24,
              overflow: "hidden",
              background: "color-mix(in oklab, oklch(0.18 0.04 258) 72%, transparent)",
              backdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid oklch(1 0 0 / 0.12)",
              boxShadow: "0 32px 80px -20px oklch(0 0 0 / 0.75), 0 0 0 1px oklch(0.78 0.17 158 / 0.08) inset",
              animation: closing
                ? "sc-drawer-out 220ms ease-in both"
                : "sc-drawer-in 300ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            {/* — Header — */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderBottom: "1px solid oklch(1 0 0 / 0.08)",
                background: "oklch(1 0 0 / 0.03)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, oklch(0.26 0.05 258), oklch(0.2 0.04 258))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid oklch(0.78 0.17 158 / 0.4)",
                    boxShadow: "0 0 20px -4px oklch(0.78 0.17 158 / 0.35)",
                    flexShrink: 0,
                  }}
                >
                  <FootballMascot size={30} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "oklch(0.98 0.005 250)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Sparkles size={13} style={{ color: "oklch(0.78 0.17 158)" }} />
                    Smart Concierge
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "oklch(0.72 0.03 250)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 1,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "oklch(0.78 0.17 158)",
                        boxShadow: "0 0 6px oklch(0.78 0.17 158 / 0.8)",
                        display: "inline-block",
                      }}
                    />
                    Online · AI Matchday Assistant
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear chat history"
                    style={{
                      background: "oklch(1 0 0 / 0.06)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 8,
                      padding: "4px 9px",
                      fontSize: 10,
                      color: "oklch(0.72 0.03 250)",
                      cursor: "pointer",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 0.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 0.06)"; }}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close Smart Concierge"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "oklch(1 0 0 / 0.06)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "oklch(0.72 0.03 250)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 0.06)"; }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* — Quick-access chips — */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid oklch(1 0 0 / 0.07)",
                flexShrink: 0,
                background: "oklch(1 0 0 / 0.02)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "oklch(0.72 0.03 250)",
                  marginBottom: 7,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Zap size={9} style={{ color: "oklch(0.85 0.13 85)" }} />
                Quick access
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {QUICK_TIPS.map((tip) => (
                  <button
                    key={tip.label}
                    type="button"
                    onClick={() => handleChip(tip.query)}
                    disabled={typing}
                    aria-label={`Ask about ${tip.label}`}
                    className="sc-chip"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 10px",
                      borderRadius: 20,
                      fontSize: 11.5,
                      background: "oklch(1 0 0 / 0.05)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      color: "oklch(0.92 0.01 250)",
                      cursor: typing ? "not-allowed" : "pointer",
                      opacity: typing ? 0.5 : 1,
                      transition: "all 0.18s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ fontSize: 13 }}>{tip.icon}</span>
                    {tip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* — Messages — */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                scrollBehavior: "smooth",
              }}
            >
              {messages.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "24px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, oklch(0.28 0.05 258), oklch(0.22 0.045 258))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1.5px solid oklch(0.78 0.17 158 / 0.35)",
                      boxShadow: "0 0 30px -8px oklch(0.78 0.17 158 / 0.4)",
                    }}
                  >
                    <FootballMascot size={44} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
                        fontWeight: 600,
                        fontSize: 15,
                        color: "oklch(0.97 0.005 250)",
                        marginBottom: 6,
                      }}
                    >
                      👋 Hey there!
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "oklch(0.72 0.03 250)",
                        lineHeight: 1.6,
                        maxWidth: 260,
                        margin: "0 auto",
                      }}
                    >
                      I'm your AI matchday concierge. Ask me anything about gates, transport, food, facilities, or safety!
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}

              {typing && <TypingIndicator />}
            </div>

            {/* — Input bar — */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 14px",
                borderTop: "1px solid oklch(1 0 0 / 0.08)",
                flexShrink: 0,
                background: "oklch(1 0 0 / 0.02)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  background: "oklch(1 0 0 / 0.07)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                  borderRadius: 40,
                  padding: "0 14px",
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  aria-label="Message the concierge"
                  disabled={typing}
                  style={{
                    flex: 1,
                    height: 40,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 13.5,
                    color: "oklch(0.97 0.005 250)",
                    fontFamily: "'Inter', ui-sans-serif, sans-serif",
                  }}
                />
              </div>
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || typing}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    input.trim() && !typing
                      ? "linear-gradient(135deg, oklch(0.78 0.17 158), oklch(0.82 0.13 210))"
                      : "oklch(1 0 0 / 0.08)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !typing ? "pointer" : "default",
                  color: input.trim() && !typing ? "oklch(0.14 0.04 258)" : "oklch(0.5 0.03 250)",
                  boxShadow:
                    input.trim() && !typing
                      ? "0 6px 20px -6px oklch(0.78 0.17 158 / 0.6)"
                      : "none",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </button>
            </form>

            {/* — Scroll-to-bottom — */}
            <div style={{ position: "absolute", bottom: 72, right: 16, pointerEvents: "none" }}>
              <button
                type="button"
                onClick={() => {
                  if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }}
                aria-label="Scroll to bottom"
                style={{
                  pointerEvents: "auto",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "oklch(0.26 0.05 258)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "oklch(0.85 0.01 250)",
                  boxShadow: "0 4px 12px -4px oklch(0 0 0 / 0.4)",
                }}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ══ Floating Action Button ══ */}
        <button
          type="button"
          id="smart-concierge-fab"
          onClick={() => (open ? handleClose() : handleOpen())}
          aria-label={open ? "Close Smart Concierge" : "Open Smart Concierge — AI matchday assistant"}
          aria-expanded={open}
          aria-haspopup="dialog"
          className={cn(pulse && !open && "sc-fab-pulse")}
          style={{
            pointerEvents: "auto",
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(145deg, oklch(0.24 0.05 258), oklch(0.18 0.04 258))",
            border: "1.5px solid oklch(0.78 0.17 158 / 0.35)",
            boxShadow: "0 20px 50px -12px oklch(0 0 0 / 0.65), 0 0 0 1px oklch(0.78 0.17 158 / 0.1) inset",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(-4px) scale(1.05)";
            el.style.boxShadow = "0 28px 60px -12px oklch(0 0 0 / 0.7), 0 0 30px -8px oklch(0.78 0.17 158 / 0.5), 0 0 0 1px oklch(0.78 0.17 158 / 0.15) inset";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(0) scale(1)";
            el.style.boxShadow = "0 20px 50px -12px oklch(0 0 0 / 0.65), 0 0 0 1px oklch(0.78 0.17 158 / 0.1) inset";
          }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(0.78 0.17 158 / 0.2), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Mascot (closed state) */}
          <div
            aria-hidden
            style={{
              transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
              transform: open ? "scale(0) rotate(90deg)" : "scale(1) rotate(0deg)",
              opacity: open ? 0 : 1,
              position: "absolute",
            }}
          >
            <FootballMascot size={38} />
          </div>
          {/* X (open state) */}
          <div
            aria-hidden
            style={{
              transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
              transform: open ? "scale(1) rotate(0deg)" : "scale(0) rotate(-90deg)",
              opacity: open ? 1 : 0,
              position: "absolute",
              color: "oklch(0.78 0.17 158)",
            }}
          >
            <X size={22} />
          </div>
          {/* Notification badge */}
          {!open && answerCount > 0 && (
            <div
              aria-label={`${answerCount} response${answerCount !== 1 ? "s" : ""}`}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "linear-gradient(135deg, oklch(0.78 0.17 158), oklch(0.82 0.13 210))",
                border: "2px solid oklch(0.16 0.04 258)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 700,
                color: "oklch(0.14 0.04 258)",
                animation: "sc-badge-pop 0.35s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {answerCount > 9 ? "9+" : answerCount}
            </div>
          )}
        </button>
      </div>
    </>
  );
}

