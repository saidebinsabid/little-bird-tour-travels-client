"use client";

import Link from "next/link";

// Inner-page banner with title + breadcrumb. `bg` is an optional image URL.
export default function PageHeader({ title, subtitle, crumbs = [], bg }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark">
      {bg && (
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${bg}')` }} />
      )}
      <div className="container-x pb-12 pt-28 md:pb-16 md:pt-32 text-white">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-200">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span>/</span>
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-slate-200">{subtitle}</p>}
      </div>
    </section>
  );
}
