import Image from "next/image";
import type { FrameTone, Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

const frameTones: Record<FrameTone, { bg: string; grid: string }> = {
  forest: { bg: "bg-forest", grid: "bg-grid-dark" },
  ink: { bg: "bg-ink", grid: "bg-grid-dark" },
  mist: { bg: "bg-mist", grid: "bg-grid" },
  lime: { bg: "bg-lime", grid: "bg-grid" },
};

const hostname = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

/**
 * Real project screenshots presented inside a browser frame on a brand-tone
 * backdrop; the page scrolls gently on hover. Falls back to an art-directed
 * composition for concept projects without screenshots.
 */
export function ProjectVisual({ project, className, priority = false }: { project: Project; className?: string; priority?: boolean }) {
  if (project.images) {
    const tone = frameTones[project.frame];
    const host = hostname(project.url) ?? project.name;
    const { preview } = project.images;
    return (
      <div className={cn("overflow-hidden", tone.bg, className ?? "relative")}>
        <div aria-hidden className={cn("absolute inset-0 opacity-60", tone.grid)} />
        <div className="absolute inset-x-[6%] bottom-0 top-[11%] flex flex-col overflow-hidden rounded-t-xl border border-black/10 bg-paper shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 sm:rounded-t-2xl">
          <div className="flex shrink-0 items-center gap-2 border-b border-line bg-canvas px-3 py-2 sm:px-4">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
            </span>
            <span className="mx-auto truncate rounded-md bg-paper px-3 py-0.5 font-mono text-[0.6rem] text-muted ring-1 ring-line sm:text-[0.65rem]">{host}</span>
            <span className="w-8" aria-hidden />
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              priority={priority}
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="h-auto w-full motion-safe:transition-transform motion-safe:duration-[4s] motion-safe:ease-in-out motion-safe:group-hover:-translate-y-[40%]"
            />
          </div>
        </div>
      </div>
    );
  }
  if (!project.visual) return <div className={cn("bg-mist", className ?? "relative")} />;
  const { kind } = project.visual;
  return (
    <div
      role="img"
      aria-label={`Illustrative interface composition for ${project.name}, a ${project.category.toLowerCase()} concept`}
      className={cn("overflow-hidden", className ?? "relative")}
    >
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
        {kind === "dashboard" && <Dashboard name={project.name} />}
        {kind === "website" && <Website />}
        {kind === "mobile" && <Mobile name={project.name} />}
        {kind === "software" && <Software />}
        {kind === "brand" && <Brand />}
        {kind === "growth" && <Growth />}
      </div>
    </div>
  );
}

const Bar = ({ w, className }: { w: string; className?: string }) => (
  <span style={{ width: w }} className={cn("block h-1.5 rounded-full", className)} />
);

function Dashboard({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 bg-forest">
      <div className="bg-grid-dark absolute inset-0 opacity-70" />
      <div className="absolute left-[7%] right-[-4%] top-[12%] bottom-[-6%] flex overflow-hidden rounded-tl-2xl border border-white/10 bg-[#0f251e] shadow-2xl">
        <aside className="hidden w-[18%] shrink-0 flex-col gap-3 border-r border-white/10 p-[3%] sm:flex">
          <span className="font-display text-[0.7rem] font-bold text-white">{name}</span>
          {["70%", "55%", "62%", "48%", "58%"].map((w, i) => (
            <Bar key={i} w={w} className={i === 0 ? "bg-lime" : "bg-white/15"} />
          ))}
        </aside>
        <div className="flex-1 p-[3%]">
          <div className="grid grid-cols-3 gap-[3%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("rounded-xl border border-white/10 p-[8%]", i === 0 ? "bg-lime" : "bg-white/[0.04]")}>
                <Bar w="45%" className={i === 0 ? "bg-ink/40" : "bg-white/20"} />
                <span className={cn("mt-2 block h-3 w-[70%] rounded", i === 0 ? "bg-ink/80" : "bg-white/70")} />
              </div>
            ))}
          </div>
          <div className="mt-[4%] rounded-xl border border-white/10 bg-white/[0.03] p-[3%]">
            <svg viewBox="0 0 300 90" className="h-auto w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#C8F169" stopOpacity=".35" />
                  <stop offset="1" stopColor="#C8F169" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 70 C30 64 50 40 80 46 S130 70 160 50 220 18 250 26 290 10 300 8 V90 H0Z" fill="url(#dash-fill)" />
              <path d="M0 70 C30 64 50 40 80 46 S130 70 160 50 220 18 250 26 290 10 300 8" fill="none" stroke="#C8F169" strokeWidth="2" />
              <path d="M0 78 C40 76 70 66 110 68 S190 56 230 52 280 44 300 42" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="mt-[4%] space-y-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 border-b border-white/5 pb-2.5">
                <span className="h-5 w-5 rounded-md bg-white/10" />
                <Bar w="28%" className="bg-white/30" />
                <Bar w="16%" className="ml-auto bg-white/15" />
                <span className={cn("rounded-full px-2 py-0.5 text-[0.5rem] font-semibold", i === 1 ? "bg-lime text-ink" : "bg-white/10 text-white/70")}>
                  {i === 1 ? "Approved" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Website() {
  return (
    <div className="absolute inset-0 bg-mist">
      <div className="bg-dots absolute inset-0 opacity-60" />
      <div className="absolute inset-x-[8%] top-[10%] bottom-[-8%] overflow-hidden rounded-t-2xl border border-line bg-paper shadow-[0_30px_60px_-30px_rgb(23_25_24/0.35)]">
        <div className="flex items-center justify-between border-b border-line px-[4%] py-[2.2%]">
          <span className="font-display text-[0.7rem] font-extrabold tracking-tight text-forest">HAVEN</span>
          <div className="hidden gap-4 sm:flex">
            {[0, 1, 2, 3].map((i) => (
              <Bar key={i} w="2.2rem" className="bg-line-strong" />
            ))}
          </div>
          <span className="rounded-full bg-forest px-2.5 py-1 text-[0.5rem] font-semibold text-white">Book a viewing</span>
        </div>
        <div className="grid grid-cols-12 gap-[3%] p-[4%]">
          <div className="col-span-5 flex flex-col justify-center">
            <p className="font-display text-[clamp(0.9rem,2.2vw,1.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
              Homes with room to breathe.
            </p>
            <div className="mt-3 space-y-1.5">
              <Bar w="90%" className="bg-line-strong" />
              <Bar w="70%" className="bg-line-strong" />
            </div>
            <span className="mt-4 inline-block h-5 w-20 rounded-full bg-lime" />
          </div>
          <div className="col-span-7 grid grid-cols-5 grid-rows-2 gap-2">
            <div className="col-span-3 row-span-2 rounded-xl bg-[linear-gradient(160deg,#24503f_0%,#183D32_55%,#112c24_100%)] p-2">
              <div className="flex h-full items-end gap-1">
                <span className="h-[55%] w-[22%] rounded-t-sm bg-white/15" />
                <span className="h-[80%] w-[26%] rounded-t-sm bg-white/25" />
                <span className="h-[40%] w-[18%] rounded-t-sm bg-lime/70" />
                <span className="h-[65%] w-[22%] rounded-t-sm bg-white/10" />
              </div>
            </div>
            <div className="col-span-2 rounded-xl bg-[linear-gradient(140deg,#e4f8b4,#c8f169)]" />
            <div className="col-span-2 rounded-xl border border-line bg-mist p-2">
              <Bar w="70%" className="bg-ink/50" />
              <Bar w="45%" className="mt-1.5 bg-line-strong" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[3%] px-[4%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-line p-2">
              <div className={cn("h-10 rounded-lg sm:h-14", ["bg-mist", "bg-[#dfe6d8]", "bg-mist"][i])} />
              <Bar w="70%" className="mt-2 bg-ink/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("absolute aspect-[9/19] overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-paper shadow-[0_30px_60px_-25px_rgb(23_25_24/0.5)]", className)}>
      <span className="absolute left-1/2 top-1.5 z-10 h-2.5 w-10 -translate-x-1/2 rounded-full bg-ink" />
      <div className="h-full w-full px-[9%] pt-[18%]">{children}</div>
    </div>
  );
}

function Mobile({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 bg-lime">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.5),transparent_55%)]" />
      <Phone className="left-[18%] top-[14%] w-[28%] -rotate-6">
        <p className="font-display text-[0.65rem] font-bold text-ink">{name}</p>
        <Bar w="60%" className="mt-1 bg-line-strong" />
        <div className="mt-3 grid grid-cols-7 gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className={cn("aspect-square rounded-[3px]", i === 17 ? "bg-forest" : i % 6 === 0 ? "bg-line" : "bg-mist")} />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {["09:30", "11:00", "14:15"].map((t, i) => (
            <div key={t} className={cn("rounded-md px-1.5 py-1 text-[0.45rem] font-semibold", i === 1 ? "bg-forest text-lime" : "bg-mist text-ink-soft")}>
              {t}
            </div>
          ))}
        </div>
      </Phone>
      <Phone className="right-[16%] top-[24%] w-[28%] rotate-[5deg]">
        <div className="rounded-lg bg-forest p-2">
          <Bar w="50%" className="bg-lime" />
          <span className="mt-1.5 block h-2 w-[80%] rounded bg-white/80" />
          <Bar w="40%" className="mt-1.5 bg-white/30" />
        </div>
        <div className="mt-2.5 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className={cn("h-4 w-4 rounded-full", i === 0 ? "bg-lime" : "bg-mist")} />
              <div className="flex-1 space-y-1">
                <Bar w="80%" className="bg-ink/30" />
                <Bar w="50%" className="bg-line" />
              </div>
            </div>
          ))}
        </div>
        <span className="mt-4 block h-5 rounded-full bg-ink" />
      </Phone>
    </div>
  );
}

