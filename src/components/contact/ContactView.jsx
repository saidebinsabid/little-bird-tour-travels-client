"use client";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import InquiryForm from "@/components/forms/InquiryForm";
import Icon from "@/components/icons/Icon";
import { useI18n } from "@/i18n/useI18n";
import { useSettings } from "@/hooks/useContent";

export default function ContactView() {
  const { t, pick, lang } = useI18n();
  const { data: settings } = useSettings();
  const c = settings?.contact || {};

  const cards = [
    { icon: "pin", label: lang === "bn" ? "ঠিকানা" : "Address", value: pick(c.address) },
    { icon: "phone", label: lang === "bn" ? "ফোন" : "Phone", value: c.phone, href: c.phone ? `tel:${c.phone}` : null },
    { icon: "mail", label: "Email", value: c.email, href: c.email ? `mailto:${c.email}` : null },
    { icon: "clock", label: lang === "bn" ? "অফিস সময়" : "Office Hours", value: c.officeHours },
  ];

  return (
    <>
      <PageHeader
        title={lang === "bn" ? "যোগাযোগ" : "Contact Us"}
        subtitle={lang === "bn" ? "আমরা আপনার সেবায় সর্বদা প্রস্তুত।" : "We're always here to help."}
        crumbs={[{ label: lang === "bn" ? "যোগাযোগ" : "Contact" }]}
        bg="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000&q=80"
      />
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-2">
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cards.filter((x) => x.value).map((x) => (
                <div key={x.label} className="card-base p-5 shadow-[var(--shadow-card)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand">
                    <Icon name={x.icon} className="h-6 w-6" />
                  </span>
                  <p className="mt-2 text-sm font-semibold text-muted">{x.label}</p>
                  {x.href ? (
                    <a href={x.href} className="text-ink hover:text-brand">{x.value}</a>
                  ) : (
                    <p className="text-ink">{x.value}</p>
                  )}
                </div>
              ))}
            </div>
            {c.mapEmbed ? (
              <div className="mt-6 overflow-hidden rounded-2xl" dangerouslySetInnerHTML={{ __html: c.mapEmbed }} />
            ) : (
              <div className="mt-6 grid h-64 place-items-center rounded-2xl bg-surface text-muted">
                🗺️ {lang === "bn" ? "ম্যাপ শীঘ্রই যুক্ত হবে" : "Map coming soon"}
              </div>
            )}
          </div>

          <div className="card-base p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-xl font-bold text-ink">{t("common.send")} {lang === "bn" ? "বার্তা" : "a Message"}</h2>
            <InquiryForm type="contact" />
          </div>
        </div>
      </Container>
    </>
  );
}
