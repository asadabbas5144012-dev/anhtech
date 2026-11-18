import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesBento } from "@/components/home/ServicesBento";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyUs } from "@/components/home/WhyUs";
import { Process } from "@/components/home/Process";
import { TechStack } from "@/components/home/TechStack";
import { Industries } from "@/components/home/Industries";
import { Commitment } from "@/components/home/Commitment";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "ANH Tech — Software Development, Design & Digital Growth Company",
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesBento />
      <FeaturedWork />
      <WhyUs />
      <Process />
      <TechStack />
      <Industries />
      <Commitment />
      <FinalCta />
    </>
  );
}
