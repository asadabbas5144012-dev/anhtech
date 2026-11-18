import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, inherited by every route. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8F8F5",
          padding: 72,
          backgroundImage:
            "linear-gradient(to right, rgba(23,25,24,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,25,24,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 72, height: 72, borderRadius: 18, background: "#183D32" }}>
            <svg viewBox="0 0 40 40" width="72" height="72">
              <path d="M11 29.5 20 10.5l9 19" fill="none" stroke="#C8F169" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="23.4" r="2.3" fill="#C8F169" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#171918", letterSpacing: -1 }}>
            ANH <span style={{ color: "#183D32", marginLeft: 10, fontWeight: 600 }}>Tech</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 800, color: "#171918", letterSpacing: -5, lineHeight: 1 }}>Ideas into</div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 800, color: "#171918", letterSpacing: -5, lineHeight: 1.05 }}>
            <span style={{ background: "#C8F169", padding: "0 12px" }}>Digital Reality.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#3F4440" }}>
          <span>Software · Web & Mobile Apps · Design · SEO · Meta Ads</span>
          <span style={{ color: "#183D32", fontWeight: 700 }}>{siteConfig.message}</span>
        </div>
      </div>
    ),
    size,
  );
}
