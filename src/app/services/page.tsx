import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { processSteps } from "@/data/content";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ServiceArt } from "@/components/visuals/ServiceArt";

export const metadata: Metadata = createMetadata({
  title: "Services — Software, Web & Mobile Development, Design, SEO & Meta Ads",
  description:
    "Explore ANH Tech's digital services: website development, web application and SaaS development, Android and iOS apps, custom software, graphic design, Meta ads management and SEO.",
  path: "/services",
});

const groups = [
  { name: "Engineering", text: "Websites, web platforms, mobile apps and custom software." },
  { name: "Creative", text: "Brand identity and visual design that builds recognition." },
  { name: "Growth", text: "Search and social strategies that bring the right people to you." },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Everything your business needs to go digital."
        lead="Engineering, design and growth services under one roof, delivered with direct technical collaboration and a clear focus on your goals."
      >
        <ButtonLink href="/contact" size="lg">
          Start a Project
        </ButtonLink>
      </PageHero>

      {groups.map((g, gi) => {
        const list = services.filter((s) => s.category === g.name);
        return (
          <section key={g.name} aria-labelledby={`group-${g.name}`} className="border-t border-line py-16 lg:py-24">
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <p className="font-mono text-sm text-forest">0{gi + 1}</p>
                  <h2 id={`group-${g.name}`} className="display-md mt-3">
                    {g.name}
                  </h2>
                  <p className="mt-4 max-w-xs text-ink-soft">{g.text}</p>
                </div>
              </Reveal>
              <ul className="space-y-4 lg:col-span-8">
                {list.map((s, i) => (
                  <Reveal as="li" key={s.slug} delay={i * 0.06}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group grid items-center gap-6 rounded-[1.5rem] border border-line bg-paper p-6 transition-[border-color,box-shadow] duration-500 hover:border-forest/40 hover:shadow-[0_30px_60px_-40px_rgb(23_25_24/0.45)] sm:grid-cols-[1fr_12rem] sm:p-8"
                    >
                      <div>
                        <span className="font-mono text-xs text-muted">{s.number}</span>
                        <h3 className="font-display mt-2 flex items-center gap-2 text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-bold tracking-[-0.03em]">
                          {s.title}
                          <ArrowUpRight aria-hidden className="h-6 w-6 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest" />
                        </h3>
                        <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{s.summary}</p>
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {s.offerings.slice(0, 4).map((o) => (
                            <li key={o.title} className="rounded-full bg-mist px-3 py-1 text-[0.78rem] text-ink-soft">
                              {o.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden rounded-2xl bg-mist p-3 sm:block">
                        <ServiceArt kind={s.glyph} className="transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="svc-process" className="on-dark bg-forest py-24 text-white lg:py-32">
        <div className="container-x">
          <SectionHeading dark label="Process" title={<span id="svc-process">A Clear Process. A Better Outcome.</span>} intro="Whatever the service, every project follows the same transparent rhythm." />
          <div className="mt-16">
            <ProcessTimeline steps={processSteps} dark />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
