"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/** A parallax layer: offset follows the --mx/--my pointer variables set on the container. */
function Layer({ children, depth, className }: { children: ReactNode; depth: number; className?: string; delay?: number }) {
  const style = {
    transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
  } as CSSProperties;
  return (
    <div style={style} className={cn("absolute transition-transform duration-700 ease-out motion-reduce:!transform-none", className)}>
      {children}
    </div>
  );
}

/**
 * Art-directed hero composition: the intersection of engineering (code),
 * creativity (design system) and growth (performance UI), layered over a
 * technical grid. Reacts subtly to mouse movement; static for reduced motion.
 * No animation library: pointer position is written to CSS variables.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const setVars = (x: number, y: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--mx", x.toFixed(3));
      ref.current?.style.setProperty("--my", y.toFixed(3));
    });
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setVars(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => setVars(0, 0);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden="true"
      className="relative mx-auto aspect-[4/4.3] w-full max-w-[36rem] select-none sm:aspect-[5/4.6]"
    >
      {/* Core panel */}
      <Layer depth={-6} className="inset-[6%_4%_8%_10%]">
        <div className="on-dark relative h-full w-full overflow-hidden rounded-[1.75rem] bg-forest shadow-[0_40px_80px_-40px_rgb(24_61_50/0.7)]">
          <div className="bg-grid-dark absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgb(200_241_105/0.18),transparent_55%)]" />
          {/* Intersection diagram */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1">
              <circle cx="200" cy="215" r="150" />
              <circle cx="200" cy="215" r="96" strokeDasharray="3 6" />
            </g>
            <g fill="none" stroke="rgba(200,241,105,0.55)" strokeWidth="1.2">
              <circle cx="170" cy="190" r="62" />
              <circle cx="232" cy="190" r="62" />
              <circle cx="201" cy="243" r="62" />
            </g>
            <circle cx="201" cy="208" r="9" fill="#C8F169" />
            <circle cx="201" cy="208" r="20" fill="none" stroke="#C8F169" strokeOpacity=".4" />
          </svg>
          <span className="eyebrow absolute left-[8%] top-[47%] text-[0.6rem] text-white/70">Technology</span>
          <span className="eyebrow absolute right-[11%] top-[22%] text-[0.6rem] text-white/70">Creativity</span>
          <span className="eyebrow absolute bottom-[10%] left-1/2 -translate-x-1/2 text-[0.6rem] text-white/70">Growth</span>
        </div>
      </Layer>

      {/* Code editor fragment */}
      <Layer depth={14} delay={0.25} className="left-0 top-[1%] w-[64%] sm:w-[58%]">
        <div className="animate-float overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_50px_-24px_rgb(23_25_24/0.35)]">
          <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="ml-2 font-mono text-[0.6rem] text-muted">idea.ts</span>
          </div>
          <pre className="overflow-hidden px-3.5 py-3 font-mono text-[0.58rem] leading-[1.7] text-ink sm:text-[0.66rem]">
            <span className="text-muted">01 </span>
            <span className="text-forest">const</span> idea = <span className="text-forest">await</span> discover(brief);
            {"\n"}
            <span className="text-muted">02 </span>
            <span className="text-forest">const</span> product = design(idea)
            {"\n"}
            <span className="text-muted">03 </span>
            {"  "}.build().<span className="rounded bg-lime px-0.5">test</span>();
            {"\n"}
            <span className="text-muted">04 </span>launch(product, {"{"} grow: <span className="text-forest">true</span> {"}"});
            <span className="animate-blink ml-0.5 inline-block h-[1em] w-[0.45em] translate-y-[0.15em] bg-forest" />
          </pre>
        </div>
      </Layer>

      {/* Product UI preview */}
      <Layer depth={22} delay={0.4} className="right-0 top-[34%] w-[46%] sm:w-[42%]">
        <div className="animate-float-slow rounded-2xl border border-line bg-paper p-3.5 shadow-[0_24px_50px_-24px_rgb(23_25_24/0.4)]">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-12 rounded-full bg-ink/70" />
            <span className="rounded-full bg-mist px-2 py-0.5 text-[0.55rem] font-semibold text-forest">Live</span>
          </div>
          <div className="mt-3 flex h-16 items-end gap-1.5 sm:h-20">
            {[38, 56, 44, 70, 62, 88, 76].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={cn("flex-1 rounded-[3px]", i === 5 ? "bg-lime" : i === 6 ? "bg-forest" : "bg-mist")}
              />
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-mist" />
            <span className="block h-1.5 w-2/3 rounded-full bg-mist" />
          </div>
        </div>
      </Layer>

      {/* Design system fragment */}
      <Layer depth={18} delay={0.55} className="bottom-[2%] left-[2%] w-[48%] sm:w-[42%]">
        <div className="rounded-2xl border border-line bg-paper p-3.5 shadow-[0_24px_50px_-24px_rgb(23_25_24/0.35)]">
          <div className="flex items-end justify-between">
            <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-ink sm:text-[2.4rem]">Aa</span>
            <span className="font-mono text-[0.55rem] text-muted">Manrope / 800</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {["bg-forest", "bg-lime", "bg-mist", "bg-ink"].map((c) => (
              <span key={c} className={cn("aspect-square rounded-lg border border-line", c)} />
            ))}
          </div>
        </div>
      </Layer>

      {/* Growth chip */}
      <Layer depth={28} delay={0.7} className="bottom-[14%] right-[3%]">
        <div className="on-dark flex items-center gap-2.5 rounded-full border border-white/10 bg-ink py-2 pl-2 pr-4 text-white shadow-[0_20px_40px_-20px_rgb(23_25_24/0.6)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#171918" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16l5-5 4 4 7-7M15 8h5v5" />
            </svg>
          </span>
          <span className="text-[0.7rem] font-semibold tracking-tight">Built to grow</span>
        </div>
      </Layer>
    </div>
  );
}
