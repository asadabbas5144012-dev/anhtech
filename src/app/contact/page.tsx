import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Globe2, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { configuredSocials, mailtoLink, telLink, whatsappLink } from "@/lib/contact";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Availability } from "@/components/ui/Availability";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactFormWithParams } from "@/components/forms/ContactFormWithParams";

export const metadata: Metadata = createMetadata({
  title: "Contact Us — Start Your Project",
  description:
    "Tell ANH Tech about your idea or project. Get in touch about website development, web and mobile apps, custom software, design, Meta ads or SEO. We work with clients worldwide.",
  path: "/contact",
});

const nextSteps = [
  { t: "We review your inquiry", d: "Every inquiry is read personally, with no automated sales funnel." },
  { t: "A focused conversation", d: "We ask the right questions to understand your goals and constraints." },
  { t: "A clear proposal", d: "Scope, approach, timeline and cost in writing, before any commitment." },
];

export default function ContactPage() {
  const { email, phone } = siteConfig.contact;
  const wa = whatsappLink();
  const socials = configuredSocials();

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-32 sm:pt-36 lg:pt-44">
        <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 [--fade:radial-gradient(ellipse_70%_60%_at_80%_0%,transparent,var(--color-canvas))]" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-10 max-w-5xl">
            <Eyebrow>Start a project</Eyebrow>
            <h1 className="display-lg mt-6">
              <RevealWords text="Let's Build Something Great Together." />
            </h1>
            <div>
              <p className="lead mt-7 max-w-2xl">
                Tell us about your idea, business challenge, or next digital project. We&apos;ll review your requirements and discuss the right approach.
              </p>
              <Availability className="mt-7" />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Project inquiry" className="pb-24 lg:pb-32">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8" id="form">
            <h2 className="sr-only">Project inquiry form</h2>
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </Reveal>

          <aside className="space-y-4 lg:col-span-4" aria-label="Other ways to reach us">
            <div className="lg:sticky lg:top-28 lg:space-y-4">
              {wa && (
                <Reveal className="on-dark mb-4 rounded-[1.5rem] bg-forest p-7 text-white lg:mb-0">
                  <p className="eyebrow text-lime">Prefer to chat?</p>
                  <p className="font-display mt-3 text-xl font-bold tracking-tight">Message us on WhatsApp</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">Start a conversation with a prefilled message. Just add a few details about your project.</p>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-12 items-center gap-2.5 rounded-full bg-lime px-5 text-sm font-semibold text-ink transition-colors hover:bg-white"
                  >
                    <SocialIcon name="whatsapp" className="h-4 w-4" /> Open WhatsApp
                  </a>
                </Reveal>
              )}

              <Reveal className="mb-4 rounded-[1.5rem] border border-line bg-paper p-7 lg:mb-0">
                <h3 className="eyebrow text-muted">Direct contact</h3>
                <ul className="mt-5 space-y-4 text-[0.95rem]">
                  {email && (
                    <li>
                      <a href={mailtoLink()!} className="flex items-center gap-3 font-semibold hover:text-forest">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-forest">
                          <Mail aria-hidden className="h-4 w-4" />
                        </span>
                        <span className="link-underline break-all">{email}</span>
                      </a>
                    </li>
                  )}
                  {wa && (
                    <li>
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold hover:text-forest">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-forest">
                          <SocialIcon name="whatsapp" className="h-4 w-4" />
                        </span>
                        <span className="link-underline">{siteConfig.contact.whatsappDisplay}</span>
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={telLink()!} className="flex items-center gap-3 font-semibold hover:text-forest">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-forest">
                          <Phone aria-hidden className="h-4 w-4" />
                        </span>
                        <span className="link-underline">{phone}</span>
                      </a>
                    </li>
                  )}
                  <li className="flex items-center gap-3 text-ink-soft">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-forest">
                      <Globe2 aria-hidden className="h-4 w-4" />
                    </span>
                    {siteConfig.contact.location}
                  </li>
                  <li className="flex items-start gap-3 text-ink-soft">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-forest">
                      <Clock aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="pt-1.5 text-[0.9rem] leading-relaxed">{siteConfig.contact.responseTime}</span>
                  </li>
                </ul>
                {socials.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6" aria-label="Social media">
                    {socials.map((s) => (
                      <li key={s.key}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-forest hover:bg-forest hover:text-lime"
                        >
                          <SocialIcon name={s.key} className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>

              <Reveal className="rounded-[1.5rem] border border-line bg-mist p-7">
                <h3 className="eyebrow text-muted">What happens next</h3>
                <ol className="mt-5 space-y-5">
                  {nextSteps.map((s, i) => (
                    <li key={s.t} className="flex gap-4">
                      <span className="font-mono text-sm text-forest">0{i + 1}</span>
                      <div>
                        <p className="font-semibold">{s.t}</p>
                        <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-soft">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
