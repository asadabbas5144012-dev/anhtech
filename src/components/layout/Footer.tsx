import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { mainNav } from "@/data/content";
import { configuredSocials, mailtoLink, telLink, whatsappLink } from "@/lib/contact";

export function Footer() {
  const socials = configuredSocials();
  const wa = whatsappLink();
  const email = siteConfig.contact.email;
  const phone = siteConfig.contact.phone;
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x relative pt-20 lg:pt-28">
        {/* Signature line */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-12 lg:items-end">
          <p className="display-lg lg:col-span-8">
            Building <span className="text-lime">what&apos;s next.</span>
          </p>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-white/20 py-2 pl-6 pr-2 text-[0.95rem] font-semibold transition-colors hover:border-lime"
            >
              Start a Project
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight aria-hidden className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
              An independent digital technology company bringing software engineering, creative design and digital growth together under one roof, for clients worldwide.
            </p>
            <p className="eyebrow mt-6 text-white/45">{siteConfig.message}</p>
          </div>

          <nav aria-label="Footer — company" className="lg:col-span-2">
            <h2 className="eyebrow text-white/45">Company</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline text-white/80 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services" className="lg:col-span-3">
            <h2 className="eyebrow text-white/45">Services</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-underline text-white/80 hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-white/45">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem] text-white/80">
              {email && (
                <li>
                  <a href={mailtoLink()!} className="link-underline inline-flex items-center gap-2.5 hover:text-white">
                    <Mail aria-hidden className="h-4 w-4 text-lime" /> {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={telLink()!} className="link-underline inline-flex items-center gap-2.5 hover:text-white">
                    <Phone aria-hidden className="h-4 w-4 text-lime" /> {phone}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2.5 hover:text-white">
                    <SocialIcon name="whatsapp" className="h-4 w-4 text-lime" /> WhatsApp {siteConfig.contact.whatsappDisplay}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2.5 text-white/65">
                <MapPin aria-hidden className="h-4 w-4 text-lime" /> {siteConfig.contact.location}
              </li>
              <li>
                <Link href="/contact" className="link-underline inline-flex items-center gap-1.5 font-semibold text-white">
                  Send a project inquiry <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                    >
                      <SocialIcon name={s.key} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/privacy-policy" className="link-underline hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="link-underline hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="font-display -mb-[0.2em] whitespace-nowrap text-center text-[18vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.04]">
          ANH Tech
        </p>
      </div>
    </footer>
  );
}
