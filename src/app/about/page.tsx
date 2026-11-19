import type { Metadata } from "next";
import Image from "next/image";
import { whatsappLink } from "@/lib/contact";
import { MessagesSquare, Ruler, Hammer, LifeBuoy, UserRound } from "lucide-react";
import { values } from "@/data/content";
import { siteConfig } from "@/config/site";
import { coFounderSchema, createMetadata, personSchema } from "@/lib/seo";
import { coFounder } from "@/data/team";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, SectionIndex } from "@/components/ui/Section";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = createMetadata({
  title: "About Us — An Independent, Founder-led Technology Company",
  description:
    "ANH Tech is an independent, founder-led digital technology company combining software engineering, creative design and digital growth to help businesses worldwide turn ideas into reliable digital solutions.",
  path: "/about",
});

const principles = [
  { icon: MessagesSquare, title: "Listen first", text: "We start with your business, your customers and your constraints, not with a technology we want to use." },
  { icon: Ruler, title: "Explain clearly", text: "Technical decisions are explained in plain language, with honest trade-offs, so you can decide with confidence." },
  { icon: Hammer, title: "Build properly", text: "Clean architecture, tested code and careful design: work that remains reliable long after launch." },
  { icon: LifeBuoy, title: "Stay involved", text: "Launch is a milestone, not the end. We provide the post-launch support we agree on together." },
];

