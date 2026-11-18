import type { GlyphKind } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * Larger line-illustrations for each service. Drawn as SVG so they stay sharp,
 * weigh almost nothing and work on light or dark surfaces.
 */
export function ServiceArt({ kind, tone = "light", className }: { kind: GlyphKind; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const c = {
    stroke: dark ? "rgba(255,255,255,0.55)" : "rgba(23,25,24,0.7)",
    faint: dark ? "rgba(255,255,255,0.18)" : "rgba(23,25,24,0.14)",
    fill: dark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
    soft: dark ? "rgba(255,255,255,0.08)" : "#F0F2EB",
    accent: "#C8F169",
    brand: dark ? "#C8F169" : "#183D32",
  };
  const sw = 1.4;
  const base = { stroke: c.stroke, strokeWidth: sw, fill: c.fill } as const;

  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className={cn("h-auto w-full", className)}>
      {kind === "website" && (
        <g>
          <rect x="24" y="18" width="272" height="168" rx="10" {...base} />
          <path d="M24 42h272" stroke={c.faint} strokeWidth={sw} />
          <circle cx="40" cy="30" r="3" fill={c.faint} />
          <circle cx="51" cy="30" r="3" fill={c.faint} />
          <circle cx="62" cy="30" r="3" fill={c.faint} />
          <rect x="96" y="25" width="128" height="10" rx="5" fill={c.soft} />
          <rect x="44" y="64" width="120" height="12" rx="3" fill={c.brand} />
          <rect x="44" y="82" width="96" height="12" rx="3" fill={c.brand} opacity=".85" />
          <rect x="44" y="104" width="110" height="5" rx="2.5" fill={c.faint} />
          <rect x="44" y="114" width="86" height="5" rx="2.5" fill={c.faint} />
          <rect x="44" y="132" width="58" height="18" rx="9" fill={c.accent} />
          <rect x="184" y="60" width="92" height="104" rx="6" fill={c.soft} stroke={c.faint} />
          <path d="M184 140l28-30 22 22 14-12 28 26" fill="none" stroke={c.stroke} strokeWidth={sw} strokeLinejoin="round" />
          <circle cx="254" cy="84" r="9" fill={c.accent} />
        </g>
      )}
      {kind === "webapp" && (
        <g>
          <rect x="20" y="16" width="280" height="172" rx="10" {...base} />
          <path d="M80 16v172" stroke={c.faint} strokeWidth={sw} />
          <rect x="32" y="30" width="34" height="8" rx="4" fill={c.brand} />
          {[56, 72, 88, 104].map((y, i) => (
            <rect key={y} x="32" y={y} width={i === 0 ? 40 : 30} height="6" rx="3" fill={i === 0 ? c.accent : c.faint} />
          ))}
          {[96, 164, 232].map((x, i) => (
            <g key={x}>
              <rect x={x} y="30" width="56" height="34" rx="6" fill={c.soft} stroke={c.faint} />
              <rect x={x + 8} y="38" width="22" height="5" rx="2.5" fill={c.faint} />
              <rect x={x + 8} y="49" width={i === 1 ? 34 : 28} height="7" rx="3" fill={i === 1 ? c.brand : c.stroke} opacity=".8" />
            </g>
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const h = [40, 62, 48, 84, 70, 96, 78, 104][i];
            return <rect key={i} x={100 + i * 24} y={172 - h} width="14" height={h} rx="3" fill={i === 5 ? c.accent : c.soft} stroke={c.faint} />;
          })}
        </g>
      )}
      {(kind === "android" || kind === "ios") && (
        <g>
          <rect x="62" y="40" width="88" height="150" rx={kind === "ios" ? 20 : 14} fill={c.soft} stroke={c.faint} strokeWidth={sw} transform="rotate(-8 106 115)" />
          <rect x="120" y="12" width="96" height="182" rx={kind === "ios" ? 22 : 16} {...base} />
          {kind === "ios" ? (
            <rect x="152" y="20" width="32" height="9" rx="4.5" fill={c.stroke} />
          ) : (
            <circle cx="168" cy="24" r="3" fill={c.stroke} />
          )}
          <rect x="132" y="40" width="54" height="9" rx="3" fill={c.brand} />
          {[60, 92, 124].map((y, i) => (
            <g key={y}>
              <rect x="132" y={y} width="72" height="26" rx="6" fill={i === 0 ? c.brand : c.soft} opacity={i === 0 ? 1 : 1} />
              <circle cx="144" cy={y + 13} r="6" fill={i === 0 ? c.accent : c.faint} />
              <rect x="156" y={y + 8} width="36" height="4" rx="2" fill={i === 0 ? "rgba(255,255,255,0.6)" : c.faint} />
              <rect x="156" y={y + 15} width="24" height="4" rx="2" fill={i === 0 ? "rgba(255,255,255,0.35)" : c.faint} />
            </g>
          ))}
          {kind === "android" ? (
            <circle cx="194" cy="170" r="12" fill={c.accent} />
          ) : (
            <rect x="148" y="182" width="40" height="3.5" rx="1.75" fill={c.stroke} />
          )}
          <g transform="translate(222 70)">
            <rect width="78" height="40" rx="10" {...base} />
            <circle cx="18" cy="20" r="8" fill={c.accent} />
            <rect x="32" y="13" width="34" height="5" rx="2.5" fill={c.stroke} opacity=".6" />
            <rect x="32" y="23" width="24" height="4" rx="2" fill={c.faint} />
          </g>
        </g>
      )}
      {kind === "software" && (
        <g>
          <path d="M84 62C130 62 120 100 160 100M84 138c46 0 36-38 76-38M196 100h40" fill="none" stroke={c.stroke} strokeWidth={sw} strokeDasharray="4 4" />
          {[
            [24, 44],
            [24, 120],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="60" height="36" rx="8" {...base} />
              <rect x={x + 10} y={y + 10} width="28" height="5" rx="2.5" fill={c.stroke} opacity=".6" />
              <rect x={x + 10} y={y + 20} width="40" height="5" rx="2.5" fill={c.faint} />
            </g>
          ))}
          <circle cx="178" cy="100" r="20" fill={c.accent} />
          <path d="M170 100l6 6 10-12" fill="none" stroke="#171918" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="236" y="54" width="64" height="92" rx="8" fill={dark ? "rgba(0,0,0,0.25)" : "#171918"} />
          <text x="246" y="76" fill="#C8F169" fontFamily="ui-monospace, monospace" fontSize="10">$ run</text>
          {[88, 100, 112, 124].map((y, i) => (
            <rect key={y} x="246" y={y} width={[38, 28, 44, 20][i]} height="4" rx="2" fill="rgba(255,255,255,0.35)" />
          ))}
        </g>
      )}
      {kind === "design" && (
        <g>
          <circle cx="104" cy="96" r="58" fill={c.soft} stroke={c.faint} strokeWidth={sw} />
          <rect x="128" y="74" width="96" height="96" rx="10" fill={c.brand} opacity={dark ? 0.9 : 1} />
          <path d="M40 176C90 160 110 40 280 30" fill="none" stroke={c.stroke} strokeWidth={sw} />
          <path d="M150 92 196 40" stroke={c.stroke} strokeWidth="1" />
          <circle cx="150" cy="92" r="4" fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
          <circle cx="196" cy="40" r="4" fill={c.accent} stroke={c.stroke} strokeWidth={sw} />
          <rect x="40" y="172" width="8" height="8" fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
          <rect x="276" y="26" width="8" height="8" fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
          {["#183D32", "#C8F169", "#F0F2EB", "#171918"].map((col, i) => (
            <circle key={col} cx={246 + (i % 2) * 26} cy={128 + Math.floor(i / 2) * 26} r="10" fill={col} stroke={c.faint} />
          ))}
          <text x="146" y="138" fill="#C8F169" fontFamily="var(--font-manrope), sans-serif" fontWeight="800" fontSize="40" letterSpacing="-2">Aa</text>
        </g>
      )}
      {kind === "ads" && (
        <g>
          <circle cx="92" cy="104" r="70" fill="none" stroke={c.faint} strokeWidth={sw} />
          <circle cx="92" cy="104" r="46" fill="none" stroke={c.faint} strokeWidth={sw} />
          <circle cx="92" cy="104" r="22" fill={c.accent} />
          <path d="M92 104 150 46" stroke={c.stroke} strokeWidth={sw} />
          <path d="M138 46h12v12" fill="none" stroke={c.stroke} strokeWidth={sw} strokeLinecap="round" />
          <g transform="translate(176 26)">
            <rect width="122" height="152" rx="10" {...base} />
            <circle cx="16" cy="16" r="7" fill={c.brand} />
            <rect x="28" y="11" width="44" height="4" rx="2" fill={c.stroke} opacity=".6" />
            <rect x="28" y="18" width="28" height="3" rx="1.5" fill={c.faint} />
            <rect x="8" y="32" width="106" height="74" rx="6" fill={c.soft} />
            <path d="M8 92l30-24 22 16 20-12 34 22" fill="none" stroke={c.faint} strokeWidth={sw} />
            <rect x="8" y="114" width="70" height="5" rx="2.5" fill={c.faint} />
            <rect x="8" y="130" width="54" height="14" rx="7" fill={c.accent} />
          </g>
        </g>
      )}
      {kind === "seo" && (
        <g>
          <rect x="24" y="20" width="200" height="30" rx="15" {...base} />
          <circle cx="44" cy="35" r="6" fill="none" stroke={c.stroke} strokeWidth={sw} />
          <path d="m48.5 39.5 4 4" stroke={c.stroke} strokeWidth={sw} strokeLinecap="round" />
          <rect x="62" y="32" width="90" height="6" rx="3" fill={c.faint} />
          {[66, 108, 150].map((y, i) => (
            <g key={y}>
              <rect x="24" y={y} width="200" height="34" rx="8" fill={i === 0 ? c.brand : c.fill} stroke={i === 0 ? "none" : c.faint} />
              <rect x="36" y={y + 9} width={i === 0 ? 110 : 90} height="6" rx="3" fill={i === 0 ? c.accent : c.stroke} opacity={i === 0 ? 1 : 0.5} />
              <rect x="36" y={y + 20} width="140" height="4" rx="2" fill={i === 0 ? "rgba(255,255,255,0.35)" : c.faint} />
            </g>
          ))}
          <path d="M240 170 262 140l14 10 22-44" fill="none" stroke={c.brand} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="298" cy="106" r="6" fill={c.accent} />
          <path d="M240 60v120h64" fill="none" stroke={c.faint} strokeWidth={sw} />
        </g>
      )}
    </svg>
  );
}
