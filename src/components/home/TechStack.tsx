import { technologies } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function TechStack() {
  return (
    <section aria-labelledby="tech-title" className="border-y border-line bg-paper py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Technology"
          title={<span id="tech-title">Built With Modern Technology.</span>}
          intro="We choose tools for each project on merit (performance, maintainability and fit), not habit. These are the technologies we work with most."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line lg:mt-20 lg:grid-cols-4">
          {technologies.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.08} className="bg-paper p-6 sm:p-8">
              <h3 className="eyebrow text-muted">{g.group}</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-1">
                {g.items.map((t) => (
                  <li key={t.name} className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-mist">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas font-mono text-[0.78rem] font-semibold text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-lime">
                      {t.mark}
                    </span>
                    <span className="text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">{t.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
