import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { talkToUsHref } from "@/lib/contact";

interface FinalCtaProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function FinalCta({
  title = "Have Something in Mind?",
  text = "Let's discuss your idea, explore the possibilities, and build something that makes a difference.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
}: FinalCtaProps) {
  return (
    <section aria-labelledby="final-cta-title" className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal>
          <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-white sm:px-12 lg:rounded-[2.5rem] lg:px-20 lg:py-24">
            <div aria-hidden className="grid-fade-dark absolute inset-0 -z-10 [--fade:linear-gradient(to_left,transparent,var(--color-forest)_75%)]" />
            <svg aria-hidden viewBox="0 0 400 400" className="absolute -right-24 -top-24 -z-10 w-[26rem] opacity-80 lg:-right-10 lg:-top-10 lg:w-[32rem]">
              <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(200,241,105,0.25)" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(200,241,105,0.35)" strokeDasharray="4 8" />
              <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(200,241,105,0.5)" />
              <circle cx="200" cy="200" r="10" fill="#C8F169" />
            </svg>
            <div className="max-w-3xl">
              <h2 id="final-cta-title" className="display-lg">
                {title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={primaryHref} variant="lime" size="lg">
                  {primaryLabel}
                </ButtonLink>
                <ButtonLink href={talkToUsHref()} variant="outline-light" size="lg" arrow={false}>
                  Talk to Us
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
