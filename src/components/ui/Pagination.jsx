"use client";

import Icon from "@/components/icons/Icon";

// Reusable, responsive, animated pagination. Shows first/last + a window around
// the current page with ellipses. Returns null when there's only one page.
export default function Pagination({ page, totalPages, onChange, className = "" }) {
  if (!totalPages || totalPages <= 1) return null;

  const go = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== page) onChange(next);
  };

  // Build [1, …, 4, 5, (6), 7, 8, …, 20]
  const items = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) items.push(p);
    else if (items[items.length - 1] !== "…") items.push("…");
  }

  const base =
    "grid h-9 w-9 place-items-center rounded-xl text-sm font-bold transition-all duration-200 sm:h-10 sm:w-10";
  const arrow =
    `${base} bg-white text-ink ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-brand hover:ring-brand ` +
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:text-ink disabled:hover:ring-slate-200";

  return (
    <nav className={`mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 ${className}`} aria-label="Pagination">
      <button type="button" onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page" className={arrow}>
        <Icon name="chevronLeft" className="h-5 w-5" />
      </button>

      {items.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="select-none px-0.5 text-slate-400 sm:px-1">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${base} ${
              p === page
                ? "scale-105 bg-brand text-white shadow-lg shadow-brand/30"
                : "bg-white text-ink ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-brand hover:ring-brand"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button type="button" onClick={() => go(page + 1)} disabled={page === totalPages} aria-label="Next page" className={arrow}>
        <Icon name="chevronRight" className="h-5 w-5" />
      </button>
    </nav>
  );
}
