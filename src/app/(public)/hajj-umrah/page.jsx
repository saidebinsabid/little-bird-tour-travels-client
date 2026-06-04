import PageHeader from "@/components/layout/PageHeader";
import HajjUmrah from "@/components/hajj/HajjUmrah";

export const metadata = { title: "Hajj & Umrah Packages" };

export default function HajjUmrahPage() {
  return (
    <>
      <PageHeader
        title="Hajj & Umrah"
        subtitle="Comfortable, well-managed pilgrimage packages with experienced guides."
        crumbs={[{ label: "Hajj & Umrah" }]}
        bg="https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?auto=format&fit=crop&w=2000&q=80"
      />
      <HajjUmrah />
    </>
  );
}
