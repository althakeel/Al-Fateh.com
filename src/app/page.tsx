import Hero from "@/components/Hero";
import CapabilitiesMarquee from "@/components/CapabilitiesMarquee";
import StatsStrip from "@/components/StatsStrip";
import AboutPreview from "@/components/AboutPreview";
import HomeValues from "@/components/HomeValues";
import ServicesPreview from "@/components/ServicesPreview";
import HomeExpertisePreview from "@/components/HomeExpertisePreview";
import HomeWhyUsPreview from "@/components/HomeWhyUsPreview";
import HomeRegionalFocus from "@/components/HomeRegionalFocus";
import HomeAnimatedBackdrop from "@/components/HomeAnimatedBackdrop";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <HomeAnimatedBackdrop />
      <div className="relative z-10">
        <Hero />
        <CapabilitiesMarquee />
        <StatsStrip />
        <AboutPreview />
        <HomeValues />
        <ServicesPreview />
        <HomeExpertisePreview />
        <HomeWhyUsPreview />
        <HomeRegionalFocus />
      </div>
    </div>
  );
}
