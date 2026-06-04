"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Icon from "@/components/icons/Icon";
import { SkeletonGrid } from "@/components/ui/Loading";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import { priceLabel } from "@/utils/format";

const TABS = [
  { key: "hajj", en: "Hajj", bn: "হজ্জ" },
  { key: "umrah", en: "Umrah", bn: "উমরাহ" },
];

function HajjCard({ item }) {
  const { pick, lang } = useI18n();
  const href = `/hajj-umrah/${item.slug || item._id}`;
  const inc = pick(item.inclusions) || item.inclusions?.en || [];

  return (
    <article className="running-border group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-slate-100 transition hover:-translate-y-1">
      <Link href={href} className="relative block h-44 overflow-hidden">
        {item.cover ? (
          <Image src={item.cover} alt={pick(item.title)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}
        {item.packageClass && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold capitalize text-brand-dark shadow">{item.packageClass}</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink">
          <Link href={href} className="transition hover:text-brand">{pick(item.title)}</Link>
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {item.durationDays && (
            <span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4 text-accent-dark" /> {item.durationDays} {lang === "bn" ? "দিন" : "Days"}</span>
          )}
          {item.hotelMakkah && (
            <span className="flex items-center gap-1.5"><Icon name="hajj" className="h-4 w-4 text-accent-dark" /> {pick(item.hotelMakkah)}</span>
          )}
        </div>

        {inc.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm text-body">
            {inc.slice(0, 5).map((x, i) => (
              <li key={i} className="flex items-start gap-2"><span className="mt-0.5 text-green-600">✓</span><span className="line-clamp-1">{x}</span></li>
            ))}
          </ul>
        )}

        <div className="my-4 border-t border-dashed border-slate-200" />

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <span className="block text-xs text-muted">{lang === "bn" ? "শুরু" : "Start From"}</span>
            <span className="text-xl font-extrabold text-ink">{priceLabel(item.price)}</span>
          </div>
          <Link href={href} className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">
            {lang === "bn" ? "বিস্তারিত" : "View Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HajjUmrah() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState("hajj");
  const { data, isLoading } = useContentList("hajj", { status: "published", type: tab, limit: 12 });
  const items = data?.data || [];

  return (
    <Container>
      <div className="py-12">
        {/* Toggle buttons */}
        <div className="mx-auto mb-10 flex max-w-sm gap-2 rounded-full bg-surface p-1.5 shadow-inner">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-bold transition ${
                tab === tb.key ? "bg-brand text-white shadow-md" : "text-body hover:text-brand"
              }`}
            >
              <Icon name="hajj" className="h-5 w-5" /> {lang === "bn" ? tb.bn : tb.en}
            </button>
          ))}
        </div>

        {isLoading ? (
          <SkeletonGrid count={3} />
        ) : items.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => <HajjCard key={p._id} item={p} />)}
          </div>
        ) : (
          <div className="rounded-2xl bg-surface py-20 text-center text-muted">{t("common.noResults")}</div>
        )}
      </div>
    </Container>
  );
}
