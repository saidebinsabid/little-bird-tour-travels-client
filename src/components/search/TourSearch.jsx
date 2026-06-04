"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContentList } from "@/hooks/useContent";
import { useI18n } from "@/i18n/useI18n";
import Icon from "@/components/icons/Icon";
import { priceLabel } from "@/utils/format";

// Tour search — three dependent dropdowns, no free typing:
//   Country → Destination (of that country) → Price (the actual prices of the
//   packages at that destination). Submitting routes to /packages filtered by
//   destination + price.
function Field({ label, children }) {
  return (
    <div className="rounded-xl border border-slate-200 px-4 py-2 text-left transition focus-within:border-brand">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}
const ctl = "mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none disabled:text-slate-400";

export default function TourSearch() {
  const { lang, pick } = useI18n();
  const router = useRouter();
  const params = useSearchParams();

  const { data: destData } = useContentList("destinations", { status: "published", limit: 100 });
  const { data: pkgData } = useContentList("packages", { status: "published", limit: 100 });
  const dests = destData?.data || [];
  const packages = pkgData?.data || [];

  const [country, setCountry] = useState("");
  const [destId, setDestId] = useState("");
  const [price, setPrice] = useState("");

  // Once data is loaded, preset the selections from the URL so the bar mirrors
  // the active filters when you land on /packages?destinationId=…&price=…
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (hydrated || !dests.length) return;
    const did = params.get("destinationId") || "";
    const d = dests.find((x) => String(x._id) === did);
    setDestId(did);
    setCountry(d?.country || "");
    setPrice(params.get("price") || "");
    setHydrated(true);
  }, [dests, hydrated, params]);

  const countries = useMemo(
    () => [...new Set(dests.map((d) => d.country).filter(Boolean))].sort(),
    [dests]
  );
  const countryDests = useMemo(() => dests.filter((d) => d.country === country), [dests, country]);

  // Prices come ONLY from the packages of the selected destination.
  const priceOptions = useMemo(() => {
    const seen = new Map();
    for (const p of packages) {
      if (String(p.destinationId) !== String(destId)) continue;
      const amt = p.price?.amount;
      if (amt != null && !seen.has(amt)) seen.set(amt, p.price);
    }
    return [...seen.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([amount, priceObj]) => ({ amount, label: priceLabel(priceObj) }));
  }, [packages, destId]);

  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (destId) q.set("destinationId", destId);
    if (price) q.set("price", price);
    const qs = q.toString();
    router.push(`/packages${qs ? `?${qs}` : ""}`);
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Field label={lang === "bn" ? "কোন দেশ" : "Country"}>
          <select
            className={ctl}
            value={country}
            onChange={(e) => { setCountry(e.target.value); setDestId(""); setPrice(""); }}
          >
            <option value="">{lang === "bn" ? "দেশ নির্বাচন করুন" : "Select country"}</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label={lang === "bn" ? "গন্তব্য" : "Destination"}>
          <select
            className={ctl}
            value={destId}
            onChange={(e) => { setDestId(e.target.value); setPrice(""); }}
            disabled={!country}
          >
            <option value="">
              {country
                ? (lang === "bn" ? "গন্তব্য নির্বাচন করুন" : "Select destination")
                : (lang === "bn" ? "আগে দেশ নির্বাচন করুন" : "Pick a country first")}
            </option>
            {countryDests.map((d) => <option key={d._id} value={d._id}>{pick(d.name)}</option>)}
          </select>
        </Field>

        <Field label={lang === "bn" ? "মূল্য" : "Price"}>
          <select
            className={ctl}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={!destId}
          >
            <option value="">
              {destId
                ? (lang === "bn" ? "সব মূল্য" : "All prices")
                : (lang === "bn" ? "আগে গন্তব্য নির্বাচন" : "Pick a destination first")}
            </option>
            {priceOptions.map((o) => <option key={o.amount} value={o.amount}>{o.label}</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-5 flex justify-center">
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-10 py-3 text-base font-bold text-brand-dark shadow-lg transition hover:bg-accent-dark">
          <Icon name="search" className="h-5 w-5" /> {lang === "bn" ? "খুঁজুন" : "Search"}
        </button>
      </div>
    </form>
  );
}
