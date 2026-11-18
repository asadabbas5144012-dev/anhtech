import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className, dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5", dark ? "text-lime" : "text-forest", className)}>
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-lime" : "bg-forest")} />
      {children}
    </p>
  );
}

/** Numbered section index, e.g. "(03) Services" */
export function SectionIndex({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", dark ? "text-white/60" : "text-muted")}>
      <span className={cn("font-mono tracking-normal", dark ? "text-lime" : "text-forest")}>({index})</span>
      <span>{label}</span>
    </p>
  );
}

interface SectionHeadingProps {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
  align?: "split" | "stack";
  as?: "h1" | "h2";
}

export function SectionHeading({ index, label, title, intro, dark = false, className, align = "split", as = "h2" }: SectionHeadingProps) {
  const H = as;
  return (
    <div
      className={cn(
        "grid gap-6",
        align === "split" && "lg:grid-cols-12 lg:items-end lg:gap-10",
        className,
      )}
    >
      <Reveal className={cn(align === "split" && "lg:col-span-7")}>
        {index ? <SectionIndex index={index} label={label} dark={dark} /> : <Eyebrow dark={dark}>{label}</Eyebrow>}
        <H className={cn("display-md mt-5", dark ? "text-white" : "text-ink")}>{title}</H>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className={cn(align === "split" ? "lg:col-span-5 lg:pb-2" : "max-w-2xl")}>
          <p className={cn("lead", dark && "text-white/70")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
