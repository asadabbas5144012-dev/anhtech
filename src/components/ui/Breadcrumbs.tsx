import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/cn";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail + BreadcrumbList structured data. Home is prepended automatically. */
export function Breadcrumbs({ items, dark = false, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className={cn("text-[0.8rem]", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className={cn("link-underline", dark ? "text-white/60 hover:text-white" : "text-muted hover:text-ink")}>
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden className={cn("h-3.5 w-3.5", dark ? "text-white/40" : "text-muted/70")} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
