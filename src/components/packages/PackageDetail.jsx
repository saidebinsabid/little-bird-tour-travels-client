"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";
import { useContentItem } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import { PageLoader } from "@/components/ui/Loading";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import InquiryForm from "@/components/forms/InquiryForm";
import ReviewsSection from "@/components/packages/ReviewsSection";
import { priceLabel } from "@/utils/format";

function List({ items, positive }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-2">
      {items.map((x, i) => (
        <li key={i} className="flex items-start gap-2 text-body">
          <span className={positive ? "text-green-600" : "text-red-500"}>{positive ? "✓" : "✕"}</span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PackageDetail({ slug, resource = "packages", crumbBase = { label: "Tour Packages", href: "/packages" }, inquiryType = "tour" }) {
  const { t, pick } = useI18n();
  const { data: item, isLoading, isError } = useContentItem(resource, slug);

  if (isLoading) return <PageLoader />;
  if (isError || !item) {
    return <Container><div className="py-24 text-center text-muted">{t("common.noResults")}</div></Container>;
  }

  const title = pick(item.title) || pick(item.name);
  const gallery = item.gallery?.length ? item.gallery : item.cover ? [item.cover] : [];

  return (
    <>
      <PageHeader title={title} crumbs={[crumbBase, { label: title }]} bg={item.cover} />

      <Container>
        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div>
            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="overflow-hidden rounded-2xl">
                <div className="relative h-72 md:h-96">
                  <Image src={gallery[0]} alt={title} fill sizes="100vw" className="object-cover" priority />
                </div>
                {gallery.length > 1 && (
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {gallery.slice(1, 5).map((g, i) => (
                      <div key={i} className="relative h-20 overflow-hidden rounded-lg">
                        <Image src={g} alt={`${title} ${i}`} fill sizes="25vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {item.location && <Badge tone="brand">📍 {pick(item.location)}</Badge>}
              {item.durationDays && <Badge tone="gray">🗓️ {item.durationDays} {t("common.days")}</Badge>}
              {item.maxGroup && <Badge tone="gray">👥 {t("pkg.groupSize")}: {item.maxGroup}</Badge>}
              {item.rating ? <span className="flex items-center gap-1"><Rating value={item.rating} /><span className="text-sm text-muted">{item.rating.toFixed(1)}</span></span> : null}
            </div>

            {/* Overview */}
            {item.summary && (
              <section className="mt-8">
                <h2 className="text-xl font-bold text-ink">{t("pkg.overview")}</h2>
                <p className="mt-3 leading-relaxed text-body">{pick(item.summary)}</p>
              </section>
            )}

            {/* Itinerary */}
            {item.itinerary?.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold text-ink">{t("pkg.itinerary")}</h2>
                <ol className="mt-4 space-y-4">
                  {item.itinerary.map((d, i) => (
                    <li key={i} className="relative rounded-xl bg-surface p-4 pl-14">
                      <span className="absolute left-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="font-semibold text-ink">{t("pkg.day")} {i + 1}</p>
                      <p className="text-body">{pick(d.title)}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Inclusions / exclusions */}
            {(item.inclusions || item.exclusions) && (
              <section className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="mb-3 font-bold text-ink">{t("pkg.inclusions")}</h3>
                  <List items={pick(item.inclusions) || item.inclusions?.en} positive />
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="mb-3 font-bold text-ink">{t("pkg.exclusions")}</h3>
                  <List items={pick(item.exclusions) || item.exclusions?.en} positive={false} />
                </div>
              </section>
            )}

            {/* Reviews */}
            <ReviewsSection refId={item._id} refType={resource} />
          </div>

          {/* Sticky booking sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="card-base p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm text-muted">{t("common.from")}</p>
              <p className="text-3xl font-extrabold text-accent-dark">{priceLabel(item.price)}</p>
              <p className="text-sm text-muted">{item.price?.unit === "per couple" ? t("common.perCouple") : t("common.perPerson")}</p>
              <hr className="my-5 border-slate-100" />
              <h3 className="mb-3 font-bold text-ink">{t("common.inquireNow")}</h3>
              <InquiryForm type={inquiryType} refId={item._id} refType={resource} defaultSubject={title} compact />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
