"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { useI18n } from "@/i18n/useI18n";

const STATS = [
  { value: "5K+", en: "Happy Travelers", bn: "সন্তুষ্ট ভ্রমণকারী" },
  { value: "50+", en: "Destinations", bn: "গন্তব্য" },
  { value: "10+", en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
  { value: "24/7", en: "Support", bn: "সাপোর্ট" },
];

export default function AboutPage() {
  const { lang } = useI18n();
  return (
    <>
      <PageHeader
        title={lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
        crumbs={[{ label: lang === "bn" ? "আমাদের সম্পর্কে" : "About Us" }]}
        bg="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
      />
      <Container>
        <div className="grid items-center gap-10 py-14 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-2xl">
            <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" alt="About" fill sizes="50vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading
              center={false}
              eyebrow={lang === "bn" ? "লিটল বার্ড" : "Little Bird"}
              title={lang === "bn" ? "আপনার ভ্রমণ, আমাদের আবেগ" : "Your Journey, Our Passion"}
            />
            <p className="mt-5 leading-relaxed text-body">
              {lang === "bn"
                ? "লিটল বার্ড ট্যুরস অ্যান্ড ট্রাভেলস একটি বিশ্বস্ত ট্রাভেল এজেন্সি যারা ট্যুর প্যাকেজ, বিমান টিকিট, ভিসা প্রসেসিং, হজ্জ ও উমরাহ এবং হোটেল বুকিং সেবা দিয়ে থাকে। আমাদের লক্ষ্য আপনার প্রতিটি ভ্রমণকে সহজ, নিরাপদ ও স্মরণীয় করে তোলা।"
                : "Little Bird Tours & Travels is a trusted travel agency offering tour packages, air tickets, visa processing, Hajj & Umrah and hotel booking. Our mission is to make every journey simple, safe and memorable."}
            </p>
            <p className="mt-4 leading-relaxed text-body">
              {lang === "bn"
                ? "অভিজ্ঞ টিম, প্রতিযোগিতামূলক মূল্য এবং ২৪/৭ সাপোর্ট নিয়ে আমরা আপনার পাশে আছি।"
                : "With an experienced team, competitive prices and 24/7 support, we're always by your side."}
            </p>
          </div>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-6 rounded-2xl bg-brand p-8 text-center text-white md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value}>
              <p className="text-3xl font-extrabold md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-brand-light">{lang === "bn" ? s.bn : s.en}</p>
            </div>
          ))}
        </div>
      </Container>
      <WhyChooseUs />
    </>
  );
}
