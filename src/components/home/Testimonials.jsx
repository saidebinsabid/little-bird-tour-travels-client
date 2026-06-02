"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Rating from "@/components/ui/Rating";
import { useI18n } from "@/i18n/useI18n";
import { useReviews } from "@/hooks/useContent";

export default function Testimonials() {
  const { t } = useI18n();
  const { data: reviews = [] } = useReviews();
  if (!reviews.length) return null;

  return (
    <section className="section-y">
      <Container>
        <SectionHeading title={t("home.testimonials")} />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <figure key={r._id} className="card-base p-6 shadow-[var(--shadow-card)]">
              <Rating value={r.rating} />
              <blockquote className="mt-3 text-body">“{r.comment}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-light font-bold text-brand">
                  {(r.author?.name || "?")[0]}
                </span>
                <span className="font-semibold text-ink">{r.author?.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
