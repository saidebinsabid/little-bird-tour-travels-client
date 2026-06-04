"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useI18n } from "@/i18n/useI18n";
import aboutLong from "@/assets/about-long.jpg";
import aboutTop from "@/assets/about-top.jpg";

export default function AboutSection() {
  const { lang } = useI18n();
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Overlapping images */}
          <div className="relative mx-auto h-[420px] w-full max-w-lg sm:h-[500px]">
            <div className="absolute left-0 top-0 h-full w-[62%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <Image src={aboutLong} alt="Little Bird travellers" fill sizes="40vw" className="object-cover" />
            </div>
            <div className="absolute top-1/2 -right-6 h-[68%] w-[52%] -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl">
              <Image src={aboutTop} alt="Happy travellers" fill sizes="35vw" className="object-cover" />
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ink">
              {lang === "bn" ? "স্বাগতম লিটল বার্ড ট্রাভেলস-এ" : "Welcome to Little Bird Travels"}
            </span>
            <h2 className="mt-3 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink md:text-5xl">
              {lang === "bn" ? "আপনার ভ্রমণ" : "Explore Beyond"}
              <br />
              <span className="text-brand">{lang === "bn" ? "আমাদের আবেগ" : "Every Horizon"}</span>
            </h2>

            <p className="mt-6 leading-relaxed text-body">
              {lang === "bn"
                ? "তুষারঢাকা হিমালয় থেকে মালদ্বীপের নীল লেগুন, পবিত্র মক্কা-মদিনা থেকে দুবাইয়ের ঝলমলে শহর — আমরা এমন ভ্রমণসূচি সাজাই যা আপনাকে প্রকৃতি, সংস্কৃতি ও নিজের সাথে যুক্ত করে।"
                : "From the snow-capped Himalayas and turquoise Maldives to the holy cities and the glittering skyline of Dubai, we craft immersive itineraries that connect you with nature, culture and your own sense of wonder."}
            </p>
            <p className="mt-4 leading-relaxed text-body">
              {lang === "bn"
                ? "নিরাপত্তা, স্বচ্ছতা ও আন্তরিকতা আমাদের কাজের মূলে। অভিজ্ঞ গাইড ও সুব্যবস্থাপনায় আপনার যাত্রা হবে নিশ্চিন্ত ও স্মরণীয়।"
                : "Safety, transparency and authenticity are at the core of what we do. Our experienced guides and end-to-end management make every journey worry-free and unforgettable."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/packages" className="rounded-lg bg-brand px-7 py-3.5 font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-dark">
                {lang === "bn" ? "ট্যুর দেখুন" : "View Trips"}
              </Link>
              <Link href="/about" className="font-bold uppercase tracking-wide text-ink underline decoration-accent decoration-2 underline-offset-4 transition hover:text-brand">
                {lang === "bn" ? "আরও জানুন" : "More About Us"}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
