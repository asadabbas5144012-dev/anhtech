/**
 * Leadership team shown on the About page and published as Person schema.
 * The CEO & Founder lives in siteConfig.founder; additional leaders go here.
 * Only include real people with real, approved details.
 */

export interface TeamMember {
  name: string;
  role: string;
  photo: { src: string; width: number; height: number };
  email?: string;
  linkedin?: string;
  /** One-line summary shown under the name. */
  headline: string;
  bio: string[];
  focus: string[];
  worksWith: string[];
}

export const coFounder: TeamMember = {
  name: "Syed Saqib Sherazi",
  role: "Co-Founder & Head of Business Development",
  photo: { src: "/assets/team/cofounder-portrait.webp", width: 900, height: 965 },
  email: "syedsaqibsherazi4@gmail.com",
  linkedin: "https://www.linkedin.com/in/syed-saqib-sherazi-b27647304/",
  headline: "Helping businesses, agencies and entrepreneurs grow through strategic lead generation, digital marketing and outsourced web development.",
  bio: [
    "Saqib brings more than three years of experience in email marketing, B2B lead generation, LinkedIn outreach and prospect research, helping businesses connect with potential clients and create new opportunities.",
    "At ANH Tech he leads partnerships and client relationships, connecting businesses and agencies with reliable web development: business websites, e-commerce stores, custom web applications, dedicated remote developers and white-label development partnerships.",
    "His focus is on long-term relationships: helping companies scale their operations with solutions that support their growth.",
  ],
  focus: [
    "Email Marketing & Cold Email Campaigns",
    "LinkedIn Lead Generation & Outreach",
    "B2B Lead Research & Data Prospecting",
    "Social Media Management",
    "Web Development Lead Generation",
    "Website & E-commerce Development",
    "Custom Web Applications",
    "Remote Developers & White-Label Partnerships",
  ],
  worksWith: ["Small Business Owners", "Startups", "Digital Marketing Agencies", "Web Development Agencies", "Entrepreneurs"],
};
