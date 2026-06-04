"use client";

import Container from "@/components/ui/Container";
import SearchWidget from "./SearchWidget";
import AnimatedHeroText from "./AnimatedHeroText";
import bannerImage from "@/assets/banner-image.jpg";

export default function Hero() {
  return (
    <section className="relative bg-white">
      {/* Banner with the animated heading in the middle */}
      <div className="relative isolate overflow-hidden">
        {/* The banner photo has a soft white vignette baked into its edges, so we
            zoom it slightly — the parent's overflow-hidden crops the white corners. */}
        <div
          className="absolute inset-0 -z-10 scale-[1.22] bg-cover bg-center"
          style={{ backgroundImage: `url('${bannerImage.src}')` }}
        />

        <div className="container-x flex min-h-[78vh] flex-col items-center justify-center pt-24 pb-44 md:pb-52">
          <AnimatedHeroText />
        </div>
      </div>

      {/* Search widget — pulled up so it sits half on the banner, half below */}
      <Container>
        <div className="relative z-10 -mt-36 md:-mt-44">
          <SearchWidget />
        </div>
      </Container>
    </section>
  );
}
