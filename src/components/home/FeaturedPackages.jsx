"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/icons/Icon";
import PackageCard from "@/components/packages/PackageCard";
import { SkeletonGrid } from "@/components/ui/Loading";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";

export default function FeaturedPackages() {
  const { t, lang } = useI18n();
  const { data, isLoading } = useContentList("packages", {
    featured: true,
    status: "published",
    limit: 6,
  });
  const items = data?.data || [];

  return (
    <section className="section-y bg-surface">
      <Container>
        {/* Header — eyebrow + heading on the left, description on the right */}
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
              {lang === "bn" ? "আমাদের প্যাকেজ" : "Our Packages"}
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              {t("home.featured")}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted lg:pb-2">
            {lang === "bn"
              ? "দেশ-বিদেশের বাছাই করা সেরা ট্যুরগুলো — আরাম, সাশ্রয় আর অবিস্মরণীয় অভিজ্ঞতার নিশ্চয়তা। লিটল বার্ড ট্রাভেলসের সাথে শুরু হোক আপনার পরের যাত্রা।"
              : "Handpicked tours across Bangladesh and beyond — curated for comfort, real value, and unforgettable memories. Start your next escape with Little Bird Travels."}
          </p>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <SkeletonGrid count={3} />
          ) : items.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <PackageCard key={p._id} item={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">{t("common.noResults")}</p>
          )}
        </div>

        {/* Full-width CTA, like the reference's bottom button */}
        <div className="mt-10">
          <Link
            href="/packages"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand"
          >
            {lang === "bn" ? "সব প্যাকেজ দেখুন" : "View All Packages"}
            <Icon name="arrowUpRight" className="h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
