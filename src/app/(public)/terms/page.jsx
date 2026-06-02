import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" crumbs={[{ label: "Terms" }]} />
      <Container>
        <div className="prose mx-auto max-w-3xl py-12 text-body">
          <p>
            By booking with Little Bird Tours & Travels you agree to our booking,
            cancellation and refund policies. Prices are subject to availability and
            may change without notice. Visa approval and airline schedules are governed
            by the respective authorities and airlines.
          </p>
          <p className="mt-4">
            Full terms will be published here. For any clarification, please contact our office.
          </p>
        </div>
      </Container>
    </>
  );
}
