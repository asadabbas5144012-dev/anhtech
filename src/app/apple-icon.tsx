import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#183D32" }}>
        <svg viewBox="0 0 40 40" width="180" height="180">
          <path d="M11 29.5 20 10.5l9 19" fill="none" stroke="#C8F169" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="23.4" r="2.3" fill="#C8F169" />
        </svg>
      </div>
    ),
    size,
  );
}