export default function AboutPage() {
  const founderName = siteConfig.founder.name;
  const founderPhoto = siteConfig.founder.photo;
  return (
    <>
      <JsonLd data={[personSchema(), coFounderSchema()]} />
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About ANH Tech"
        title="Technology With a Human Approach."
        lead="ANH Tech was founded with a simple belief: technology should solve real problems, create meaningful experiences, and help businesses move forward."
        aside={
          <div className="on-dark relative overflow-hidden rounded-[1.75rem] bg-forest p-8 text-white">
            <div aria-hidden className="bg-grid-dark absolute inset-0" />
            <div className="relative">
              <LogoMark inverted className="h-12 w-12" />
              <p className="font-display mt-10 text-[1.6rem] font-bold leading-tight tracking-[-0.03em]">
                “You work directly with the engineer who understands, designs and builds your solution.”
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                {founderPhoto ? (
                  <Image src={founderPhoto} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-lime" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-ink">
                    <UserRound aria-hidden className="h-5 w-5" />
                  </span>
                )}
                <div className="text-sm">
                  <p className="font-semibold">{founderName ?? "Founder-led"}</p>
                  <p className="text-white/60">{siteConfig.founder.role}</p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ButtonLink href="/contact" size="lg">
          Start a Project
        </ButtonLink>
      </PageHero>

      {/* Our story */}
      <section aria-labelledby="story-title" className="border-t border-line py-24 lg:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <SectionIndex index="01" label="Our story" />
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="story-title" className="display-md max-w-4xl">
                Practical engineering, creative thinking, and solutions built around <span className="mark-lime">each client&apos;s needs.</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Reveal>
                <p className="leading-relaxed text-ink-soft">
                  As an independent technology company led by a software engineer, we bring together practical engineering, creative thinking, and a commitment to building solutions around each client&apos;s needs.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="leading-relaxed text-ink-soft">
                  Many businesses have strong ideas but struggle to find a partner who listens carefully, explains clearly and builds things properly. ANH Tech exists to be that partner: bringing software, design and digital growth together so clients don&apos;t have to coordinate between separate providers.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the founder */}
      {founderPhoto && (
        <section aria-labelledby="meet-founder-title" className="border-y border-line bg-paper py-24 lg:py-32">
          <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div aria-hidden className="absolute -left-4 -top-4 h-2/3 w-2/3 rounded-[2rem] bg-lime sm:-left-6 sm:-top-6" />
              <div aria-hidden className="bg-dots absolute -bottom-6 -right-6 hidden h-40 w-40 rounded-3xl opacity-70 sm:block" />
              <figure className="relative overflow-hidden rounded-[1.75rem] border border-line bg-mist shadow-[0_40px_80px_-40px_rgb(23_25_24/0.45)]">
                <Image
                  src={founderPhoto}
                  alt={founderName ? `${founderName}, ${siteConfig.founder.role} of ANH Tech` : `${siteConfig.founder.role} of ANH Tech`}
                  width={900}
                  height={1050}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-auto w-full"
                />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-paper/95 px-5 py-4">
                  <div>
                    <p className="font-display text-lg font-bold leading-tight tracking-[-0.02em]">{founderName ?? "ANH Tech"}</p>
                    <p className="text-[0.85rem] text-ink-soft">{siteConfig.founder.role}</p>
                  </div>
                  <LogoMark className="h-9 w-9" />
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <SectionIndex index="02" label="Meet the founder" />
                <h2 id="meet-founder-title" className="display-md mt-5">
                  {founderName ? (
                    <>
                      Hi, I&apos;m {founderName}. <span className="text-muted">I lead every project personally.</span>
                    </>
                  ) : (
                    <>
                      Led by an engineer. <span className="text-muted">Involved in every project.</span>
                    </>
                  )}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="lead mt-8">
                  {founderName
                    ? `ANH Tech is led by ${founderName}, its ${siteConfig.founder.role}: a software engineer who works directly with every client, from the first conversation to launch and beyond.`
                    : "ANH Tech is led by its CEO & Founder, a software engineer who works directly with every client, from the first conversation to launch and beyond."}
                </p>
                <p className="mt-5 leading-relaxed text-ink-soft">
                  That means the person who understands your goals is the same person shaping the architecture, reviewing the design and making sure the details are right. It&apos;s how we&apos;ve delivered websites, SaaS platforms and business applications for clients in the UAE, Saudi Arabia, the United States and beyond.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <blockquote className="mt-10 border-l-2 border-lime pl-6">
                  <p className="font-display text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] font-semibold leading-snug tracking-[-0.02em]">
                    “Technology should solve real problems, create meaningful experiences, and help businesses move forward.”
                  </p>
                  <footer className="mt-3 text-sm text-muted">
                    {founderName ? `${founderName}, ` : ""}
                    {siteConfig.founder.role}
                  </footer>
                </blockquote>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href="/contact">Start a Project</ButtonLink>
                  {whatsappLink() && (
                    <ButtonLink href={whatsappLink()!} variant="outline" arrow={false}>
                      Chat on WhatsApp
                    </ButtonLink>
                  )}
                  {siteConfig.founder.linkedin && (
                    <ButtonLink href={siteConfig.founder.linkedin} variant="ghost" arrow={false}>
                      Connect on LinkedIn
                    </ButtonLink>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Meet the co-founder */}
      <section aria-labelledby="meet-cofounder-title" className="py-24 lg:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:col-start-8 lg:max-w-none">
            <div aria-hidden className="absolute -right-4 -top-4 h-2/3 w-2/3 rounded-[2rem] bg-forest sm:-right-6 sm:-top-6" />
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-line bg-mist shadow-[0_40px_80px_-40px_rgb(23_25_24/0.45)]">
              <Image
                src={coFounder.photo.src}
                alt={`${coFounder.name}, ${coFounder.role} of ANH Tech`}
                width={coFounder.photo.width}
                height={coFounder.photo.height}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-auto w-full"
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-paper/95 px-5 py-4">
                <div>
                  <p className="font-display text-lg font-bold leading-tight tracking-[-0.02em]">{coFounder.name}</p>
                  <p className="text-[0.85rem] text-ink-soft">{coFounder.role}</p>
                </div>
                <LogoMark className="h-9 w-9" />
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:order-1 lg:col-span-7">
            <Reveal>
              <SectionIndex index="03" label="Meet the co-founder" />
              <h2 id="meet-cofounder-title" className="display-md mt-5">
                {coFounder.name}. <span className="text-muted">Building relationships that help businesses grow.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lead mt-8">{coFounder.headline}</p>
              {coFounder.bio.map((para) => (
                <p key={para.slice(0, 24)} className="mt-5 leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="eyebrow mt-10 text-muted">What he does</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {coFounder.focus.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.95rem] leading-snug">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime ring-4 ring-lime/25" />
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="eyebrow mt-8 text-muted">Who he works with</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coFounder.worksWith.map((w) => (
                  <li key={w} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm">
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap gap-3">
                {coFounder.linkedin && (
                  <ButtonLink href={coFounder.linkedin} arrow={false}>
                    Connect on LinkedIn
                  </ButtonLink>
                )}
                {coFounder.email && (
                  <ButtonLink href={`mailto:${coFounder.email}?subject=${encodeURIComponent("Partnership inquiry")}`} variant="outline" arrow={false}>
                    Email Saqib
                  </ButtonLink>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="pb-24 lg:pb-32">
        <div className="container-x grid gap-4 lg:grid-cols-2">
          <Reveal className="on-dark relative overflow-hidden rounded-[1.75rem] bg-forest p-8 text-white sm:p-12">
            <div aria-hidden className="grid-fade-dark absolute inset-0 [--fade:linear-gradient(to_top,transparent,var(--color-forest))]" />
            <div className="relative">
              <p className="eyebrow text-lime">Our mission</p>
              <h2 className="sr-only">Mission</h2>
              <p className="font-display mt-8 text-[clamp(1.5rem,1.2rem+1.2vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                To help individuals and businesses transform ideas into reliable, useful, and beautifully crafted digital solutions.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[1.75rem] bg-lime p-8 sm:p-12">
            <p className="eyebrow text-forest">Our vision</p>
            <h2 className="sr-only">Vision</h2>
            <p className="font-display mt-8 text-[clamp(1.5rem,1.2rem+1.2vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
              To make high-quality technology and creative digital solutions accessible to ambitious businesses around the world.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="border-y border-line bg-paper py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading index="04" label="Our values" title={<span id="values-title">What we stand for.</span>} intro="Six values guide every recommendation we make and every line of code we write." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.06} className="group bg-paper p-8 transition-colors hover:bg-canvas lg:p-10">
                <span className="font-mono text-sm text-forest">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-6 text-[1.5rem] font-bold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="how-title" className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading index="05" label="How we work" title={<span id="how-title">Simple principles, applied consistently.</span>} />
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.07} className="rounded-[1.5rem] border border-line bg-paper p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-forest">
                  <p.icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-6 text-xl font-bold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Founder-led approach */}
      <section aria-labelledby="founder-title" className="on-dark relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div aria-hidden className="grid-fade-dark absolute inset-0 [--fade:radial-gradient(ellipse_at_top_right,transparent,var(--color-ink)_70%)]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionIndex index="06" label="Founder-led" dark />
            <h2 id="founder-title" className="display-md mt-5">
              The person you talk to is the person <span className="text-lime">who builds it.</span>
            </h2>
          </Reveal>
          <div className="space-y-8 lg:col-span-6 lg:col-start-7">
            {[
              ["No hand-offs", "Requirements aren't passed through account managers. Nothing gets lost in translation between what you need and what gets built."],
              ["Real technical judgement", "You get engineering advice from someone who writes the code, so estimates, trade-offs and recommendations are grounded in reality."],
              ["Personal accountability", "One point of responsibility for quality, communication and delivery, from first conversation to post-launch support."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="border-t border-white/10 pt-6">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{t}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{d}</p>
              </Reveal>
            ))}
            <Reveal>
              <TextLink href="/services" className="text-white">
                See what we can build together
              </TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta title="Let's build something meaningful." text="Tell us about your idea or challenge. We'll listen, ask the right questions, and suggest a clear way forward." />
    </>
  );
}
