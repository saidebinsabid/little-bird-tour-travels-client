"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { useI18n } from "@/i18n/useI18n";
import { buttonClasses } from "@/components/ui/Button";

export default function CTA() {
  const { t } = useI18n();
  return (
    <section className="bg-brand">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold text-white">{t("home.ctaTitle")}</h2>
            <p className="mt-2 text-brand-light">{t("home.ctaText")}</p>
          </div>
          <Link href="/contact" className={buttonClasses({ variant: "white", size: "lg" })}>
            {t("nav.contact")} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
