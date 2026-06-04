import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import VisaList from "@/components/visa/VisaList";
import PageSearchBar from "@/components/search/PageSearchBar";
import VisaSearch from "@/components/search/VisaSearch";
import { PageLoader } from "@/components/ui/Loading";

export const metadata = { title: "Visa Processing" };
// Depends on URL search params + client data — render dynamically (no static prerender).
export const dynamic = "force-dynamic";

export default function VisaPage() {
  return (
    <>
      <PageHeader
        title="Visa Processing"
        subtitle="Tourist, business and student visa support with document guidance."
        crumbs={[{ label: "Visa" }]}
        bg="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=80"
      />
      <PageSearchBar>
        <VisaSearch />
      </PageSearchBar>
      <Suspense fallback={<PageLoader />}>
        <VisaList />
      </Suspense>
    </>
  );
}
