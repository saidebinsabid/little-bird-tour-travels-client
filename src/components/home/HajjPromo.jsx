"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import Container from "@/components/ui/Container";
import Icon from "@/components/icons/Icon";
import { buttonClasses } from "@/components/ui/Button";

// Highlight band for the Hajj & Umrah vertical.
export default function HajjPromo() {
  const { t, lang } = useI18n();
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <Container>
        <div className="flex flex-col items-center gap-6 py-16 text-center text-white md:flex-row md:text-left">
          <div className="flex-1">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-accent md:mx-0">
              <Icon name="hajj" className="h-9 w-9" />
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{t("service.hajj")}</h2>
            <p className="mt-3 max-w-xl text-slate-200">
              {lang === "bn"
                ? "অভিজ্ঞ গাইড, হারামের কাছে হোটেল ও সম্পূর্ণ ব্যবস্থাপনায় নিশ্চিন্তে হজ্জ ও উমরাহ পালন করুন।"
                : "Perform Hajj & Umrah with peace of mind — experienced guides, hotels near the Haram and fully managed packages."}
            </p>
          </div>
          <Link href="/hajj-umrah" className={buttonClasses({ variant: "accent", size: "lg" })}>
            {t("common.viewAll")} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
