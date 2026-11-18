import { NextResponse } from "next/server";
import { normalizeInquiry, validateInquiry, type Inquiry } from "@/lib/inquiry";
import { siteConfig } from "@/config/site";

/**
 * POST /api/contact — receives project inquiries and delivers them by email
 * through Resend (https://resend.com) using server-only environment variables:
 *
 *   RESEND_API_KEY      API key (never exposed to the browser)
 *   CONTACT_TO_EMAIL    inbox that receives inquiries
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "ANH Tech <noreply@yourdomain.com>"
 *
 * If these are missing, the route responds 503 and the form shows an honest
 * error. It never pretends a message was sent.
 */

export const runtime = "nodejs";

const MIN_FILL_MS = 3000; // humans take longer than this to complete the form
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort per-instance rate limiting. For multi-instance deployments,
// back this with a shared store (e.g. Upstash Redis) or a platform WAF rule.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function formatEmail(d: Inquiry) {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Service", d.service],
    ["Company", d.company],
    ["Phone / WhatsApp", d.phone],
    ["Country", d.country],
    ["Budget (USD equiv.)", d.budget],
    ["Preferred currency", d.currency],
    ["Timeline", d.timeline],
    ["Website", d.website],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject description:\n${d.message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#171918;max-width:640px">
      <h2 style="margin:0 0 16px">New project inquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#737873;vertical-align:top">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}
      </table>
      <h3 style="margin:24px 0 8px">Project description</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${esc(d.message)}</p>
    </div>`;
  return { text, html };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Spam protection 1: honeypot field must stay empty.
  if (typeof body.fax === "string" && body.fax.trim() !== "") {
    return NextResponse.json({ ok: false, message: "Your message could not be sent." }, { status: 400 });
  }
  // Spam protection 2: reject instant submissions.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, message: "That was a little quick. Please review your details and try again." }, { status: 400 });
  }
  // Spam protection 3: rate limiting.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const data = normalizeInquiry(body);
  const errors = validateInquiry(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
    return NextResponse.json(
      { ok: false, code: "not_configured", message: "Our form can't deliver messages right now. Please send your inquiry with one of the options below; your details are already filled in." },
      { status: 503 },
    );
  }

  const { text, html } = formatEmail(data);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `New inquiry: ${data.service} from ${data.name}`.slice(0, 180),
        text,
        html,
        tags: [{ name: "source", value: "website" }],
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Provider error", res.status, await res.text().catch(() => ""));
      throw new Error(`Provider responded ${res.status}`);
    }
  } catch (err) {
    console.error("[contact] Delivery failed", err);
    return NextResponse.json(
      { ok: false, message: `We couldn't send your message right now. Please try again shortly or reach ${siteConfig.name} directly.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
