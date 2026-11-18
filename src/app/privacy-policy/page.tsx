import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "How ANH Tech collects, uses and protects personal information submitted through this website.",
  path: "/privacy-policy",
});

const contactLine = siteConfig.contact.email ? (
  <>
    by email at <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
  </>
) : (
  <>
    through our <Link href="/contact">contact page</Link>
  </>
);

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect only the information needed to respond to you and operate this website:</p>
        <ul>
          <li>
            <strong>Information you provide</strong>: when you submit our project inquiry form, we receive your name, email address, the service you are interested in and your project description, plus any optional details you choose to share (company, phone or WhatsApp number, country, budget range, preferred currency, timeline and website).
          </li>
          <li>
            <strong>Communications</strong>: messages you send us by email, WhatsApp or other channels.
          </li>
          <li>
            <strong>Technical information</strong>: our hosting provider may automatically process limited technical data such as IP address, browser type and request logs for security and reliability purposes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    body: (
      <ul>
        <li>To respond to your inquiry and discuss your project.</li>
        <li>To prepare proposals and, if we work together, to deliver and support the agreed services.</li>
        <li>To protect the website against spam, abuse and security threats.</li>
        <li>To meet legal, accounting or regulatory obligations where applicable.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis",
    body: (
      <p>
        Where data-protection laws such as the UK GDPR or EU GDPR apply, we process inquiry information on the basis of our legitimate interest in responding to requests you initiate, and to take steps at your request before entering into a contract. Where required, we will ask for your consent.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: (
      <>
        <p>We do not sell your personal information. We share it only with service providers that help us operate, under appropriate confidentiality terms, for example:</p>
        <ul>
          <li>Website hosting and infrastructure providers.</li>
          <li>Email delivery providers used to route form submissions to our inbox.</li>
        </ul>
        <p>We may also disclose information where required by law.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        We work with clients in many countries, and our service providers may process data outside your country of residence. Where this happens, we take reasonable steps to ensure your information remains protected.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <p>
        We keep inquiry information for as long as needed to respond and to manage any resulting relationship, and for a reasonable period afterwards for record-keeping. You may ask us to delete it at any time, subject to any legal obligations to retain it.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & analytics",
    body: (
      <p>
        This website does not use advertising or tracking cookies. If we introduce analytics or similar tools in the future, we will update this policy and, where required, request your consent.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, to object to processing, and to request a copy of your data. To make a request, contact us {contactLine}. You may also have the right to complain to your local data-protection authority.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: <p>We use reasonable technical and organisational measures to protect your information, including encrypted connections (HTTPS). No method of transmission over the internet is completely secure, but we work to protect your data.</p>,
  },
  {
    id: "changes-contact",
    title: "Changes & contact",
    body: (
      <p>
        We may update this policy from time to time; the &quot;Last updated&quot; date above shows the latest version. For any privacy questions, contact us {contactLine}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro={<p>{siteConfig.name} respects your privacy. This policy explains what personal information we collect through this website, how we use it, and the choices you have.</p>}
      sections={sections}
    />
  );
}
