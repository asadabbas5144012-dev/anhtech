import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pb-24 pt-36">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 [--fade:radial-gradient(ellipse_60%_60%_at_50%_40%,transparent,var(--color-canvas))]" />
      <div className="container-x relative text-center">
        <p className="font-mono text-sm text-forest">Error 404</p>
        <h1 className="display-xl mx-auto mt-6 max-w-4xl">
          This idea hasn&apos;t <span className="mark-lime">been built</span> yet.
        </h1>
        <p className="lead mx-auto mt-6 max-w-lg">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="outline" arrow={false}>
            Explore Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
