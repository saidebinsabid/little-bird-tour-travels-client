"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useContentList } from "@/hooks/useContent";
import { useI18n } from "@/i18n/useI18n";
import Icon from "@/components/icons/Icon";

// Visa search: From country → To (destination) country → Visa type →
// routes to /visa filtered by destination country + type.
// Origin is fixed to Bangladesh (our travellers); destinations are every other
// country we offer visas for.
const FROM_COUNTRIES = ["Bangladesh"];

function Field({ label, children }) {
  return (
    <div className="rounded-xl border border-slate-200 px-4 py-2 text-left transition focus-within:border-brand">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}
const ctl = "mt-0.5 w-full bg-transparent text-sm font-bold text-ink outline-none";

export default function VisaSearch() {
  const { lang } = useI18n();
  const router = useRouter();
  const { data } = useContentList("visas", { status: "published", limit: 100 });
  const visas = data?.data || [];

  const toCountries = useMemo(
    () => [...new Set(visas.map((v) => v.country).filter(Boolean))]
      .filter((c) => c.toLowerCase() !== "bangladesh")
      .sort(),
    [visas]
  );
  const typeOptions = useMemo(() => {
    const t = [...new Set(visas.map((v) => v.visaType).filter(Boolean))];
    return t.length ? t : ["tourist", "business", "student", "work"];
  }, [visas]);

  const [from, setFrom] = useState("Bangladesh");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (from) q.set("from", from);
    if (to) q.set("country", to);
    if (type) q.set("type", type);
    const qs = q.toString();
    router.push(`/visa${qs ? `?${qs}` : ""}`);
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Field label={lang === "bn" ? "কোথা থেকে" : "From (your country)"}>
        <select className={ctl} value={from} onChange={(e) => setFrom(e.target.value)}>
          {FROM_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <Field label={lang === "bn" ? "কোন দেশের ভিসা" : "Destination country"}>
        <select className={ctl} value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">{lang === "bn" ? "দেশ নির্বাচন করুন" : "Select country"}</option>
          {toCountries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <Field label={lang === "bn" ? "ভিসার ধরন" : "Visa type"}>
        <select className={ctl} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">{lang === "bn" ? "সব ধরন" : "All types"}</option>
          {typeOptions.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
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
