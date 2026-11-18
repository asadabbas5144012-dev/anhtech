import { siteConfig } from "@/config/site";

/** Builds a wa.me link with an optional prefilled message. Returns null if WhatsApp is not configured. */
export function whatsappLink(message: string = siteConfig.contact.whatsappMessage) {
  const raw = siteConfig.contact.whatsapp;
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject = "Project inquiry") {
  const email = siteConfig.contact.email;
  return email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : null;
}

export function telLink() {
  const phone = siteConfig.contact.phone;
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;
}

/** Best direct "talk to us" channel: WhatsApp → email → contact page. */
export function talkToUsHref() {
  return whatsappLink() ?? mailtoLink() ?? "/contact";
}

export const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  github: "GitHub",
  behance: "Behance",
  dribbble: "Dribbble",
};

export function configuredSocials() {
  return (Object.keys(siteConfig.social) as (keyof typeof siteConfig.social)[])
    .filter((k) => Boolean(siteConfig.social[k]))
    .map((k) => ({ key: k, label: socialLabels[k], href: siteConfig.social[k] as string }));
}
