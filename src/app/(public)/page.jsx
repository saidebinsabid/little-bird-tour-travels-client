// "/" home page. Pages stay THIN — they assemble sections, not define UI.
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import PopularDestinations from "@/components/home/PopularDestinations";
import HajjPromo from "@/components/home/HajjPromo";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import TravelTips from "@/components/home/TravelTips";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturedPackages />
      <PopularDestinations />
      <HajjPromo />
      <WhyChooseUs />
      <Testimonials />
      <TravelTips />
      <CTA />
    </>
  );
}
