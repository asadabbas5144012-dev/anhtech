import { ButtonLink } from "@/components/ui/Button";
import { Availability } from "@/components/ui/Availability";
import { RevealWords } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { services } from "@/data/services";

export function Hero() {
  const ticker = [...services.map((s) => s.title)];
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 [--fade:radial-gradient(ellipse_80%_70%_at_70%_20%,transparent_20%,var(--color-canvas)_75%)]" />
      <div className="container-x relative grid items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-7 xl:col-span-7">
          <div>
            <p className="eyebrow inline-flex items-center gap-3 text-forest">
              <span aria-hidden className="h-px w-8 bg-forest" />
              Independent Digital Technology Company
            </p>
          </div>
          <h1 id="hero-title" className="display-xl mt-7">
            <RevealWords text="Ideas into" />{" "}
            <span className="mark-lime">
              <RevealWords text="Digital Reality." delay={0.12} />
            </span>
          </h1>
          <div>
            <p className="font-display mt-8 text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
              Technology that moves your business forward.
            </p>
            <p className="lead mt-4 max-w-[38rem]">
              From custom software and powerful applications to creative design and performance-driven digital marketing, we help ambitious businesses turn ideas into meaningful digital experiences.
            </p>
          </div>
          <div>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href="/contact" size="lg">
                Start a Project
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="outline" arrow={false}>
                Explore Our Services
              </ButtonLink>
            </div>
            <Availability className="mt-8" />
          </div>
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <HeroVisual />
        </div>
      </div>

      {/* Capability ticker */}
      <div className="relative border-y border-line bg-paper">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-paper to-transparent sm:w-28" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-paper to-transparent sm:w-28" />
        <div className="flex overflow-hidden py-5">
          <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10" aria-label="Capabilities">
            {[...ticker, ...ticker].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= ticker.length}
                className="font-display flex shrink-0 items-center gap-10 whitespace-nowrap text-[1.05rem] font-semibold tracking-[-0.02em] text-ink-soft"
              >
                {t}
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 text-forest">
                  <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8z" fill="currentColor" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
