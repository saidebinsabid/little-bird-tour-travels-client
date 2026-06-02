import PageHeader from "@/components/layout/PageHeader";
import VisaList from "@/components/visa/VisaList";

export const metadata = { title: "Visa Processing" };

export default function VisaPage() {
  return (
    <>
      <PageHeader
        title="Visa Processing"
        subtitle="Tourist, business and student visa support with document guidance."
        crumbs={[{ label: "Visa" }]}
        bg="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=80"
      />
      <VisaList />
    </>
  );
}
