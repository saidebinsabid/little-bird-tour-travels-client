import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import AirTicketSection from "@/components/airticket/AirTicketSection";
import { PageLoader } from "@/components/ui/Loading";

export const metadata = { title: "Air Ticket" };
// Depends on URL search params + client data — render dynamically (no static prerender).
export const dynamic = "force-dynamic";

export default function AirTicketPage() {
  return (
    <>
      <PageHeader
        title="Air Ticket"
        subtitle="Best fares for domestic and international flights."
        crumbs={[{ label: "Air Ticket" }]}
        bg="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
      />
      <Suspense fallback={<PageLoader />}>
        <AirTicketSection />
      </Suspense>
    </>
  );
}
