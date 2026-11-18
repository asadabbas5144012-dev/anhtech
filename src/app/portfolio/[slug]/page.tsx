import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { getProject, projects, projectTypeLabel, type ProjectImage } from "@/data/portfolio";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/Section";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { ProjectTypeBadge } from "@/components/sections/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { LazyMount } from "@/components/ui/LazyMount";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return createMetadata({
    title: `${p.name}: ${p.category} Case Study`,
    description: p.description,
    path: `/portfolio/${p.slug}`,
  });
}

function BrowserFrame({ host, children, className }: { host: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_40px_80px_-40px_rgb(23_25_24/0.35)] ${className ?? ""}`}>
      <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="mx-auto truncate rounded-md bg-paper px-3 py-0.5 font-mono text-[0.7rem] text-muted ring-1 ring-line">{host}</span>
        <span className="w-10" aria-hidden />
      </div>
      {children}
    </div>
  );
}

const Shot = ({ image, sizes, priority, unoptimized }: { image: ProjectImage; sizes: string; priority?: boolean; unoptimized?: boolean }) => (
  <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} preload={priority} fetchPriority={priority ? "high" : undefined} loading={priority ? "eager" : "lazy"} unoptimized={unoptimized} className="block h-auto w-full bg-mist" />
);

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const related = services.filter((s) => p.services.includes(s.slug));
  const path = `/portfolio/${p.slug}`;
  const host = p.url ? new URL(p.url).hostname.replace(/^www\./, "") : p.name;

  return (
    <>
      <section className="pb-12 pt-32 sm:pt-36 lg:pt-44">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Portfolio", path: "/portfolio" }, { name: p.name, path }]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <ProjectTypeBadge project={p} />
                <span className="text-sm text-muted">
                  {p.category}
                  {p.location ? ` · ${p.location}` : ""}
                </span>
              </div>
              <h1 className="display-lg mt-6">
                <RevealWords text={p.name} />
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="lead">{p.description}</p>
              {p.url && (
                <div className="mt-6">
                  <ButtonLink href={p.url} variant="outline">
                    Visit {host}
                  </ButtonLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cover (above the fold: rendered immediately, it is the LCP element) */}
      <div className="container-x">
        {p.images ? (
          <div className="relative overflow-hidden rounded-[1.75rem] bg-mist p-3 sm:p-8 lg:p-14">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
            <BrowserFrame host={host} className="relative">
              <Shot image={p.images.cover} sizes="(min-width: 1280px) 1150px, 95vw" priority />
            </BrowserFrame>
          </div>
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-line">
            <ProjectVisual project={p} priority className="absolute inset-0" />
          </div>
        )}
      </div>

      <section aria-label="Project details" className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line text-[0.95rem] lg:sticky lg:top-32">
              <div className="py-5">
                <dt className="eyebrow text-muted">Type</dt>
                <dd className="mt-2 font-semibold">{projectTypeLabel[p.type]}</dd>
              </div>
              {p.location && (
                <div className="py-5">
                  <dt className="eyebrow text-muted">Market</dt>
                  <dd className="mt-2 font-semibold">{p.location}</dd>
                </div>
              )}
              <div className="py-5">
                <dt className="eyebrow text-muted">Services</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {related.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline font-semibold text-forest">
                      {s.title}
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="py-5">
                <dt className="eyebrow text-muted">Scope</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {p.scope.map((t) => (
                    <span key={t} className="rounded-full border border-line bg-paper px-3 py-1 text-[0.8rem]">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
              {p.stack && p.stack.length > 0 && (
                <div className="py-5">
                  <dt className="eyebrow text-muted">Technology</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span key={t} className="rounded-full bg-mist px-3 py-1 text-[0.8rem]">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {p.url && (
                <div className="py-5">
                  <dt className="eyebrow text-muted">Live website</dt>
                  <dd className="mt-2">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-forest">
                      <span className="link-underline">{host}</span> <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          <div className="space-y-16 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <SectionIndex index="01" label="Overview" />
              <h2 className="sr-only">Overview</h2>
              <div className="mt-5 space-y-5">
                {p.caseStudy.overview.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] font-semibold leading-[1.4] tracking-[-0.02em]"
                        : "leading-relaxed text-ink-soft"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <SectionIndex index="02" label="What we built" />
              <h2 className="sr-only">What we built</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.caseStudy.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl border border-line bg-paper p-4 text-[0.95rem] leading-snug">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime">
                      <Check aria-hidden className="h-3 w-3 text-forest" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Screens */}
      {p.images && (p.images.gallery.length > 0 || p.images.fullPage) && (
        <section aria-labelledby="screens-title" className="border-t border-line bg-paper py-20 lg:py-28">
          <div className="container-x">
            <Reveal>
              <SectionIndex index="03" label="Screens" />
              <h2 id="screens-title" className="display-md mt-5">
                A closer look.
              </h2>
            </Reveal>

            <div className={`mt-12 grid gap-8 ${p.images.fullPage ? "lg:grid-cols-12" : ""}`}>
              {p.images.fullPage && (
                <Reveal className="lg:col-span-5">
                  <BrowserFrame host={host}>
                    <div
                      tabIndex={0}
                      role="region"
                      aria-label={`Scrollable full-page view of ${p.name}`}
                      className="max-h-[38rem] overflow-y-auto overscroll-contain [scrollbar-width:thin] lg:max-h-[52rem]"
                    >
                      <LazyMount aspect={p.images.fullPage.width / p.images.fullPage.height} placeholderClassName="w-full bg-mist">
                        <Shot image={p.images.fullPage} sizes="(min-width: 1024px) 480px, 95vw" unoptimized />
                      </LazyMount>
                    </div>
                  </BrowserFrame>
                  <p className="mt-3 text-center text-[0.8rem] text-muted">Scroll inside the frame to view the full page</p>
                </Reveal>
              )}
              <div className={`grid gap-8 ${p.images.fullPage ? "content-start lg:col-span-7" : "md:grid-cols-2"}`}>
                {p.images.gallery.map((g, i) => (
                  <Reveal key={g.src} delay={i * 0.06}>
                    <BrowserFrame host={host} className={g.width < 700 ? "mx-auto max-w-[18rem]" : undefined}>
                      <LazyMount aspect={g.width / g.height} placeholderClassName="w-full bg-mist">
                        <Shot image={g} sizes="(min-width: 1024px) 700px, 95vw" />
                      </LazyMount>
                    </BrowserFrame>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-y border-line">
        <div className="container-x flex flex-col justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <Link href="/portfolio" className="group inline-flex items-center gap-2 font-semibold">
            <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="link-underline">All work</span>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group sm:text-right">
            <span className="eyebrow block text-muted">Next project</span>
            <span className="font-display mt-1 inline-flex items-center gap-2 text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-bold tracking-[-0.03em]">
              {next.name}
              <ArrowUpRight aria-hidden className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </nav>

      <FinalCta title="Have a similar project in mind?" text="Let's talk about what you want to build and how we can bring it to life." />
    </>
  );
}
