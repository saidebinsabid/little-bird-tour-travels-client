import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PackagesBrowser from "@/components/packages/PackagesBrowser";
import { PageLoader } from "@/components/ui/Loading";

export const metadata = { title: "Tour Packages" };

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        title="Tour Packages"
        subtitle="Curated domestic & international holiday packages."
        crumbs={[{ label: "Tour Packages" }]}
        bg="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=80"
      />
      <Suspense fallback={<PageLoader />}>
        <PackagesBrowser />
      </Suspense>
    </>
  );
}
