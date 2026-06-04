import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PackagesBrowser from "@/components/packages/PackagesBrowser";
import PageSearchBar from "@/components/search/PageSearchBar";
import TourSearch from "@/components/search/TourSearch";
import { PageLoader } from "@/components/ui/Loading";

export const metadata = { title: "Tour Packages" };
// Depends on URL search params + client data — render dynamically (no static prerender).
export const dynamic = "force-dynamic";

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        title="Tour Packages"
        subtitle="Curated domestic & international holiday packages."
        crumbs={[{ label: "Tour Packages" }]}
        bg="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=80"
      />
      <PageSearchBar>
        <Suspense fallback={null}>
          <TourSearch />
        </Suspense>
      </PageSearchBar>
      <Suspense fallback={<PageLoader />}>
        <PackagesBrowser showSidebar={false} />
      </Suspense>
    </>
  );
}
