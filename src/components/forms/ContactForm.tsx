"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { serviceOptions } from "@/data/services";
import {
  budgetOptions,
  countrySuggestions,
  currencyOptions,
  emptyInquiry,
  MESSAGE_MAX,
  timelineOptions,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { whatsappLink } from "@/lib/contact";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-xl border bg-paper px-4 text-[0.95rem] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 focus:ring-forest/10 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/10";

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.85rem] font-semibold text-ink">
        <span>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-forest">
              *
            </span>
          )}
        </span>
        {optional && <span className="text-[0.75rem] font-normal text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.78rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[0.8rem] font-medium text-red-700">
          <AlertCircle aria-hidden className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const uid = useId();
  const reduce = useReducedMotion();
  const preset = (serviceOptions as readonly string[]).includes(initialService) ? initialService : "";
  const [data, setData] = useState<Inquiry>({ ...emptyInquiry, service: preset });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Inquiry, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [startedAt] = useState(() => Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const id = (k: string) => `${uid}-${k}`;
  const set = (k: keyof Inquiry, v: string) => {
    const next = { ...data, [k]: v };
    setData(next);
    if (touched[k] || errors[k]) {
      const e = validateInquiry(next);
      setErrors((prev) => ({ ...prev, [k]: e[k] }));
    }
  };
  const blur = (k: keyof Inquiry) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const e = validateInquiry(data);
    setErrors((prev) => ({ ...prev, [k]: e[k] }));
  };
  const a11y = (k: keyof Inquiry, hint = false) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateInquiry(data);
    setErrors(v);
    setTouched(Object.fromEntries(Object.keys(data).map((k) => [k, true])));
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fax: honeypot.current?.value ?? "", startedAt }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: InquiryErrors };
      if (res.ok && json.ok) {
        setStatus("success");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerMessage(json.message || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  // Real fallback: hand the inquiry to the visitor's own email app or WhatsApp, prefilled.
  const details = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    data.company && `Company: ${data.company}`,
    data.phone && `Phone/WhatsApp: ${data.phone}`,
    data.country && `Country: ${data.country}`,
    data.budget && `Budget: ${data.budget} (${data.currency})`,
    data.timeline && `Timeline: ${data.timeline}`,
    data.website && `Website: ${data.website}`,
  ].filter(Boolean);
  const summary = `${details.join("\n")}\n\n${data.message}`;
  const email = siteConfig.contact.email;
  const wa = whatsappLink(`Hello ANH Tech, I'd like to discuss a project.\n\n${summary}`);
  const fallbackChannels = [
    email && {
      href: `mailto:${email}?subject=${encodeURIComponent(`Project inquiry: ${data.service || "General"}`)}&body=${encodeURIComponent(summary)}`,
      label: "Send by email instead",
    },
    wa && { href: wa, label: "Send on WhatsApp instead" },
  ].filter(Boolean) as { href: string; label: string }[];

  if (status === "success") {
    const first = data.name.split(" ")[0];
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className="rounded-[1.75rem] border border-line bg-paper p-8 sm:p-12"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime">
          <CheckCircle2 aria-hidden className="h-7 w-7 text-forest" />
        </span>
        <h2 className="display-sm mt-8">Thank you, {first}. Your inquiry has been received.</h2>
        <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
          We&apos;ll review your requirements for <strong className="font-semibold text-ink">{data.service}</strong> and reply to{" "}
          <strong className="font-semibold text-ink">{data.email}</strong>. {siteConfig.contact.responseTime}
        </p>
        <ol className="mt-8 space-y-3 border-t border-line pt-6 text-[0.95rem] text-ink-soft">
          <li className="flex gap-3">
            <span className="font-mono text-forest">01</span> We review your project details.
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-forest">02</span> We reply with questions or a time to talk.
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-forest">03</span> You receive a clear proposal with scope, timeline and cost.
          </li>
        </ol>
        <button
          type="button"
          onClick={() => {
            setData({ ...emptyInquiry });
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
          className="link-underline mt-8 text-sm font-semibold text-forest"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-req`} className="rounded-[1.75rem] border border-line bg-paper p-6 sm:p-10">
      <p id={`${uid}-req`} className="text-[0.8rem] text-muted">
        Fields marked <span className="text-forest">*</span> are required.
      </p>

      {/* Service selection — radio chips */}
      <fieldset className="mt-8" aria-describedby={errors.service ? `${id("service")}-error` : undefined}>
        <legend className="text-[0.85rem] font-semibold text-ink">
          Service required<span aria-hidden className="ml-0.5 text-forest">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {serviceOptions.map((opt) => {
            const checked = data.service === opt;
            return (
              <label
                key={opt}
                className={cn(
                  "relative cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-forest/20",
                  checked ? "border-forest bg-forest text-white" : "border-line-strong bg-paper text-ink-soft hover:border-ink hover:text-ink",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={opt}
                  checked={checked}
                  onChange={() => set("service", opt)}
                  className="sr-only"
                />
                {opt}
              </label>
            );
          })}
        </div>
        {errors.service && (
          <p id={`${id("service")}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-[0.8rem] font-medium text-red-700">
            <AlertCircle aria-hidden className="h-3.5 w-3.5" /> {errors.service}
          </p>
        )}
      </fieldset>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" required error={errors.name}>
          <input
            {...a11y("name")}
            type="text"
            autoComplete="name"
            required
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={cn(inputCls, "h-12 border-line-strong focus:border-forest")}
          />
        </Field>
        <Field id={id("email")} label="Email address" required error={errors.email}>
          <input
            {...a11y("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            className={cn(inputCls, "h-12 border-line-strong focus:border-forest")}
          />
        </Field>
        <Field id={id("company")} label="Company name" optional error={errors.company}>
          <input
            {...a11y("company")}
            type="text"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
            onBlur={() => blur("company")}
            className={cn(inputCls, "h-12 border-line-strong focus:border-forest")}
          />
        </Field>
        <Field id={id("phone")} label="Phone / WhatsApp" optional error={errors.phone} hint="Include your country code, e.g. +44">
          <input
            {...a11y("phone", true)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={cn(inputCls, "h-12 border-line-strong focus:border-forest")}
          />
        </Field>
        <Field id={id("country")} label="Country" optional error={errors.country}>
          <input
            {...a11y("country")}
            type="text"
            autoComplete="country-name"
            list={`${uid}-countries`}
            value={data.country}
            onChange={(e) => set("country", e.target.value)}
            onBlur={() => blur("country")}
            className={cn(inputCls, "h-12 border-line-strong focus:border-forest")}
          />
          <datalist id={`${uid}-countries`}>
            {countrySuggestions.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field id={id("website")} label="Current website" optional error={errors.website}>
          <input
            {...a11y("website")}
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            value={data.website}
            onChange={(e) => set("website", e.target.value)}
            onBlur={() => blur("website")}
            className={cn(inputCls, "h-12 border-line-strong focus:border-forest")}
          />
        </Field>

        <Field id={id("budget")} label="Estimated budget (USD equivalent)" optional error={errors.budget} hint="An approximate range helps us suggest the right approach.">
          <select
            {...a11y("budget", true)}
            value={data.budget}
            onChange={(e) => set("budget", e.target.value)}
            className={cn(inputCls, "h-12 appearance-none border-line-strong bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23737873%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10 focus:border-forest")}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field id={id("currency")} label="Preferred currency" optional error={errors.currency} hint="We can quote in your local currency.">
          <select
            {...a11y("currency", true)}
            value={data.currency}
            onChange={(e) => set("currency", e.target.value)}
            className={cn(inputCls, "h-12 appearance-none border-line-strong bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23737873%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10 focus:border-forest")}
          >
            {currencyOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id={id("timeline")} label="Project timeline" optional error={errors.timeline} className="sm:col-span-2">
          <select
            {...a11y("timeline")}
            value={data.timeline}
            onChange={(e) => set("timeline", e.target.value)}
            className={cn(inputCls, "h-12 appearance-none border-line-strong bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23737873%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10 focus:border-forest")}
          >
            <option value="">Select a timeline</option>
            {timelineOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field id={id("message")} label="Project description" required error={errors.message} className="sm:col-span-2">
          <textarea
            {...a11y("message", true)}
            required
            rows={6}
            maxLength={MESSAGE_MAX}
            placeholder="What would you like to build or improve? Who is it for, and what does success look like?"
            value={data.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            className={cn(inputCls, "resize-y border-line-strong py-3 leading-relaxed focus:border-forest")}
          />
          <p id={`${id("message")}-hint`} className={cn("mt-1.5 text-right text-[0.75rem] text-muted", errors.message && "sr-only")} aria-live="polite">
            {data.message.length} / {MESSAGE_MAX}
          </p>
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-fax`}>Leave this field empty</label>
        <input ref={honeypot} id={`${uid}-fax`} type="text" name="fax" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <AnimatePresence>
        {status === "error" && serverMessage && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-8 overflow-hidden rounded-xl border border-red-200 bg-red-50 p-4 text-[0.9rem] text-red-800"
          >
            <p className="flex items-start gap-2 font-medium">
              <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              {serverMessage}
            </p>
            {fallbackChannels.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2 pl-6">
                {fallbackChannels.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="inline-flex h-10 items-center rounded-full bg-forest px-4 text-[0.85rem] font-semibold text-white transition-colors hover:bg-forest-deep" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col-reverse items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.78rem] leading-relaxed text-muted">
          By submitting, you agree that we may use these details to respond to your inquiry, as described in our{" "}
          <a href="/privacy-policy" className="underline hover:text-ink">
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="group/btn inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-forest px-7 text-[0.95rem] font-semibold text-white transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Inquiry
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover/btn:rotate-45">
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
