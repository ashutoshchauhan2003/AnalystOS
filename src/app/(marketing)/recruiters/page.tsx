import type { Metadata } from "next";
import { PremiumFooter } from "@/components/layout/premium-footer";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { RecruiterMarketplace } from "@/components/recruiters/recruiter-marketplace";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Recruiters",
  description:
    "AnalystOS recruiter view for browsing published learner portfolios, proof projects, skills, and hiring signals.",
  alternates: {
    canonical: "/recruiters",
  },
};

export default function RecruitersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(99,102,241,0.13),transparent_24%),linear-gradient(180deg,#07111d_0%,#050a14_48%,#03060d_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-28 h-[44rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)] opacity-40" />

      <PremiumNavbar />

      <Container className="relative pb-24 pt-14 lg:pb-28 lg:pt-20">
        <section className="mx-auto mb-10 max-w-4xl text-center lg:mb-14">
          <div className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-cyan-200">
            Recruiter System
          </div>
          <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
            Discover candidates through proof, not claims.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300/[0.78] lg:text-lg">
            Browse published portfolios with skills, reviewed projects, and recruiter-ready evidence. Local fallback data appears when Supabase is not configured.
          </p>
        </section>

        <RecruiterMarketplace />
      </Container>

      <PremiumFooter />
    </main>
  );
}
