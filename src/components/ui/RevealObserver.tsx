"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";


/** Re-scans for new [data-reveal] elements after client-side navigation. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    (window as unknown as { __anhReveal?: () => void }).__anhReveal?.();
  }, [pathname]);
  return null;
}
