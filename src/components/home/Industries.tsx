import { industries } from "@/data/content";
import { SectionIndex } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="py-24 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionIndex index="07" label="Industries" />
              <h2 id="industries-title" className="display-md mt-5">
                Digital Solutions Across Industries.
              </h2>
              <p className="lead mt-6 max-w-md">
                Every industry has its own customers, workflows and expectations. We take time to understand yours, then tailor the solution to fit, rather than forcing a template.
              </p>
              <p className="mt-6 max-w-md text-[0.85rem] leading-relaxed text-muted">
                Where a project involves industry-specific regulation, we&apos;ll discuss requirements openly and work alongside your compliance advisers.
              </p>
            </Reveal>
          </div>
        </div>
        <ul className="border-t border-line lg:col-span-7">
          {industries.map((ind, i) => (
            <Reveal
              as="li"
              key={ind.name}
              delay={(i % 4) * 0.05}
              className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-line py-6 transition-colors sm:grid-cols-[3rem_1fr_auto]"
            >
              <span className="font-mono text-sm text-muted transition-colors group-hover:text-forest">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-bold tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                {ind.name}
              </h3>
              <p className="col-start-2 mt-1 text-[0.9rem] text-ink-soft sm:col-start-3 sm:mt-0 sm:text-right">{ind.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
