"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/useI18n";
import Icon from "@/components/icons/Icon";

const TABS = [
  { key: "flight", icon: "flight", labelKey: "nav.airTicket" },
  { key: "hotel", icon: "hotel", labelKey: "nav.hotels" },
  { key: "tour", icon: "tour", labelKey: "nav.packages" },
  { key: "visa", icon: "visa", labelKey: "nav.visa" },
];

// Bordered input cell: small uppercase label on top, bold value below.
function Cell({ label, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 px-4 py-3 text-left transition focus-within:border-brand ${className}`}>
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}

const cellInput = "mt-0.5 w-full bg-transparent text-base font-bold text-ink outline-none placeholder:font-normal placeholder:text-slate-400";

export default function SearchWidget() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [tab, setTab] = useState("flight");
  const [trip, setTrip] = useState("oneway");

  // Shared simple fields per tab
  const [flight, setFlight] = useState({ from: "Dhaka (DAC)", to: "Cox's Bazar (CXB)", depart: "", ret: "", travelers: "1", cls: "Economy" });
  const [hotel, setHotel] = useState({ city: "", checkin: "", checkout: "", guests: "1" });
  const [tour, setTour] = useState({ dest: "", date: "" });
  const [visa, setVisa] = useState({ country: "" });

  const go = (e) => {
    e.preventDefault();
    if (tab === "flight") {
      const q = new URLSearchParams({ from: flight.from, to: flight.to, trip, depart: flight.depart, pax: flight.travelers, cls: flight.cls });
      router.push(`/air-ticket?${q.toString()}`);
    } else if (tab === "hotel") {
      router.push(hotel.city ? `/hotels?search=${encodeURIComponent(hotel.city)}` : "/hotels");
    } else if (tab === "tour") {
      router.push(tour.dest ? `/packages?search=${encodeURIComponent(tour.dest)}` : "/packages");
    } else {
      router.push(visa.country ? `/visa?search=${encodeURIComponent(visa.country)}` : "/visa");
    }
  };

  const swap = () => setFlight((f) => ({ ...f, from: f.to, to: f.from }));

  const TR = (key, fallback) => t(key) || fallback;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
      {/* Tabs */}
      <div className="mb-4 flex flex-wrap justify-center gap-1 border-b border-slate-100 sm:gap-2">
        {TABS.map((tb) => {
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`group flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-bold transition sm:px-5 ${
                active ? "border-accent text-brand" : "border-transparent text-muted hover:text-brand"
              }`}
            >
              <Icon name={tb.icon} className="h-5 w-5" />
              {t(tb.labelKey)}
            </button>
          );
        })}
      </div>

      <form onSubmit={go}>
        {/* FLIGHT */}
        {tab === "flight" && (
          <>
            <div className="mb-3 flex flex-wrap gap-4">
              {[
                ["oneway", lang === "bn" ? "ওয়ান ওয়ে" : "One Way"],
                ["round", lang === "bn" ? "রাউন্ড ওয়ে" : "Round Way"],
                ["multi", lang === "bn" ? "মাল্টি সিটি" : "Multi City"],
              ].map(([val, label]) => (
                <label key={val} className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
                  <input type="radio" name="trip" checked={trip === val} onChange={() => setTrip(val)} className="h-4 w-4 accent-[var(--color-brand)]" />
                  {label}
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
              <div className="relative">
                <Cell label={lang === "bn" ? "কোথা থেকে" : "From"}>
                  <input className={cellInput} value={flight.from} onChange={(e) => setFlight({ ...flight, from: e.target.value })} />
                </Cell>
                <button type="button" onClick={swap} className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-slate-200 bg-white text-brand shadow md:grid lg:hidden xl:grid" aria-label="Swap">⇄</button>
              </div>
              <Cell label={lang === "bn" ? "কোথায়" : "To"}>
                <input className={cellInput} value={flight.to} onChange={(e) => setFlight({ ...flight, to: e.target.value })} />
              </Cell>
              <Cell label={lang === "bn" ? "যাত্রার তারিখ" : "Departure"}>
                <input type="date" className={cellInput} value={flight.depart} onChange={(e) => setFlight({ ...flight, depart: e.target.value })} />
              </Cell>
              <Cell label={lang === "bn" ? "যাত্রী, ক্লাস" : "Traveler, Class"}>
                <div className="mt-0.5 flex items-center gap-1">
                  <select className="bg-transparent text-base font-bold text-ink outline-none" value={flight.travelers} onChange={(e) => setFlight({ ...flight, travelers: e.target.value })}>
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <select className="bg-transparent text-sm text-body outline-none" value={flight.cls} onChange={(e) => setFlight({ ...flight, cls: e.target.value })}>
                    <option>Economy</option><option>Business</option><option>First</option>
                  </select>
                </div>
              </Cell>
            </div>
          </>
        )}

        {/* HOTEL */}
        {tab === "hotel" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Cell label={lang === "bn" ? "শহর / এলাকা" : "City / Area"} className="lg:col-span-2">
              <input className={cellInput} placeholder="Cox's Bazar" value={hotel.city} onChange={(e) => setHotel({ ...hotel, city: e.target.value })} />
            </Cell>
            <Cell label={lang === "bn" ? "চেক-ইন" : "Check-in"}>
              <input type="date" className={cellInput} value={hotel.checkin} onChange={(e) => setHotel({ ...hotel, checkin: e.target.value })} />
            </Cell>
            <Cell label={lang === "bn" ? "চেক-আউট" : "Check-out"}>
              <input type="date" className={cellInput} value={hotel.checkout} onChange={(e) => setHotel({ ...hotel, checkout: e.target.value })} />
            </Cell>
          </div>
        )}

        {/* TOUR */}
        {tab === "tour" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Cell label={lang === "bn" ? "গন্তব্য" : "Destination"}>
              <input className={cellInput} placeholder={lang === "bn" ? "কোথায় যেতে চান?" : "Where to?"} value={tour.dest} onChange={(e) => setTour({ ...tour, dest: e.target.value })} />
            </Cell>
            <Cell label={lang === "bn" ? "ভ্রমণের তারিখ" : "Travel date"}>
              <input type="date" className={cellInput} value={tour.date} onChange={(e) => setTour({ ...tour, date: e.target.value })} />
            </Cell>
          </div>
        )}

        {/* VISA */}
        {tab === "visa" && (
          <div className="grid grid-cols-1 gap-3">
            <Cell label={lang === "bn" ? "কোন দেশের ভিসা" : "Visa for country"}>
              <input className={cellInput} placeholder="Thailand, Malaysia, Dubai…" value={visa.country} onChange={(e) => setVisa({ country: e.target.value })} />
            </Cell>
          </div>
        )}

        {/* Search button */}
        <div className="mt-5 flex justify-center">
          <button type="submit" className="rounded-xl bg-accent px-12 py-3.5 text-lg font-bold text-brand-dark shadow-lg transition hover:bg-accent-dark">
            🔍 {TR("common.search", "Search")}
          </button>
        </div>
      </form>
    </div>
  );
}
