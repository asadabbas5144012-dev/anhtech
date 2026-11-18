"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders `children` only when the placeholder is about to scroll into view.
 * Stricter than native loading="lazy" (which can start fetching up to ~2,500px
 * early on slow connections), so heavy below-the-fold media never competes
 * with the initial page load.
 */
export function LazyMount({
  children,
  placeholderClassName,
  aspect,
  margin = "400px",
}: {
  children: ReactNode;
  placeholderClassName?: string;
  /** width / height of the content, so the placeholder reserves space (no layout shift). */
  aspect?: number;
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  if (show) return <>{children}</>;
  return <div ref={ref} aria-hidden className={placeholderClassName} style={aspect ? { aspectRatio: String(aspect) } : undefined} />;
}