function Software() {
  const cols = [
    { t: "Queued", n: 3 },
    { t: "En route", n: 2 },
    { t: "Delivered", n: 3 },
  ];
  return (
    <div className="absolute inset-0 bg-ink">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute left-[6%] right-[6%] top-[10%] grid grid-cols-3 gap-[2.5%]">
        {cols.map((c, ci) => (
          <div key={c.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-[6%]">
            <div className="flex items-center justify-between">
              <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-white/60">{c.t}</span>
              <span className={cn("h-1.5 w-1.5 rounded-full", ci === 1 ? "bg-lime" : "bg-white/30")} />
            </div>
            <div className="mt-2 space-y-1.5">
              {Array.from({ length: c.n }).map((_, i) => (
                <div key={i} className={cn("rounded-lg p-[7%]", ci === 1 && i === 0 ? "bg-lime" : "bg-white/[0.06]")}>
                  <Bar w="70%" className={ci === 1 && i === 0 ? "bg-ink/60" : "bg-white/40"} />
                  <Bar w="40%" className={cn("mt-1", ci === 1 && i === 0 ? "bg-ink/30" : "bg-white/15")} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[8%] left-[6%] right-[38%] rounded-xl border border-white/10 bg-black/40 p-[2.5%] font-mono text-[0.5rem] leading-relaxed text-white/60 sm:text-[0.6rem]">
        <p>
          <span className="text-lime">›</span> dispatch.assign(job_142, driver_07)
        </p>
        <p>
          <span className="text-lime">›</span> notify.customer(&quot;out_for_delivery&quot;)
        </p>
        <p className="text-white/35">✓ status synced</p>
      </div>
      <svg viewBox="0 0 120 80" className="absolute bottom-[6%] right-[6%] w-[28%]" fill="none">
        <path d="M8 70 C30 60 30 20 60 30 S100 10 112 12" stroke="#C8F169" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="8" cy="70" r="4" fill="#fff" />
        <circle cx="60" cy="30" r="4" fill="#C8F169" />
        <circle cx="112" cy="12" r="4" fill="#fff" />
      </svg>
    </div>
  );
}

function Brand() {
  return (
    <div className="absolute inset-0 bg-[#F3EBDD]">
      <div className="absolute left-[7%] top-[12%] flex aspect-square w-[30%] items-center justify-center rounded-full bg-[#2B2118]">
        <svg viewBox="0 0 100 100" className="w-[58%]">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#E9B872" strokeWidth="3" />
          <path d="M34 68V32l32 36V32" fill="none" stroke="#E9B872" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute left-[7%] bottom-[10%] flex gap-2">
        {["#2B2118", "#E9B872", "#8A5A3B", "#FFFFFF"].map((c) => (
          <span key={c} style={{ background: c }} className="h-8 w-8 rounded-full border border-black/10 sm:h-10 sm:w-10" />
        ))}
      </div>
      <div className="absolute right-[24%] top-[14%] bottom-[14%] w-[26%] rounded-t-[1.2rem] rounded-b-md bg-[#2B2118] p-[2.5%] shadow-[0_30px_50px_-25px_rgb(0_0_0/0.6)]">
        <div className="flex h-full flex-col items-center justify-between rounded-md border border-[#E9B872]/40 py-[12%]">
          <span className="font-display text-[0.55rem] font-bold tracking-[0.3em] text-[#E9B872]">NORD</span>
          <svg viewBox="0 0 100 100" className="w-[44%]">
            <path d="M34 68V32l32 36V32" fill="none" stroke="#E9B872" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <span className="text-[0.45rem] tracking-[0.25em] text-[#E9B872]/70">ROASTERS</span>
        </div>
      </div>
      <div className="absolute right-[5%] top-[14%] w-[16%] space-y-3">
        <p className="font-display text-[clamp(1.2rem,3vw,2.4rem)] font-extrabold leading-none tracking-[-0.05em] text-[#2B2118]">Aa</p>
        <Bar w="100%" className="bg-[#2B2118]/25" />
        <Bar w="70%" className="bg-[#2B2118]/25" />
        <div className="aspect-square w-full rounded-lg bg-[#E9B872]" />
      </div>
    </div>
  );
}

function Growth() {
  return (
    <div className="absolute inset-0 bg-forest-deep">
      <div className="bg-grid-dark absolute inset-0 opacity-60" />
      <div className="absolute left-[6%] top-[10%] w-[50%] rounded-2xl bg-paper p-[3%] shadow-2xl">
        <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="text-[0.55rem] text-ink-soft">online data science course</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn("rounded-lg p-2", i === 0 && "bg-mist ring-1 ring-forest/20")}>
              <Bar w={i === 0 ? "62%" : "54%"} className={i === 0 ? "bg-forest" : "bg-ink/30"} />
              <Bar w="88%" className="mt-1.5 bg-line" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-[6%] top-[16%] w-[34%] space-y-2">
        {[100, 78, 58, 40].map((w, i) => (
          <div key={w} style={{ width: `${w}%` }} className={cn("ml-auto h-7 rounded-md sm:h-9", i === 3 ? "bg-lime" : "bg-white/10")} />
        ))}
        <p className="pt-1 text-right text-[0.55rem] uppercase tracking-[0.2em] text-white/50">Funnel stages</p>
      </div>
      <svg viewBox="0 0 400 100" className="absolute bottom-[8%] left-[6%] w-[88%]" fill="none">
        <path d="M0 90 C60 86 90 70 140 66 S220 40 260 34 340 12 400 6" stroke="#C8F169" strokeWidth="2.5" />
        <path d="M0 96 H400" stroke="rgba(255,255,255,0.15)" />
        {[140, 260, 400].map((x, i) => (
          <circle key={x} cx={x === 400 ? 396 : x} cy={[66, 34, 6][i]} r="4.5" fill="#C8F169" />
        ))}
      </svg>
    </div>
  );
}
