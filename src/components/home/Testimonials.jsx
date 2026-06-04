"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/icons/Icon";
import { useI18n } from "@/i18n/useI18n";
import { useReviews } from "@/hooks/useContent";

export default function Testimonials() {
  const { t, lang } = useI18n();
  const { data: reviews = [] } = useReviews();
  const n = reviews.length;

  const [perView, setPerView] = useState(3);
  const [i, setI] = useState(0);
  const hovering = useRef(false);

  // Responsive cards-per-view in the right column: 1 (mobile) / 2 (tablet) / 3 (desktop).
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 768 ? 1 : w < 1280 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.max(0, n - perView);

  // Auto-advance slowly; pause while hovering.
  useEffect(() => {
    if (n <= perView) return;
    const id = setInterval(() => {
      if (!hovering.current) setI((p) => (p >= maxIndex ? 0 : p + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [n, perView, maxIndex]);

  useEffect(() => setI((p) => Math.min(p, maxIndex)), [maxIndex]);

  if (!n) return null;
  const cardWidth = 100 / perView;
  const prev = () => setI((p) => (p <= 0 ? maxIndex : p - 1));
  const next = () => setI((p) => (p >= maxIndex ? 0 : p + 1));

  return (
    <section className="section-y bg-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
          {/* ── Left: heading, copy, CTA ── */}
          <div>
            <span className="inline-block rounded-full border border-slate-300 bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
              {lang === "bn" ? "প্রশংসাপত্র" : "Testimonials"}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              {t("home.testimonials")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {lang === "bn"
                ? "লিটল বার্ড ট্রাভেলসের সাথে বিশ্ব ঘুরে আসা ভ্রমণকারীদের সত্যিকারের অভিজ্ঞতা — তাঁদের বিশ্বাসই আমাদের সবচেয়ে বড় প্রাপ্তি।"
                : "Real stories from travelers who explored the world with Little Bird Travels — their trust is our greatest reward."}
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-dark"
            >
              {lang === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </Link>
          </div>

          {/* ── Right: testimonial card slider + controls below ── */}
          <div className="min-w-0">
            <div
              className="overflow-hidden"
              onMouseEnter={() => (hovering.current = true)}
              onMouseLeave={() => (hovering.current = false)}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${i * cardWidth}%)` }}
              >
                {reviews.map((r) => {
                  const name = r.author?.name || "Traveller";
                  return (
                    <div key={r._id} className="shrink-0 px-3" style={{ width: `${cardWidth}%` }}>
                      <figure className="running-border flex h-full flex-col rounded-2xl bg-surface p-7 ring-1 ring-slate-200">
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-200 text-slate-500">
                          <Icon name="quote" className="h-6 w-6" />
                        </span>
                        <blockquote className="clamp-4 mt-5 flex-1 leading-relaxed text-slate-600">
                          {r.comment}
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-200 font-bold text-slate-700">
                            {name[0]}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-bold text-ink">{name}</span>
                            <span className="block text-sm italic text-muted">
                              {lang === "bn" ? "ভেরিফায়েড ভ্রমণকারী" : "Verified traveller"}
                            </span>
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls below the slider — arrows on the left, dots on the right */}
            {n > perView && (
              <div className="mt-6 flex items-center justify-between px-3">
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink ring-1 ring-slate-200 transition hover:bg-brand hover:text-white hover:ring-brand"
                  >
                    <Icon name="chevronLeft" className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink ring-1 ring-slate-200 transition hover:bg-brand hover:text-white hover:ring-brand"
                  >
                    <Icon name="chevronRight" className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-brand" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
