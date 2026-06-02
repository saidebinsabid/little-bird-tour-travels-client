"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/useI18n";
import { useSettings } from "@/hooks/useContent";
import Logo from "./Logo";

// Accepted payment methods (display only — payment integration is Phase 2).
// Rendered as branded chips so it looks professional without logo image assets.
const PAYMENTS = [
  { label: "VISA", color: "#1a1f71" },
  { label: "Mastercard", color: "#eb001b" },
  { label: "AMEX", color: "#2e77bc" },
  { label: "bKash", color: "#e2136e" },
  { label: "Nagad", color: "#ec1c24" },
  { label: "Rocket", color: "#8c3494" },
  { label: "DBBL", color: "#005baa" },
  { label: "Upay", color: "#e6371f" },
];

export default function Footer() {
  const { t, pick, lang } = useI18n();
  const { data: settings } = useSettings();
  const c = settings?.contact || {};
  const s = settings?.social || {};
  const year = new Date().getFullYear();

  const discover = [
    { href: "/", key: "nav.home" },
    { href: "/about", key: "nav.about" },
    { href: "/destinations", key: "nav.destinations" },
    { href: "/blog", key: "nav.blog" },
    { href: "/faq", key: "nav.faq" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ];
  const services = [
    { href: "/packages", key: "service.tour" },
    { href: "/air-ticket", key: "service.air" },
    { href: "/visa", key: "service.visa" },
    { href: "/hajj-umrah", key: "service.hajj" },
    { href: "/hotels", key: "service.hotel" },
  ];

  return (
    <footer className="bg-brand-dark text-slate-200">
      <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-3 lg:grid-cols-5">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{t("footer.about")}</p>
          <div className="mt-4 flex gap-3">
            {s.facebook && (
              <a href={s.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
              </a>
            )}
            {s.youtube && (
              <a href={s.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l6 3.3-6 3.3z"/></svg>
              </a>
            )}
            {s.instagram && (
              <a href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.4 7.8a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* Discover */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{lang === "bn" ? "ডিসকভার" : "Discover"}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {discover.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-300 transition hover:text-white">{l.key ? t(l.key) : l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t("footer.services")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-300 transition hover:text-white">{t(l.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Need help */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{lang === "bn" ? "সাহায্য দরকার?" : "Need Help?"}</h3>
          <p className="mt-4 text-sm text-slate-300">
            {lang === "bn"
              ? "আমরা ২৪/৭ আপনার পাশে! যেকোনো সময় কল বা মেসেজ করুন।"
              : "We're here for you 24/7! Reach out by call or message anytime."}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {c.phone && <li>📞 <a href={`tel:${c.phone}`} className="hover:text-white">{c.phone}</a></li>}
            {c.email && <li>✉️ <a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a></li>}
            {c.address && <li>📍 {pick(c.address)}</li>}
            {c.officeHours && <li>🕐 {c.officeHours}</li>}
          </ul>
        </div>

        {/* Payment methods */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{lang === "bn" ? "পেমেন্ট মেথড" : "Payment Methods"}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <span key={p.label} className="grid h-8 min-w-[52px] place-items-center rounded bg-white px-2 text-[11px] font-bold" style={{ color: p.color }}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-sm text-slate-400 sm:flex-row">
          <p>© {year} {pick(settings?.identity?.name) || "Little Bird Travels"}. {t("footer.rights")}</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
