"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/icons/Icon";
import { useI18n } from "@/i18n/useI18n";

const ITEMS = [
  { icon: "award", titleKey: "why.experience", descKey: "why.experienceDesc" },
  { icon: "sell", titleKey: "why.price", descKey: "why.priceDesc" },
  { icon: "support", titleKey: "why.support", descKey: "why.supportDesc" },
  { icon: "target", titleKey: "why.custom", descKey: "why.customDesc" },
];

export default function WhyChooseUs() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-surface">
      <Container>
        <SectionHeading title={t("home.whyUs")} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((i) => (
            <div key={i.titleKey} className="rounded-2xl bg-white p-6 text-center shadow-[var(--shadow-card)]">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand">
                <Icon name={i.icon} className="h-8 w-8" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{t(i.titleKey)}</h3>
              <p className="mt-2 text-sm text-body">{t(i.descKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
