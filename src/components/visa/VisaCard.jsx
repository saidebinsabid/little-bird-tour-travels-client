"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/i18n/useI18n";
import { priceLabel } from "@/utils/format";
import { flagUrl } from "@/utils/flag";

// Public visa card (flag → country + type → fee/processing → requirements →
// View Details). Pass `href` to override the link target and `actions` to drop
// controls (admin edit/delete) into the top-right corner.
export default function VisaCard({ item: v, href: hrefProp, actions }) {
  const { t, pick, lang } = useI18n();
  const href = hrefProp || `/visa/${v.slug || v._id}`;
  const reqs = pick(v.requirements) || v.requirements?.en || [];
  const typeLabel = v.visaType ? v.visaType[0].toUpperCase() + v.visaType.slice(1) : "Visa";
  const flag = flagUrl(v.flag);

  return (
    <article className="running-border group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-200 transition hover:-translate-y-1">
      {/* Whole-card link (sits under the content; action buttons override it) */}
      <Link href={href} className="absolute inset-0 z-0" aria-label={v.country} />

      {/* Optional controls (admin edit/delete) */}
      {actions && <div className="absolute right-3 top-3 z-20 flex items-center gap-2">{actions}</div>}

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 p-5">
          {flag ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={flag} alt={v.country} className="h-14 w-14 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-slate-200" loading="lazy" />
          ) : (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-light text-3xl">{v.flag || "🌍"}</span>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-ink group-hover:text-brand">{v.country}</h3>
            <Badge tone="brand">{typeLabel} Visa</Badge>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-surface px-3 py-1.5">
              <p className="text-[10px] uppercase tracking-wide text-muted">{lang === "bn" ? "সার্ভিস ফি" : "Service fee"}</p>
              <p className="font-bold text-accent-dark">{priceLabel(v.fee)}</p>
            </div>
            <div className="rounded-lg bg-surface px-3 py-1.5">
              <p className="text-[10px] uppercase tracking-wide text-muted">{lang === "bn" ? "প্রসেসিং" : "Processing"}</p>
              <p className="text-xs font-semibold leading-tight text-ink">{v.processingTime}</p>
            </div>
          </div>

          {reqs.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-body">
              {reqs.slice(0, 3).map((r, i) => (
                <li key={i} className="flex items-start gap-2"><span className="mt-0.5 text-green-600">✓</span><span className="line-clamp-1">{r}</span></li>
              ))}
            </ul>
          )}

          <span className="mt-5 inline-flex items-center justify-center gap-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-dark">
            {t("common.viewDetails")} →
          </span>
        </div>
      </div>
    </article>
  );
}
