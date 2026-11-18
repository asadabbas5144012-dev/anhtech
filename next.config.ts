import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * Canonical site URL:
 * 1. NEXT_PUBLIC_SITE_URL when set (use this once you have a custom domain)
 * 2. On Vercel production deployments, the project's production URL
 *    (e.g. anhtech.vercel.app), provided automatically by Vercel
 * 3. Otherwise empty → the site serves noindex (local builds, preview deployments)
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // Friendly aliases → canonical URLs (permanent).
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/our-work", destination: "/portfolio", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/services/graphic-design-branding", destination: "/services/graphic-design", permanent: true },
      { source: "/services/meta-ads-management", destination: "/services/meta-ads", permanent: true },
      { source: "/services/seo-services", destination: "/services/seo", permanent: true },
    ];
  },
};

export default nextConfig;
