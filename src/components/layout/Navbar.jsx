"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useI18n } from "@/i18n/useI18n";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import Icon from "@/components/icons/Icon";
import { buttonClasses } from "@/components/ui/Button";

// Center icon+label nav (visible when the bar is solid). Icons are monochrome
// and turn brand-blue on hover/active (both glyph and label).
const ICON_NAV = [
  { href: "/air-ticket", icon: "flight", key: "nav.airTicket" },
  { href: "/hotels", icon: "hotel", key: "nav.hotels" },
  { href: "/packages", icon: "tour", key: "nav.packages" },
  { href: "/visa", icon: "visa", key: "nav.visa" },
  { href: "/hajj-umrah", icon: "hajj", key: "nav.hajj" },
];

// Hamburger mega-menu columns.
const MEGA = [
  {
    title: "Travel",
    items: [
      { href: "/air-ticket", icon: "flight", key: "nav.airTicket" },
      { href: "/hotels", icon: "hotel", key: "nav.hotels" },
      { href: "/packages", icon: "tour", key: "nav.packages" },
      { href: "/visa", icon: "visa", key: "nav.visa" },
      { href: "/hajj-umrah", icon: "hajj", key: "nav.hajj" },
    ],
  },
  {
    title: "Explore",
    items: [
      { href: "/destinations", icon: "pin", key: "nav.destinations" },
      { href: "/blog", icon: "blog", key: "nav.blog" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", icon: "info", key: "nav.about" },
      { href: "/contact", icon: "phone", key: "nav.contact" },
      { href: "/faq", icon: "faq", key: "nav.faq" },
    ],
  },
];

function MegaItem({ item, t, onClick }) {
  return (
    <Link href={item.href} onClick={onClick} className="group flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-brand-light">
      <Icon name={item.icon} className="h-5 w-5 text-ink transition group-hover:text-brand" />
      <span className="text-sm font-medium text-ink transition group-hover:text-brand">{t(item.key)}</span>
    </Link>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock background scroll while the mega-menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || !isHome || open; // white bar when scrolled, on inner pages, or menu open
  const dark = !solid; // transparent → light text

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="container-x">
        <div className={`flex items-center justify-between gap-3 transition-all ${solid ? "h-16" : "h-20"}`}>
          <Logo light={dark} />

          {/* Center icon nav — visible when solid (desktop) */}
          <nav className={`hidden items-center gap-8 lg:flex ${solid && !open ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}>
            {ICON_NAV.map((it) => {
              const active = pathname.startsWith(it.href);
              return (
                <Link key={it.href} href={it.href} className="group flex flex-col items-center">
                  <Icon name={it.icon} className={`h-5 w-5 transition ${active ? "text-brand" : "text-ink group-hover:text-brand"}`} />
                  <span className={`mt-1 text-xs font-semibold transition ${active ? "text-brand" : "text-ink group-hover:text-brand"}`}>
                    {t(it.key)}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            {user ? (
              <Link href="/dashboard" className={buttonClasses({ variant: "primary", size: "sm" })}>{t("nav.dashboard")}</Link>
            ) : (
              <Link href="/auth/login" className={buttonClasses({ variant: "primary", size: "sm" })}>{t("nav.login")}</Link>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className={`grid h-10 w-10 place-items-center rounded-lg text-xl transition ${dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-slate-100"}`}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mega-menu (drops from the top with a smooth animation) ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-16 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        className={`absolute inset-x-0 top-full z-50 origin-top border-t border-slate-100 bg-white shadow-2xl transition-all duration-300 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <div className="container-x py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]">
            {MEGA.map((col) => (
              <div key={col.title}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">{col.title}</h3>
                <div className="space-y-0.5">
                  {col.items.map((item) => (
                    <MegaItem key={item.href} item={item} t={t} onClick={() => setOpen(false)} />
                  ))}
                </div>
              </div>
            ))}

            {/* Promo card */}
            <div className="rounded-2xl bg-brand-dark p-6 text-white">
              <p className="text-xl font-bold">
                {user ? `Hello, ${(user.name || "Traveler").split(" ")[0]}` : "Hello, Traveler"}
              </p>
              <p className="mt-1 text-sm text-brand-light">Get exclusive deals &amp; plan your trips!</p>
              {user ? (
                <div className="mt-4 flex items-center gap-2">
                  <Link href="/dashboard" onClick={() => setOpen(false)} className={buttonClasses({ variant: "accent", size: "sm" })}>{t("nav.dashboard")}</Link>
                  <button onClick={() => { logout(); setOpen(false); }} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white/90 hover:text-white">{t("nav.logout")}</button>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setOpen(false)} className={`mt-4 ${buttonClasses({ variant: "accent", size: "md" })}`}>{t("nav.login")}</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
