import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { projectTypeLabel, type Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function ProjectTypeBadge({ project, className }: { project: Project; className?: string }) {
  const concept = project.type === "concept";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em]",
        concept ? "border-dashed border-ink/25 bg-paper/90 text-ink-soft" : "border-forest/20 bg-lime-soft text-forest",
        className,
      )}
    >
      {projectTypeLabel[project.type]}
    </span>
  );
}

/** Large editorial project card. `layout="wide"` for featured rows. */
export function ProjectCard({ project, layout = "stack", index }: { project: Project; layout?: "stack" | "wide"; index?: number }) {
  const href = `/portfolio/${project.slug}`;
  return (
    <article className={cn("group relative", layout === "wide" && "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12")}>
      <Link
        href={href}
        aria-label={`${project.name} — view case study`}
        className={cn(
          "relative block overflow-hidden rounded-[1.5rem] border border-line bg-mist",
          layout === "wide" ? "aspect-[16/11] lg:col-span-8 lg:aspect-[16/10]" : "aspect-[16/11]",
        )}
      >
        <ProjectVisual project={project} className="absolute inset-0" />
        <ProjectTypeBadge project={project} className="absolute left-4 top-4" />
        <span className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight aria-hidden className="h-5 w-5" />
        </span>
      </Link>

      <div className={cn(layout === "wide" ? "lg:col-span-4" : "mt-6")}>
        <div className="flex items-center gap-3 text-[0.8rem] text-muted">
          {index !== undefined && <span className="font-mono text-forest">{String(index + 1).padStart(2, "0")}</span>}
          <span>{project.category}</span>
          {project.location && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-line-strong" />
              <span>{project.location}</span>
            </>
          )}
        </div>
        <h3 className={cn("mt-3 font-display font-bold tracking-[-0.03em]", layout === "wide" ? "text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.05]" : "text-2xl")}>
          <Link href={href} className="link-underline">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Project scope">
          {project.scope.map((t) => (
            <li key={t} className="rounded-full border border-line bg-paper px-2.5 py-1 text-[0.75rem] text-ink-soft">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Link href={href} className="group/l inline-flex items-center gap-1.5 text-[0.9rem] font-semibold">
            <span className="link-underline">{project.type === "concept" ? "Explore the concept" : "View case study"}</span>
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
          </Link>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-muted hover:text-ink">
              Visit live site <ExternalLink aria-hidden className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
