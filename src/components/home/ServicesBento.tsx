import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, type ServiceSlug } from "@/data/services";
import { ServiceArt } from "@/components/visuals/ServiceArt";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Theme = "forest" | "paper" | "mist" | "ink" | "lime";

/** Bento layout — each service gets a distinct surface and size. */
const layout: Record<ServiceSlug, { span: string; theme: Theme; tall?: boolean }> = {
  "website-development": { span: "md:col-span-2 lg:col-span-7", theme: "forest", tall: true },
  "web-application-development": { span: "md:col-span-2 lg:col-span-5", theme: "paper", tall: true },
  "android-app-development": { span: "md:col-span-1 lg:col-span-4", theme: "paper" },
  "ios-app-development": { span: "md:col-span-1 lg:col-span-4", theme: "mist" },
  "custom-software-development": { span: "md:col-span-2 lg:col-span-4", theme: "ink" },
  "graphic-design": { span: "md:col-span-1 lg:col-span-4", theme: "lime" },
  "meta-ads": { span: "md:col-span-1 lg:col-span-4", theme: "paper" },
  seo: { span: "md:col-span-2 lg:col-span-4", theme: "forest" },
};

const themes: Record<Theme, { card: string; title: string; text: string; meta: string; art: "light" | "dark" }> = {
  forest: { card: "on-dark bg-forest border-forest", title: "text-white", text: "text-white/70", meta: "text-lime", art: "dark" },
  ink: { card: "on-dark bg-ink border-ink", title: "text-white", text: "text-white/65", meta: "text-lime", art: "dark" },
  paper: { card: "bg-paper border-line hover:border-line-strong", title: "text-ink", text: "text-ink-soft", meta: "text-forest", art: "light" },
  mist: { card: "bg-mist border-line", title: "text-ink", text: "text-ink-soft", meta: "text-forest", art: "light" },
  lime: { card: "bg-lime border-lime", title: "text-ink", text: "text-ink/75", meta: "text-forest", art: "light" },
};

export function ServicesBento() {
  return (
    <section aria-labelledby="services-title" className="pb-24 lg:pb-36">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Services"
          title={<span id="services-title">Everything Your Business Needs to Go Digital.</span>}
          intro="From the first line of code to your next growth campaign, we provide the expertise to build and strengthen your digital presence."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {services.map((s, i) => {
            const l = layout[s.slug];
            const t = themes[l.theme];
            return (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08} className={l.span}>
                <Link
                  href={`/services/${s.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgb(23_25_24/0.45)] sm:p-8",
                    t.card,
                    l.tall ? "min-h-[26rem] lg:min-h-[32rem]" : "min-h-[24rem]",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className={cn("font-mono text-sm", t.meta)}>{s.number}</span>
                    <span className={cn("eyebrow", t.text)}>{s.category}</span>
                  </div>

                  <div className={cn("my-6 flex flex-1 items-center justify-center", l.tall ? "px-0 lg:px-6" : "px-2")}>
                    <ServiceArt
                      kind={s.glyph}
                      tone={t.art}
                      className={cn(
                        "transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
                        l.tall ? "max-w-[30rem]" : "max-w-[18rem]",
                      )}
                    />
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className={cn("font-display font-bold tracking-[-0.03em]", t.title, l.tall ? "text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-tight" : "text-[1.4rem] leading-tight")}>
                        {s.title}
                      </h3>
                      <p className={cn("mt-2.5 max-w-md text-[0.93rem] leading-relaxed", t.text)}>{s.summary}</p>
                    </div>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:rotate-45",
                        t.art === "dark" ? "border-white/20 text-white group-hover:border-lime group-hover:bg-lime group-hover:text-ink" : "border-ink/15 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-white",
                      )}
                    >
                      <ArrowUpRight aria-hidden className="h-5 w-5" />
                      <span className="sr-only">Learn more about {s.title}</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
