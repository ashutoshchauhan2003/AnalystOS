import type { Metadata } from "next";
import { FinalCtaSection } from "@/components/marketing/final-cta-section";
import { FeaturedProjectsSection } from "@/components/marketing/featured-projects-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { PricingPreviewSection } from "@/components/marketing/pricing-preview-section";
import { RoleValueSection } from "@/components/marketing/role-value-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { CinematicHero } from "@/components/marketing/cinematic-hero";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { PremiumFooter } from "@/components/layout/premium-footer";

export const metadata: Metadata = {
  title: "Homepage",
  description:
    "Cinematic analyst learning platform with immersive dashboard experiences, lab workspaces, portfolio-ready case studies, and recruiter-facing discovery.",
};

export default function MarketingHomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_80%_12%,rgba(129,140,248,0.12),transparent_20%)]" />
      <div className="absolute left-[-10%] top-[12%] -z-10 h-[24rem] w-[24rem] rounded-full bg-cyan-400/8 blur-[140px]" />
      <div className="absolute right-[-8%] top-[28%] -z-10 h-[20rem] w-[20rem] rounded-full bg-indigo-400/8 blur-[120px]" />
      <PremiumNavbar />
      <CinematicHero />
      <RoleValueSection />
      <FeaturedProjectsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <FinalCtaSection />
      <PremiumFooter />
    </main>
  );
}
