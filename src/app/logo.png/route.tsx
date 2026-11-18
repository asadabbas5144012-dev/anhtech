import { ImageResponse } from "next/og";

/** Square PNG logo used by Organization structured data (/logo.png). */
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#183D32", borderRadius: 112 }}>
        <svg viewBox="0 0 40 40" width="512" height="512">
          <path d="M11 29.5 20 10.5l9 19" fill="none" stroke="#C8F169" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="23.4" r="2.3" fill="#C8F169" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
