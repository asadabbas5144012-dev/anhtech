/**
 * ANH Tech — central site configuration.
 *
 * Everything public-facing about the company lives here: identity, domain,
 * contact channels, social profiles, availability and default SEO.
 *
 * RULES
 * - Leave a value as `null` / empty until the real detail exists.
 *   Components automatically hide channels that are not configured, so the
 *   site never shows invented contact details.
 * - Never put secrets here. This file ships to the browser.
 *   Server-only secrets (email provider keys, etc.) belong in `.env.local`.
 */

/** Public site URL. Set NEXT_PUBLIC_SITE_URL once the domain is decided. */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export type AvailabilityStatus = "open" | "selected" | "limited" | "closed";

export const siteConfig = {
  name: "ANH Tech",
  legalName: "ANH Tech", // update if the registered legal name differs
  tagline: "Ideas into Digital Reality.",
  message: "Technology. Creativity. Growth.",
  promise:
    "From your first idea to a fully realized digital solution, ANH Tech helps you build, launch, and grow with confidence.",
  footerTagline: "Building what's next.",
  description:
    "ANH Tech is an independent digital technology company offering custom software, web and mobile app development, graphic design, Meta ads management and SEO services for businesses worldwide.",

  /** Canonical origin, e.g. https://example.com — driven by NEXT_PUBLIC_SITE_URL. */
  url: siteUrl,
  /** True once a real domain has been configured. Used to keep previews out of search indexes. */
  isProductionDomain: Boolean(process.env.NEXT_PUBLIC_SITE_URL),

  locale: "en",
  /** Markets the company serves. Used in copy and structured data (areaServed). */
  markets: ["Pakistan", "United States", "United Kingdom", "United Arab Emirates", "Canada", "Australia"],

  /**
   * Availability indicator shown in the hero and contact page.
   * Set `show: false` to hide it entirely.
   */
  availability: {
    show: true,
    status: "selected" as AvailabilityStatus,
    label: "Available for selected projects",
  },

  /** Founder details — leave name null to keep the About page anonymous and omit Person schema. */
  founder: {
    name: "Asad Abbas" as string | null,
    role: "CEO & Founder",
    /** Professional portrait (background replaced). */
    photo: "/assets/team/founder-portrait.webp" as string | null,
    linkedin: "https://www.linkedin.com/in/asad-abbas-285815425/" as string | null,
  },

  /**
   * Contact channels. Fill in real details only.
   * - email: public inbox shown on the site (e.g. "hello@yourdomain.com")
   * - whatsapp: international format digits only, no "+" or spaces (e.g. "923001234567")
   * - phone: display format (e.g. "+92 300 1234567")
   */
  contact: {
    email: "anh.techofficial@gmail.com" as string | null,
    whatsapp: "923245144012" as string | null,
    whatsappDisplay: "+92 324 5144012",
    phone: null as string | null,
    /** Shown on the contact page. Keep generic unless there is a real office. */
    location: "Working with clients worldwide",
    responseTime: "We aim to reply to new inquiries within 1–2 business days.",
    whatsappMessage:
      "Hello ANH Tech, I'd like to discuss a project. Here's a quick overview:",
  },

  /** Social profiles. Only configured links are rendered. */
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
    x: null as string | null,
    github: null as string | null,
    behance: null as string | null,
    dribbble: null as string | null,
  },

  seo: {
    titleTemplate: "%s | ANH Tech",
    defaultTitle: "ANH Tech — Software, Web & Mobile Development, Design and Digital Growth",
    keywords: [
      "digital solutions company",
      "software development company",
      "custom software development",
      "web development services",
      "web application development",
      "mobile app development company",
      "digital marketing services",
      "SEO services",
      "graphic design services",
    ],
    /** Optional @handle for Twitter/X cards. */
    twitterHandle: null as string | null,
  },

  legal: {
    lastUpdated: "2026-11-17",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
