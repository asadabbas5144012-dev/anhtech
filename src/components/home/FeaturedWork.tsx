import { Info } from "lucide-react";
import { featuredProjects } from "@/data/portfolio";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedWork() {
  const [first, ...rest] = featuredProjects;
  const hasConcepts = featuredProjects.some((p) => p.type === "concept");
  return (
    <section aria-labelledby="work-title" className="border-t border-line bg-paper py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Selected work"
          title={<span id="work-title">Selected Work. Built With Purpose.</span>}
          intro="Explore a selection of digital experiences, applications, and solutions developed through thoughtful engineering and creative execution."
        />

        {hasConcepts && (
          <Reveal>
            <p className="mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-dashed border-line-strong bg-canvas px-5 py-4 text-[0.88rem] leading-relaxed text-ink-soft">
              <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Projects marked “Concept · Demonstration” are self-initiated explorations that show how we think and build. They are not client engagements and make no claims about results.
            </p>
          </Reveal>
        )}

        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {first && (
            <Reveal>
              <ProjectCard project={first} layout="wide" index={0} />
            </Reveal>
          )}
          <div className="grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-12">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1} className={i === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20 flex justify-center">
          <ButtonLink href="/portfolio" variant="outline" size="lg">
            View All Work
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
