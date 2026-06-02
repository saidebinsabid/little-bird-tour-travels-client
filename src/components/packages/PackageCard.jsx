"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";
import { priceLabel } from "@/utils/format";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";

// Reused on the home page and the /packages grid. `basePath` lets the same card
// link into different sections (packages, hajj-umrah, hotels...).
export default function PackageCard({ item, basePath = "/packages" }) {
  const { t, pick, lang } = useI18n();
  const href = `${basePath}/${item.slug || item._id}`;
  const durLabel =
    item.durationDays || item.durationNights
      ? lang === "bn"
        ? `${item.durationDays || 0} দিন / ${item.durationNights || 0} রাত`
        : `${item.durationDays || 0}D / ${item.durationNights || 0}N`
      : null;
  const unitLabel =
    item.price?.unit === "per couple"
      ? t("common.perCouple")
      : item.price?.unit === "per night"
        ? t("common.perNight")
        : t("common.perPerson");

  return (
    <article className="card-base group flex flex-col shadow-[var(--shadow-card)] transition hover:-translate-y-1">
      <Link href={href} className="relative block h-52 overflow-hidden">
        {item.cover ? (
          <Image
            src={item.cover}
            alt={pick(item.title) || pick(item.name)}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}
        {item.featured && (
          <Badge tone="accent" className="absolute left-3 top-3">★ Featured</Badge>
        )}
        {durLabel && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            {durLabel}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {item.location && (
          <p className="text-xs font-medium text-muted">📍 {pick(item.location)}</p>
        )}
        <h3 className="mt-1 line-clamp-2 clamp-2 text-base font-bold text-ink">
          <Link href={href} className="hover:text-brand">{pick(item.title) || pick(item.name)}</Link>
        </h3>
        {item.summary && (
          <p className="mt-1.5 text-sm text-body clamp-2">{pick(item.summary)}</p>
        )}

        <div className="mt-3 flex items-center gap-2">
          {item.rating ? <Rating value={item.rating} /> : null}
          {item.rating ? <span className="text-xs text-muted">{item.rating.toFixed(1)}</span> : null}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="block text-xs text-muted">{t("common.from")}</span>
            <span className="text-lg font-extrabold text-accent-dark">{priceLabel(item.price)}</span>
            <span className="ml-1 text-xs text-muted">{unitLabel}</span>
          </div>
          <Link
            href={href}
            className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            {t("common.viewDetails")}
          </Link>
        </div>
      </div>
    </article>
  );
}
