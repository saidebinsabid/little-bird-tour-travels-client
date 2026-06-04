"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/icons/Icon";
import { useI18n } from "@/i18n/useI18n";

const SERVICES = [
  { icon: "tour", titleKey: "service.tour", descKey: "service.tourDesc", href: "/packages" },
  { icon: "flight", titleKey: "service.air", descKey: "service.airDesc", href: "/air-ticket" },
  { icon: "visa", titleKey: "service.visa", descKey: "service.visaDesc", href: "/visa" },
  { icon: "hajj", titleKey: "service.hajj", descKey: "service.hajjDesc", href: "/hajj-umrah" },
  { icon: "hotel", titleKey: "service.hotel", descKey: "service.hotelDesc", href: "/hotels" },
  { icon: "shield", titleKey: "service.insurance", descKey: "service.insuranceDesc", href: "/contact" },
];

export default function ServicesGrid() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <Container>
        <SectionHeading eyebrow={t("home.services")} title={t("home.services")} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.titleKey}
              href={s.href}
              className="card-base running-border group flex items-start gap-4 p-6 shadow-[var(--shadow-card)] transition"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink group-hover:text-brand">{t(s.titleKey)}</h3>
                <p className="mt-1 text-sm text-body">{t(s.descKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
