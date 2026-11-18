import { Plus } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/seo";

/** Accessible FAQ list built on native <details> — works without JavaScript. */
export function Faq({ faqs, withSchema = true }: { faqs: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
              <h3 className="font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.015em] sm:text-[1.2rem]">{f.q}</h3>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:border-forest group-open:bg-forest group-open:text-lime">
                <Plus aria-hidden className="h-4 w-4" />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 pr-12 text-[0.98rem] leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
