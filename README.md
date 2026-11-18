# ANH Tech — Website

Marketing website for **ANH Tech**, an independent digital technology & creative solutions company.
*Ideas into Digital Reality.*

**Stack:** Next.js 16 (App Router, static pre-rendering) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (pre-renders all pages) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript check |

---

## Where to edit things

All content is centralised — pages update automatically.

| What | File |
| --- | --- |
| Company name, tagline, **domain**, **contact details**, **social links**, availability badge, founder, default SEO | `src/config/site.ts` |
| The 8 services (copy, offerings, FAQs, SEO titles/descriptions) | `src/data/services.ts` |
| Portfolio projects & case studies | `src/data/portfolio.ts` |
| Navigation, technologies, industries, differentiators, process, values, commitments, testimonials | `src/data/content.ts` |
| Design tokens (colours, fonts, type scale) | `src/app/globals.css` |
| Privacy Policy / Terms | `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx` |

### Contact details & social links
In `src/config/site.ts`, every channel defaults to `null`. **Components hide anything that isn't configured**, so the site never displays invented details. When you add:

- `contact.email` → shown in the footer, contact page, legal pages and Organization schema.
- `contact.whatsapp` (digits only, international format, e.g. `923001234567`) → enables the floating WhatsApp button, the "Prefer to chat?" card and makes every **Talk to Us** button open WhatsApp with a prefilled message (`contact.whatsappMessage`).
- `social.*` URLs → icons appear in the footer and contact page and are added to `sameAs` in structured data.
- `founder.name` → shown on the About page and published as `Person` schema.

### Portfolio
Seven real projects live in `src/data/portfolio.ts`. Their images are optimised WebP files in `public/work/<slug>/`:

| File | Used for |
| --- | --- |
| `preview.webp` | Tall image inside the browser frame on cards (scrolls on hover) |
| `cover.webp` | Large first screen on the case-study page |
| `screen-N.webp` | Gallery screens |
| `full-page.webp` | Scrollable full-page view (optional) |

The original PNG screenshots and the original founder photo are kept in `design-source/` (outside `public/`, so they aren't deployed). Set `featured: true` for up to three projects on the home page. Only describe what the project actually is; add results or metrics only if they're verified and the client approves.

### Testimonials
`testimonials` in `src/data/content.ts` is empty, so the home page shows **"Our Commitment"** instead. Add only genuine, permission-granted testimonials; the section switches automatically.

### Technology list
`technologies` in `src/data/content.ts` is displayed publicly. **Remove anything you don't actively offer.**

---

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin, e.g. `https://yourdomain.com` (no trailing slash). Set it once you have a custom domain. **On Vercel production deployments it's detected automatically** (e.g. `https://anhtech.vercel.app`); preview deployments and local builds without it serve `noindex`, so they never appear in search results. |
| `RESEND_API_KEY` | server only | API key for [Resend](https://resend.com) email delivery |
| `CONTACT_TO_EMAIL` | server only | Inbox(es) that receive inquiries (comma-separated allowed) |
| `CONTACT_FROM_EMAIL` | server only | Verified sender, e.g. `ANH Tech <noreply@yourdomain.com>` |

Never prefix secrets with `NEXT_PUBLIC_`. Nothing secret lives in frontend code.

### Contact form
`POST /api/contact` (`src/app/api/contact/route.ts`):

- Shared client/server validation (`src/lib/inquiry.ts`)
- Spam protection: honeypot field, minimum fill time, per-IP rate limit (5 per 10 min, per server instance; use a shared store such as Upstash Redis or a WAF rule for multi-instance hosting)
- Emails are HTML-escaped; `reply_to` is set to the sender
- **If email delivery isn't configured (or fails), the API returns an error and the form offers "Send by email instead" / "Send on WhatsApp instead" buttons, prefilled with everything the visitor typed. It never fakes success.**

**Enable direct delivery to anh.techofficial@gmail.com (about 5 minutes):**
1. Create a free account at [resend.com](https://resend.com) **using anh.techofficial@gmail.com**.
2. Create an API key and paste it into `.env.local` as `RESEND_API_KEY=` (the other two values are already set).
3. Restart the server. Until you own a domain, the sender `onboarding@resend.dev` can only deliver to the email your Resend account uses, which is exactly your inbox.
4. After buying a domain, verify it in Resend and change `CONTACT_FROM_EMAIL` to e.g. `ANH Tech <hello@yourdomain.com>`.

To switch provider (Postmark, SendGrid, SMTP…), replace the `fetch` call in the route; nothing else changes.

---

## SEO

- Unique title, description, canonical URL, Open Graph and Twitter tags on every page (`src/lib/seo.ts`)
- Generated social image (`src/app/opengraph-image.tsx`), favicon, Apple touch icon, `/logo.png`
- `sitemap.xml` and `robots.txt` generated from the data files
- JSON-LD: `Organization`, `WebSite`, `Service` (each service page), `BreadcrumbList` (all inner pages), `FAQPage` (service FAQs), `Person` (only when a founder name is set). No ratings or reviews.
- Semantic headings (one H1 per page), breadcrumbs, internal linking between services and projects
- Permanent redirects for common aliases (`/work`, `/about-us`, `/privacy`, …) in `next.config.ts`

---

## Go-live checklist

- [ ] Decide the domain → set `NEXT_PUBLIC_SITE_URL`
- [ ] Add real email / WhatsApp / phone / social links in `src/config/site.ts`
- [ ] Configure Resend (verify the sending domain) and set the three server env vars; send a test inquiry
- [ ] Review the technology list and remove anything not offered
- [ ] Replace or extend concept projects with real work (with client permission)
- [ ] Optionally add the founder's name
- [ ] Have the Privacy Policy and Terms reviewed for your jurisdiction (and update them if you add analytics)
- [ ] Submit `https://yourdomain.com/sitemap.xml` to Google Search Console

## Deployment
Works on any Next.js host (Vercel recommended; also Netlify, Render or a Node server via `npm run build && npm start`). Set the environment variables in the host's dashboard.
