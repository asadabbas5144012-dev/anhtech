import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "lime" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-white hover:bg-forest-deep shadow-[0_1px_0_rgb(255_255_255/0.12)_inset]",
  lime: "on-dark bg-lime text-ink hover:bg-white",
  outline: "border border-line-strong bg-paper/60 text-ink hover:border-ink hover:bg-paper",
  "outline-light": "on-dark border border-white/25 text-white hover:border-white hover:bg-white/5",
  ghost: "text-ink hover:bg-mist",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-6 text-[0.95rem] sm:h-14 sm:px-7",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string }) {
  return cn(base, variants[variant], sizes[size], className);
}

function ArrowSwap({ variant }: { variant: Variant }) {
  const circle =
    variant === "primary"
      ? "bg-lime text-ink"
      : variant === "lime"
        ? "bg-ink text-lime"
        : variant === "outline-light"
          ? "bg-white text-ink"
          : "bg-ink text-white";
  return (
    <span className={cn("relative -mr-2 inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full", circle)}>
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5"
      />
      <ArrowUpRight
        aria-hidden
        className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
      />
    </span>
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", size = "md", arrow = true, className, children, href, ...rest }: ButtonLinkProps) {
  const cls = buttonClasses({ variant, size, className });
  const isExternal = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowSwap variant={variant} />}
    </>
  );
  if (isExternal) {
    const newTab = (href as string).startsWith("http");
    return (
      <a href={href as string} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group/tl inline-flex items-center gap-1.5 font-semibold text-ink", className)}>
      <span className="link-underline">{children}</span>
      <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5" />
    </Link>
  );
}
