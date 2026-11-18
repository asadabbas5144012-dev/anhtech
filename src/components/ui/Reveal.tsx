import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  delay?: number;
  /** Kept for API compatibility; distance is set in CSS. */
  y?: number;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Scroll reveal with zero per-component JavaScript.
 * Elements carry `data-reveal`; a single observer (RevealObserver) adds
 * `.is-visible` when they enter the viewport. CSS handles the motion and
 * shows everything immediately for reduced-motion users or without JS.
 */
export function Reveal({ children, delay = 0, y: _y, as = "div", style, ...rest }: RevealProps) {
  void _y;
  const Tag = as;
  const s: CSSProperties = delay ? { ...style, transitionDelay: `${delay}s` } : (style ?? {});
  return (
    <Tag data-reveal="" style={s} {...rest}>
      {children}
    </Tag>
  );
}

/** Headlines render as plain text: they are often the LCP element, so they must paint immediately. */
export function RevealWords({ text, className }: { text: string; className?: string; delay?: number }) {
  return <span className={className}>{text}</span>;
}
