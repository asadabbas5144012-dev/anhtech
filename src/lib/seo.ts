import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/config/site";

interface PageSeo {
  title?: string;
  description?: string;
  path: string;
  keywords?: string[];
  /** Use the absolute title (no template). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/** Builds consistent per-page metadata: title, description, canonical, OG & Twitter. */
export function createMetadata({ title, description, path, keywords, absoluteTitle, noIndex }: PageSeo): Metadata {
  const desc = description ?? siteConfig.description;
  const fullTitle = title ? (absoluteTitle ? title : `${title} | ${siteConfig.name}`) : siteConfig.seo.defaultTitle;
  // Page-level openGraph replaces the inherited one, so re-attach the shared image explicitly.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name}: ${siteConfig.tagline}` };

  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : { absolute: siteConfig.seo.defaultTitle },
    description: desc,
    keywords: keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      locale: "en",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [image.url],
      ...(siteConfig.seo.twitterHandle ? { site: siteConfig.seo.twitterHandle } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------------- Structured data (JSON-LD) ---------------- */

const sameAs = () => Object.values(siteConfig.social).filter(Boolean) as string[];

export function organizationSchema() {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: siteConfig.markets.map((name) => ({ "@type": "Country", name })),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email || contact.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            ...(contact.email ? { email: contact.email } : {}),
            ...(contact.phone ? { telephone: contact.phone } : {}),
            availableLanguage: ["English"],
          },
        }
      : {}),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
    ...(siteConfig.founder.name
      ? { founder: { "@type": "Person", name: siteConfig.founder.name, jobTitle: siteConfig.founder.role } }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function personSchema() {
  if (!siteConfig.founder.name) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    ...(siteConfig.founder.photo ? { image: absoluteUrl(siteConfig.founder.photo) } : {}),
    worksFor: { "@id": absoluteUrl("/#organization") },
    ...(siteConfig.founder.linkedin ? { sameAs: [siteConfig.founder.linkedin] } : {}),
  };
}

export function serviceSchema(s: { title: string; description: string; path: string; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    category: s.category,
    description: s.description,
    url: absoluteUrl(s.path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: siteConfig.markets.map((name) => ({ "@type": "Country", name })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
