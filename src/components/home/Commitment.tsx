import { Check, Quote } from "lucide-react";
import { commitments, testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Shows genuine testimonials when available; otherwise "Our Commitment". */
export function Commitment() {
  if (testimonials.length > 0) {
    return (
      <section aria-labelledby="testimonials-title" className="bg-mist py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading index="08" label="Client words" title={<span id="testimonials-title">What Clients Say.</span>} />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="rounded-[1.5rem] border border-line bg-paper p-8">
                <Quote aria-hidden className="h-6 w-6 text-forest" />
                <blockquote className="font-display mt-5 text-xl font-medium leading-snug tracking-[-0.02em]">“{t.quote}”</blockquote>
                <p className="mt-6 text-sm font-semibold">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.role}
                  {t.company ? `, ${t.company}` : ""}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="commitment-title" className="bg-mist py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          index="08"
          label="Our commitment"
          title={<span id="commitment-title">What You Can Expect, Every Time.</span>}
          intro="We'd rather show you how we work than tell you how good we are. These are the standards every project is held to."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20">
          {commitments.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={(i % 2) * 0.08}
              className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-paper p-8 transition-colors duration-500 hover:border-forest/30 lg:p-10"
            >
              <div className="flex items-start gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-[-10deg]">
                  <Check aria-hidden className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <div>
                  <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.025em]">{c.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
