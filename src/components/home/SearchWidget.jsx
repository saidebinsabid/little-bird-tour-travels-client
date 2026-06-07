"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";
import Icon from "@/components/icons/Icon";
import TourSearch from "@/components/search/TourSearch";
import VisaSearch from "@/components/search/VisaSearch";

const TABS = [
  { key: "visa", icon: "visa", labelKey: "nav.visa" },
  { key: "flight", icon: "flight", labelKey: "nav.airTicket" },
  { key: "hotel", icon: "hotel", labelKey: "nav.hotels" },
  { key: "tour", icon: "tour", labelKey: "nav.packages" },
];

function Cell({ label, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 px-4 py-2 text-left transition focus-within:border-brand ${className}`}>
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}
const cellInput = "mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none placeholder:font-normal placeholder:text-slate-400";
const cellSelect = "mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none disabled:text-slate-400";
const searchBtn = "inline-flex items-center gap-2 rounded-xl bg-accent px-10 py-3 text-base font-bold text-brand-dark shadow-lg transition hover:bg-accent-dark";

// Flight search: From / To dropdowns are populated ONLY from the air-ticket
// packages the admin has created (so users search what actually exists).
function FlightForm() {
  const { lang } = useI18n();
  const router = useRouter();
  const { data } = useContentList("air-tickets", { status: "published", limit: 100 });
  const fares = data?.data || [];

  const froms = useMemo(() => [...new Set(fares.map((x) => x.from).filter(Boolean))].sort(), [fares]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [cls, setCls] = useState("Economy");

  const tos = useMemo(
    () => [...new Set(fares.filter((x) => !from || x.from === from).map((x) => x.to).filter(Boolean))].sort(),
    [fares, from]
  );

  const swap = () => { const a = from; setFrom(to); setTo(a); };
  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (from) q.set("from", from);
    if (to) q.set("to", to);
    q.set("cls", cls);
    if (depart) q.set("depart", depart);
    router.push(`/air-ticket?${q.toString()}`);
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
        <div className="relative">
          <Cell label={lang === "bn" ? "কোথা থেকে" : "From"}>
            <select className={cellSelect} value={from} onChange={(e) => { setFrom(e.target.value); setTo(""); }}>
              <option value="">{lang === "bn" ? "নির্বাচন করুন" : "Select origin"}</option>
              {froms.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Cell>
          <button type="button" onClick={swap} className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-slate-200 bg-white text-brand shadow md:grid lg:hidden xl:grid" aria-label="Swap">⇄</button>
        </div>
        <Cell label={lang === "bn" ? "কোথায়" : "To"}>
          <select className={cellSelect} value={to} onChange={(e) => setTo(e.target.value)} disabled={!from}>
            <option value="">{from ? (lang === "bn" ? "গন্তব্য নির্বাচন" : "Select destination") : (lang === "bn" ? "আগে From নির্বাচন" : "Pick origin first")}</option>
            {tos.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Cell>
        <Cell label={lang === "bn" ? "যাত্রার তারিখ" : "Departure"}>
          <input type="date" className={cellInput} value={depart} onChange={(e) => setDepart(e.target.value)} />
        </Cell>
        <Cell label={lang === "bn" ? "ক্লাস" : "Class"}>
          <select className={cellSelect} value={cls} onChange={(e) => setCls(e.target.value)}>
            <option>Economy</option><option>Business</option><option>First</option>
          </select>
        </Cell>
      </div>
      <div className="mt-5 flex justify-center"><button type="submit" className={searchBtn}><Icon name="search" className="h-5 w-5" /> {lang === "bn" ? "খুঁজুন" : "Search"}</button></div>
    </form>
  );
}

function HotelForm() {
  const { lang } = useI18n();
  const router = useRouter();
  const [h, setH] = useState({ city: "", checkin: "", checkout: "" });
  const submit = (e) => {
    e.preventDefault();
    router.push(h.city ? `/hotels?search=${encodeURIComponent(h.city)}` : "/hotels");
  };
  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Cell label={lang === "bn" ? "শহর / এলাকা" : "City / Area"} className="lg:col-span-2">
          <input className={cellInput} placeholder="Cox's Bazar" value={h.city} onChange={(e) => setH({ ...h, city: e.target.value })} />
        </Cell>
        <Cell label={lang === "bn" ? "চেক-ইন" : "Check-in"}>
          <input type="date" className={cellInput} value={h.checkin} onChange={(e) => setH({ ...h, checkin: e.target.value })} />
        </Cell>
        <Cell label={lang === "bn" ? "চেক-আউট" : "Check-out"}>
          <input type="date" className={cellInput} value={h.checkout} onChange={(e) => setH({ ...h, checkout: e.target.value })} />
        </Cell>
      </div>
      <div className="mt-5 flex justify-center"><button type="submit" className={searchBtn}><Icon name="search" className="h-5 w-5" /> {lang === "bn" ? "খুঁজুন" : "Search"}</button></div>
    </form>
  );
}

export default function SearchWidget() {
  const { t } = useI18n();
  const [tab, setTab] = useState("visa");

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
      <div className="mb-4 flex flex-wrap justify-center gap-1 border-b border-slate-100 sm:gap-2">
        {TABS.map((tb) => {
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-bold transition sm:px-5 ${active ? "border-brand text-brand" : "border-transparent text-muted hover:text-brand"}`}
            >
              <Icon name={tb.icon} className="h-5 w-5" />
              {t(tb.labelKey)}
            </button>
          );
        })}
      </div>

      {tab === "flight" && <FlightForm />}
      {tab === "hotel" && <HotelForm />}
      {tab === "tour" && <TourSearch />}
      {tab === "visa" && <VisaSearch />}
    </div>
  );
}
