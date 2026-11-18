import { whatsappLink } from "@/lib/contact";
import { SocialIcon } from "@/components/ui/SocialIcon";

/** Optional floating WhatsApp CTA — renders only when a WhatsApp number is configured. */
export function WhatsAppButton() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ANH Tech on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-lime shadow-[0_20px_40px_-15px_rgb(24_61_50/0.7)] transition-transform duration-300 hover:-translate-y-1 hover:bg-forest-deep"
    >
      <SocialIcon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}
