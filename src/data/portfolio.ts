import type { ServiceSlug } from "./services";

/**
 * Portfolio — centralised, editable project data.
 *
 * Images live in /public/work/<slug>/ (optimised WebP, generated from the
 * original screenshots in /design-source/portfolio-originals):
 *   preview.webp    tall image shown inside the browser frame on cards
 *   cover.webp      first screen of the site
 *   screen-N.webp   additional screens (gallery)
 *   full-page.webp  complete scrolling capture (optional)
 *
 * Write descriptions from what the project actually is and does.
 * Never add client results or metrics unless they are verified and approved.
 */

export type ProjectType = "client" | "internal" | "concept";
export type VisualKind = "dashboard" | "website" | "mobile" | "brand" | "software" | "growth";
export type FrameTone = "forest" | "mist" | "lime" | "ink";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  type: ProjectType;
  category: string;
  /** Market / location shown as a small label (optional). */
  location?: string;
  services: ServiceSlug[];
  description: string;
  /** What was delivered — shown as tags on cards. */
  scope: string[];
  /** Technologies — only list what was actually used. */
  stack?: string[];
  url?: string;
  featured?: boolean;
  /** Backdrop colour behind the browser frame on cards. */
  frame: FrameTone;
  images?: {
    preview: ProjectImage;
    cover: ProjectImage;
    gallery: ProjectImage[];
    fullPage?: ProjectImage;
  };
  /** Art-directed fallback when there are no screenshots (concept projects). */
  visual?: { kind: VisualKind; accent: string; tone: "light" | "dark" };
  caseStudy: {
    overview: string[];
    highlights: string[];
  };
}

export const projectTypeLabel: Record<ProjectType, string> = {
  client: "Client project",
  internal: "Product",
  concept: "Concept · Demonstration",
};

const img = (slug: string, file: string, width: number, height: number, alt: string): ProjectImage => ({
  src: `/work/${slug}/${file}`,
  width,
  height,
  alt,
});

