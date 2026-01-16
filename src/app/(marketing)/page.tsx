import { FeatureSection } from "@/components/landing/FeatureSection";
import { SiteHeader } from "@/components/landing/Header";
import { TeamSection } from "@/components/landing/TeamSection";

export default function LandingPage() {
  return (
    <>
    <SiteHeader />
    <TeamSection />
    <FeatureSection />
    </>
  );
}
