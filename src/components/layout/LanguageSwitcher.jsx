"use client";

import { useI18n } from "@/i18n/useI18n";

// Compact EN / বাং pill toggle. Has its own light background so it stays
// readable on both the transparent (over-hero) and solid navbars.
export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useI18n();

  return (
    <div className={`inline-flex rounded-full bg-white/90 p-0.5 text-sm shadow-sm ring-1 ring-black/5 ${className}`}>
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 font-medium transition ${
          lang === "en" ? "bg-brand text-white" : "text-slate-600 hover:text-brand"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("bn")}
        className={`rounded-full px-2.5 py-1 font-medium transition font-bangla ${
          lang === "bn" ? "bg-brand text-white" : "text-slate-600 hover:text-brand"
        }`}
      >
        বাং
      </button>
    </div>
  );
}
