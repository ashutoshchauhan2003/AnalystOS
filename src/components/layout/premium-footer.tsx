import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import Link from "next/link";

const footerLinks = [
  { label: "Paths", href: "/paths" },
  { label: "Labs", href: "/labs" },
  { label: "Jobs", href: "/jobs" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Sign In", href: "/sign-in" },
];

export function PremiumFooter() {
  return (
    <footer className="pb-10">
      <Container>
        <GlassPanel className="p-7 lg:p-8" glow="blue">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white">AnalystOS</p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                Free-core analyst practice, portfolio-ready proof, and recruiter discovery in one
                connected product experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </GlassPanel>
      </Container>
    </footer>
  );
}
