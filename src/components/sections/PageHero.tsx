import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { RevealWords } from "@/components/ui/Reveal";
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
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 [--fade:radial-gradient(ellipse_70%_60%_at_80%_0%,transparent,var(--color-canvas))]" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-10 grid gap-10", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(aside ? "lg:col-span-7" : "max-w-5xl")}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="display-lg mt-6">
              <RevealWords text={title} />
            </h1>
            {lead && (
              <div className="animate-rise" style={{ animationDelay: "0.2s" }}>
                <p className="lead mt-7 max-w-2xl">{lead}</p>
              </div>
            )}
            {children && (
              <div className="animate-rise" style={{ animationDelay: "0.3s" }}>
                <div className="mt-9 flex flex-wrap gap-3">{children}</div>
              </div>
            )}
          </div>
          {aside && (
            <div className="animate-rise lg:col-span-5" style={{ animationDelay: "0.25s" }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
