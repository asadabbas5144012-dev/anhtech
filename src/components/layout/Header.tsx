"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { mainNav } from "@/data/content";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

const groups = ["Engineering", "Creative", "Growth"] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  // Lock scroll while the mobile sheet is open; Escape closes any menu.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || menuOpen || mobileOpen;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        solid ? "border-b border-line bg-canvas/85 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className={cn("container-x flex items-center justify-between transition-[height] duration-500", scrolled ? "h-16" : "h-[4.5rem] lg:h-20")}>
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-paper/90 p-1">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              if ("hasMenu" in item && item.hasMenu) {
                return (
                  <li key={item.href} className="relative flex items-center" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full py-2 pl-4 pr-1 text-[0.875rem] font-medium transition-colors",
                        active ? "text-forest" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={menuOpen}
                      aria-controls="services-menu"
                      aria-label={menuOpen ? "Close services menu" : "Open services menu"}
                      onClick={() => setMenuOpen((v) => !v)}
                      className="mr-1 rounded-full p-1.5 text-ink-soft hover:text-ink"
                    >
                      <ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform duration-300", menuOpen && "rotate-180")} />
                    </button>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors",
                      active ? "bg-ink text-white" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menu */}
      {menuOpen && (
          <div
            id="services-menu"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            className="animate-drop absolute inset-x-0 top-full hidden border-b border-line bg-canvas shadow-[0_30px_60px_-30px_rgb(23_25_24/0.25)] lg:block"
          >
            <div className="container-x grid grid-cols-12 gap-8 py-8">
              <div className="col-span-9 grid grid-cols-3 gap-x-6">
                {groups.map((g) => (
                  <div key={g}>
                    <p className="eyebrow mb-3 px-3 text-muted">{g}</p>
                    <ul className="space-y-0.5">
                      {services
                        .filter((s) => s.category === g)
                        .map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-lime">
                                <ServiceGlyph kind={s.glyph} className="h-5 w-5" />
                              </span>
                              <span>
                                <span className="flex items-center gap-1 text-[0.9rem] font-semibold text-ink">
                                  {s.title}
                                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                                </span>
                                <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{s.menuBlurb}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="on-dark col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl bg-forest p-6 text-white">
                <div>
                  <p className="eyebrow text-lime">Not sure where to start?</p>
                  <p className="font-display mt-3 text-xl font-bold leading-tight tracking-tight">
                    Tell us the problem. We&apos;ll recommend the right approach.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/contact" variant="lime">
                    Start a Project
                  </ButtonLink>
                  <Link href="/services" className="link-underline self-start text-sm font-medium text-white/80 hover:text-white">
                    View all services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

    </header>

      {/* Mobile navigation sheet (outside <header>: its backdrop-filter would trap position:fixed) */}
      {mobileOpen && (
          <div
            id="mobile-menu"
            className="animate-sheet fixed inset-0 z-40 overflow-y-auto bg-canvas pt-[4.5rem] lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-x flex min-h-full flex-col pb-8 pt-4"
              onClickCapture={(e) => {
                // Release the scroll lock before navigation so the new page starts at the top.
                if ((e.target as HTMLElement).closest("a")) {
                  document.documentElement.style.overflow = "";
                  setMobileOpen(false);
                }
              }}
            >
              <ul className="divide-y divide-line border-b border-line">
                {mainNav.map((item, i) => (
                  <li
                    key={item.href}
                    className="animate-rise"
                    style={{ animationDelay: `${0.05 + i * 0.04}s` }}
                  >
                    {"hasMenu" in item && item.hasMenu ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link href={item.href} className="font-display block py-4 text-[1.75rem] font-bold tracking-tight">
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={mobileServices}
                            aria-controls="mobile-services"
                            aria-label="Toggle services list"
                            onClick={() => setMobileServices((v) => !v)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-line"
                          >
                            <ChevronDown aria-hidden className={cn("h-5 w-5 transition-transform", mobileServices && "rotate-180")} />
                          </button>
                        </div>
                        {mobileServices && (
                          <ul id="mobile-services" className="grid gap-1 pb-4">
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link href={`/services/${s.slug}`} className="flex items-center gap-3 rounded-lg px-1 py-2 text-[0.95rem] text-ink-soft">
                                  <span className="font-mono text-xs text-forest">{s.number}</span>
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "font-display flex items-center justify-between py-4 text-[1.75rem] font-bold tracking-tight",
                          isActive(item.href) && "text-forest",
                        )}
                      >
                        {item.label}
                        <ArrowUpRight aria-hidden className="h-5 w-5 text-muted" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Start a Project
                </ButtonLink>
              </div>
            </nav>
          </div>
        )}
    </>
  );
}
