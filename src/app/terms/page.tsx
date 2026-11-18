import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of the ANH Tech website and general terms for our services.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "use-of-website",
    title: "Use of this website",
    body: (
      <p>
        By accessing this website you agree to use it lawfully and not to interfere with its operation, attempt unauthorised access, or submit false, abusive or automated inquiries.
      </p>
    ),
  },
  {
    id: "information",
    title: "Website information",
    body: (
      <p>
        Content on this website is provided for general information about {siteConfig.name} and our services. It does not constitute a binding offer. Projects described as &quot;Concept · Demonstration&quot; are self-initiated illustrations of our approach, not client engagements.
      </p>
    ),
  },
  {
    id: "proposals-agreements",
    title: "Proposals & project agreements",
    body: (
      <p>
        Every engagement is governed by a written proposal or agreement that sets out scope, deliverables, timeline, fees, payment terms, ownership of work and support arrangements. If anything in that agreement conflicts with these website terms, the project agreement prevails.
      </p>
    ),
  },
  {
    id: "third-party-costs",
    title: "Third-party costs",
    body: (
      <p>
        Unless an agreement explicitly states otherwise, third-party costs, including advertising spend paid to platforms such as Meta, domain names, hosting, software licences, app-store developer accounts and paid plugins, are separate from our fees and are the client&apos;s responsibility.
      </p>
    ),
  },
  {
    id: "no-guarantees",
    title: "No guaranteed outcomes",
    body: (
      <p>
        Search rankings, advertising performance, app-store approval and similar outcomes depend on third parties and market factors outside our control. We commit to professional, best-practice work but do not guarantee specific rankings, traffic, leads, sales or approvals.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The design, text, graphics and code of this website belong to {siteConfig.name} unless otherwise stated, and may not be reproduced without permission. Ownership of work created for clients is defined in each project agreement.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        This website is provided &quot;as is&quot;. To the extent permitted by law, {siteConfig.name} is not liable for any indirect or consequential loss arising from use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External links",
    body: <p>This website may link to third-party websites. We are not responsible for their content or privacy practices.</p>,
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Our handling of personal information is described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "changes-contact",
    title: "Changes & contact",
    body: (
      <p>
        We may update these terms from time to time; the latest version will always be published on this page. Questions? Please reach out through our <Link href="/contact">contact page</Link>
        {siteConfig.contact.email ? (
          <>
            {" "}
            or at <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </>
        ) : null}
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      intro={<p>These terms govern your use of the {siteConfig.name} website and set out general principles that apply to our services. Please read them carefully.</p>}
      sections={sections}
    />
  );
}
