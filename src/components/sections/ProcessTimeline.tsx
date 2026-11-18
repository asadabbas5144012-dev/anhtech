import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Four-step visual timeline — horizontal on desktop, vertical rail on mobile. */
export function ProcessTimeline({ steps, dark = false }: { steps: { title: string; text: string }[]; dark?: boolean }) {
  return (
    <ol className="relative grid gap-0 md:grid-cols-2 lg:grid-cols-4">
      {/* Desktop connecting rail */}
      <span aria-hidden className={cn("absolute left-0 right-0 top-[1.375rem] hidden h-px lg:block", dark ? "bg-white/15" : "bg-line-strong")} />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="relative pb-10 pl-14 md:pr-8 lg:pb-0 lg:pl-0">
          {/* Mobile rail */}
          {i < steps.length - 1 && (
            <span aria-hidden className={cn("absolute bottom-0 left-[1.375rem] top-11 w-px md:hidden", dark ? "bg-white/15" : "bg-line-strong")} />
          )}
          <span
            className={cn(
              "absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border font-mono text-sm font-semibold lg:relative",
              i === 0
                ? "border-lime bg-lime text-ink"
                : dark
                  ? "border-white/20 bg-forest text-lime"
                  : "border-line-strong bg-canvas text-forest",
            )}
          >
            0{i + 1}
          </span>
          <h3 className={cn("display-sm lg:mt-8", dark ? "text-white" : "text-ink")}>{s.title}</h3>
          <p className={cn("mt-3 max-w-xs text-[0.95rem] leading-relaxed", dark ? "text-white/65" : "text-ink-soft")}>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
