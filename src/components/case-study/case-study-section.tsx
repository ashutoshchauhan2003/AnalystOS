import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ReactNode } from "react";

type CaseStudySectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  delay?: number;
};

export function CaseStudySection({
  eyebrow,
  title,
  description,
  children,
  delay = 0,
}: CaseStudySectionProps) {
  return (
    <Reveal className="mt-24" delay={delay}>
      <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div>{children}</div>
      </div>
    </Reveal>
  );
}
