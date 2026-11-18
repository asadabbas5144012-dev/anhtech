import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Readable legal document layout with a sticky table of contents. */
export function LegalPage({ title, path, intro, sections }: { title: string; path: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <>
      <section className="pb-12 pt-32 sm:pt-36 lg:pt-44">
        <div className="container-x">
          <Breadcrumbs items={[{ name: title, path }]} />
          <Eyebrow className="mt-10">Legal</Eyebrow>
          <h1 className="display-lg mt-6">{title}</h1>
          <p className="mt-6 text-sm text-muted">Last updated: {fmt(siteConfig.legal.lastUpdated)}</p>
        </div>
      </section>
      <section className="border-t border-line pb-24 pt-14 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 space-y-2.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-muted hover:text-ink">
                    <span className="font-mono text-forest">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="max-w-3xl lg:col-span-8 lg:col-start-5">
            <div className="lead">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28">
                <h2 className="font-display text-[1.5rem] font-bold tracking-[-0.025em]">
                  <span className="mr-3 font-mono text-base text-forest">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-forest [&_a]:underline [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
