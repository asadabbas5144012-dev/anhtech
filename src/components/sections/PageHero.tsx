import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

/** Standard inner-page hero: breadcrumbs, eyebrow, animated H1, lead and optional actions/aside. */
export function PageHero({ crumbs, eyebrow, title, lead, children, aside, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44", className)}>
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_80%_0%,black,transparent)]" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-10 grid gap-10", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(aside ? "lg:col-span-7" : "max-w-5xl")}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="display-lg mt-6">
              <RevealWords text={title} />
            </h1>
            {lead && (
              <Reveal delay={0.2}>
                <p className="lead mt-7 max-w-2xl">{lead}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.3}>
                <div className="mt-9 flex flex-wrap gap-3">{children}</div>
              </Reveal>
            )}
          </div>
          {aside && (
            <Reveal delay={0.25} className="lg:col-span-5">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
