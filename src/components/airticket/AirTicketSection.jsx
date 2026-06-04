"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/icons/Icon";
import FareCard from "./FareCard";
import { SkeletonGrid } from "@/components/ui/Loading";

const norm = (s = "") => s.toLowerCase().replace(/\(.*?\)/g, "").trim();

export default function AirTicketSection() {
  const { t, lang } = useI18n();
  const params = useSearchParams();
  const { data, isLoading } = useContentList("air-tickets", { status: "published", limit: 50 });
  const fares = data?.data || [];

  const [filter, setFilter] = useState({
    from: params.get("from") || "",
    to: params.get("to") || "",
    date: params.get("depart") || "",
    cls: params.get("cls") || "Economy",
  });
  const set = (k) => (e) => setFilter((s) => ({ ...s, [k]: e.target.value }));

  // Dropdown options come ONLY from the admin-created air-ticket packages.
  const froms = useMemo(() => [...new Set(fares.map((x) => x.from).filter(Boolean))].sort(), [fares]);
  const tos = useMemo(
    () => [...new Set(fares.filter((x) => !filter.from || x.from === filter.from).map((x) => x.to).filter(Boolean))].sort(),
    [fares, filter.from]
  );

  const matched = fares.filter((f) => {
    const okFrom = !filter.from || norm(f.from).includes(norm(filter.from)) || norm(filter.from).includes(norm(f.from));
    const okTo = !filter.to || norm(f.to).includes(norm(filter.to)) || norm(filter.to).includes(norm(f.to));
    return okFrom && okTo;
  });
  const searching = Boolean(filter.from || filter.to);

  return (
    <Container>
      {/* Search bar */}
      <div className="mt-10 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-bold text-ink">{lang === "bn" ? "ফ্লাইট খুঁজুন" : "Find Your Flight"}</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
          {/* From & To — dropdowns from the admin's air-ticket packages */}
          <div className="rounded-xl border border-slate-200 px-4 py-2 focus-within:border-brand">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{lang === "bn" ? "কোথা থেকে" : "From"}</span>
            <select className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none" value={filter.from} onChange={(e) => setFilter((s) => ({ ...s, from: e.target.value, to: "" }))}>
              <option value="">{lang === "bn" ? "নির্বাচন করুন" : "Select origin"}</option>
              {froms.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="rounded-xl border border-slate-200 px-4 py-2 focus-within:border-brand">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{lang === "bn" ? "কোথায়" : "To"}</span>
            <select className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none disabled:text-slate-400" value={filter.to} onChange={set("to")} disabled={!filter.from}>
              <option value="">{filter.from ? (lang === "bn" ? "গন্তব্য নির্বাচন" : "Select destination") : (lang === "bn" ? "আগে From নির্বাচন" : "Pick origin first")}</option>
              {tos.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {/* Date — free */}
          <div className="rounded-xl border border-slate-200 px-4 py-2 focus-within:border-brand">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{lang === "bn" ? "তারিখ" : "Date"}</span>
            <input type="date" className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none" value={filter.date} onChange={set("date")} />
          </div>
          {/* Class — free */}
          <div className="rounded-xl border border-slate-200 px-4 py-2 focus-within:border-brand">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{lang === "bn" ? "ক্লাস" : "Class"}</span>
            <select className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none" value={filter.cls} onChange={set("cls")}>
              <option>Economy</option><option>Business</option><option>First</option>
            </select>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3 text-base font-bold text-brand-dark shadow-lg transition hover:bg-accent-dark">
            <Icon name="search" className="h-5 w-5" /> {lang === "bn" ? "খুঁজুন" : "Search"}
          </button>
        </div>
      </div>

      {/* Fares */}
      <section className="py-14">
        <SectionHeading title={searching ? (lang === "bn" ? "ম্যাচিং ফ্লাইট" : "Matching Flights") : (lang === "bn" ? "জনপ্রিয় ভাড়া" : "Popular Fares")} />
        <div className="mt-10">
          {isLoading ? (
            <SkeletonGrid count={4} />
          ) : matched.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matched.map((f) => <FareCard key={f._id} item={f} />)}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface py-16 text-center">
              <p className="text-muted">{lang === "bn" ? "এই রুটে এখন কোনো ফেয়ার নেই — আমাদের সাথে যোগাযোগ করুন, আমরা সেরা দাম এনে দেব।" : "No fares for this route yet — contact us and we'll find you the best price."}</p>
              <a href="/contact" className="mt-4 inline-block rounded-lg bg-brand px-6 py-2.5 font-semibold text-white transition hover:bg-brand-dark">{t("common.inquireNow")}</a>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
