import Link from "next/link";
import { cn } from "@/lib/cn";

export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-9 w-9 shrink-0", className)}>
      <rect width="40" height="40" rx="10" fill={inverted ? "#C8F169" : "#183D32"} />
      <path
        d="M11 29.5 20 10.5l9 19"
        fill="none"
        stroke={inverted ? "#183D32" : "#C8F169"}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="23.4" r="2.3" fill={inverted ? "#183D32" : "#C8F169"} />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="ANH Tech — home"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", inverted && "on-dark", className)}
    >
      <LogoMark inverted={inverted} className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6" />
      <span className={cn("font-display text-[1.2rem] font-extrabold tracking-[-0.03em]", inverted ? "text-white" : "text-ink")}>
        ANH<span className={cn("ml-1 font-semibold", inverted ? "text-lime" : "text-forest")}>Tech</span>
      </span>
    </Link>
  );
}
