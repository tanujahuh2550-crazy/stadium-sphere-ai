import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, type LanguageCode } from "@/i18n";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  /** "full" shows the native language name, "compact" shows the 2-letter code. */
  variant?: "full" | "compact";
  className?: string;
  light?: boolean;
}

export function LanguageSelector({ variant = "full", className, light = false }: Props) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs transition-colors",
        light
          ? "border-black/10 bg-black/5 hover:border-emerald/40"
          : "border-white/10 bg-white/5 hover:border-emerald/40",
        className,
      )}
    >
      <Globe className="h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden />
      <select
        aria-label={t("top.language")}
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="cursor-pointer rounded bg-transparent pe-1 outline-none focus-visible:ring-2 focus-visible:ring-emerald"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-[oklch(0.2_0.04_258)] text-white">
            {variant === "compact" ? l.short : l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
