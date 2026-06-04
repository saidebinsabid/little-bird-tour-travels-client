"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { useContentItem } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/icons/Icon";
import InquiryForm from "@/components/forms/InquiryForm";
import { PageLoader } from "@/components/ui/Loading";
import { priceLabel } from "@/utils/format";
import { flagUrl } from "@/utils/flag";

const BD_FLAG = "https://flagcdn.com/bd.svg";

const STEPS = [
  { en: "Free consultation & document checklist", bn: "ফ্রি পরামর্শ ও ডকুমেন্ট চেকলিস্ট" },
  { en: "Submit your documents to us", bn: "আমাদের কাছে ডকুমেন্ট জমা দিন" },
  { en: "We process & submit to the embassy", bn: "আমরা দূতাবাসে প্রসেস ও জমা দিই" },
  { en: "Receive your visa on time", bn: "সময়মতো আপনার ভিসা বুঝে নিন" },
];

const WHY = [
  { icon: "verified", en: "Expert visa guidance", bn: "অভিজ্ঞ ভিসা পরামর্শ" },
  { icon: "trending", en: "High success rate", bn: "উচ্চ সাফল্যের হার" },
  { icon: "bolt", en: "Fast & transparent", bn: "দ্রুত ও স্বচ্ছ প্রসেস" },
  { icon: "support", en: "End-to-end support", bn: "শুরু থেকে শেষ পর্যন্ত সহায়তা" },
];

export default function VisaDetail({ slug }) {
  const { t, pick, lang } = useI18n();
  const { data: visa, isLoading } = useContentItem("visas", slug);

  if (isLoading) return <PageLoader />;
  if (!visa) return <Container><div className="py-32 text-center text-muted">{t("common.noResults")}</div></Container>;

  const title = pick(visa.title);
  const reqs = pick(visa.requirements) || visa.requirements?.en || [];
  const typeLabel = visa.visaType ? visa.visaType[0].toUpperCase() + visa.visaType.slice(1) : "Tourist";
  const flag = flagUrl(visa.flag);

  return (
    <>
      {/* Modern gradient hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-white/5" />
        <Container>
          <div className="relative pb-12 pt-28 md:pt-32">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-200">
              <Link href="/" className="hover:text-white">Home</Link><span>/</span>
              <Link href="/visa" className="hover:text-white">{t("nav.visa")}</Link><span>/</span>
              <span className="text-white">{visa.country}</span>
            </nav>

            <div className="mt-5 flex items-center gap-3 text-lg font-semibold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="flex items-center gap-2"><img src={BD_FLAG} alt="Bangladesh" className="h-5 w-7 rounded object-cover shadow-sm" /> Bangladesh</span>
              <Icon name="flight" className="h-5 w-5 text-accent" />
              <span className="flex items-center gap-2">
                {flag ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={flag} alt={visa.country} className="h-5 w-7 rounded object-cover shadow-sm" />
                ) : (
                  <span>{visa.flag || "🌍"}</span>
                )}
                {visa.country}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">{title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge tone="accent">{typeLabel} Visa</Badge>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm">💳 {priceLabel(visa.fee)}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm">⏱️ {visa.processingTime}</span>
              {visa.stayDuration && <span className="rounded-full bg-white/10 px-3 py-1 text-sm">🗓️ {pick(visa.stayDuration)}</span>}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
          {/* Main */}
          <div className="space-y-10">
            {/* Overview */}
            {visa.overview && (
              <section>
                <h2 className="text-2xl font-bold text-ink">{lang === "bn" ? "সংক্ষিপ্ত বিবরণ" : "Overview"}</h2>
                <p className="mt-3 leading-relaxed text-body">{pick(visa.overview)}</p>
              </section>
            )}

            {/* Required documents */}
            <section>
              <h2 className="text-2xl font-bold text-ink">
                {lang === "bn" ? "প্রয়োজনীয় ডকুমেন্ট" : "Required Documents"}
              </h2>
              <p className="mt-1 text-body">
                {lang === "bn"
                  ? `বাংলাদেশ থেকে ${visa.country} যাওয়ার জন্য যা যা লাগবে:`
                  : `What you need to travel from Bangladesh to ${visa.country}:`}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {reqs.length ? reqs.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">✓</span>
                    <span className="text-body">{r}</span>
                  </div>
                )) : <p className="text-muted">{lang === "bn" ? "বিস্তারিত জানতে যোগাযোগ করুন।" : "Contact us for the document list."}</p>}
              </div>
            </section>

            {/* Important note */}
            {visa.note && (
              <div className="flex items-start gap-3 rounded-xl border-l-4 border-accent bg-amber-50 p-4">
                <span className="text-xl">⚠️</span>
                <p className="text-sm font-medium text-amber-900">{pick(visa.note)}</p>
              </div>
            )}

            {/* Process */}
            <section>
              <h2 className="text-2xl font-bold text-ink">{lang === "bn" ? "আবেদন প্রক্রিয়া" : "Application Process"}</h2>
              <ol className="mt-5 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                    <p className="pt-1.5 font-medium text-body">{lang === "bn" ? s.bn : s.en}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Why us */}
            <section>
              <h2 className="text-2xl font-bold text-ink">{lang === "bn" ? "কেন আমাদের সাথে?" : "Why apply with Little Bird?"}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {WHY.map((w) => (
                  <div key={w.en} className="flex items-center gap-3 rounded-xl bg-surface p-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><Icon name={w.icon} className="h-6 w-6" /></span>
                    <span className="font-semibold text-ink">{lang === "bn" ? w.bn : w.en}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky inquiry sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="card-base overflow-hidden shadow-[var(--shadow-card)]">
              <div className="bg-gradient-to-br from-brand to-brand-dark p-6 text-center text-white">
                {flag ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={flag} alt={visa.country} className="mx-auto h-16 w-16 rounded-full object-cover shadow-md ring-4 ring-white/30" />
                ) : (
                  <span className="text-5xl">{visa.flag || "🌍"}</span>
                )}
                <p className="mt-2 text-lg font-bold">{visa.country}</p>
                <p className="text-sm text-brand-light">{typeLabel} Visa</p>
              </div>
              <div className="p-6">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3"><dt className="text-muted">{lang === "bn" ? "সার্ভিস ফি" : "Service fee"}</dt><dd className="font-bold text-accent-dark">{priceLabel(visa.fee)}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-muted">{lang === "bn" ? "প্রসেসিং" : "Processing"}</dt><dd className="text-right font-semibold text-ink">{visa.processingTime}</dd></div>
                  {visa.validity && <div className="flex justify-between gap-3"><dt className="text-muted">{lang === "bn" ? "মেয়াদ" : "Validity"}</dt><dd className="text-right font-semibold text-ink">{pick(visa.validity)}</dd></div>}
                  {visa.stayDuration && <div className="flex justify-between gap-3"><dt className="text-muted">{lang === "bn" ? "থাকার সময়" : "Stay"}</dt><dd className="text-right font-semibold text-ink">{pick(visa.stayDuration)}</dd></div>}
                </dl>
                <hr className="my-5 border-slate-100" />
                <h3 className="mb-3 font-bold text-ink">{t("common.inquireNow")}</h3>
                <InquiryForm type="visa" refId={visa._id} refType="visas" defaultSubject={title} compact />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
