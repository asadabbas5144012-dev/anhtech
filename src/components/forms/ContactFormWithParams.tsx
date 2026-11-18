"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

/** Reads ?service= so service-page CTAs can preselect the right option. */
export function ContactFormWithParams() {
  const params = useSearchParams();
  const service = params.get("service") ?? "";
  return <ContactForm key={service} initialService={service} />;
}
