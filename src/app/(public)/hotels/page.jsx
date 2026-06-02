import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PackagesBrowser from "@/components/packages/PackagesBrowser";
import { PageLoader } from "@/components/ui/Loading";

export const metadata = { title: "Hotels & Resorts" };

export default function HotelsPage() {
  return (
    <>
      <PageHeader
        title="Hotels & Resorts"
        subtitle="Handpicked hotels and resorts at the best prices."
        crumbs={[{ label: "Hotels" }]}
        bg="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
      />
      <Suspense fallback={<PageLoader />}>
        <PackagesBrowser resource="hotels" basePath="/hotels" showType={false} />
      </Suspense>
    </>
  );
}