export const projects: Project[] = [
  {
    slug: "app-idea-report",
    name: "App Idea Report",
    type: "client",
    category: "SaaS · Web Application",
    services: ["web-application-development", "website-development"],
    description:
      "An AI-powered SaaS platform that turns a short app idea into a professional validation report, covering market insight, competitor gaps and differentiation, in under a minute.",
    scope: ["SaaS platform", "Report generation", "Accounts & pricing", "Marketing website"],
    url: "https://appideareport.com/",
    featured: true,
    frame: "forest",
    images: {
      preview: img("app-idea-report", "preview.webp", 1000, 2600, "App Idea Report website: hero with idea input and report generator"),
      cover: img("app-idea-report", "cover.webp", 1341, 627, "App Idea Report homepage: “Validate your idea before you build”"),
      gallery: [img("app-idea-report", "screen-1.webp", 1329, 625, "App Idea Report use-case section for solo developers, agencies and non-technical founders")],
      fullPage: img("app-idea-report", "full-page.webp", 1000, 7287, "Full-page view of the App Idea Report website"),
    },
    caseStudy: {
      overview: [
        "App Idea Report helps founders, developers and agencies validate SaaS and mobile app ideas before investing in development. Users describe an idea and receive a structured validation report they can download and share.",
        "The product combines a conversion-focused marketing site with the application itself: idea submission, report generation, user accounts and pricing.",
      ],
      highlights: [
        "Instant idea-to-report flow from the homepage",
        "Market, competitor-gap and differentiation analysis",
        "Use-case journeys for solo developers, agencies and non-technical founders",
        "User accounts, login and pricing plans",
        "Downloadable, shareable reports",
      ],
    },
  },
  {
    slug: "safs-taxsafs",
    name: "SAFS: Smart Ample Financial Services",
    type: "client",
    category: "Finance · Corporate Website",
    location: "United Arab Emirates",
    services: ["website-development", "seo"],
    description:
      "A premium corporate website for a UAE accounting, tax, audit and advisory firm, designed to communicate trust and turn visitors into consultation bookings.",
    scope: ["Corporate website", "Bilingual branding", "Consultation booking", "Service pages"],
    url: "https://www.taxsafs.com/",
    featured: true,
    frame: "ink",
    images: {
      preview: img("safs-taxsafs", "preview.webp", 1000, 2600, "SAFS website: dark hero over the Dubai skyline"),
      cover: img("safs-taxsafs", "cover.webp", 1361, 635, "SAFS homepage: “Financial Clarity. Built for Business.”"),
      gallery: [img("safs-taxsafs", "screen-1.webp", 1362, 639, "SAFS website inner section")],
      fullPage: img("safs-taxsafs", "full-page.webp", 1000, 8819, "Full-page view of the SAFS website"),
    },
    caseStudy: {
      overview: [
        "Smart Ample Financial Services (SAFS) provides accounting, tax, audit and advisory services to businesses across the UAE.",
        "The website presents the firm with a confident, premium visual identity (dark tones, gold accents and editorial typography) and keeps a consultation booking one click away throughout.",
      ],
      highlights: [
        "Premium dark-and-gold design language",
        "Arabic and English brand presentation",
        "Clear service architecture: accounting, tax, audit, advisory",
        "Persistent “Book Consultation” calls to action",
        "Insights section and direct WhatsApp contact",
      ],
    },
  },
  {
    slug: "mha-solutions",
    name: "MHA Solutions",
    type: "client",
    category: "Engineering · Corporate Website",
    location: "Saudi Arabia",
    services: ["website-development"],
    description:
      "A corporate website for a Saudi engineering company delivering power, IT, security and electrical infrastructure solutions, with bilingual access and quote requests.",
    scope: ["Corporate website", "Arabic / English", "Service catalogue", "Quote requests"],
    url: "https://www.mhasolutions-sa.com/",
    featured: true,
    frame: "mist",
    images: {
      preview: img("mha-solutions", "preview.webp", 1000, 1394, "MHA Solutions website hero and company story"),
      cover: img("mha-solutions", "cover.webp", 1366, 633, "MHA Solutions homepage: “Architecting the Future of Critical Infrastructure”"),
      gallery: [
        img("mha-solutions", "screen-1.webp", 1351, 630, "MHA Solutions “Our Story” section"),
        img("mha-solutions", "screen-2.webp", 1365, 635, "MHA Solutions website section"),
      ],
    },
    caseStudy: {
      overview: [
        "MHA Solutions is an engineering partner serving industrial, commercial and government clients across Saudi Arabia in power systems, IT infrastructure, security and electrical engineering.",
        "The website organises a broad technical offering into clear service areas and supports both Arabic and English audiences, with prominent routes to request a quote.",
      ],
      highlights: [
        "Structured navigation for Power, Security and IT divisions",
        "Arabic language switch",
        "Strong corporate visual identity",
        "“Get a Quote” and WhatsApp contact paths",
        "Company story and credentials sections",
      ],
    },
  },
  {
    slug: "flying-zone",
    name: "Flying Zone Travel & Tours",
    type: "client",
    category: "Travel · Website",
    location: "Dubai, UAE",
    services: ["website-development"],
    description:
      "A travel agency website for a Dubai-based tour operator offering Umrah and Hajj journeys, flight tickets, visit visas and holiday packages, built around WhatsApp enquiries.",
    scope: ["Business website", "Package showcases", "WhatsApp lead capture", "Responsive design"],
    url: "https://www.flyingzone.ae/",
    frame: "lime",
    images: {
      preview: img("flying-zone", "preview.webp", 1000, 2600, "Flying Zone website hero and travel packages"),
      cover: img("flying-zone", "cover.webp", 1366, 634, "Flying Zone homepage: “Explore the World with Flying Zone”"),
      gallery: [img("flying-zone", "screen-1.webp", 1366, 644, "Flying Zone website section")],
      fullPage: img("flying-zone", "full-page.webp", 1000, 8056, "Full-page view of the Flying Zone website"),
    },
    caseStudy: {
      overview: [
        "Flying Zone Travel & Tours arranges Umrah journeys, flights, visit visas and holiday packages from Dubai.",
        "The website showcases tour packages clearly and makes WhatsApp the primary conversion path, matching how the agency's customers prefer to enquire.",
      ],
      highlights: [
        "Dedicated Umrah / Hajj, flights, visa and holiday sections",
        "Tour package showcases",
        "WhatsApp-first enquiry flow with a floating “WhatsApp an Expert” button",
        "Responsive layout for mobile travellers",
      ],
    },
  },
  {
    slug: "vulnguard-ai",
    name: "VulnGuard AI",
    type: "internal",
    category: "AI · Security Web Application",
    services: ["web-application-development", "custom-software-development"],
    description:
      "An AI-powered application that scans Python and JavaScript source code to find, rank and fix security vulnerabilities, with risk prediction, impact analysis and suggested code fixes.",
    scope: ["Web application", "Static code analysis", "ML risk scoring", "PDF reporting"],
    frame: "forest",
    images: {
      preview: img("vulnguard-ai", "preview.webp", 1000, 2294, "VulnGuard AI landing page and features"),
      cover: img("vulnguard-ai", "cover.webp", 1366, 854, "VulnGuard AI: “Find, rank and fix security vulnerabilities in your source code with AI”"),
      gallery: [
        img("vulnguard-ai", "screen-1.webp", 887, 632, "VulnGuard AI account creation screen"),
        img("vulnguard-ai", "screen-2.webp", 1363, 638, "VulnGuard AI landing page"),
        img("vulnguard-ai", "screen-3.webp", 1238, 604, "VulnGuard AI application screen"),
      ],
    },
    caseStudy: {
      overview: [
        "VulnGuard AI lets developers upload Python or JavaScript files and receive each detected vulnerability with a predicted risk level, an impact analysis and a suggested fix.",
        "It combines static analysis (AST and Tree-sitter parsing with taint tracking) with a machine-learning model that rates each finding from Low to Critical.",
      ],
      highlights: [
        "Detection of injection, exposed secrets, weak crypto and 20+ other CWE classes",
        "Random Forest model for risk prediction",
        "Impact analysis: attack vector, exploitability and business impact",
        "Line-level remediation with downloadable fixed files",
        "Rescan tracking and exportable PDF reports",
      ],
    },
  },
  {
    slug: "maiwand-grill",
    name: "Maiwand Grill",
    type: "client",
    category: "Restaurant · Website",
    location: "Baltimore, USA",
    services: ["website-development"],
    description:
      "A website for an Afghan restaurant in Baltimore, featuring a rich dine-in menu, online ordering, a downloadable menu and opening hours.",
    scope: ["Restaurant website", "Digital menu", "Online ordering link", "Responsive design"],
    url: "https://maiwand-grill.com/",
    frame: "mist",
    images: {
      preview: img("maiwand-grill", "preview.webp", 1000, 2600, "Maiwand Grill website hero and menu"),
      cover: img("maiwand-grill", "cover.webp", 1365, 630, "Maiwand Grill homepage: “Afghan flavors and ambiance for a perfect dining experience”"),
      gallery: [img("maiwand-grill", "screen-1.webp", 1366, 635, "Maiwand Grill dine-in menu")],
      fullPage: img("maiwand-grill", "full-page.webp", 1000, 9213, "Full-page view of the Maiwand Grill website"),
    },
    caseStudy: {
      overview: [
        "Maiwand Grill serves Afghan cuisine in Baltimore. The website sets the atmosphere with full-bleed food imagery and elegant serif typography.",
        "Guests can browse the full dine-in menu with prices, download the menu, check opening hours and order online.",
      ],
      highlights: [
        "Atmospheric hero with opening hours",
        "Structured dine-in menu with categories and prices",
        "“Order Online” and “Download Menu” calls to action",
        "Contact details and social links",
      ],
    },
  },
  {
    slug: "ziza-kabob",
    name: "Ziza Kabob",
    type: "client",
    category: "Restaurant · Website",
    location: "Maryland, USA",
    services: ["website-development"],
    description:
      "A multi-location restaurant website for a kabob grill, with a location switcher, online ordering, a downloadable menu and a bold, appetite-led design.",
    scope: ["Restaurant website", "Multi-location", "Online ordering link", "Mobile-ready"],
    url: "https://zizakabob.com/",
    frame: "lime",
    images: {
      preview: img("ziza-kabob", "preview.webp", 1000, 2600, "Ziza Kabob website hero with food gallery"),
      cover: img("ziza-kabob", "cover.webp", 1366, 628, "Ziza Kabob homepage: “Bold flavors straight from the grill”"),
      gallery: [
        img("ziza-kabob", "screen-1.webp", 1293, 562, "Ziza Kabob website section"),
        img("ziza-kabob", "screen-2.webp", 1361, 632, "Ziza Kabob website section"),
        img("ziza-kabob", "screen-3.webp", 458, 645, "Ziza Kabob website on mobile"),
      ],
      fullPage: img("ziza-kabob", "full-page.webp", 1000, 12247, "Full-page view of the Ziza Kabob website"),
    },
    caseStudy: {
      overview: [
        "Ziza Kabob is a kabob restaurant with more than one location. The website leads with vibrant food photography and makes ordering the obvious next step.",
        "A location switcher lets guests move between restaurants, while the menu, contact details and ordering stay one tap away on mobile.",
      ],
      highlights: [
        "Location switcher for multiple restaurants",
        "“Order Now” and “Download Menu” calls to action",
        "Food photography carousel",
        "Address, phone and email in the header",
        "Fully responsive mobile experience",
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const projectsForService = (slug: ServiceSlug) => projects.filter((p) => p.services.includes(slug));
