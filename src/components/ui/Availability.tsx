import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const dotColor = {
  open: "bg-emerald-500",
  selected: "bg-lime",
  limited: "bg-amber-400",
  closed: "bg-muted",
} as const;

/** Availability indicator driven entirely by siteConfig.availability. */
export function Availability({ className, dark = false }: { className?: string; dark?: boolean }) {
  const a = siteConfig.availability;
  if (!a.show) return null;
  const pulse = a.status !== "closed";
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium",
        dark ? "border-white/15 bg-white/5 text-white/80" : "border-line bg-paper text-ink-soft",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        {pulse && <span className={cn("animate-pulse-ring absolute inset-0 rounded-full", dotColor[a.status])} />}
        <span className={cn("relative h-2 w-2 rounded-full ring-2", dotColor[a.status], dark ? "ring-forest" : "ring-forest/80")} />
      </span>
      {a.label}
    </p>
  );
}
