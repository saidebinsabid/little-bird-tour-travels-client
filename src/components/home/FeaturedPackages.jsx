"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageCard from "@/components/packages/PackageCard";
import { SkeletonGrid } from "@/components/ui/Loading";
import { buttonClasses } from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";
import { useContentList } from "@/hooks/useContent";

export default function FeaturedPackages() {
  const { t } = useI18n();
  const { data, isLoading } = useContentList("packages", {
    featured: true,
    status: "published",
    limit: 6,
  });
  const items = data?.data || [];

  return (
    <section className="section-y bg-surface">
      <Container>
        <SectionHeading title={t("home.featured")} />
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
        <div className="mt-10 text-center">
          <Link href="/packages" className={buttonClasses({ variant: "outline", size: "lg" })}>
            {t("common.viewAll")} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
