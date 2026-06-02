import PageHeader from "@/components/layout/PageHeader";
import AirTicketSection from "@/components/airticket/AirTicketSection";

export const metadata = { title: "Air Ticket" };

export default function AirTicketPage() {
  return (
    <>
      <PageHeader
        title="Air Ticket"
        subtitle="Best fares for domestic and international flights."
        crumbs={[{ label: "Air Ticket" }]}
        bg="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
      />
      <AirTicketSection />
    </>
  );
}
