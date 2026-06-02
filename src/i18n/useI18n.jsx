"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLanguage } from "@/redux/features/ui/uiSlice";
import { dictionary } from "./dictionary";

/**
 * The single hook every component uses for language:
 *   const { lang, t, pick, toggle, setLang } = useI18n();
 *   t("nav.home")          -> "Home" / "হোম"        (UI strings)
 *   pick(pkg.title)        -> picks .en or .bn       (content objects)
 */
export function useI18n() {
  const lang = useSelector((s) => s.ui.language);
  const dispatch = useDispatch();

  const t = (key) => dictionary[lang]?.[key] ?? dictionary.en[key] ?? key;

  // Content fields are stored as { en, bn }. Gracefully handle plain strings too.
  const pick = (field) => {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.en ?? field.bn ?? "";
  };

  const setLang = (l) => dispatch(setLanguage(l));
  const toggle = () => dispatch(setLanguage(lang === "en" ? "bn" : "en"));

  return { lang, t, pick, setLang, toggle };
}

/**
 * Mount-once component: hydrate the saved language from localStorage and keep
 * <html lang> in sync. Rendered inside Providers so it runs app-wide.
 */
export function LanguageInit() {
  const lang = useSelector((s) => s.ui.language);
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== lang) dispatch(setLanguage(saved));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
