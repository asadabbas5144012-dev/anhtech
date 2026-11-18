import { differentiators } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="on-dark relative overflow-hidden bg-forest py-24 text-white lg:py-36">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <SectionHeading
          dark
          index="04"
          label="Why ANH Tech"
          title={
            <span id="why-title">
              Thoughtful Technology. <span className="text-lime">Practical Results.</span>
            </span>
          }
          intro="An independent, founder-led company means you get senior technical thinking, direct communication and genuine care for the outcome, not a hand-off between departments."
        />

        <ul className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal
              as="li"
              key={d.title}
              delay={(i % 3) * 0.08}
              className="group relative border-b border-white/10 py-10 sm:px-8 sm:odd:border-r sm:odd:pl-0 lg:border-r lg:px-10 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <span className="font-mono text-sm text-lime">{String(i + 1).padStart(2, "0")}.</span>
              <h3 className="font-display mt-6 text-[1.4rem] font-bold leading-tight tracking-[-0.025em]">{d.title}</h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/65">{d.text}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-px w-0 bg-lime transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
