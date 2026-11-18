import type { Metadata } from "next";
import { Info } from "lucide-react";
import { projects } from "@/data/portfolio";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = createMetadata({
  title: "Portfolio — Our Work in Software, Web, Mobile & Design",
  description:
    "Explore ANH Tech's work and concept projects across web applications, websites, mobile apps, custom software, branding and digital growth.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const hasConcepts = projects.some((p) => p.type === "concept");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
        eyebrow="Our work"
        title="Selected Work. Built With Purpose."
        lead="Digital experiences, applications and identities developed through thoughtful engineering and creative execution."
      >
        <ButtonLink href="/contact" size="lg">
          Start a Project
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="projects-title" className="border-t border-line pb-24 pt-16 lg:pb-32">
        <div className="container-x">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          {hasConcepts && (
            <Reveal>
              <p className="flex max-w-3xl items-start gap-3 rounded-2xl border border-dashed border-line-strong bg-paper px-5 py-4 text-[0.9rem] leading-relaxed text-ink-soft">
                <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                <span>
                  Projects labelled <strong className="font-semibold text-ink">Concept · Demonstration</strong> are self-initiated explorations that illustrate our design and engineering approach. They are not client engagements and include no client names or performance claims. Client work is published only with permission.
                </span>
              </p>
            </Reveal>
          )}
          <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-2 lg:gap-x-12">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-28" : undefined}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Your project could be next." text="Have an idea, a challenge, or a product to improve? Let's explore what we can build together." />
    </>
  );
}
