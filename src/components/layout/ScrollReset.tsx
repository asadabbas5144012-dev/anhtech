"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Ensures link navigations start at the top of the new page.
 * Back/forward navigations keep the browser's own scroll restoration,
 * and URLs with a #hash are left to scroll to their target.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const isPop = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => {
      isPop.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (isPop.current) {
      isPop.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
