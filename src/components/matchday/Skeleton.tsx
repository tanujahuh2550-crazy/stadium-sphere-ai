import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-white/[0.04]",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className,
      )}
    />
  );
}

export function MatchdayPassSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="glass rounded-3xl p-7 md:p-9">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div className="space-y-5">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-8 w-40 rounded-full" />
            <div className="grid max-w-md grid-cols-2 gap-x-8 gap-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-56 w-56 rounded-2xl" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
      <Skeleton className="h-40 rounded-2xl" />
      <Skeleton className="h-40 rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}
