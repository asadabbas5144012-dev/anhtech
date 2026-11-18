import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { getService, servicePhrase, services } from "@/data/services";
import { projectsForService } from "@/data/portfolio";
import { createMetadata, serviceSchema } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, SectionIndex } from "@/components/ui/Section";
import { ServiceArt } from "@/components/visuals/ServiceArt";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { talkToUsHref } from "@/lib/contact";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return createMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = projectsForService(s.slug).slice(0, 2);
  const others = services.filter((o) => o.slug !== s.slug);
  const path = `/services/${s.slug}`;

  return (
    <>
      <JsonLd data={serviceSchema({ title: s.title, description: s.seo.description, path, category: s.category })} />

      {/* 1. Hero */}
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.title, path },
        ]}
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        lead={s.hero.lead}
        aside={
          <div className="on-dark relative overflow-hidden rounded-[1.75rem] bg-forest p-6 sm:p-8">
            <div aria-hidden className="bg-grid-dark absolute inset-0" />
            <div className="relative flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-ink">
                <ServiceGlyph kind={s.glyph} className="h-6 w-6" />
              </span>
              <span className="font-mono text-sm text-lime">{s.number} / 08</span>
            </div>
            <ServiceArt kind={s.glyph} tone="dark" className="relative mt-6" />
          </div>
        }
      >
        <ButtonLink href={`/contact?service=${encodeURIComponent(s.shortTitle)}`} size="lg">
          Start a Project
        </ButtonLink>
        <ButtonLink href={talkToUsHref()} variant="outline" size="lg" arrow={false}>
          Talk to Us
        </ButtonLink>
      </PageHero>

      {/* 2–3. Value proposition & overview */}
      <section aria-labelledby="overview-title" className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <SectionIndex index="01" label="Overview" />
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="overview-title" className="sr-only">
                {s.title} overview
              </h2>
              <p className="font-display text-[clamp(1.4rem,1.1rem+1.2vw,2.25rem)] font-semibold leading-[1.3] tracking-[-0.025em]">{s.valueProp}</p>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {s.overview.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="leading-relaxed text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Problems we solve */}
      <section aria-labelledby="problems-title" className="bg-mist py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading index="02" label="Problems we solve" title={<span id="problems-title">Sound familiar?</span>} intro={`Common challenges that bring businesses to us for ${servicePhrase[s.slug]}.`} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {s.problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 0.08} className="rounded-[1.25rem] border border-line bg-paper p-7 lg:p-9">
                <span className="font-mono text-xs text-forest">Challenge {String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-4 text-xl font-bold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Offerings */}
      <section aria-labelledby="offerings-title" className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading index="03" label="What we offer" title={<span id="offerings-title">{`${s.title} services`}</span>} intro="Every engagement is scoped around your needs. These are the areas we most often help with." />
          <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 3) * 0.06} className="group border-t border-line py-8">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-lime ring-4 ring-lime/25 transition-transform group-hover:scale-125" />
                  <h3 className="font-display text-[1.2rem] font-bold tracking-[-0.02em]">{o.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-ink-soft">{o.text}</p>
              </Reveal>
            ))}
          </ul>

          {s.notice && (
            <Reveal>
              <aside className="mt-12 flex gap-4 rounded-[1.25rem] border border-forest/20 bg-lime-soft/60 p-6 sm:p-8" aria-label={s.notice.title}>
                <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                <div>
                  <p className="font-display text-lg font-bold text-forest">{s.notice.title}</p>
                  <p className="mt-1.5 max-w-3xl leading-relaxed text-ink-soft">{s.notice.text}</p>
                </div>
              </aside>
            </Reveal>
          )}
        </div>
      </section>

      {/* 6. Approach */}
      <section aria-labelledby="approach-title" className="on-dark bg-forest py-24 text-white lg:py-32">
        <div className="container-x">
          <SectionHeading dark index="04" label="Our approach" title={<span id="approach-title">How we deliver {servicePhrase[s.slug]}.</span>} />
          <div className="mt-16">
            <ProcessTimeline steps={s.approach} dark />
          </div>
        </div>
      </section>

      {/* 7. Technologies & tools */}
      {s.tools && (
        <section aria-labelledby="tools-title" className="border-b border-line py-20 lg:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <SectionIndex index="05" label="Tools" />
              <h2 id="tools-title" className="display-sm mt-5">
                Technologies &amp; tools
              </h2>
              <p className="mt-4 text-ink-soft">Selected to fit each project rather than by default.</p>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {s.tools.map((g, i) => (
                <Reveal key={g.group} delay={i * 0.08}>
                  <h3 className="eyebrow text-muted">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <li key={t} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Related projects */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading index="06" label="Related work" title={<span id="related-title">Related projects</span>} intro="Selected projects related to this service." />
            <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-8">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. FAQs */}
      <section aria-labelledby="faq-title" className="border-t border-line bg-paper py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionIndex index="07" label="FAQs" />
            <h2 id="faq-title" className="display-md mt-5">
              Questions, answered.
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">
              Don&apos;t see your question? <Link href="/contact" className="link-underline font-semibold text-ink">Ask us directly</Link>; we&apos;re happy to help.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Faq faqs={s.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Internal linking — other services */}
      <section aria-labelledby="more-title" className="py-20">
        <div className="container-x">
          <h2 id="more-title" className="eyebrow text-muted">
            Explore other services
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3.5 transition-colors hover:border-forest">
                  <span className="flex items-center gap-3">
                    <ServiceGlyph kind={o.glyph} className="h-5 w-5 text-forest" />
                    <span className="text-[0.92rem] font-semibold">{o.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. CTA */}
      <FinalCta
        title={`Let's talk about your ${servicePhrase[s.slug]} project.`}
        text="Share what you have in mind. We'll review your requirements and recommend a practical way forward, with no obligation."
        primaryHref={`/contact?service=${encodeURIComponent(s.shortTitle)}`}
      />
    </>
  );
}
