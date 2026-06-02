import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" crumbs={[{ label: "Privacy" }]} />
      <Container>
        <div className="prose mx-auto max-w-3xl py-12 text-body">
          <p>
            We collect only the information needed to process your inquiries and bookings
            (name, contact details and travel preferences). We never sell your data.
            Payment information, when introduced, will be handled by certified payment
            gateways and is never stored on our servers.
          </p>
          <p className="mt-4">Full privacy policy will be published here.</p>
        </div>
      </Container>
    </>
  );
}
