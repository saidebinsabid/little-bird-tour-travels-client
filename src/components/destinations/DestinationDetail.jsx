"use client";

import { useI18n } from "@/i18n/useI18n";
import { useContentItem, useContentList } from "@/hooks/useContent";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import PackageCard from "@/components/packages/PackageCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { PageLoader, SkeletonGrid } from "@/components/ui/Loading";

export default function DestinationDetail({ slug }) {
  const { t, pick } = useI18n();
  const { data: dest, isLoading } = useContentItem("destinations", slug);
  const { data: pkgData, isLoading: pkgLoading } = useContentList("packages", {
    status: "published",
    destinationId: dest?._id,
    limit: 9,
  });

  if (isLoading) return <PageLoader />;
  if (!dest) return <Container><div className="py-24 text-center text-muted">{t("common.noResults")}</div></Container>;

  const name = pick(dest.name);
  const packages = pkgData?.data || [];

  return (
    <>
      <PageHeader
        title={name}
        subtitle={pick(dest.description)}
        crumbs={[{ label: "Destinations", href: "/destinations" }, { label: name }]}
        bg={dest.image}
      />
      <Container>
        <section className="py-12">
          <SectionHeading center={false} title={`${name} ${t("nav.packages")}`} />
          <div className="mt-8">
            {pkgLoading ? (
              <SkeletonGrid count={3} />
            ) : packages.length ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((p) => <PackageCard key={p._id} item={p} />)}
              </div>
            ) : (
              <p className="text-muted">{t("common.noResults")}</p>
            )}
          </div>
        </section>
      </Container>
    </>
  );
}
