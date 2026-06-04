// "/" home page. Pages stay THIN — they assemble sections, not define UI.
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturedPackages />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}
