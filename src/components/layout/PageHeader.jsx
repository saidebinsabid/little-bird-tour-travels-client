"use client";

import Link from "next/link";

// Inner-page banner with title + breadcrumb. `bg` is an optional image URL.
export default function PageHeader({ title, subtitle, crumbs = [], bg }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark">
      {bg && (
        <>
          <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url('${bg}')` }} />
          {/* Strong dark overlay so the white text is always perfectly readable */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/85 to-brand-dark/70" />
        </>
      )}
      <div className="container-x pb-12 pt-28 md:pb-16 md:pt-32 text-white">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span>/</span>
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-3 text-3xl font-extrabold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.45)] md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">{subtitle}</p>}
      </div>
    </section>
  );
}
