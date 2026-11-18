import type { GlyphKind } from "@/data/services";

/** Custom 24px line glyphs — one per service — drawn in a consistent stroke style. */
export function ServiceGlyph({ kind, className }: { kind: GlyphKind; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {kind === "website" && (
        <g {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <path d="M2.5 8.5h19" />
          <circle cx="5.5" cy="6.25" r=".6" fill="currentColor" />
          <circle cx="7.7" cy="6.25" r=".6" fill="currentColor" />
          <path d="M6 12.5h7M6 15.5h4.5" />
          <rect x="15" y="11.5" width="3.5" height="5" rx=".8" />
        </g>
      )}
      {kind === "webapp" && (
        <g {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <path d="M8 4v16" />
          <path d="M4.5 8h1.5M4.5 11h1.5M4.5 14h1.5" />
          <path d="M11.5 16.5v-3M14.5 16.5v-6M17.5 16.5v-4.5" />
        </g>
      )}
      {kind === "android" && (
        <g {...common}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
          <path d="M9 7.5a3 3 0 0 1 6 0" />
          <path d="M8.8 10h6.4" />
        </g>
      )}
      {kind === "ios" && (
        <g {...common}>
          <rect x="6" y="2.5" width="12" height="19" rx="3.2" />
          <rect x="10" y="4.6" width="4" height="1.4" rx=".7" />
          <path d="M8.8 10h6.4M8.8 13h4" />
          <path d="M10.5 19h3" />
        </g>
      )}
      {kind === "software" && (
        <g {...common}>
          <rect x="2.5" y="3.5" width="7" height="6" rx="1.5" />
          <rect x="14.5" y="14.5" width="7" height="6" rx="1.5" />
          <circle cx="18" cy="6.5" r="2.6" />
          <path d="M6 9.5v3.5a2 2 0 0 0 2 2h6.5M15.5 6.5H9.5" />
        </g>
      )}
      {kind === "design" && (
        <g {...common}>
          <circle cx="9" cy="9.5" r="5.5" />
          <rect x="10.5" y="11" width="10" height="10" rx="1.5" />
          <path d="M4 20.5c3-1 5.5-3.5 6.5-6" />
        </g>
      )}
      {kind === "ads" && (
        <g {...common}>
          <circle cx="11" cy="13" r="8" />
          <circle cx="11" cy="13" r="4.5" />
          <circle cx="11" cy="13" r="1" fill="currentColor" />
          <path d="M11 13 20 4M17 4h3v3" />
        </g>
      )}
      {kind === "seo" && (
        <g {...common}>
          <circle cx="10" cy="10" r="6.5" />
          <path d="m15 15 6 6" />
          <path d="M6.8 12.2 9 10l1.8 1.6L13.4 8" />
        </g>
      )}
    </svg>
  );
}
