import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: ReactNode;
  eyebrow?: string;
  right?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export function Collapsible({
  title,
  eyebrow,
  right,
  defaultOpen = true,
  children,
  className,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/20 hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.17_158/0.35)]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group flex flex-1 items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 rounded-lg"
        >
          <div>
            {eyebrow && (
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {eyebrow}
              </div>
            )}
            <h2 className="mt-1 font-display text-lg">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            {right}
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-emerald/40 group-hover:bg-emerald/10">
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-300",
                  open && "rotate-180 text-emerald",
                )}
              />
            </span>
          </div>
        </button>
      </header>

      <div
        className={cn(
          "grid transition-all duration-500 ease-out",
          open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
