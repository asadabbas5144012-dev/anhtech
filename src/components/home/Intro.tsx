import { Code2, Palette, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Button";

const pillars = [
  { icon: Code2, title: "Technology", text: "Websites, web platforms, mobile apps and custom software engineered to be reliable and maintainable." },
  { icon: Palette, title: "Creativity", text: "Brand identities, interfaces and creative assets that make your business look as good as it is." },
  { icon: TrendingUp, title: "Growth", text: "SEO and Meta advertising that help the right people discover what you've built." },
];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <SectionIndex index="01" label="Who we are" />
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="intro-title" className="display-lg">
                One Partner. <span className="text-muted">Multiple Possibilities.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-3xl font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.875rem)] font-medium leading-[1.4] tracking-[-0.02em] text-ink-soft">
                At ANH Tech, we believe great digital solutions begin with understanding real business challenges. We combine engineering, design, and digital strategy to build solutions that{" "}
                <span className="text-ink">work beautifully and deliver practical value.</span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <TextLink href="/about" className="mt-8">
                More about our approach
              </TextLink>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid border-t border-line lg:ml-[25%] lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="border-b border-line py-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-forest">
                  <p.icon aria-hidden className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight">{p.title}</h3>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
