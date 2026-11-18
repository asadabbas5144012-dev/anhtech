import { processSteps } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="How we work"
          title={<span id="process-title">A Clear Process. A Better Outcome.</span>}
          intro="Structured enough to keep projects predictable, flexible enough to adapt as we learn. You always know what's happening and what comes next."
        />
        <div className="mt-16 lg:mt-24">
          <ProcessTimeline steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
