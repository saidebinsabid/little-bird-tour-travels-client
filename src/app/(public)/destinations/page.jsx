import PageHeader from "@/components/layout/PageHeader";
import DestinationsGrid from "@/components/destinations/DestinationsGrid";

export const metadata = { title: "Destinations" };

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        title="Destinations"
        subtitle="Explore the places we love to take you."
        crumbs={[{ label: "Destinations" }]}
        bg="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
      />
      <DestinationsGrid />
    </>
  );
}
