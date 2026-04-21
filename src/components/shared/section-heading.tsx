import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-cyan-300/70">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 max-w-[58ch] text-base leading-8 text-slate-300/74 md:text-lg">
        {description}
      </p>
    </div>
  );
}
