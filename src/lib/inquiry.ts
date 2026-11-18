/**
 * Project-inquiry schema + validation, shared by the client form and the API
 * route so the rules can never drift apart. Dependency-free on purpose.
 */
import { serviceOptions } from "@/data/services";

export const budgetOptions = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,500",
  "$7,500 – $15,000",
  "$15,000 – $30,000",
  "$30,000+",
  "Not sure yet",
] as const;

export const currencyOptions = ["USD", "GBP", "EUR", "AED", "CAD", "AUD", "PKR", "Other"] as const;

export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "3 – 6 months", "Flexible / not sure"] as const;

export const countrySuggestions = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
  "Australia",
  "Saudi Arabia",
  "Qatar",
  "Germany",
  "Ireland",
  "New Zealand",
  "Singapore",
];

export interface Inquiry {
  name: string;
  email: string;
  service: string;
  message: string;
  company: string;
  phone: string;
  country: string;
  budget: string;
  currency: string;
  timeline: string;
  website: string;
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const emptyInquiry: Inquiry = {
  name: "",
  email: "",
  service: "",
  message: "",
  company: "",
  phone: "",
  country: "",
  budget: "",
  currency: "USD",
  timeline: "",
  website: "",
};

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{6,25}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

const oneOf = (list: readonly string[], v: string) => v === "" || list.includes(v);

/** Trims and coerces unknown input into an Inquiry (unknown keys dropped). */
export function normalizeInquiry(input: unknown): Inquiry {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out = { ...emptyInquiry };
  (Object.keys(emptyInquiry) as (keyof Inquiry)[]).forEach((k) => {
    const v = src[k];
    out[k] = typeof v === "string" ? v.trim() : k === "currency" ? "USD" : "";
  });
  return out;
}

export function validateInquiry(d: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};
  if (d.name.length < 2) e.name = "Please enter your full name.";
  else if (d.name.length > 100) e.name = "Name is too long.";

  if (!d.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(d.email) || d.email.length > 254) e.email = "Please enter a valid email address.";

  if (!d.service) e.service = "Please choose the service you need.";
  else if (!(serviceOptions as readonly string[]).includes(d.service)) e.service = "Please choose a valid option.";

  if (!d.message) e.message = "Please tell us a little about your project.";
  else if (d.message.length < MESSAGE_MIN) e.message = `Please add a bit more detail (at least ${MESSAGE_MIN} characters).`;
  else if (d.message.length > MESSAGE_MAX) e.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  if (d.company.length > 120) e.company = "Company name is too long.";
  if (d.phone && !PHONE_RE.test(d.phone)) e.phone = "Please enter a valid phone or WhatsApp number.";
  if (d.country.length > 80) e.country = "Country is too long.";
  if (!oneOf(budgetOptions, d.budget)) e.budget = "Please choose a valid budget range.";
  if (!oneOf(currencyOptions, d.currency)) e.currency = "Please choose a valid currency.";
  if (!oneOf(timelineOptions, d.timeline)) e.timeline = "Please choose a valid timeline.";
  if (d.website && (!URL_RE.test(d.website) || d.website.length > 200)) e.website = "Please enter a valid website address.";
  return e;
}
