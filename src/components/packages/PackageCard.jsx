"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/useI18n";
import { priceLabel } from "@/utils/format";
import Icon from "@/components/icons/Icon";

// Overlay-style tour-package card: the cover image fills the card, and every
// piece of information is stacked top-to-bottom inside a frosted dark box pinned
// to the bottom — meta (location · duration) → title → price + a circular CTA
// arrow. Pass `href` to override the link target and `actions` to drop controls
// (e.g. admin edit/delete) into the top-right corner.
export default function PackageCard({ item, basePath = "/packages", href: hrefProp, actions }) {
  const { pick, lang } = useI18n();
  const href = hrefProp || `${basePath}/${item.slug || item._id}`;
  const title = pick(item.title) || pick(item.name);
  const durLabel =
    item.durationDays || item.durationNights
      ? lang === "bn"
        ? `${item.durationDays || 0} দিন ${item.durationNights || 0} রাত`
        : `${item.durationDays || 0} Days ${item.durationNights || 0} Night`
      : null;

  return (
    <article className="group relative h-[440px] overflow-hidden rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl">
      {item.cover ? (
        <Image
          src={item.cover}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-slate-200" />
      )}

      {/* Legibility gradient so the bottom text always reads */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Whole-card link (sits under the content; action buttons override it) */}
      <Link href={href} className="absolute inset-0 z-0" aria-label={title} />

      {item.featured && (
        <span className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-brand-dark shadow">
          ★ {lang === "bn" ? "ফিচার্ড" : "Featured"}
        </span>
      )}

      {/* Optional controls (admin edit/delete) — above the link so they're clickable */}
      {actions && <div className="absolute right-4 top-4 z-20 flex items-center gap-2">{actions}</div>}

      {/* Info box pinned to the bottom */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-md transition group-hover:bg-black/55">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-white/85">
          {item.location && (
            <span className="flex items-center gap-1.5">
              <Icon name="pin" className="h-4 w-4 text-accent" /> {pick(item.location)}
            </span>
          )}
          {durLabel && (
            <span className="flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-accent" /> {durLabel}
            </span>
          )}
        </div>

        <h3 className="clamp-2 mt-2 text-lg font-bold leading-snug text-white">{title}</h3>

        <div className="mt-3 flex items-end justify-between gap-3 border-t border-white/15 pt-3">
          <div>
            <span className="block text-[11px] uppercase tracking-wide text-white/65">
              {lang === "bn" ? "শুরু" : "Start From"}
            </span>
            <span className="text-2xl font-extrabold text-white">{priceLabel(item.price)}</span>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-brand-dark shadow-lg transition group-hover:scale-110 group-hover:bg-accent-dark">
            <Icon name="arrowUpRight" className="h-5 w-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
