"use client";

import Icon from "@/components/icons/Icon";
import { useI18n } from "@/i18n/useI18n";
import { useSettings } from "@/hooks/useContent";
import { priceLabel } from "@/utils/format";

const code = (s = "") => (s.match(/\(([^)]+)\)/)?.[1] || s).toUpperCase();
const city = (s = "") => s.replace(/\(.*?\)/g, "").trim();

// Public air-ticket fare card (airline header → route → price + inquire).
// Pass `actions` (admin edit/delete) to replace the trip-type badge in the
// header with the controls.
export default function FareCard({ item: f, actions }) {
  const { t, lang } = useI18n();
  const { data: settings } = useSettings();
  const wa = settings?.contact?.whatsapp?.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(`Hi, I'm interested in flights ${f.from} → ${f.to} (${f.airline}).`);
  const waHref = wa ? `https://wa.me/${wa}?text=${text}` : "/contact";

  return (
    <article className="running-border overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-100 transition hover:-translate-y-1">
      <div className="flex items-center justify-between bg-brand px-5 py-3 text-white">
        <span className="flex items-center gap-2 font-bold"><Icon name="flight" className="h-5 w-5" /> {f.airline}</span>
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : (
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold capitalize">{f.tripType}</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-ink">{code(f.from)}</p>
            <p className="text-xs text-muted">{city(f.from)}</p>
          </div>
          <div className="flex flex-1 items-center px-2">
            <span className="h-px flex-1 bg-slate-200" />
            <Icon name="flight" className="mx-1 h-5 w-5 text-brand" />
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-ink">{code(f.to)}</p>
            <p className="text-xs text-muted">{city(f.to)}</p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-dashed border-slate-200 pt-4">
          <div>
            <span className="block text-xs text-muted">{lang === "bn" ? "শুরু" : "Start From"}</span>
            <span className="text-xl font-extrabold text-accent-dark">{priceLabel(f.price)}</span>
          </div>
          <a href={waHref} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-accent-dark">
            {t("common.inquireNow")}
          </a>
        </div>
      </div>
    </article>
  );
}
